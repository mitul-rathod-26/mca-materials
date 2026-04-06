const { MongoClient } = require('mongodb');

// Connection URL
const uri = 'mongodb://localhost:27017/';

const client = new MongoClient(uri);

async function connectDB() {
    try {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected to MongoDB...!');
        // Select database
        const db = client.db('Student');  // Creates 'Student' DB

        // Create collection
        await db.createCollection('users');
        console.log('Collection created...!');
        const collection = db.collection('users');

        // Insert ONE record.
        // const result = await collection.insertOne({
        //     name: 'Meet Patel',
        //     age: 22,
        //     city: 'Surat',
        //     status: 'active'
        // });
        // console.log('Inserted ID:', result.insertedId);

        // Insert MANY records

        // const users = [
        //     { name: 'Raj Shah', age: 21, city: 'Ahmedabad', status: 'active' },
        //     { name: 'Priya Mehta', age: 23, city: 'Vadodara', status: 'inactive' },
        //     { name: 'Amit Joshi', age: 25, city: 'Surat', status: 'active' }
        // ];

        // const manyResult = await collection.insertMany(users);
        // console.log('Inserted Count:', manyResult.insertedCount);


        // Find ONE document by name

        // const user = await collection.findOne(
        //     { name: 'Raj Shah' }
        // );

        // if (user) {
        //     console.log('Found:', user);
        // } else {
        //     console.log('User not found.');
        // }

        // Find ALL documents
        // const users = await collection.find().toArray();
        // console.log('All users:', users);

        // Filter: find active users

        // const active = await collection
        //     .find({ status: 'active' })
        //     .toArray();
        // console.log('Active users:', active);


        // Users aged 18 to 25
        // const results = await collection.find({ age: { $gt: 20 } }).toArray();
        // console.log('Users aged: ', results);


        // updateOne — update ONE record
        // const r1 = await collection.updateOne(
        //     { name: 'Priya Mehta' },    // filter
        //     { $set: { city: 'Ahmedabad' } } // update
        // );
        // console.log(r1.matchedCount, r1.modifiedCount);

        // const user = await collection.findOne(
        //     { name: 'Priya Mehta' }
        // );
        // console.log('Updated user:', user);

        // updateMany — update MULTIPLE records
        // const r2 = await collection.updateMany(
        //     { city: 'Surat' },
        //     { $set: { status: 'active' } }
        // );
        // console.log(`\n\n${r2.modifiedCount} records updated`);

        // const users = await collection.find().toArray();
        // console.log('\n\nAll users:', users);

        // deleteOne — remove ONE record
        // const r1 = await collection.deleteOne(
        //     { name: 'Meet Patel' }
        // );
        // console.log('\n\nDeleted:', r1.deletedCount);

        // const users = await collection.find().toArray();
        // console.log('\n\nAll users:', users);

        // deleteMany — remove MULTIPLE records
        // const r2 = await collection.deleteMany(
        //     { status: 'inactive' }
        // );
        // console.log(`\n\n${r2.deletedCount} docs deleted`);

        // const users = await collection.find().toArray();
        // console.log('\n\nAll users:', users);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();  // Always close connection
    }
}
connectDB();



