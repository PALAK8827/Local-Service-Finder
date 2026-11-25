import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';
import connectDB from '../config/db.js';

dotenv.config();

async function seedData() {
  try {
    await connectDB();

    // Clear existing services to avoid duplicates during seeding
    await Service.deleteMany();

    // Check or create demo providers
    let providerUser = await User.findOne({ email: 'provider@example.com' });
    if (!providerUser) {
      providerUser = await User.create({
        name: 'Demo Provider',
        email: 'provider@example.com',
        password: 'password123',
        role: 'provider',
        phone: '555-019-2831',
        location: 'Fremont',
      });
    }

    const services = [
      {
        provider: providerUser._id,
        name: 'Ramesh Kumar',
        role: 'Electrician',
        category: 'Electrician',
        description: 'Wiring, repairs & full home electrical installations with 10+ years experience.',
        location: 'Fremont',
        price: 65,
        rating: 4.9,
        reviews: 128,
        img: '👨‍🔧',
      },
      {
        provider: providerUser._id,
        name: 'Priya Sharma',
        role: 'Home Tutor',
        category: 'Tutor',
        description: 'K-12 Math, Science, and English tutoring with personalized lesson plans.',
        location: 'Newark',
        price: 45,
        rating: 4.8,
        reviews: 95,
        img: '👩‍🏫',
      },
      {
        provider: providerUser._id,
        name: 'Arjun Mehta',
        role: 'Plumber',
        category: 'Plumber',
        description: 'Rapid leak repairs, pipe fitting, water heaters & drain cleaning services.',
        location: 'Milpitas',
        price: 70,
        rating: 4.7,
        reviews: 112,
        img: '👨‍🔩',
      },
      {
        provider: providerUser._id,
        name: 'Sunita Patel',
        role: 'Beautician',
        category: 'Beautician',
        description: 'Professional salon & spa treatments delivered in the comfort of your home.',
        location: 'Union City',
        price: 55,
        rating: 4.9,
        reviews: 203,
        img: '👩‍🎨',
      },
      {
        provider: providerUser._id,
        name: 'Carlos Rivera',
        role: 'Mechanic',
        category: 'Mechanic',
        description: 'Mobile automotive inspection, brake replacement, diagnostics & tune-ups.',
        location: 'Fremont',
        price: 80,
        rating: 4.8,
        reviews: 87,
        img: '🚗',
      },
      {
        provider: providerUser._id,
        name: 'Anita Desai',
        role: 'Cleaner',
        category: 'Cleaner',
        description: 'Deep residential cleaning, move-in/move-out & sanitization services.',
        location: 'Newark',
        price: 50,
        rating: 4.9,
        reviews: 142,
        img: '🧹',
      },
      {
        provider: providerUser._id,
        name: 'David Chen',
        role: 'Painter',
        category: 'Painter',
        description: 'Interior & exterior precision painting, cabinet refinishing, wall repairs.',
        location: 'Milpitas',
        price: 60,
        rating: 4.7,
        reviews: 79,
        img: '🎨',
      },
      {
        provider: providerUser._id,
        name: 'Liam Green',
        role: 'Gardener',
        category: 'Gardener',
        description: 'Lawn maintenance, landscape pruning, sprinkler installation & tree trimming.',
        location: 'Union City',
        price: 45,
        rating: 4.8,
        reviews: 64,
        img: '🌿',
      },
    ];

    await Service.insertMany(services);

    console.log('[Seeder]: Successfully seeded database with initial services & providers!');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]:', error);
    process.exit(1);
  }
}

seedData();
