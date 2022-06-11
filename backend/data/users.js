import bcrypt from 'bcryptjs'

const Users = [
    {
      name: 'Admin user',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('123456' , 10),
      isAdmin: true,
    },
    {
        name: 'med amine ',
        email: 'med@med.com',
        password: bcrypt.hashSync('123456' , 10),
    },
    {
        name: 'Hssini',
        email: 'hssini@hssini.com',
        password: bcrypt.hashSync('123456' , 10),
    },
 
  ]
  
  export default Users
  