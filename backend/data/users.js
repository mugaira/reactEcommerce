import bcrypt from 'bcryptjs';

const users = [
 {
  name:'Admin',
  email : 'mugaira@admin.com',
  password : bcrypt.hashSync('123456',10),
  isAdmin : true,
 },
 {
  name:'Jhon Doe',
  email : 'jhon@example.com',
  password : bcrypt.hashSync('123456',10),
  isAdmin : false,
 },
 {
  name:'Admin',
  email : 'jane@example.com',
  password : bcrypt.hashSync('123456',10),
  isAdmin : false,
 }
]

export default users;