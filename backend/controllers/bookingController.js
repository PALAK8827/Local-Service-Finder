import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
  try {
    const { serviceId, date, time, notes, address } = req.body;

    if (!serviceId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide serviceId and date for booking',
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service provider not found',
      });
    }

    const booking = await Booking.create({
      service: serviceId,
      customer: req.user._id,
      provider: service.provider || null,
      date: new Date(date),
      time: time || 'Morning (9:00 AM - 12:00 PM)',
      notes: notes || '',
      address: address || req.user.location || '',
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings of logged in user (customer or provider)
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = async (req, res, next) => {
  try {
    const isProvider = req.user.role === 'provider';

    const filter = isProvider
      ? { provider: req.user._id }
      : { customer: req.user._id };

    const bookings = await Booking.find(filter)
      .populate('service', 'name role category location price img')
      .populate('customer', 'name email phone location')
      .populate('provider', 'name email phone location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking status',
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check authorization: customer or assigned provider or admin
    const userId = req.user._id.toString();
    const isCustomer = booking.customer.toString() === userId;
    const isProvider = booking.provider && booking.provider.toString() === userId;

    if (!isCustomer && !isProvider && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking',
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};
