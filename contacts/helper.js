import {
  ID_CONSTANTS,
  LIKES
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


export const isCountEqualToMax = person => person.likes === LIKES.MAX_NUMBER_OF_LIKES;


export const isCountEqualToMin = person => person.likes === LIKES.MIN_NUMBER_OF_LIKES;


export const createPersonInstance = obj => new Person(obj);


export const localStorageService = {
  saveToLocalStorage: (stringName, object) => {
    localStorage.setItem(stringName, JSON.stringify(object));
  },
  getFromLocalStorage: stringName => JSON.parse(localStorage.getItem(stringName))
};
