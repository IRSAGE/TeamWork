import faker from 'faker';
// import { getMaxListeners } from 'cluster';

const faker_mail = faker.internet.email();
const faker_password = faker.internet.password(8, true);
const users = [

  // ############# Signup users ################

  // 0 Correct user info
  {
    email: 'user@gmail.com',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'password123',
    gender: 'male',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },

  // 1 Correct user info
  {
    email: 'faker_mail@gmail.com',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker_password,
    gender: 'male',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },

  // 2 User with invalid email
  {
    email: faker.name.lastName,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker_password,
    gender: 'male',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },

  // 3 User with incomplete info
  {
    email: faker.internet.email(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(8, true),
  },

  // 4 User with incomplte password
  {
    password: faker.internet.password(3, true),
    email: faker_mail,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gender: 'male',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },


  // ####### Signin users ########
  // 5 Correct registered credentials
  {
    email: 'user@gmail.com',
    password: 'password123',
  },
  // 6 Incorrect password
  {
    email: faker_mail,
    password: 'faker_password',
  },
  // 7 email missing
  {
    password: faker_password,
  },
  // 8 Password missing
  {
    email: faker_mail,
  },

  // 9 Invalid email
  {
    email: `${faker_mail}@gmail`,
    password: faker_password,
  },
  // 10 first name with whitespace
  {
    firstName: ' ',
    email: faker_mail,
    lastName: faker.name.lastName(),
    password: faker_password,
    gender: 'male',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
  // 11 last name with whitespace
  {
    lastName: ' ',
    email: faker_mail,
    firstName: faker.name.firstName(),
    password: faker_password,
    gender: 'male',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
  // 12 password with whitespace
  {
    email: faker_mail,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: ' ',
    gender: 'male',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
];
export default users;
