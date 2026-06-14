const express = require('express');
const { requests } = require('../config/dataStore');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(requests);
});

router.post('/', (req, res) => {
  const { customerName, email, insuranceType, description } = req.body;

  if (!customerName || !email || !insuranceType) {
    return res.status(400).json({ message: 'Customer name, email and insurance type are required.' });
  }

  const newRequest = {
    id: requests.length + 1,
    customerName,
    email,
    insuranceType,
    description: description || '',
    status: 'Pending'
  };

  requests.push(newRequest);

  res.status(201).json({
    message: 'Insurance request submitted successfully.',
    request: newRequest
  });
});

router.put('/:id', (req, res) => {
  const requestId = Number(req.params.id);
  const { status } = req.body;

  const request = requests.find((item) => item.id === requestId);

  if (!request) {
    return res.status(404).json({ message: 'Request not found.' });
  }

  request.status = status || request.status;

  res.json({
    message: 'Request status updated successfully.',
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
