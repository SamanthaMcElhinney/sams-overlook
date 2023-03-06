import Room from "./room";
import Booking from "./booking";

class Hotel {
    constructor(roomData, bookingData) {
        this.rooms = roomData.map(room => new Room(room))
        this.bookings = bookingData.map(booking => new Booking(booking))
        this.openRooms = []
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
            console.log(!availableFilteredRooms, "not available rooms")
            return 
        } else {
            console.log(availableFilteredRooms, "AVAILABLE FILTERED ROOMS in function")
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