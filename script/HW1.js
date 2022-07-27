// exercise 1

for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0){
    console.log('FizBuz');
  } else if (i % 2 !== 0) {
    console.log('Buz');
  } else {
    console.log('Fiz');
  }
}


// exercise 2


function factorial(num) {
  let res = 1;
  for (let i = 2; i < num; i++) {
    res = res * i;
  }
  return res;
}
console.log(factorial(10));


// exercise 3


const sheetsInReamPaper = 500;
const consumptionPerWeek = 1200;
const weeksAmount = 8;

function calcMinPackOfPaper(reamPaper, weekConsumption, weeks) {
  let neededSheets = weekConsumption * weeks;
  let i = 0;
  while (i < neededSheets) {
    i = i + reamPaper;
  }
  return i / reamPaper;
}

console.log(calcMinPackOfPaper(sheetsInReamPaper, consumptionPerWeek, weeksAmount));


// exercise 4


const roomsOnFloor = 3;
const floors = 9;
const roomNumber = 456;

// const porch = ?
// const floor = ?

function calcEntranceAndFloor(amountRoomsOnFloor, amountFloors, apartmentNumber) {
  let amountRoomsOnPorch = amountFloors * amountRoomsOnFloor;
  let calcPorch = 1;
  let amountFloorsOnPorch;
  if (apartmentNumber > amountRoomsOnPorch) {
    while (apartmentNumber > amountRoomsOnPorch) {
      calcPorch = calcPorch + 1;
      amountRoomsOnPorch = amountRoomsOnPorch + (amountFloors * amountRoomsOnFloor);
    }
  }

  while (apartmentNumber < amountRoomsOnPorch) {
    amountRoomsOnPorch = amountRoomsOnPorch - amountRoomsOnFloor;
    if (apartmentNumber < amountRoomsOnPorch + 1) {
      amountFloorsOnPorch = amountFloors - 1;
    }
  }

  return {
    porch: calcPorch,
    floor: amountFloorsOnPorch,
  }
}


// exercise 5


console.log(calcEntranceAndFloor(roomsOnFloor, floors, roomNumber));

const medianNumber = 8;

for (let i = 1; i <= medianNumber; i++) {
  let res = '';
  const totalWidth = medianNumber * 2 - 1;
  const currentWidth = i * 2 - 1;
  const empty = totalWidth - currentWidth;

  for (let j = 0; j < totalWidth; j++) {
    if (j < empty / 2 || j >= empty / 2 + currentWidth) {
      res = res + '-';
    } else {
      res = res + '#';
    }
  }
  console.log(res);
}

for (let i = 1; i <= medianNumber; i++) {

  let res = '#';

  for (let j = 1; j < medianNumber; j++) {
    const s = j < i ? '#' : '-';
    res = `${s}${res}${s}`;
  }
  console.log(res);
}
