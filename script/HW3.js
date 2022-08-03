// class Employee {
//   constructor({id, name, surname, salary, workExperience, isPrivileges, gender}){
//     this.id = id;
//     this.name = name;
//     this.surname = surname;
//     this.salary = salary;
//     this.workExperience = workExperience;
//     this.isPrivileges = isPrivileges;
//     this.gender = gender;
//   }
//   getFullName() {
//     return `${this.surname} ${this.name}`
//   }
// }

function Employee({id, name, surname, salary, workExperience, isPrivileges, gender}) {
  this.id = id;
  this.name = name;
  this.surname = surname;
  this.salary = salary;
  this.workExperience = workExperience;
  this.isPrivileges = isPrivileges;
  this.gender = gender;
}

Employee.prototype.getFullName = function () {
  return `${this.surname} ${this.name}`
};

const employeeObj = new Employee(employeeArr[0]);

// exercise 1
console.log(employeeObj);


// exercise 2
console.log(employeeObj.getFullName());


// exercise 3
let createEmployeesFromArr = (arr) => {
   return arr.map((employee) => new Employee(employee));
};
const employeeConstructArr = createEmployeesFromArr(employeeArr);
console.log(employeeConstructArr);


// exercise 4
const getFullNamesFromArr = (arr) => {
  return arr.map((employee) => employee.getFullName());
};
console.log(getFullNamesFromArr(employeeConstructArr));


// exercise 5
const getMiddleSalary = (arr) => {
  return Math.round(arr
    .reduce((sum, employee) => sum + employee.salary, 0) / arr.length);
};

console.log(getMiddleSalary(employeeConstructArr));


// exercise 6
const getRandomEmployee = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

console.log(getRandomEmployee(employeeConstructArr));


// exercise 7
Object.defineProperty(employeeObj, 'fullInfo', {
  get() {
    return Object
      .keys(this)
      .map((key) => `${key} - ${this[key]}`)
      .join(', ');
  },
  set(value) {
    Object.keys(value).forEach(key => {
      if (key in this) this[key] = value[key];
    });
  }
});

employeeObj.fullInfo = {name: 'Вася', salary: 9000, email: 'ex@mail.ua'};

console.log(employeeObj.fullInfo);
