export const generateUniqueID = () => {
  const finalArray = [];
  const getRandChar = () => {
    const numbers = [];
    for (let i = 97; i < 123; i++) {
      numbers.push(i);
    }
    const rand = Math.floor(Math.random() * 100) % 26;
    return String.fromCharCode(numbers[rand]);
  };
  // suffle may be implemented -> TODO
  const MAX_NUMBER = 3;
  for (let i = 0; i < MAX_NUMBER; i++) {
    const number = (Math.floor(Math.random() * 10)).toString(10);
    const char = getRandChar();
    finalArray.push(number);
    finalArray.push(char);
  }
  let arr = '';
  finalArray.forEach((item) => {
    arr += item;
  });
  return arr;
};
