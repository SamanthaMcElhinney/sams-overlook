import Room from "./room";
import Booking from "./booking";

class Hotel {
    constructor(roomData, bookingData) {
        this.rooms = roomData.map(room => new Room(room))
        this.bookings = bookingData.map(booking => new Booking(booking))
    }

    filterByDate(date) {
        let selectedDate = this.bookings.filter(booking => booking.date === date)
        console.log(selectedDate, "SD")
        let bookingOnAvailableDate = selectedDate.reduce((rooms, booking) => {
            console.log(booking, "booking")
            let isBooked = false
            this.rooms.forEach((room) => {
                if (room.number !== booking.roomNumber) {
                    rooms.push(booking)
                } else if (room.number === booking.number) {
                    isBooked = true
                }
            })
            console.log(rooms, "rooms")
            return rooms
        }, [])
        console.log(bookingOnAvailableDate, "BOOKING ON AVAILABLE DATE")
        return bookingOnAvailableDate;
    }

    filterByRoomType(roomType, date) {
        let hotelStatus = "available"
        let availableRoomsByDate = this.filterByDate(date)
        let availableFilteredRooms = availableRoomsByDate.filter(room =>
            room.roomType === roomType)
        if (!availableRoomsByDate) {
            hotelStatus = "unavailable"
        } else {
            console.log(availableFilteredRooms, "filteredROOM AVAIL")
            return availableFilteredRooms
        }

    }

    // addBooking(data, user, selectedRoom){

    // }
}

export default Hotel