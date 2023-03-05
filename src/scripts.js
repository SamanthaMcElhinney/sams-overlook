import "./css/styles.css";
import "./images/hotel.jpg";
import "./images/stairs.jpg";
import Room from "./classes/Room";
import User from "./classes/user.js";
import Booking from "./classes/booking";
import Hotel from "./classes/hotel";
// import "./images/bed.jpg";

// -------------------------------DOM ELEMENTS-------------------------------
const bookingsButton = document.querySelector("#bookings");
const containerBookings = document.querySelector("#container-bookings");
const containerTotalCost = document.querySelector(".container-total-cost");
const searchRoomButton = document.querySelector("#searchRooms");
const userCalendar = document.getElementById("date")
const submitDateButton = document.querySelector("#submit-date-button");
const containerRooms = document.querySelector("#container-available-rooms");
// const dateSelecterBox = document.querySelector("#date-selecto");

let newUser;
let hotel;
let getAllRooms;
// let filteredBookings;
let cost;

//----------------------------------FETCH REQUESTS-----------------------------------

const getCustomers = fetch("http://localhost:3001/api/v1/customers").then(
  (response) => response.json()
);

const getBookings = fetch("http://localhost:3001/api/v1/bookings").then(
  (response) => response.json()
);

const getRooms = fetch("http://localhost:3001/api/v1/rooms").then((response) =>
  response.json()
);

// function fetchData() {
  Promise.all([getCustomers, getBookings, getRooms])
    .then(data => {
      newUser = new User(data[0].customers[1])
      hotel = new Hotel(data[2].rooms, data[1].bookings)
      const filteredBookings = newUser.filterBookingsById(data[1].bookings)
      cost = newUser.calculateTotalCost(filteredBookings, data[2].rooms);
      displayUserInfo()
    })


// window.onload = fetchData()

// Promise.all([getCustomers, getBookings, getRooms]).then((data) => {
//   console.log(data);
//   newUser = new User(data[0].customers[1]);
//   let filteredBookings = newUser.filterBookingsById(data[1].bookings);
//   console.log(newUser.bookings, "AFTER BOOKINGS");
//   console.log(data[2].rooms, "ROOOOOMS");
//   //   booking.findRoom(data[2].rooms)
// cost = newUser.calculateTotalCost(filteredBookings, data[2].rooms);
//   hotel = 
//   getAllRooms = data[2].rooms.forEach((room) => new Room(room));
//   displayUserInfo();
// });

// --------------------------------EVENT LISTENERS----------------------------------------

bookingsButton.addEventListener('click', displayUserInfo)
// searchRoomButton.addEventListener("submit", () => {
//   selectDate(event)
// })
submitDateButton.addEventListener("click", (event) => {
  selectDate(event);
});

//----------------------------------------FUNCTIONS-----------------------------------------

function displayUserInfo() {
  containerBookings.innerHTML = " ";
  newUser.bookings.forEach((booking) => {
    containerBookings.innerHTML += `
        <table class="styled-table">
    <thead>
        <tr>
            <th>Dates</th>
            <th>Room Number</th>
        </tr>
    </thead>
    <tbody>
        <tr class="active-row">
            <td> ${booking.date}</td>
            <td>${booking.roomNumber}</td>
        </tr>
        <!-- and so on... -->
    </tbody>
</table>

     `;
  })
  containerTotalCost.innerHTML = " ";
  containerTotalCost.innerHTML += `
  ${newUser.name}
    <h3>Thanks for being a loyal customer!</h3>
    <p>Total Spent: $${cost} </p>
    `;
}

// --------------------------------Date----------------------------------------


// function filterRoomsByDate(){
//   let date = getDate()
//   let roomsToDisplay = hotel.filterRoomsByDate(date)
//   return roomsToDisplay
// }

// function displayRoomsToBooking(){

// }

// function show(element){
//   element.classList.remove('hidden');
// }

// function hide(element){
//   element.classList.add('hidden')
// }

function selectDate(event) {
  event.preventDefault()
  console.log(event)
  let dateSelected = userCalendar.value.split("-").join("/");
  console.log(dateSelected)
  const availableRooms = hotel.filterByDate(dateSelected)
  console.log(availableRooms)
  containerRooms.innerHTML = " ";
  availableRooms.forEach((room) => {
    containerRooms.innerHTML += `
        <div class="card-holder">
          <img class="box-image" src="./images/bed.jpg" alt="comfortable hotel bed">
          <h2 class="room-title">Room Type:${room.roomType}</h2>
          <p class="bed-info">Bed Size: ${room.bedsize}</p>
          <p class="bidet">Bidet: ${room.bidet}
          <p class="number-beds"> Number of Beds: ${room.numBeds}</p>
          <p class="cost-per-night"> Cost per Night: ${room.costPerNight}</p>
          <button class="book-button">Book Now!</button>
        </div>
    `;
  })
}

// function filterRoomsByDate(){
//   let date = 
// }