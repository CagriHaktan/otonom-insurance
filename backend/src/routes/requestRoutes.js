const express = require('express');
const { requests } = require('../config/dataStore');

const router = express.Router();

function generatePrice(insuranceType) {
  const ranges = {
    'Traffic Insurance': [2500, 7500],
    'Vehicle Insurance': [6000, 22000],
    'Health Insurance': [9000, 35000],
    'Home Insurance': [1800, 9500],
    'Travel Insurance': [500, 4500],
    'Workplace Insurance': [8000, 50000]
  };

  const [min, max] = ranges[insuranceType] || [1500, 10000];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/', (req, res) => {
  res.json(requests);
});

router.post('/calculate', (req, res) => {
  const { insuranceType } = req.body;

  if (!insuranceType) {
    return res.status(400).json({ message: 'Insurance type is required.' });
  }

  const price = generatePrice(insuranceType);

  res.json({
    message: 'Quotation price calculated successfully.',
    price
  });
});

router.post('/', (req, res) => {
  const {
    customerName,
    email,
    phone,
    insuranceType,
    description,
    vehiclePlate,
    price
  } = req.body;

  if (!customerName || !email || !insuranceType || !price) {
    return res.status(400).json({
      message: 'Customer name, email, insurance type and price are required.'
    });
  }

  const newRequest = {
    id: requests.length + 1,
    customerName,
    email,
    phone: phone || '',
    insuranceType,
    description: description || '',
    vehiclePlate: vehiclePlate || '',
    status: 'Quote Accepted',
    policyStatus: 'Waiting Policy Creation',
    price: Number(price),
    createdAt: new Date().toISOString().slice(0, 10)
  };

  requests.push(newRequest);

  res.status(201).json({
    message: 'Quotation accepted and sent to policy process.',
    request: newRequest
  });
});

router.put('/:id', (req, res) => {
  const requestId = Number(req.params.id);
  const { status, policyStatus, price } = req.body;

  const request = requests.find((item) => item.id === requestId);

  if (!request) {
    return res.status(404).json({ message: 'Request not found.' });
  }

  if (status) request.status = status;
  if (policyStatus) request.policyStatus = policyStatus;
  if (price !== undefined) request.price = Number(price);

  res.json({
    message: 'Request updated successfully.',
    request
  });
});

router.delete('/:id', (req, res) => {
  const requestId = Number(req.params.id);
  const index = requests.findIndex((item) => item.id === requestId);

  if (index === -1) {
    return res.status(404).json({ message: 'Request not found.' });
  }

  requests.splice(index, 1);

  res.json({ message: 'Request deleted successfully.' });
});

module.exports = router;
