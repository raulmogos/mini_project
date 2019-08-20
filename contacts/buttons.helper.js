import {
  DOCUMENT_ELEMENTS,
} from './constants';
import {
  getInputValue,
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
  const firstName = getInputValue(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.FIRST_NAME));
  validateName(firstName);
  const lastName = getInputValue(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.LAST_NAME));
  validateName(lastName);
  const image = getInputValue(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.IMAGE_PROFILE));
  validateImageUrl(image);
  return {
    firstName,
    lastName,
    image,
    id: generateUniqueID(),
    likes: 0,
    isChecked: false
  };
};
