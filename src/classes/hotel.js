import Room from "./room";
import Booking from "./booking";

class Hotel {
    constructor(roomData, bookingData) {
        this.rooms = roomData.map(room => new Room(room))
        this.bookings = bookingData.map(booking => new Booking(booking))
    }

    filterByDate(date) {
            // let selectedDate = this.bookings.filter(
            //   (booking) => booking.date === date
            // );
            // let bookingOnAvailableDate = this.rooms.reduce((rooms, booking) => {
            //   let isBooked = false;
            //   this.rooms.forEach((room) => {
            //     if (room.number !== booking.roomNumber) {
            //       rooms.push(booking);
            //     } else if (room.number === booking.number) {
            //       isBooked = true;
            //     }
            //   });
            //   return rooms;
            // }, []);
            // console.log(bookingOnAvailableDate, "BOOKING ON AVAILABLE DATE");
            // return bookingOnAvailableDate;
        const bookingsOnSelectedDate = this.bookings.filter(booking => booking.date === date);
        const filteredAvailableRooms = this.rooms.filter(room => {
            return bookingsOnSelectedDate.every(booking => {
                return booking.roomNumber !== room.number;
            });
        });
        if (!filteredAvailableRooms.length) {
            return;
        } else {
            return filteredAvailableRooms;
        }
    }


    filterByRoomType(roomType, date) {
        let hotelStatus = "available"
        const availableRoomsByDate = this.filterByDate(date)
        console.log(availableRoomsByDate, "available rooms by date")
        const availableFilteredRooms = availableRoomsByDate.filter(room =>
            room.roomType === roomType)
        if (!availableFilteredRooms.length) {
            return hotelStatus = "unavailable"
        } else {
            console.log(availableFilteredRooms, "filteredROOM AVAIL");
            return availableFilteredRooms;
        }
    }

    addBooking(date, user, selectedRoom) {
        this.bookings.push(new Booking({
            "id": Date.now(),
            "userID": user.id,
            "date": date,
            "roomNumber": selectedRoom.number
        }, this.rooms))
    }

}

export default Hotel