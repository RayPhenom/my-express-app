const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); 

const users = [
    {
        id: 1,
        username: 'ray_lumumba',
        password: '$2a$10$VrA0ZnOW9.YBQyRpvcy0BeStSHJDfkpW5pMLT4sP.GwW5p9ODb/O6' // hashed password 'password123'
    }
];

const JWT_SECRET = 'your_jwt_secret_key';


app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

 
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

  
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });


    res.json({ message: 'Login successful', token });
});


app.get('/api/protected', (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: 'Protected data', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
