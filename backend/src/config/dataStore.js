const bcrypt = require('bcryptjs');

const users = [
  { id: 1, name: 'Admin User', email: 'admin@otonom.com', password: bcrypt.hashSync('123456', 10), role: 'admin', createdAt: '2026-06-15' },
  { id: 2, name: 'Demo Customer', email: 'customer@otonom.com', password: bcrypt.hashSync('123456', 10), role: 'customer', createdAt: '2026-06-15' }
];

const requests = [
  {
    id: 1,
    customerName: 'Demo Customer',
    email: 'customer@otonom.com',
    phone: '+90 543 430 30 10',
    insuranceType: 'Traffic Insurance',
    description: 'Traffic insurance quotation request.',
    vehiclePlate: '34 ABC 365',
    status: 'Quote Prepared',
    policyStatus: 'Waiting Customer Approval',
    price: 4200,
    createdAt: '2026-06-15'
  }
];

module.exports = { users, requests };
