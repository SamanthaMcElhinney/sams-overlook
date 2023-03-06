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

// const containerFilteredRooms = document.querySelector(
//   ".container-filtered-rooms"
// );
// const searchRoomType = document.getElementById("roomType")
let selection = document.querySelector('select')

let testUser;
let hotel;
let cost;
let valueSelected;

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

let postBookings

function fetchData() {
  Promise.all([getCustomers, getBookings, getRooms])
    .then(data => {
      testUser = new User(data[0].customers[8])
      hotel = new Hotel(data[2].rooms, data[1].bookings)
      postBookings = data[1].bookings.map(booking => new Booking(booking))
      console.log(postBookings, "postBookings")
      console.log(hotel, 'hotel')
      const filteredBookings = testUser.filterBookingsById(data[1].bookings)
      cost = testUser.calculateTotalCost(filteredBookings, data[2].rooms);
      displayUserInfo()
      // selectDate()
      // searchRoom()
    })
}
window.onload = fetchData()

// --------------------------------EVENT LISTENERS----------------------------------------

// bookingsButton.addEventListener('click', displayUserInfo)
submitDateButton.addEventListener("click", (event) => {
  selectDate(event);
});

selection.addEventListener('change', determineSelection)

searchRoomButton.addEventListener("click", (event) => {
  determineSelection();
  searchRoom(event);
});

containerRooms.addEventListener("click", (event) => {
  bookARoom(event)
})
//----------------------------------------FUNCTIONS-----------------------------------------
// function getSingleUser(userID){
//   return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
//   .then(response => response.json())
//   .then(data => newUser = data)
//   .catch(error => console.log(error))
// }

function displayUserInfo() {
  containerBookings.innerHTML = " ";
  testUser.bookings.forEach((booking) => {
    containerBookings.innerHTML += `
              <table class="styled-table">
              <thead>
              <tr>
              <th>Date</th>
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
            ${testUser.name}
            <h3>Thanks for being a loyal customer!</h3>
            <p>Total Spent: $${cost} </p>
            `;
}

function determineBidet(room) {
  if (room.bidet) {
    return `Yes`;
  }
  return `No`;
}

let dateSelected;

function selectDate(event) {
  event.preventDefault();
  console.log(event);
  dateSelected = userCalendar.value.split("-").join("/");
  console.log(dateSelected);
  const availableRooms = hotel.filterByDate(dateSelected);
  console.log(availableRooms);
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
          <button class="book-button" id="${room.number}">Book Now!</button>
        </div>
    `;
  });
}
//THIS will track event.target.id
function determineSelection() {
  valueSelected = selection.options[selection.selectedIndex].text;
  if (valueSelected === "single room") {
    return "single room"
  } else if (valueSelected === "junior suite") {
    return "junior suite"
  } else if (valueSelected === "suite") {
    return "suite"
  } else if (valueSelected === "residential") {
    return "residential suite"
  }
  return false
}

function searchRoom(event) {
  event.preventDefault()
  dateSelected = userCalendar.value.split("-").join("/");
  let filterValue = determineSelection()
  hotel.filterByRoomType(filterValue, dateSelected)
  containerRooms.innerHTML = " ";
  hotel.filterByRoomType(filterValue, dateSelected).forEach((room) => {
    containerRooms.innerHTML += `
        <div class="card-holder">
        <img class="box-image" src="./images/bed.jpg" alt="comfortable hotel bed">
        <h2 class="room-title">Room Type:${room.roomType}</h2>
        <p class="bed-info">Bed Size: ${room.bedSize}</p>
        <p class="bidet">Bidet: ${determineBidet(room)}
        <p class="number-beds"> Number of Beds: ${room.numBeds}</p>
        <p class="cost-per-night"> Cost per Night: ${room.costPerNight}</p>
        <button class="book-button">Book Now!</button>
        </div>
        `;
  });
}
//I need a way to track each button- room.
//If it contains the book a button class- i'm getting true. Then I want to post the data.
function bookARoom(event) {
  console.log(event.target.id, "ID for button")
  if (event.target.classList.contains("book-button")) {
    fetch("http://localhost:3001/api/v1/bookings", {
        method: "POST",
        body: JSON.stringify({
          userID: testUser.id,
          date: dateSelected,
          roomNumber: parseInt(event.target.id)
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((result) => result.json())
      .then((data) => console.log(data, "data in post"))
      .catch((error) =>
        alert(
          `Server Error: ${error}. We are working on it. Please try again later`
        )
      );

  }
}