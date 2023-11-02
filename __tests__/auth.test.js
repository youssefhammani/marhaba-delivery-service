const User = require('../src/models/userModel');
const authController = require('../src/controllers/authController');

const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};

describe('Auth Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Corrected the function call to clear all mocks
    });

    it('Should return status 400 if email is not provided', async () => {
        const req = {
            body: {
                email: '',
                password: 'password123',
            },
        };

        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Bad Request', // Corrected the spelling of 'error'
            message: 'Email is required',
        });
    });

    it('Should return status 400 if password is not provided', async () => {
        const req = {
            body: {
                email: 'test@gmail.com',
                password: '',
            },
        };

        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Bad Request', // Corrected the spelling of 'error'
            message: 'Password is required',
        });
    });

    it('Should return status 400 if user is not found', async () => {
        const req = {
            body: {
                email: 'test@gmail.com',
                password: 'password123',
            },
        };

        // Mocking User.findOne to resolve with null (no user found)
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        await authController.login(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' }); // Optional: Check if findOne was called with the correct parameters

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Bad Request', // Corrected the spelling of 'error'
            message: 'User not found',
        });

        jest.restoreAllMocks(); // Restore all mocks to their original state
    });
});
