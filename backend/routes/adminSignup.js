const Router = require('express').Router();
const { body, validationResult } = require('express-validator');
const prisma = require("../prismaTest");
const bcrypt = require("bcryptjs");

Router.post(
    "/",
    [
        body("username")
            .notEmpty()
            .withMessage("Username is empty"),
        body("password")
            .notEmpty()
            .withMessage("Password is empty")
            .isLength({ min: 6, max: 20 })
            .withMessage("Password must contain 6 characters or more")
            .isStrongPassword()
            .withMessage("Password not strong enough"),
    ],
    async (req, res, next) => {
        const { username, password } = req.body;

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array(),
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.admin.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            res.json({ success: true, message: "Signup successful" });
        } catch(err) {
            console.error("Error creating user:", err);
            res.status(500).json({ success: false, message: "signup failed" });
        }
    } 
);

module.exports = Router;


