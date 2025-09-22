require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

// DB Connection
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URI);
    console.log(`✅ MongoDB Connected: ${connection.host}/${connection.name}`);
  } catch (err) {
    console.error('❌ Database Connection Failed:', err);
  }
};

// Seed data
const seedDB = async () => {
  try {
    // Clear collections first
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️ Old data removed');

    // Insert users
    const users = await User.insertMany([
      { name: 'Ali Mahmoud', email: 'ali@example.com' },
      { name: 'Sara Ahmed', email: 'sara@example.com' },
    ]);

    // Insert products
    const products = await Product.insertMany([
      { name: 'Laptop', price: 1000, stock: 5 },
      { name: 'Phone', price: 500, stock: 10 },
      { name: 'Headphones', price: 100, stock: 20 },
    ]);

    // Insert orders
    await Order.insertMany([
      {
        user: users[0]._id,
        products: [products[0]._id, products[2]._id], // Laptop + Headphones
        totalPrice: 1100,
        status: 'completed',
      },
      {
        user: users[1]._id,
        products: [products[1]._id], // Phone
        totalPrice: 500,
        status: 'pending',
      },
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

// Run seeder
(async () => {
  await connectDB();
  await seedDB();
})();
