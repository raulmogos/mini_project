
export const DOCUMENT_ELEMENTS = {
  FAVOURITES: {
    FAVS_LIST: 'favs-list',
    CLEAR_ALL_BUTTON: 'clear-button'
  },
  CONTACTS: {
    CONTACTS_LIST: 'contacts-list',
    DELETE_ALL_BUTTON: 'delete-all-button'
  },
  ADD_FORM: {
    ADD_FORM_MAIN: 'add-form',
    ADD_BUTTON: 'add-button',
    FIRST_NAME: 'first-name',
    LAST_NAME: 'last-name',
    IMAGE_PROFILE: 'profile-image'
  }
};


export const ID_CONSTANTS = {
  ID_LENGTH: 19
};

export const NUMBER_TOP = 3;


export const PREFIXES_ID_CONTACTS = {
  LIST_ITEM: 'li-',
  PLUS_BUTTON: 'plus-button-',
  MINUS_BUTTON: 'minus-button-',
  COUNTER: 'count-',
  IMAGE: 'image-',
  CHECKBOX: 'checkbox-',
  FULL_NAME: 'full-name-',
  TRASH: 'trash-'
};


export const LIKES = {
  MAX_NUMBER_OF_LIKES: 99,
  MIN_NUMBER_OF_LIKES: 0
};


export const CONTACTS_SERVICE_OBJECT_NAME = 'ContactsService';


export const TAGS = {
  LIST_ITEM: 'li',
  DIV: 'div',
  BUTTON: 'button',
  IMAGE: 'img',
  INPUT: 'input',
  SPAN: 'span',
  PARAGRAPH: 'p'
};


export const TYPES = {
  CHECKBOX: 'checkbox'
};


export const CLASSES = {
  PERSON_FIELD: 'person-field',
  FAVS_COUNT: 'favs-count',
  AVATAR: 'avatar',
  FULL_NAME: 'full-name',
  TRASH: 'trash',
  MARGIN_RIGHT: 'margin-right',
  ALIGN_CENTER: 'align-center'
};

export const SYMBOLS = {
  PLUS: '+',
  MINUS: '-'
};

export const CUSTOMS = {
  PLUS_BUTTON: 'plus-button-custom',
  MINUS_BUTTON: 'minus-button-custom',
  TRASH: 'trash-custom',
  CHECKBOX: 'checkbox-custom'
};

export const ALT = {
  PIC: 'pic',
  TRASH: 'trash'
};

export const IMAGES = {
  TRASH: 'images/trash-1.png'
};

export const MESSAGES = {
  DELETE_ALL: 'Delete All',
  DELETE_ALL_PREFIX: 'Delete All ',
  ARE_YOU_SURE: 'ARE YOU SURE YOU WANT TO DO THIS ?',
  ERROR_NAME: 'Your name contains special characters',
  ERROR_URL: 'Your image is not an url',
  ADDED_SUCCESSFULLY_SUFIX: ' was added successfully',
};


export const REGEX = {
  NAME: /^[A-Za-z0-9 ]+$/,
  URL: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ // eslint-disable-line
};


export const UTILS = {
  EMPTY_STRING: '',
  NOT_FOUND: -1
};
