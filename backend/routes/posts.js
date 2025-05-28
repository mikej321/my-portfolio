const Router = require('express').Router();
const prisma = require('../prismaTest');
const { body, validationResult } = require('express-validator');
require("dotenv").config();

const authenticateToken = require('../middleware/authenticate');

Router.post(
    "/add_blog",
    [
        body("title")
            .notEmpty()
            .withMessage("Please add a title to identify the blog")
            .isLength({ min: 2, max: 40 }),
        body("content")
            .notEmpty()
            .withMessage("Please add content to your blog")
    ],
    authenticateToken,
    async (req, res) => {
        const {
            title,
            content
        } = req.body;

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array()
            });
        }

        if (!title) {
            return res
                .status(403)
                .json({ message: "Please enter a title before continuing" });
        } else if (!content) {
            return res
                .status(403)
                .json({ message: "Please enter content before continuing" })
        }

        try {
            const newBlog = await prisma.article.create({
                data: {
                    title,
                    content,
                    adminId: req.user.id
                },
                include: {
                    admin: true,
                },
            });

            res.json({
                newBlog,
            })
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: "Error creating blog" });
        }
    }
)

Router.get('/get_blogs', async (req, res, next) => {
    try {
        const blogs = await prisma.article.findMany({
            select: {
                articleId: true,
                title: true,
                content: true
            },
            orderBy: {
                articleId: "desc"
            }
        });

        res.json({
            blogs,
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Error retrieving blogs",
        })
    }
})

module.exports = Router;