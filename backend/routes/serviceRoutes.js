import express from 'express';
import {
  getServices,
  getCategories,
  getTopRated,
  getStats,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { addReview, getServiceReviews } from '../controllers/reviewController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Specific routes before :id parameter routes
router.get('/categories', getCategories);
router.get('/top-rated', getTopRated);
router.get('/stats', getStats);

// Reviews sub-resource
router.route('/:id/reviews')
  .get(getServiceReviews)
  .post(protect, addReview);

// Base service routes
router.route('/')
  .get(getServices)
  .post(protect, authorize('provider', 'admin'), createService);

router.route('/:id')
  .get(getServiceById)
  .put(protect, authorize('provider', 'admin'), updateService)
  .delete(protect, authorize('provider', 'admin'), deleteService);

export default router;
