import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { IUser, RegisterRequest, LoginRequest, UserResponse } from '../types/user.types';

// Register user
export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user: IUser = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const userResponse: UserResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      res.status(201).json(userResponse);
    }
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};

// Login user
export const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const userResponse: UserResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      res.json(userResponse);
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};

// Logout user
export const logout = (_req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
