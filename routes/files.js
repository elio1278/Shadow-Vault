const express = require('express');
const jwt = require('jsonwebtoken');
const File = require('../models/file');
require('dotenv').config(); 
const router = express.Router();

function encodeToBase64(id) {
    return Buffer.from(id.toString()).toString('base64');
}

function decodeFromBase64(base64Id) {
    return Buffer.from(base64Id, 'base64').toString('utf8');
}

function isBase64(str) {
    try {
        return Buffer.from(str, 'base64').toString('base64') === str && str.length % 4 === 0;
    } catch (err) {
        return false;
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        let decoded = null;
        try {
            decoded = jwt.verify(token, 'secretkey');
        } catch (error) {
            try {
                decoded = jwt.decode(token);
            } catch (decodingError) {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }

        if (decoded && decoded.role === 'admin') {
            req.user = { role: decoded.role };
            console.log("User Role:", req.user.role);
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden - You are not an admin' });
        }
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ message: 'Invalid token' });
    }
}

router.get('/:fileId', authenticateToken, async (req, res) => {
    try {
        const fileId = req.params.fileId;

        const file = await File.findById(fileId);
        if (!file) return res.status(404).json({ message: 'File not found' });

        const flag = process.env.FLAG; 
        res.json({ filename: file.filename, data: `Content of the file with flag: ${flag}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid Id, Try again' });
    }
});

router.post('/upload', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - You are not an admin' });
    }

    try {
        const { filename, data } = req.body;
        const newFile = new File({ filename, data });
        const savedFile = await newFile.save();
        const base64FileId = encodeToBase64(savedFile._id);

        res.json({ message: 'File uploaded successfully', fileId: base64FileId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
