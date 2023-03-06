import Room from "./room";
import Booking from "./booking";

class Hotel {
    constructor(roomData, bookingData) {
        this.rooms = roomData.map(room => new Room(room))
        this.bookings = bookingData.map(booking => new Booking(booking))
    }

    filterByDate(date) {
        const unavailableRooms = this.bookings.reduce((acc, booking) => {
            if (booking.date === date) {
                acc.push(booking.roomNumber)
            }
            return acc
        }, [])
        const availableRooms = this.rooms.filter(room => !unavailableRooms.includes(room.number))
        return availableRooms
    }

    filterByRoomType(roomType, date) {
        const availableRoomsByDate = this.filterByDate(date)
        const availableFilteredRooms = availableRoomsByDate.filter(room =>
            room.roomType === roomType)
        if (!availableFilteredRooms.length) {
            return 
        } else {
            return availableFilteredRooms;
        }
    }

    addNewBooking(booking) {
        this.bookings.push(new Booking(booking))
    }
}

export default Hotel