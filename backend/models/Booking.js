import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Please specify the service being booked'],
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer ID is required'],
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
      required: [true, 'Please provide a booking date'],
    },
    time: {
      type: String,
      default: 'Morning (9:00 AM - 12:00 PM)',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
