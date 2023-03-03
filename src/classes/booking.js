import Room from "./room.js";

class Booking {
  constructor(bookingData) {
    this.id = bookingData.id || null;
    this.userId = bookingData.userId;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
  }
  findRoom(roomData){
    const foundRoom = roomData.find(room => room.number === this.number)
    return new Room(foundRoom)
  }

}

export default Booking;
