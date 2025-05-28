const jwt = require("jsonwebtoken");
const Router = require("express").Router();
const prisma = require("../prismaTest");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

Router.post(
    "/",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req, res) => {
        const { username, password } = req.body;
        const user = await prisma.admin.findUnique({
            where: {
                username,
            },
        });

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array(),
            });
        }

        // Add error messages later for user to visually see
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate Password
        const comparison = await bcrypt.compare(password, user.password);
        if (!comparison) {
            return res.status(403).json({ message: "Invalid Password" });
        }

        jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) return res.status(403).json({ message: "Error when signing token" });

                res.json({
                    message: `${user.username} logged in`,
                    user,
                    token,
                });
            }
        )
    }
)

module.exports = Router;