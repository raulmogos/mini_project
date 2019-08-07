import { REGEX, MESSAGES } from './constants';
import {
  ValidationError
} from './exceptions';


export const validateName = (name) => {
  const regex = REGEX.NAME;
  if (regex.test(name)) return;
  throw new ValidationError(MESSAGES.ERROR_NAME);
};

export const validateImageUrl = (imageUrl) => {
  const pattern = REGEX.URL;
  if (pattern.test(imageUrl)) return;
  throw new ValidationError(MESSAGES.ERROR_URL);
};
