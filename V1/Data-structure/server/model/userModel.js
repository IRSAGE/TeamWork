import dotenv from 'dotenv';


dotenv.config();

class User {
  constructor(id, firstName, lastName, email, password, gender, jobRole, department, address) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.jobRole = jobRole;
    this.department = department;
    this.address = address;
  }
}
export default User;
