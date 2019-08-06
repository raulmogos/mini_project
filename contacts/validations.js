import { REGEX, MESSAGES } from './constants';


export const validateName = (name) => {
  const regex = REGEX.NAME;
  if (regex.test(name)) return;
  throw new Error(MESSAGES.ERROR_NAME);
};

export const validateImageUrl = (imageUrl) => {
  const pattern = REGEX.URL;
  if (pattern.test(imageUrl)) return;
  throw new Error(MESSAGES.ERROR_URL);
};
