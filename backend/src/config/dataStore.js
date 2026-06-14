const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@otonom.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin'
  },
  {
    id: 2,
    name: 'Demo Customer',
    email: 'customer@otonom.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'customer'
  }
];

const requests = [
  {
    id: 1,
    customerName: 'Demo Customer',
    email: 'customer@otonom.com',
    insuranceType: 'Traffic Insurance',
    description: 'Traffic insurance quotation request.',
    status: 'Pending'
  }
];

module.exports = { users, requests };
