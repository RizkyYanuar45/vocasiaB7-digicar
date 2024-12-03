require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { mongoUri } = require('../configs/env');  

const users = [
    {
        name: 'Admin yusa',
        email: 'admin@example.com',
        username: 'adminyusa', 
        password: 'admin123',  
        role: 'admin'
    },
    {
        name: 'User yusa',
        email: 'user@example.com',
        username: 'useryusa',
        password: 'user123',  
        role: 'user'
    }
];

const seedDatabase = async () => {
    try {
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(mongoUri);  

        await User.deleteMany();
        console.log('Previous user data cleared');

        const createdUsers = await User.create(users);
        console.log('Users seeded');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
