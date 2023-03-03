import chai from "chai";
const expect = chai.expect;
import Booking from "../src/classes/booking.js";
// import User from "../src/classes/user.js"

describe("Booking", () => {
    let booking;
    // let user;
    let bookingData = {
      id: "5fwrgu4i7k55hl6t8",
      userId: 1,
      date: "2022/02/05",
      roomNumber: 12,
    }
    // let userData = {
    //     name:"Leatha Ullrich",
    //     id: 1,
    // }

    beforeEach(() => {
        booking = new Booking(bookingData)
        // user = new User(userData)
    })
    it('should be an instance of Booking', () => {
        expect(booking).to.be.an.instanceOf(Booking)
    })
    it('should have an id', () => {
        expect(booking.id).to.equal("5fwrgu4i7k55hl6t8")
    })
    it('should have a userId', () => {
        expect(booking.userId).to.equal(1)
    })
    it('should have a date', () => {
        expect(booking.date).to.equal("2022/02/05");
    })
    it('should have a room number', () => {
        expect(booking.roomNumber).to.equal(12)
    })
})