import Hotel from "../src/classes/hotel";
import sampleBookingData from "../data/booking-data";
import sampleRoomData from "../data/room-data";
import sampleUserData from "../data/users-data"
import chai from "chai";
const expect = chai.expect;
import Room from "../src/classes/room";
import Booking from "../src/classes/booking";

describe('Hotel', () => {
    let hotel;

    beforeEach(() => {
        hotel = new Hotel(sampleRoomData, sampleBookingData)
    })

    it('should be a function', () => {
        expect(Hotel).to.be.a('function')
    })
    it('should be an instance of hotel', () => {
        expect(hotel).to.be.an.instanceOf(Hotel)
    })
    it('should be able to filter available rooms by date', () => {
        let availableDate = hotel.filterByDate("2022/09/22");
        expect(availableDate).to.have.a.lengthOf(3);
    })
    it('should be able to filter available rooms by type', () => {
        let availableRooms = hotel.filterByRoomType(
            "junior suite",
            "2022/02/05"
        );
        expect(availableRooms).to.have.a.lengthOf(1);
    })
    it('should be able to filter available rooms by multiple types', () => {
        let date = hotel.filterByDate("2022/04/22");
        let availableRooms = hotel.filterByRoomType("residential suite", date
        );
        expect(availableRooms).to.have.a.lengthOf([1]);
    })
    it("should be able to add new bookings", () => {
        expect(hotel.bookings).to.have.a.lengthOf(3)
    })
})