// exercise 1

let removeUser = (arr, i) => arr.splice(i, 1);

const arr = ['Vasya', 'Petya', 'Alexey'];
removeUser(arr, 1);
console.log(arr);

// exercise 2

let getAllKeys = (obj) => Object.keys(obj);

const obj1 = { name: 'Vasya', age: 1};
console.log(getAllKeys(obj1));

// exercise 3

let getAllValues = (obj) => Object.values(obj);

const obj2 = { name: 'Vasya', age: 1};
console.log(getAllValues(obj2));

// exercise 4

const obj = {
  id: 3,
  name: 'Vasya'
};

const secondObj = {
  id: 4,
  name: 'Katya'
};

const arrCandidates = [
  {
    id: 1,
    name: 'Kolya'
  },
  {
    id: 2,
    name: 'Petya'
  },
];

let insertIntoArr = (obj, id) => {
  const i = arrCandidates.findIndex((el)=> el.id === id);
  if (i < 0) {
    arrCandidates.push(obj);
  } else {
    arrCandidates.splice(i, 0, obj);
  }
};

insertIntoArr(obj, 2);
console.log(arrCandidates);

insertIntoArr(secondObj, 1);
console.log(arrCandidates);

// exercise 5

class Candidate {
  constructor(candidate) {
    this.address = candidate.address;
    this.name = candidate.name;
  }

  get state() {
    return this.address.split(',')[2].trim();
  }
}

const candidate = new Candidate(candidatesArr[0]);
console.log(candidate.state);

// exercise 6

let getCompanyNames = () => {

  // let res = [];
  // candidatesArr.forEach(candidate => {
  //   if (!res.includes(candidate.company)) {
  //     res.push(candidate.company);
  //   }
  // });
  // return res;

  return Object.keys(candidatesArr.reduce((res, candidate) => {
    res[candidate.company] = 1;
    return res;
  }, {}));
};

console.log(getCompanyNames());

// exercise 7

const getUsersByYear = (year) => {
  return candidatesArr
    .filter(candidate => new Date(candidate.registered).getFullYear() === year)
    .map(candidate => candidate._id)
};

console.log(getUsersByYear(2017));

// exercise 8


const getCandidatesByUnreadMsg = (messages) => {
  return candidatesArr
    .filter(candidate => +candidate.greeting.match(/\d+/)[0] === messages)
    .map(candidate => new Candidate(candidate));
};

console.log(getCandidatesByUnreadMsg(8));


// exercise 9

const getCandidatesByGender = (gender) => {
  return candidatesArr
    .filter(candidate => candidate.gender === gender)
    .map(candidate => new Candidate(candidate));
};


console.log(getCandidatesByGender('male'));

// exercise 10

// reduce()

Array.prototype.reduce1 = function (cb, initAccum) {
  let accum = initAccum;
  for (let i = 0; i < this.length; i++) {
    accum = cb(accum, this[i], i, this);
  }
  return accum;
};

const ex = [1, 6, 4, 6];

console.log(ex.reduce1((sum, el) => sum + el, 0));


// join()

Array.prototype.join1 = function (separator = '') {
  let str = '';
  for (let i = 0; i < this.length; i++) {
    if (i) str += separator;
    str += ([null, undefined].includes(this[i]) ? '' : String(this[i]));
  }
  return str;
};

const ex1 = [1, 6, null, 6, 'ffvvf'];

console.log(ex1.join1(', '));

// forEach()

Array.prototype.forEach1 = function (cb, thisArg) {
  for (let i = 0; i < this.length; i++) {
    cb.call(thisArg, this[i], i, this);
  }
};

const ex2 = ['forEach1', 'forEach2'];

ex2.forEach1(function (el) { console.log(el, this); }, {a: 1});

// find()

Array.prototype.find1 = function (cb, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (cb.call(thisArg, this[i], i, this)) return this[i];
  }
};

const ex3 = ['find1', 'find2'];

console.log(ex3.find1(function (el) {
  return el === 'find2';
}, {a: 1}));
