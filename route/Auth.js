const express = require('express');
const authRouter = express.Router();
const User = require("../module/schema");
const bcrypt = require('bcrypt');
authRouter.use(express.json());
authRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        console.log(req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword, role });
        await newUser.save();
        console.log(newUser)
        res.json({ message: "Signed up successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const jwt = require("jsonwebtoken");

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Incorrect password!" });
        }

        // Create token
        const token = jwt.sign({ id: user._id }, "yourSecretKey", { expiresIn: "1h" });

        res.json({
            message: `${user.name} has logged in successfully`,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, "yourSecretKey", (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.userId = decoded.id;
        next();
    });
};

authRouter.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Fetch user error:", error);
        res.status(500).json({ message: error.message });
    }
});
authRouter.get("/alluser", async (req, res) => {
    try {
        const users = await User.findById();
        res.json(users);
    } catch (error) {
        console.error("Fetch users error:", error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = authRouter ;