import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const loginService = (email) => User.findOne({ email }).select('+password');

export const genereteTokenService = (id) => jwt.sign({id}, process.env.SECRET_JWT, {expiresIn: 10});