# Database design system
https://cse.hkust.edu.hk/~wilfred/dbweb/erd.html#erd

# Faker generate dummy data finance
https://github.com/marak/Faker.js/

# Json generator data sample

Add data sample below to generate random data
https://www.json-generator.com/

```js
{
  accounts: [
    '{{repeat(5, 7)}}',
    {
      // _cid: '{{objectId()}}',
      id: '{{index()}}',
      fullName: '{{firstName()}} {{surname()}}',
      accountNumber: '{{integer(0, 999999999999)}}',
      balance: '{{integer(3000, 100000)}}'
      expireDate: '{{date(new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 2)), "")}}',
      transactions: [
        '{{repeat(5)}}',
        {
          _id: '{{objectId()}}',
          name: '{{lorem(3, "words")}}',
          type: function (tags) {
            var fruits = ['type1', 'type2', 'type3'];
            return fruits[tags.integer(0, fruits.length - 1)];
          },
          date: '{{date(new Date(2021,1,1), new Date(), "dd/MM/YYYY")}}',
          amount: '{{integer(100, 100000)}}'
        }
      ],
    }
  ]
}
```