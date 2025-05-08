const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());



const users = [
    { email: 'piyxsh@gmail.com', password: 'hello123'}
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        return res.json({ message: 'Logged in successfully' });
    } else {
        return res.status(401).json({ error: 'Login failed' });
    }
});

app.listen(PORT, () => {
    console.log("Server started!");
});
