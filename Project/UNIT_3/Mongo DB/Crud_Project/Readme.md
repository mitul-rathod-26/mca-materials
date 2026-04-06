# MongoDB CRUD Practical

## Requirements
- [Node.js](https://nodejs.org) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running

---

## Setup

**1. Create project folder and open terminal inside it**

**2. Initialize project**
```bash
npm init -y
```

**3. Install MongoDB driver**
```bash
npm install mongodb
```

**4. Create a file named `index.js`**

---

## How to Run

```bash
node index.js
```

---

## Steps to Perform Each Operation

### Step 1 — Connect & Create Collection

This runs automatically when you start. It connects to MongoDB, creates a `Student` database and a `users` collection.

**Expected output:**
```
Connected to MongoDB!
Collection created!
```

---

### Step 2 — Insert ONE Record

```js
const result = await collection.insertOne({
    name: 'Meet Patel',
    age: 22,
    city: 'Surat',
    status: 'active'
});
console.log('Inserted ID:', result.insertedId);
```

**Expected output:**
```
Inserted ID: 64f1a2b3c4d5e6f7a8b9c0d1
```

---

### Step 3 — Insert MANY Records

```js
const users = [
    { name: 'Raj Shah', age: 21, city: 'Ahmedabad', status: 'active' },
    { name: 'Priya Mehta', age: 23, city: 'Vadodara', status: 'inactive' },
    { name: 'Amit Joshi', age: 25, city: 'Surat', status: 'active' }
];
const manyResult = await collection.insertMany(users);
console.log('Inserted Count:', manyResult.insertedCount);
```

**Expected output:**
```
Inserted Count: 3
```

---

### Step 4 — Find ONE Document

```js
const user = await collection.findOne({ name: 'Raj Shah' });
if (user) {
    console.log('Found:', user);
} else {
    console.log('User not found.');
}
```

**Expected output:**
```
Found: { _id: ..., name: 'Raj Shah', age: 21, city: 'Ahmedabad', status: 'active' }
```

---

### Step 5 — Find ALL Documents

```js
const users = await collection.find().toArray();
console.log('All users:', users);
```

---

### Step 6 — Filter Documents

**Active users only:**
```js
const active = await collection.find({ status: 'active' }).toArray();
console.log('Active users:', active);
```

**Users aged above 20:**
```js
const results = await collection.find({ age: { $gt: 20 } }).toArray();
console.log('Users aged:', results);
```

---

### Step 7 — Update ONE Record

```js
const r1 = await collection.updateOne(
    { name: 'Priya Mehta' },
    { $set: { city: 'Ahmedabad' } }
);
console.log(r1.matchedCount, r1.modifiedCount);
```

**Expected output:**
```
1 1
```

---

### Step 8 — Update MANY Records

```js
const r2 = await collection.updateMany(
    { city: 'Surat' },
    { $set: { status: 'active' } }
);
console.log(`${r2.modifiedCount} records updated`);
```

---

### Step 9 — Delete ONE Record

```js
const r1 = await collection.deleteOne({ name: 'Meet Patel' });
console.log('Deleted:', r1.deletedCount);
```

---

### Step 10 — Delete MANY Records

```js
const r2 = await collection.deleteMany({ status: 'inactive' });
console.log(`${r2.deletedCount} docs deleted`);
```

---

## Quick Reference

| Operation     | Method                          |
|---------------|---------------------------------|
| Insert one    | `collection.insertOne({})`      |
| Insert many   | `collection.insertMany([])`     |
| Find one      | `collection.findOne({})`        |
| Find all      | `collection.find().toArray()`   |
| Update one    | `collection.updateOne({}, {})` |
| Update many   | `collection.updateMany({}, {})`|
| Delete one    | `collection.deleteOne({})`      |
| Delete many   | `collection.deleteMany({})`     |


```js

        // Insert ONE record.
        const result = await collection.insertOne({
            name: 'Meet Patel',
            age: 22,
            city: 'Surat',
            status: 'active'
        });
        console.log('Inserted ID:', result.insertedId);

        // Insert MANY records

        const users = [
            { name: 'Raj Shah', age: 21, city: 'Ahmedabad', status: 'active' },
            { name: 'Priya Mehta', age: 23, city: 'Vadodara', status: 'inactive' },
            { name: 'Amit Joshi', age: 25, city: 'Surat', status: 'active' }
        ];

        const manyResult = await collection.insertMany(users);
        console.log('Inserted Count:', manyResult.insertedCount);


        // Find ONE document by name

        const user = await collection.findOne(
            { name: 'Raj Shah' }
        );

        if (user) {
            console.log('Found:', user);
        } else {
            console.log('User not found.');
        }

        // Find ALL documents
        const users = await collection.find().toArray();
        console.log('All users:', users);

        Filter: find active users

        const active = await collection
            .find({ status: 'active' })
            .toArray();
        console.log('Active users:', active);


        // Users aged 18 to 25
        const results = await collection.find({ age: { $gt: 20 } }).toArray();
        console.log('Users aged: ', results);


        updateOne — update ONE record
        const r1 = await collection.updateOne(
            { name: 'Priya Mehta' },    // filter
            { $set: { city: 'Ahmedabad' } } // update
        );
        console.log(r1.matchedCount, r1.modifiedCount);

        const user = await collection.findOne(
            { name: 'Priya Mehta' }
        );
        console.log('Updated user:', user);

        // updateMany — update MULTIPLE records
        const r2 = await collection.updateMany(
            { city: 'Surat' },
            { $set: { status: 'active' } }
        );
        console.log(`\n\n${r2.modifiedCount} records updated`);

        const users = await collection.find().toArray();
        console.log('\n\nAll users:', users);

        // deleteOne — remove ONE record
        const r1 = await collection.deleteOne(
            { name: 'Meet Patel' }
        );
        console.log('\n\nDeleted:', r1.deletedCount);

        const users = await collection.find().toArray();
        console.log('\n\nAll users:', users);

        // deleteMany — remove MULTIPLE records
        const r2 = await collection.deleteMany(
            { status: 'inactive' }
        );
        console.log(`\n\n${r2.deletedCount} docs deleted`);

        const users = await collection.find().toArray();
        console.log('\n\nAll users:', users);
```