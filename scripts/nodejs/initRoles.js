const Role = require('../../src/models/roleModel');
const db = require('../../database');

const rolesToInsert = [
    { name: 'Manager' },
    { name: 'Client' },
    { name: 'Livreur' },
];

Role.insertMany(rolesToInsert)
    .then((roles) => {
        console.log('Roles inserted successfully:', roles);
    })
    .catch((err) => {
        console.error('Error inserting roles:', err);
    })
    .finally(() => {
        db.close();
    });