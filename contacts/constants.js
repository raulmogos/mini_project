// MODULE FOR CONSTANTS

const DELETE_ALL_BUTTON = document.getElementById('delete-all-button');
const CLEAR_ALL_BUTTON = document.getElementById('clear-button');
const FAVS_LIST = document.getElementById('favs-list');
const CONTACTS_LIST = document.getElementById('contacts-list');
const ADD_BUTTON = document.getElementById('add-button');
const FIRST_NAME = document.getElementById('first-name');
const LAST_NAME = document.getElementById('last-name');
const IMAGE_PROFILE = document.getElementById('profile-image');

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
    ADD_BUTTON,
    FIRST_NAME,
    LAST_NAME,
    IMAGE_PROFILE
  }
};

// CONSTANTS FOR ID

const NO_OF_NUMBERS = 4;
const NO_OF_CHARS = 4;
const ID_LENGTH = NO_OF_NUMBERS + NO_OF_CHARS;

export const ID_CONSTANTS = {
  NO_OF_NUMBERS,
  NO_OF_CHARS,
  ID_LENGTH
};

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

export const ALPHABET_ARRAY = ('abcdefghijklmnopqrstuvwxyz').split('');

// NUMBERS

export const NINE = 9;
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
  SPAN: 'span'
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
  MARGIN_RIGHT: 'margin-right'
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
