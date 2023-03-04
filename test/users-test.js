import chai from "chai";
const expect = chai.expect;
import User from "../src/classes/user";
import Booking from "../src/classes/booking";
import sampleBookingData from "../data/booking-data.js";
import sampleRoomData from "../data/room-data";

describe("User", () => {
    let user;
    let userData = {
        id: 1,
        name: "Leatha Ullrich"
    }

    beforeEach(()=> {
        user = new User(userData)
    })

    it('should be an instance of User', () => {
        expect(user).to.be.an.instanceOf(User)
    })
    it('should have a name', () => {
        expect(user.name).to.equal("Leatha Ullrich");
    })
    it('should have an id', () => {
        expect(user.id).to.equal(1)
    })
    it('should be able to hold bookings', () => {
        expect(user.bookings).to.deep.equal([])
    })

    it('should able to check for bookings', ()=> {
        user.filterBookingsById(sampleBookingData)
        expect(user.bookings[0]).to.be.an.instanceOf(Booking)
        expect(user.bookings).to.have.length(1)
        expect(user.bookings[0].roomNumber).to.equal(12)
    })

    it('should be able to calculate total spent on bookings', ()=> {
        expect(
          user.calculateTotalCost(sampleBookingData, sampleRoomData)
        ).to.equal('172.09');
    })
})