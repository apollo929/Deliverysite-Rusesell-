import { randomBytes } from 'crypto';
export const generateToken = () => randomBytes(20).toString('hex');
