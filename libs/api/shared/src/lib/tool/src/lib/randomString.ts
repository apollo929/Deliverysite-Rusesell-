import { randomBytes } from 'crypto';
export const getRandomString = () => randomBytes(20).toString('hex');
