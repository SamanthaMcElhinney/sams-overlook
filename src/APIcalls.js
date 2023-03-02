import User from "./classes/user.js"

const customers = fetch("http://localhost:3001/api/v1/customers")
.then((response) => response.json())
.then((data) => {
    let newUser = data.customers.map(customer=> new User(customer))
    // console.log(newUser, "did this work")
    // console.log(data.customers[0], "name")
    // const user = new User(data.customers);
    // console.log(user, "user")
    // console.log(customers, "customers")
    return newUser
})
.catch(err => err)

const returnPromise = Promise.all([customers])
.then((response)=> console.log(response))
// console.log(returnPromise)

const rooms = fetch("http://localhost:3001/api/v1/rooms")
.then((response) => response.json())
.then((data) => {
    console.log(data, "rooms")
})

// const singleCustomer = fetch(
//   "http://localhost:3001/api/v1/customers/1 where<id> will be a number of a customer’s id"
// )
// .then((response) => response.json())
// .then((data) => {
//     console.log(data, "singleCustomer")
// })

// Promise.all([customers],[rooms],[singleCustomer]) {
    
// }

// const books = fetch("http://localhost:3001/api/v1/bookings");
// .then((response) => response.json())
// .then((data)=> {
//     console.log(data, "books")
// })
export default apiCalls
