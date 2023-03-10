import Booking from "./booking.js";
import Room from "./room.js";

class User {
    constructor(userData) {
        this.name = userData.name
        this.id = userData.id
        this.bookings = []
    }

    filterBookingsById(bookingData) {
        const filteredBooking = bookingData.filter(booking => booking.userID === this.id)
        filteredBooking.forEach(foundBooking => {
            this.bookings.push(new Booking(foundBooking))
        })
        return this.bookings
    }

    calculateTotalCost(bookingData, roomData) {
        const bookings = this.filterBookingsById(bookingData)
        const total = bookings.reduce((acc, booking) => {
            roomData.forEach((room) => {
                if (room.number === booking.roomNumber) {
                    acc += room.costPerNight
                }
            })
            return acc
        }, 0).toFixed(2)
        return total
    }
}

export default User

