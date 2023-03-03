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
        console.log(filteredBooking, "filtered booking")
        filteredBooking.forEach(foundBooking => {
            this.bookings.push(new Booking(foundBooking))
        })
        return this.bookings
    }


    calculateTotalCost(bookingData, roomData) {
        console.log(bookingData, "JOES DATA")
        const bookings = this.filterBookingsById(bookingData)
        console.log(bookings, "bookings")
        console.log(roomData, "roomData")
        const total = bookings.reduce((acc, booking) => {
            roomData.forEach((room) => {
                if (room.number === booking.roomNumber) {
                    acc += room.costPerNight
                }
            })
            return acc
        }, 0).toFixed(2)
        console.log(total, "TOTAL")
        return total
    }
}

export default User

//I should see a dashboard page that shows me:
//Any room bookings I have made (past or upcoming)

//method to calculate total cost
//method to calculate bookings