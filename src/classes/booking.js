// import User from "../src/classes/user.js";
class Booking {
  constructor(bookingData) {
    this.id = bookingData.id || null;
    this.userId = bookingData.userId;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;

    // this.room = new Room(room)
  }

}

export default Booking;
