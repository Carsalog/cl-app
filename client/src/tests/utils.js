export const user = {
  _id: '5bbf2d36c8e1ac2dd0bed523',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  phone: '12345678',
  su: false,
  iat: 1539533158
};

export const getToken = () => {
  const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const payload = btoa(JSON.stringify(user));
  const signature = "cvAFYv8igzouDartzi5S_b1bdLt6FnpBdNgskYRewwk";
  return `${header}.${payload}.${signature}`;
};

export const getCar = () => ({
  "make": "BMW",
  "model": "328i",
  "type": "sedan/saloon",
  "fuel": "gasoline",
  "_id": "5bd1dbd0b360c621e8074b83",
  "vin": "WBA3X5C51FD560928",
  "year": 2015
});

export const getPost = () => ({
  "_id": "5bd954e18adc3d1a4026d262",
  "transmission": "5b9608e4adc81d38ac9e439e",
  "images": [],
  "tags": [],
  "isActive": true,
  "description": "Car in the very good condition",
  "state": "5bb33d25147b532f38c6af81",
  "city": "5bb33d47147b532f38c6af82",
  "model": "5b9607fdadc81d38ac9e439b",
  "mileage": 42000,
  "price": 22900,
  "make": "5b96075eadc81d38ac9e439a",
  "car": "5bd1dbd0b360c621e8074b83",
  "year": 2015,
  "author": "5bbf2d36c8e1ac2dd0bed523",
  "date": "2018-10-31T07:08:17.203Z"
});