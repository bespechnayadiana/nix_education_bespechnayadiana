// exercise 1

class Student {
  static _id = 1;
  static _list = [];

  constructor(enrolle) {
    this.id = Student._id++;
    this.name = enrolle.name;
    this.surname = enrolle.surname;
    this.ratingPoint = enrolle.ratingPoint;
    this.schoolPoint = enrolle.schoolPoint;
    this.isSelfPayment = true;
    Student._list.push(this);
    Student.recalculateSelfPayment();
  }

  static get listOfStudents() {
    return this._list;
  }

  static recalculateSelfPayment() {
    Student._list.sort((a, b) => {
      if (a.ratingPoint === b.ratingPoint) {
        return b.schoolPoint - a.schoolPoint;
      }
      return b.ratingPoint - a.ratingPoint;
    });
    Student._list.forEach((s, i) => {
      s.isSelfPayment = i >= 5 || s.ratingPoint < 800;
    });
  }
}

studentArr.forEach((s) => new Student(s));

console.log(Student.listOfStudents);


// exercise 2

class CustomString {
  reverse(str) {
    return str.split('').reverse().join('');
  }

  ucFirst(str) {
    // return str[0].toUpperCase() + str.slice(1);
    return str.replace(/^./, str => str.toUpperCase());
  }

  ucWords(str) {
    // return str.split(' ').map(w => this.ucFirst(w)).join(' ');
    return str.replace(/(^|\s)./g, s => s.toUpperCase());
  }
}

const myString = new CustomString();

console.log(myString.reverse('qwerty'));
console.log(myString.ucFirst('qwerty'));
console.log(myString.ucWords('qwerty qwerty qwerty'));

// exercise 3

class Validator {
  checkIsEmail(val) {
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(val);
  }

  checkIsDomain(val) {
    return /^(([a-zA-Z]{1})|([a-zA-Z]{2})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/.test(val);
  }

  checkIsDate(val) {
    return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(val)
  }

  checkIsPhone(val) {
    return /^\+38(-|\s)?\(?0[0-9]{2}\)?(-|\s)?[0-9]{3}(-|\s)?[0-9]{2}(-|\s)?[0-9]{2}$/.test(val)
  }
}

const validator = new Validator();

console.log(validator.checkIsEmail('vasya.pupkin@gmail.com'));
console.log(validator.checkIsDomain('google.com'));
console.log(validator.checkIsDate('30.11.2019'));
console.log(validator.checkIsPhone('+38 (066) 937-99-92'));
