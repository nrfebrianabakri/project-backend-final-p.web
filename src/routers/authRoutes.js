import express from 'express';
import { register, login, me } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import { validateBody } from '../middleware/validateMiddleware.js'; // buat helper Joi

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/me', authMiddleware, me);

export default router;
