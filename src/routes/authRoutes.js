import express from 'express';
import { register, login, me, refresh } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { registerSchema,  loginSchema } from '../validators/authValidator.js';
import { validateBody } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/me', authenticate, me);
router.post('/refresh', refresh);


export default router;
