import {
  DOCUMENT_ELEMENTS,
  ZERO
} from './constants';
import {
  geInput,
  getElementById
} from './html-helper';
import {
  generateUniqueID,
} from './helper';
import {
  validateName,
  validateImageUrl
} from './validations';


export const getTheNewPerson = () => {
  const firstName = geInput(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.FIRST_NAME));
  validateName(firstName);
  const lastName = geInput(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.LAST_NAME));
  validateName(lastName);
  const image = geInput(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.IMAGE_PROFILE));
  validateImageUrl(image);
  return {
    id: generateUniqueID(),
    firstName,
    lastName,
    image,
    likes: ZERO,
    isChecked: false
  };
};
