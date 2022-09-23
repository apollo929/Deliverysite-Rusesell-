import { UserInputError } from 'apollo-server-express';
export class UserError extends UserInputError {
  constructor(
    message = 'Sorry, something went wrong! We are already working on it.',
  ) {
    super(message);
  }
}
