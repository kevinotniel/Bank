'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const user = 'Sarah Smith';
const username = user
  .toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('');
console.log(username);

const createUsername = function (name) {
  const username = name
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  return username;
};

const createUserForEach = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserForEach(accounts);
console.log(accounts);

// console.log(createUsername('Steven Thomas Williams'));

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const balanceDisplayMovements = acc => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);
  // acc.balance = balance

  labelBalance.textContent = `${acc.balance} €`;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
         <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div> 
            <div class="movements__value">${mov}€</div>
         </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCoppied = dogsJulia.concat();
  dogsJuliaCoppied.splice(-2);

  const dogs = dogsJuliaCoppied.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    console.log(
      dog < 3
        ? `Dog number ${i + 1} is an adult and is ${dog} years old`
        : `Dog number ${i + 1} is still a puppy 🐶`
    );
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const usdToEuro = 1.1;

// const movementEuro = movements.map(function (mov) {
//   return mov * usdToEuro;
// });
const movementEuro = movements.map(mov => mov * usdToEuro);

console.log(movements);
console.log(movementEuro);

const movementEurofor = [];
for (const mov of movements) movementEurofor.push(mov * usdToEuro);
console.log(movementEurofor); 

const mapMovements = movements.map(
  (mov, i) =>
    ` Movement:  ${i + 1}: ${
      mov > 0 ? `You deposit` : `You withdrew`
    } ${Math.abs(mov)}`
);

console.log(mapMovements);

movements.forEach(function (move, i) {
  if (move > 0) {
    console.log(`Movement ${i + 1}: You deposit ${move}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
  }
});
console.log(movements);
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);

const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration ${i}: ${acc} + ${cur} `);
  return acc + cur;
}, 0);
console.log(balance);

let sum = 0;
for (const acc of movements) sum += acc;
console.log(sum);

const balanceMax = movements.reduce((acc, cur) => {
  if (acc > cur) {
    console.log(acc);
    return acc;
  } else {
    console.log(cur);
    return cur;
  }
});
console.log(balanceMax);

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income}€`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((mov, i, arr) => {
      return mov >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest}€`;
};

// Event Handler

const updateUI = function (acc) {
  displayMovements(acc);

  balanceDisplayMovements(acc);

  calcDisplaySummary(acc);
};
// we need current account for know that transaction
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    containerApp.style.opacity = 100;

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiveAcc);

  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    receiveAcc &&
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);

  sorted = !sorted;
});

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


/////////////////////////////////////////////////



const arr2 = ['z','x','c','v']
const concat = arr.concat(arr2)
console.log(concat);

console.log([...arr, ...arr2]);

console.log(concat.join(' - '));
console.log([...arr, ...arr2].join(' - ')); 
 

for (const [i, move] of movements.entries()){
   if (move > 0 ){ 
      console.log(`Movement ${i + 1}: You deposit ${move}`);
   }else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
   }
}


console.log('----- forEach ----');

movements.forEach(function(move, i, arr) {
   if (move > 0 ){ 
      console.log(`Movement ${i + 1}: You deposit ${move}`);
   }else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
   }
})*/

// const calcAverageHumanAge = ages => {
//   const humanAge = ages.map(age => (age < 2 ? 2 * age : 16 + age * 4));
//   console.log(humanAge);
//   const humanYears = humanAge.filter(age => age >= 18);
//   console.log(humanYears);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(deposit => deposit * 1.1)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

const calcAverageHumanAge = ages => {
  const humanAge = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return humanAge;
};
console.log([5, 2, 4, 1, 15, 8, 3]);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

/*  
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

const findMethod = movements.find(acc => acc < 0);
console.log(findMethod);
console.log(accounts);
const findMethod2 = accounts.find(acc => acc.username === 'ss');
console.log(findMethod2);

// let currentAccount

// btnLogin.addEventListener('click', function(e){
//    e.preventDefault()

//    currentAccount = accounts.find((acc => acc.username === inputLoginUsername.value))

//    if(currentAccount?.pin === Number(inputLoginPin.value)){
//       containerApp.style.opacity = 100
//       inputLoginPin.value = inputLoginUsername.value = ''
//       inputLoginPin.blur()

//       labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

//       displayMovements(currentAccount)

//       balanceDisplayMovements(currentAccount)

//       calcDisplaySummary(currentAccount)

//    }

// })

const accBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(accBalance);

const accBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(accBalance2);

const bal = [1, 1, [1, 2, [12, 23]], [2, 3], 3, 1];
console.log(bal.flat(2));

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

let arr = ['a', 'b', 'c', 'd', 'e']

console.log(arr.slice(2));
console.log(arr.slice(-1));

console.log(arr.splice(1, 3));
console.log(arr);

console.log(arr.reverse());
console.log([...arr]);