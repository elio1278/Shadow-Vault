const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [
    { username: 'user1', password: 'password123', role: 'user' },
    { username: 'admin', password: 'adminpassword', role: 'admin' }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

module.exports = router;
