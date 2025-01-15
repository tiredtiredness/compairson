import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../configs/db.js';

const createToken = user => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    const token = createToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Unable to register user' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = createToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Unable to login user' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch user profile' });
  }
};
