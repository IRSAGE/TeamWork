import faker from 'faker';

const faker_mail = faker.internet.email();
const faker_password = faker.internet.password(8, true);
const users = [
  {
    first_name: 'Iragena',
    last_name: 'sage',
    email: 'user98@gmail.com',
    password: 'iragenaegide',
    gender: 'male',
    jobrole: 'programmer',
    department: 'it',
    address: 'kabuga',
  },
  {
    first_name: 'Iragena',
    last_name: 'sage',
    email: 'user1@gmail.com',
    password: 'iragenaegide',
    gender: 'male',
    jobrole: 'programmer',
    department: 'it',
    address: 'kabuga',
  },
  {
    email: faker.name.lastName,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: faker_password,
    gender: 'male',
    jobrole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
  {
    email: faker.internet.email(),
    last_name: faker.name.lastName(),
    password: faker.internet.password(8, true),
  },
  {
    password: faker.internet.password(3, true),
    email: faker_mail,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: 'male',
    jobrole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
  {
    email: 'user98@gmail.com',
    password: 'iragenaegide',
  },
  {
    email: faker_mail,
    password: 'faker_password',
  },
  {
    password: faker_password,
  },
  {
    email: faker_mail,
  },
  {
    email: `${faker_mail}@gmail`,
    password: faker_password,
  },
  {
    first_name: ' ',
    email: faker_mail,
    last_name: faker.name.lastName(),
    password: faker_password,
    gender: 'male',
    jobrole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
  {
    last_name: ' ',
    email: faker_mail,
    first_name: faker.name.firstName(),
    password: faker_password,
    gender: 'male',
    jobrole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
  {
    email: faker_mail,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: ' ',
    gender: 'male',
    jobrole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
];
export default users;
