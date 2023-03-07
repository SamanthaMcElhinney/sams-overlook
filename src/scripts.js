import "./css/styles.css";
import "./images/hotel.jpg";
import "./images/stairs.jpg";
import Room from "./classes/Room";
import User from "./classes/user.js";
import Booking from "./classes/booking";
import Hotel from "./classes/hotel";
import "./images/bed.jpg";
import MicroModal from "micromodal";
MicroModal.init()

// -------------------------------DOM ELEMENTS-------------------------------
const containerBookings = document.querySelector("#container-bookings");
const containerTotalCost = document.querySelector(".container-total-cost");
const searchRoomButton = document.querySelector("#searchRooms");
const userCalendar = document.getElementById("date")
const submitDateButton = document.querySelector("#submit-date-button");
const containerRooms = document.querySelector("#container-available-rooms");
const userLogin = document.querySelector("#user-login");
const mainPage = document.querySelector(".user-container-info");
const errorMessageContainer = document.querySelector("#modal-error-message");
const modalContinue = document.querySelector("#modal-continue")

let selection = document.querySelector('select')

let postBookings;
let testUser;
let hotel;
let cost;
let valueSelected;
let dateSelected;


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

function fetchData() {
  Promise.all([getCustomers, getBookings, getRooms])
    .then(data => {
      testUser = new User(data[0].customers[8])
      hotel = new Hotel(data[2].rooms, data[1].bookings)
      postBookings = data[1].bookings.map(booking => new Booking(booking))
      const filteredBookings = testUser.filterBookingsById(data[1].bookings)
      cost = testUser.calculateTotalCost(filteredBookings, data[2].rooms);
      displayUserInfo()
    })
}
window.onload = fetchData()

function getSpecificUser(id){
  const getUserID = fetch(`http://localhost:3001/api/v1/customers/"${id}`)
  .then((response) => response.json()
  .then(data => {
    console.log(data)
  })
  .catch(error => console.log(error))
);
}

// --------------------------------EVENT LISTENERS----------------------------------------

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

userLogin.addEventListener("click",(event)=> {
  showLoginPage(event)
})


//----------------------------------------FUNCTIONS-----------------------------------------

function displayUserInfo() {
  containerBookings.innerHTML = " ";
  testUser.bookings.forEach((booking) => {
    containerBookings.innerHTML += `
     <div class="user-bookings dashboard">
        <p class="p-date"> Date: ${booking.date}</p>
        <p class="p-user"> Room number: ${booking.roomNumber}</p>
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
          <p class="bed-info">Bed Size: ${room.bedSize}</p>
          <p class="bidet">Bidet:  ${determineBidet(room)}
          <p class="number-beds"> Number of Beds: ${room.numBeds}</p>
          <p class="cost-per-night"> Cost per Night: ${room.costPerNight}</p>
          <button class="book-button" id="${room.number}">Book Now!</button>
        </div>
    `;
  });
}

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
      .then(data => {
        if (data.message.includes("success")) {
          console.log(data, "data in post")
          hotel.addNewBooking(data)
          hide(event.target.parentNode)
        }
      })
      .catch((error) =>
        alert(
          `Server Error: ${error}. Our dearest appologies. We have gathered our finest engineers to work on the issue. Please try again booking later. Don't give up on a good time!`
        )
      )
  }
}

function hide(element) {
  element.classList.add('hidden')
}

function show(element){
  element.classList.remove('hidden')
}

function authenticateUser(username, password) {
  if(!password === overlook2021){
    errorMessageContainer.innerText = "Sorry invalid password"
  } else if(!username.value.includes('customer')){
    errorMessageContainer.innterText = "Sorry invalid password"
  } else {
  }
}

function showLoginPage(){
  MicroModal.show("modal-1");
  errorMessageContainer.innerText ="Welcome user"
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener('click', (event) => {
    event.preventDefault()
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    let username = usernameInput.value;
    let password = passwordInput.value;
    let userID = parseInt(username.split('customer')[1])
    if(password === overlook2021 && username.includes('customer')){
      getSpecificUser(userID)
    }
  })
}

  