import Room from "./room.js";

class Booking {
  constructor(bookingData) {
    this.id = bookingData.id || null;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
  }

  findRoom(roomData){
    return roomData.find(room => room.number === this.roomNumber)
  }  

}

  //I need to look through date of bookings
  //I need to use post to post the bookings



export default Booking;
