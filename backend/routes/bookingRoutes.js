import express from 'express';
import {
  createBooking,
  getMyBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // all booking routes are protected

router.route('/')
  .post(createBooking);

router.get('/my-bookings', getMyBookings);

router.put('/:id/status', updateBookingStatus);

export default router;
