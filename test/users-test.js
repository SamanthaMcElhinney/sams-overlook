import chai from "chai";
const expect = chai.expect;
import User from "../src/classes/user.js";
import Booking from "src/classes/booking.js";

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
        let bookings = booking.
        expect(user.bookings).to.equal()
    })
})