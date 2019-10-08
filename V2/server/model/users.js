import faker from 'faker';

const faker_mail = faker.internet.email();
const faker_password = faker.internet.password(8, true);
const users = [

  // ############# Signup users ################

  // 0 Correct user info
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
  // 1 Correct user info
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

  // 2 User with invalid email
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

  // 3 User with incomplete info
  {
    email: faker.internet.email(),
    last_name: faker.name.lastName(),
    password: faker.internet.password(8, true),
  },

  // 4 User with incomplte password
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


  // ####### Signin users ########
  // 5 Correct registered credentials
  {
    email: 'user1@gmail.com',
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
    first_name: ' ',
    email: faker_mail,
    last_name: faker.name.lastName(),
    password: faker_password,
    gender: 'male',
    jobrole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.streetAddress(),
  },
  // 11 last name with whitespace
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
  // 12 password with whitespace
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
