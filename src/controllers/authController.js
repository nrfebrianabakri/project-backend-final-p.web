import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js'; // prisma client
import { signToken } from '../config/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email atau password salah' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Email atau password salah' });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const me = async (req, res) => {
  res.json(req.user); // nanti diisi middleware auth
};
