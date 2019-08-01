import {
  ID_CONSTANTS,
  EMPTY,
  ZERO,
  ONE,
  MINUS_ONE,
  MAX_NUMBER_OF_LIKES,
  MIN_NUMBER_OF_LIKES
} from './constants';
import {
  Person
} from './entities';


// id generator
// returns a string
export const generateUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}-${s4()}-${s4()}-${s4()}`;
};


// we know that the last ID_LENGTH characters in htmlId related to a
// person object is the id the of the the person object
export const getPersonIdByHTMLElementId = htmlElementId => htmlElementId
  .slice(htmlElementId.length - ID_CONSTANTS.ID_LENGTH);


export const sortArrayAlphabetically = (arrayOfContacts) => {
  arrayOfContacts.sort((person1, person2) => {
    if (person1.fullName > person2.fullName) return ONE;
    if (person1.fullName < person2.fullName) return MINUS_ONE;
    return ZERO;
  });
};


export const sortArrayByLikes = (arrayOfContacts) => {
  // arrayOfContacts - array of objects person
  arrayOfContacts.sort((p1, p2) => p2.likes - p1.likes);
};


export const isCountEqualToMax = person => person.likes === MAX_NUMBER_OF_LIKES;


export const isCountEqualToMin = person => person.likes === MIN_NUMBER_OF_LIKES;


export const isUndefined = item => item === undefined;


export const isEmpty = input => input === EMPTY;


export const isNull = input => input === null;


export const isZero = input => input === ZERO;


export const createPersonInstance = obj => new Person(obj);


export const localStorageServie = {
  saveToLocalStorage: (stringName, object) => {
    localStorage.setItem(stringName, JSON.stringify(object));
  },
  getFromLocalStorage: stringName => JSON.parse(localStorage.getItem(stringName))
};
