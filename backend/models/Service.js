import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // can be optional for seeded / initial listings
    },
    name: {
      type: String,
      required: [true, 'Please provide the provider or business name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide a role or title (e.g. Electrician, Home Tutor)'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide a location / city'],
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default: '👨‍🔧',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add text indexing for search across name, role, category, description, and location
serviceSchema.index({ name: 'text', role: 'text', category: 'text', description: 'text', location: 'text' });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
