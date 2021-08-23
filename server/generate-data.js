const faker = require('faker');
const fs = require('fs');

const randomCityList = (n) => {
  const cityList = []
  if(n <= 0) return []
  
  for (let index = 0; index < n; index++) {
    const city = {
      id: faker.datatype.uuid(),
      code: faker.address.zipCode(),
      name: faker.address.city(),
    };
    cityList.push(city)
  }

  return cityList
}
const randomBranchList = (bankerList, cityList, n) => {
  let branchList = []
  if(n <= 0) return []
  
  for (let index = 0; index < n; index++) {
    const randomBankerIndex = faker.datatype.number({min: 0, max: bankerList.length - 1})
    const randomCityIndex = faker.datatype.number({min: 0, max: cityList.length - 1})
    const branch = {
      id: faker.datatype.uuid(),
      name: faker.address.cityName(),
      assets: faker.datatype.number({min: 6000000}),
      bankerId: bankerList[randomBankerIndex].id,
      cityId: bankerList[randomCityIndex].id,
    };
    branchList.push(branch)
  }

  return branchList
}
const randomBankerList = (cityList, n) => {
  let bankerList = []
  if(n <= 0) return []
  for (let index = 0; index < n; index++) {
    const randomCityIndex = faker.datatype.number({min: 0, max: cityList.length - 1})
    const banker = {
      id: faker.datatype.uuid(),
      name: faker.company.companyName(),
      email: faker.internet.exampleEmail(),
      cityId: cityList[randomCityIndex].id
    };
    bankerList.push(banker)
  }

  return bankerList
}
const randomCustomerList = (bankerList, cityList, n) => {
  let customerList = []
  
  if(n <= 0) return []
  
  for (let index = 0; index < n; index++) {
    const randomBankerIndex = faker.datatype.number({min: 0, max: bankerList.length - 1})
    const randomCityIndex = faker.datatype.number({min: 0, max: cityList.length - 1})
    const customer = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      age: faker.datatype.number({min: 18, max: 99}),
      memberScore: faker.datatype.number({min: 1, max: 10}),
      gender: faker.random.arrayElement(['male', 'female']),
      address: faker.address.streetAddress(),
      bankerId: bankerList[randomBankerIndex].id,
      cityId: cityList[randomCityIndex].id
    };
    customerList.push(customer)
  }

  return customerList
}
const randomAccountList = (customerList, n) => {
  const accountList = []

  if(n <= 0) return []
  for (const customer of customerList) {
    for (let index = 0; index < n; index++) {
      // const randomCustomerIndex = faker.datatype.number({min: 0, max: customerList.length - 1})
      const account = {
        id: faker.datatype.uuid(),
        fullName: customer.name,
        accountNumber: faker.finance.creditCardNumber(),
        balance: faker.datatype.float({min: 3000, max: 9999}),
        expireDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
        customerId: customer.id
      };
  
      accountList.push(account)
    }
  }

  return accountList
}
const randomTransactionList = (accountList, numberOfTransaction) => {
  const transactionList = []

  if(numberOfTransaction <= 0) return []

  for (const account of accountList) {
    for (let index = 0; index < numberOfTransaction; index++) {
      // const randomAccountIndex = faker.datatype.number({min: 0, max: accountList.length - 1})
      const transaction = {
        accountId: account.id,
        id: faker.datatype.uuid(),
        type: faker.finance.transactionType(),
        description: faker.finance.transactionDescription(),
        amount: faker.datatype.float({min: -1000, max: 1000}),
        date: new Date()
      };
  
      transactionList.push(transaction)
    }
  }

  return transactionList
}

(() => {
  // random data
  const cityList = randomCityList(5);
  const bankerList = randomBankerList(cityList, 5);
  const branchList = randomBranchList(bankerList, cityList, 5);
  const customerList = randomCustomerList(bankerList, cityList, 20);
  const accountList = randomAccountList(customerList, 1);
  const transactionList = randomTransactionList(accountList, 5);

  // write data to db file
  const db = {
    cities: cityList,
    bankers: bankerList,
    branches: branchList,
    customers: customerList,
    accounts: accountList,
    transactions: transactionList
  }

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data success')
  })
})();