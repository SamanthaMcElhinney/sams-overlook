import './css/styles.css';
import './images/turing-logo.png'
import "./images/hotel.jpg"
import './images/stairs.jpg'
import Room from './classes/Room'
import User from "./classes/user.js";
import Booking from './classes/booking';

// -------------------------------DOM ELEMENTS-------------------------------
const bookingsButton = document.querySelector('#bookings')
// const expensesButton = document.querySelector('#expenses')
const containerBookings = document.querySelector("#container-bookings");
// const containerTotalCost = document.querySelector("#container-total-cost");
const containerTotalCost = document.querySelector(".container-total-cost");

let newUser;
let getAllRooms
let filteredBookings
let cost;

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
      let filteredBookings = newUser.filterBookingsById(data[1].bookings);
      console.log(newUser.bookings, "AFTER BOOKINGS");
      console.log(data[2].rooms, "ROOOOOMS")
    //   booking.findRoom(data[2].rooms)
    cost = newUser.calculateTotalCost(filteredBookings,data[2].rooms);

      getAllRooms = data[2].rooms.forEach(room => new Room (room))
        displayUserInfo()
})

// --------------------------------EVENT LISTENERS----------------------------------------

// bookingsButton.addEventListener('click', displayUserInfo)

//----------------------------------------FUNCTIONS-----------------------------------------

function displayUserInfo(){
    containerBookings.innerHTML = " "
    newUser.bookings.forEach(booking => {
        containerBookings.innerHTML += `
        <div class="user-bookings dashboard">
        <p class="p-date"> Date: ${booking.date}</p>
        <p class="p-user"> Room number: ${booking.roomNumber}</p>
     `
    })
    containerTotalCost.innerHTML = " "
    containerTotalCost.innerHTML += `
    <p>${cost} </p>
    `
}
