// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import "./images/hotel.jpg"
import './images/stairs.jpg'
// console.log('This is the JavaScript entry file - your code begins here.');
import Room from './classes/Room'
import User from "./classes/user.js";

// -------------------------------DOM ELEMENTS-------------------------------
const bookingsButton = document.querySelector('#bookings')
// const expensesButton = document.querySelector('#expenses')
const containerBookings = document.querySelector("#container-bookings");

let newUser;
let getBookings;
let getAllRooms
let room;

//----------------------------------FETCH REQUESTS-----------------------------------


const getCustomers = fetch("http://localhost:3001/api/v1/customers")
  .then((response) => response.json())

const bookings = fetch("http://localhost:3001/api/v1/bookings")
  .then((response) => response.json())

const rooms = fetch("http://localhost:3001/api/v1/rooms")
  .then((response) => response.json())

Promise.all([getCustomers, bookings, rooms]) 
.then((data) => {
    console.log(data)
      newUser = new User(data[0].customers[1]);
      console.log(newUser, "getCustomers");
      console.log(data[1].bookings)
      newUser.filterBookingsById(data[1].bookings);
      console.log(newUser.bookings, "AFTER BOOKINGS");
      getAllRooms = data.rooms.forEach(room => new Room (room))
        console.log(getAllRooms, "roomsFiltered")
})




// const customers = fetch("http://localhost:3001/api/v1/customers")
// .then((response) => response.json())

// const getBookings = fetch('http://localhost:3001/api/v1/bookings')
// .then((response => response.json()))


// Promise.all([customers],[getBookings])
//   .then((data) => {
//     let newUser = data.customers[0]((customer) => new User(customer));
//     console.log(newUser)
    // console.log(newUser)
    // let newBooking = data.userId(customer)
    // console.log(newBooking)
    // let newUser = data.customers.map(customer=> new User(customer))
    // console.log(newUser, "did this work")
    // console.log(data.customers[0], "name")
    // const user = new User(data.customers);
    // console.log(user, "user")
    // console.log(customers, "customers")
//     return newUser;
//   })
//   .catch((err) => err);
// console.log(returnPromise)


// --------------------------------EVENT LISTENERS----------------------------------------

// bookingsButton.addEventListener('click', displayUserInfo)

//----------------------------------------FUNCTIONS-----------------------------------------

// function displayUserInfo(){
//     newUser.filterBookingsById(bookingData,roomData)
//     console.log(user)
//     containerBookings.innerHTML = ""
//     user.bookings.forEach(booking => {
//         containerBookings
//     })
// }