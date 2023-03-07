import chai from "chai";
const expect = chai.expect;
import Booking from "../src/classes/booking.js";
import sampleRoomData from "../data/room-data.js";
import sampleBookingData from "../data/booking-data.js";

describe("Booking", () => {
    let booking;

    let bookingData = {
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 12,
    }

    let roomData = {
      number: 12,
      roomType: "single room",
      bidet: false,
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 172.09,
    };

    beforeEach(() => {
        booking = new Booking(bookingData)
        roomData;
    })
    it('should be an instance of Booking', () => {
        expect(booking).to.be.an.instanceOf(Booking)
    })
    it('should have an id', () => {
        expect(booking.id).to.equal("5fwrgu4i7k55hl6t8")
    })
    it('should have a userId', () => {
        expect(booking.userID).to.equal(1)
    })
    it('should have a date', () => {
        expect(booking.date).to.equal("2022/02/05");
    })
    it('should have a room number', () => {
        expect(booking.roomNumber).to.equal(12)
    })
    it('should be able to find a room', () => {
        let room = booking.findRoom(sampleRoomData)
        expect(room.number).to.equal(12)
    })
})