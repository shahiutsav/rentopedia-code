const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "This is sample id",
            url: "profilepicUrl",
        },
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    });
});
