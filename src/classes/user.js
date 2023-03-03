import Booking from "../src/classes/booking.js";

class User {
    constructor(userData){
        this.name = userData.name
        this.id = userData.id
        this.bookings = []
    }

    filterBookingsById(bookingData){
    const filteredBooking = bookingData.filter(booking => booking.userId === this.id)
    filteredBooking.forEach(booking => {
        this.bookings.push(new Booking(booking))
    })

    }
    calculateTotalCost(room){
        const total = this.bookings.reduce((acc, booking)=> {
            acc += booking.room.costPerNight
        },0).toFixed(2)
        return total
    }

    
}

export default User

//I should see a dashboard page that shows me:
//Any room bookings I have made (past or upcoming)

//method to calculate total cost
//method to calculate bookings