const sequelize = require('./models');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

async function seedDatabase() {
    try {
        // Sync database
        await sequelize.sync({ force: true });
        console.log('Database synced!');

        // Add sample users
        const users = await User.bulkCreate([
            { name: 'Alice', email: 'alice@example.com', password: 'password123' },
            { name: 'Bob', email: 'bob@example.com', password: 'password123' },
            { name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
        ]);
        console.log('Users added:', users.map(user => user.toJSON()));

        // Add sample products
        const products = await Product.bulkCreate([
            { name: 'Laptop', description: 'A powerful laptop', price: 1200, stock: 10 },
            { name: 'Smartphone', description: 'A high-end smartphone', price: 800, stock: 20 },
            { name: 'Headphones', description: 'Noise-cancelling headphones', price: 150, stock: 50 },
        ]);
        console.log('Products added:', products.map(product => product.toJSON()));

        // Add sample orders
        const orders = await Order.bulkCreate([
            {
                userId: users[0].id,
                products: [
                    { productId: products[0].id, quantity: 1 },
                    { productId: products[1].id, quantity: 2 },
                ],
                total: 2800,
            },
            {
                userId: users[1].id,
                products: [
                    { productId: products[2].id, quantity: 3 },
                ],
                total: 450,
            },
        ]);
        console.log('Orders added:', orders.map(order => order.toJSON()));

        console.log('Database seeding completed!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        // Close database connection
        await sequelize.close();
    }
}

seedDatabase();
