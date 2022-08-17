// exercise 1

const searchCandidatesByPhoneNumber = (phone) => {
  return candidatesArr
    .filter(candidate => candidate.phone.replace(/[^\d]/g, '').includes(phone.replace(/[^\d]/g, '')));
};

console.log(searchCandidatesByPhoneNumber('43'));

console.log(searchCandidatesByPhoneNumber('+1(869)40'));

console.log(searchCandidatesByPhoneNumber('42'));

console.log(searchCandidatesByPhoneNumber('+1(869)408-39-82'));

// exercise 2

const getCandidateById = (id) => {
  const pad = (str) => `0${str}`.slice(-2);
  const candidate =  candidatesArr.find(candidate => candidate._id === id);
  if (!candidate) return null;
  const date = new Date(candidate.registered);
  return {
    ...candidate,
    registered: `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${pad(date.getFullYear())}`,
  }
};

console.log(getCandidateById('5e216bc9a6059760578aefa4'));

// exercise 3

const sortCandidatesArr = (sortBy) => {
  const arr = [...candidatesArr];
  arr.sort((a, b) => {
    const bal = (c) => parseFloat(c.balance.replace(/[$,]/g, ''));
    return sortBy === 'asc' ? bal(a) - bal(b) : sortBy === 'desc' ? bal(b) - bal(a) : 0;
  });
  return arr;
};

console.log(sortCandidatesArr('asc'));
// отсортирует по-возростанию и вернет отсортированный массив

console.log(sortCandidatesArr('desc'));
// отсортирует по-убыванию и вернет отсортированный массив

console.log(sortCandidatesArr());
// не будет сортировать, а просто вернет первоначальный массив

// exercise 4

const getEyeColorMap = () => {
  return candidatesArr.reduce((res, candidate) => {
    if(!res[candidate.eyeColor]) res[candidate.eyeColor] = [];
    res[candidate.eyeColor].push(candidate);
    return res;
  }, {});
};

console.log(getEyeColorMap());
