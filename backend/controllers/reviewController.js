import Review from '../models/Review.js';
import Service from '../models/Service.js';

// @desc    Add a review for a service provider
// @route   POST /api/services/:id/reviews
// @access  Private (Customer)
export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const serviceId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating and review comment',
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service provider not found',
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({
      service: serviceId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this service',
      });
    }

    const review = await Review.create({
      service: serviceId,
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment: comment.trim(),
    });

    // Update service rating and review count
    const allReviews = await Review.find({ service: serviceId });
    service.reviews = allReviews.length;
    service.rating = Number(
      (allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length).toFixed(1)
    );

    await service.save();

    res.status(201).json({
      success: true,
      review,
      serviceRating: service.rating,
      serviceReviews: service.reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for a service
// @route   GET /api/services/:id/reviews
// @access  Public
export const getServiceReviews = async (req, res, next) => {
  try {
    const serviceId = req.params.id;

    const reviews = await Review.find({ service: serviceId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
