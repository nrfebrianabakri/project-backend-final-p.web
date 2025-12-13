import { verifyToken } from '../config/jwt.js';
import prisma from '../../prisma/client.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token dibutuhkan' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: 'User tidak ditemukan' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};
