const authService = require('../services/auth.service');

const authController = {
    register : async (req, res, next) => {
        try {
            const newUser = await authService.registerUser(req.body);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ message: 'Email is already in use.' });
            }
            next(error);
        }
    },

    login : async (req, res, next) => {
        try {
            const { user, token } = await authService.loginUser(req.body);

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000 
            });

            res.status(200).json({ user });

        } catch (error) {
            res.status(401).json({ message: error.message });
            next(error);
        }
    },

    logout : (req, res) => {
        // Clear the cookie on logout
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'Logout successful' });
    },

    getProfile : (req, res) => {
        res.status(200).json({ user: req.user });
    }
};

module.exports = authController;