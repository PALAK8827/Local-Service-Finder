import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating between 1 and 5'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per service if desired
reviewSchema.index({ service: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
