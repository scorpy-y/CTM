import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Material from './models/Material';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mrp_dashboard';

const seedData = [
  {
    name: 'Cement',
    category: 'Binding Material',
    requiredQuantity: 50000,
    availableQuantity: 30000,
    orderedQuantity: 15000,
    deliveredQuantity: 8000,
    unitCost: 8.5,
    unit: 'bags',
    supplier: 'BuildRight Supplies',
    deliveryDate: new Date('2024-03-15'),
    status: 'Partial',
  },
  {
    name: 'Steel',
    category: 'Structural Material',
    requiredQuantity: 10000,
    availableQuantity: 6000,
    orderedQuantity: 3000,
    deliveredQuantity: 1500,
    unitCost: 75.0,
    unit: 'kg',
    supplier: 'MetalPro Industries',
    deliveryDate: new Date('2024-03-20'),
    status: 'Partial',
  },
  {
    name: 'Sand',
    category: 'Aggregate',
    requiredQuantity: 80000,
    availableQuantity: 50000,
    orderedQuantity: 25000,
    deliveredQuantity: 25000,
    unitCost: 2.5,
    unit: 'm³',
    supplier: 'Quarry Masters',
    deliveryDate: new Date('2024-03-10'),
    status: 'Complete',
  },
  {
    name: 'Bricks',
    category: 'Masonry',
    requiredQuantity: 100000,
    availableQuantity: 60000,
    orderedQuantity: 35000,
    deliveredQuantity: 15000,
    unitCost: 0.45,
    unit: 'units',
    supplier: 'RedClay Brickworks',
    deliveryDate: new Date('2024-04-01'),
    status: 'Pending',
  },
  {
    name: 'Aggregate',
    category: 'Aggregate',
    requiredQuantity: 40000,
    availableQuantity: 25000,
    orderedQuantity: 12000,
    deliveredQuantity: 5000,
    unitCost: 12.0,
    unit: 'tons',
    supplier: 'Quarry Masters',
    deliveryDate: new Date('2024-03-25'),
    status: 'Partial',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    await Material.deleteMany({});
    console.log('Cleared existing materials');
    await Material.insertMany(seedData);
    console.log(`Seeded ${seedData.length} materials successfully`);
    await mongoose.disconnect();
    console.log('Database seeded and disconnected');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
