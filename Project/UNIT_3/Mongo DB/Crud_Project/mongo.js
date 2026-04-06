const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function connectDB() {
    try {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected to MongoDB...!');
        // Select database
        const db = client.db('Student_MCA');  // Creates 'Student' DB
        // Create collection
        await db.createCollection('users');
        console.log('Collection created...!');
        const collection = db.collection('users');


        // const result = await collection.insertOne({
        //     name: 'Meet Patel',
        //     age: 22,
        //     city: 'Surat',
        //     status: 'active'
        // });
        // console.log('Inserted ID:', result.insertedId);


        // const users = [
        //     { name: 'Raj Shah', age: 21, city: 'Ahmedabad', status: 'active' },
        //     { name: 'Priya Mehta', age: 23, city: 'Vadodara', status: 'inactive' },
        //     { name: 'Amit Joshi', age: 25, city: 'Surat', status: 'active' }
        // ];
        // const manyResult = await collection.insertMany(users);
        // console.log('Inserted Count:', manyResult.insertedCount);


        const users_f = await collection.find().toArray();
        console.log('All users:', users_f);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();  // Always close connection
    }
}
connectDB();
