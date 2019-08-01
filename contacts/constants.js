// MODULE FOR CONSTANTS

const DELETE_ALL_BUTTON = 'delete-all-button';
const CLEAR_ALL_BUTTON = 'clear-button';
const FAVS_LIST = 'favs-list';
const CONTACTS_LIST = 'contacts-list';
const ADD_BUTTON = 'add-button';
const FIRST_NAME = 'first-name';
const LAST_NAME = 'last-name';
const IMAGE_PROFILE = 'profile-image';
const ADD_FORM_MAIN = 'add-form';

export const DOCUMENT_ELEMENTS = {
  FAVOURITES: {
    FAVS_LIST,
    CLEAR_ALL_BUTTON
  },
  CONTACTS: {
    CONTACTS_LIST,
    DELETE_ALL_BUTTON
  },
  ADD_FORM: {
    ADD_FORM_MAIN,
    ADD_BUTTON,
    FIRST_NAME,
    LAST_NAME,
    IMAGE_PROFILE
  }
};

// CONSTANTS FOR ID

const ID_LENGTH = 19;

export const ID_CONSTANTS = {
  ID_LENGTH
};

// TOP N ELEMENTS

export const NUMBER_TOP = 5;

// PREFIXES FOR CONTACTS IDs CONVENTION

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

// NUMBERS

export const NINE = 9;
export const ZERO = 0;
export const ONE = 1;
export const MINUS_ONE = -1;
export const MAX_NUMBER_OF_LIKES = 99;
export const MIN_NUMBER_OF_LIKES = 0;

// STRING NAMES

export const CONTACTS_SERVICE_OBJECT_NAME = 'ContactsService';

// TAGS

export const TAGS = {
  LIST_ITEM: 'li',
  DIV: 'div',
  BUTTON: 'button',
  IMAGE: 'img',
  INPUT: 'input',
  SPAN: 'span',
  PARAGRAPH: 'p'
};

// TYPES

export const TYPES = {
  CHECKBOX: 'checkbox'
};

// CALSSES

export const CALSSES = {
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
  DOES_NOT_EXIST: 'does not exist',
  NOT_INSTANCE: ' is not a good instance'
};


export const REGEX = {
  NAME: /^[A-Za-z0-9 ]+$/,
  URL: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ // eslint-disable-line
};


// HELPER CONSTANTS

export const EMPTY = '';
export const NOT_FOUND = -1;
