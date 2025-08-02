const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

const mockUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", password: "password123", donations: 2450 },
    { id: 2, name: "Sarah Chen", email: "sarah@example.com", password: "password123", donations: 1890 },
    { id: 3, name: "Mike Rodriguez", email: "mike@example.com", password: "password123", donations: 3120 }
];

app.get("/api/users", (req, res) => {
    res.json(mockUsers);
});

app.get("/api/user", (req, res) => {
    const { email, password } = req.query;
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "Invalid credentials" });
    }
});

// 🔥 New endpoint for /intern
app.get("/intern", (req, res) => {
    res.json({
        name: "Sivaram",
        referralCode: "siva2025",
        donationsRaised: 2500
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
