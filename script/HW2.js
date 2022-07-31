// exercise 1

const citiesAndCountries = {
  'Киев': 'Украина',
  'Нью-Йорк': 'США',
  'Амстердам': 'Нидерланды',
  'Берлин': 'Германия',
  'Париж': 'Франция',
  'Лиссабон': 'Португалия',
  'Вена': 'Австрия',
};

// variant 1

const res = [];
for (let city in citiesAndCountries) {
  res.push(city + ' - это ' + citiesAndCountries[city]);
}
console.log(res);

// variant 2

console.log(Object
  .keys(citiesAndCountries)
  .map((city) => `${city} - это ${citiesAndCountries[city]}`));


// exercise 2

// variant 1

function getArray(amount){
  const res = [];
  let sub = [];
  for (let i = 1; i <= amount; i++) {
    sub.push(i);
    if (sub.length === 3) {
      res.push(sub);
      sub = [];
    }
  }
  console.log(res)
}

getArray(9);

// variant 2

function getArray1(amount){
  const res = [];
  for (let i = 1; i <= amount; i+=3) {
    res.push([i, i + 1, i + 2]);
  }
  console.log(res)
}

getArray1(12);


// exercise 3

const namesOfDays = {
  ua: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', ' Субота', 'Неділя'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
};


  function getNameOfDay(){
    const lang = 'en';
    const day = 7;
    console.log(namesOfDays[lang][day - 1])
  }

getNameOfDay();


// exercise 4

let numbers = [19, 5, 42, 2, 77];

function sumMinNum() {
  let firstMinNum = Math.min.apply(null, numbers);
  let indexFirstNum = numbers.indexOf(firstMinNum);
  numbers.splice(indexFirstNum, 1);
  let secondMinNum = Math.min.apply(null, numbers);
  return firstMinNum + secondMinNum;
}

console.log(sumMinNum());

// exercise 5

let arr = [1, 1, 1, 0, 0, 1];
let newString = arr.join('');
newString = parseInt(newString, 2);
console.log(newString);
