// exercise 1

const createCounter = () => {
  let counter = 0;

  return (num) => {
    counter += num;
    return counter;

  }
};

const counter = createCounter();
console.log(counter(3));
console.log(counter(5));
console.log(counter(228));

// exercise 2

const createText = () => {
  let text = '';

  return (value) => {
    if (typeof value === 'string') {
      text += value;
      return text.split('').sort().join('');
    } else {
      return text = '';
    }
  }
};

const stringArg = createText();

console.log(stringArg('66'));
console.log(stringArg({0: 22}));
console.log(stringArg('jghj'));
console.log(stringArg());
console.log(stringArg('lkjyt'));
console.log(stringArg('jghj'));
console.log(stringArg('wfwefwv'));

// exercise 3

const getTimeEnabled = () => {
  let time = null;

  return () => {
    if (time) {
      console.log(Math.round((Date.now() - time) / 1000));
    } else {
      console.log('Enabled');
    }
    time = Date.now();
  }

};

let getTime = getTimeEnabled();

getTime();// 'Enabled'

setTimeout(() => {
  getTime();

  setTimeout(() => {
    getTime();

    setTimeout(() => {
      getTime();

      setTimeout(() => {
        getTime();
      }, 1000);

    }, 7000);

  }, 3000);

}, 2000);

// exercise 4

// const timer = time => {
//   let t = time;
//
//   const showTime = (t) => {
//     const m = `0${Math.floor(t / 60)}`.slice(-2);
//     const s = `0${t % 60}`.slice(-2);
//     console.log(`${m}:${s}`);
//   };
//
//   showTime(t);
//
//   let intervalId = setInterval(() => {
//     t--;
//     if (!t) {
//       console.log('Timer End');
//       clearInterval(intervalId);
//     } else {
//       showTime(t);
//     }
//   }, 1000);
// };
//
// timer(3);



const timer = (time) => {
  if (!time) {
    console.log('Timer End');
    return;
  }

  const m = `0${Math.floor(time / 60)}`.slice(-2);
  const s = `0${time % 60}`.slice(-2);
  console.log(`${m}:${s}`);

  setTimeout(() => {
    timer(time - 1);
  }, 1000);
};

timer(3);
