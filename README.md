# Template react apPl
# Plan
UI: material ui
Routing: React Router dom, react connected router
Form: React hook form v7
Form validate: Yup
Http client: axios

# Routing

/login

/admin/dashboard
<!-- customers -->
/admin/customers
/admin/customers/{id}
/admin/customers/add
/admin/customers/edit/{id}

<!-- accounts -->
/admin/accounts
/admin/accounts/{id}
<!-- transactions -->
/admin/transactions
/admin/transactions/{id}

# Analyze model
1 Customer - many accounts
1 account - many transaction

# Api function

- get all accounts has balance < 5000
- get all account with transaction amount sort by desc

## CUSTOMERS
/admin/customers
/admin/customers/{id}
/admin/customers/add
/admin/customers/edit/{id}

- Listing
  - Search by name
  - Filter by date
  - sort by age
  - pagination

- Customer state:
  - loading
  - list
  - filter

ADD/EDIT
- react hook form v7
- Yup