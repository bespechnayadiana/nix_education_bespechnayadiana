const express = require('express');
const router  = express.Router();

const { loginUser, registerUser } = require('../services/auth');

router.post('/login', async (req, res) => {
  const { status, body } = await loginUser(req.body);
  res.status(status).json(body);
});

router.post('/register', async (req, res) => {
  const { status, body } = await registerUser(req.body);
  res.status(status).json(body);
});

module.exports = router;
