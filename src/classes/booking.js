class Booking {
    constructor(data){
        this.id = data.id || null;
        this.userId= data.userId;
        this.date = data.date
        this.roomNumber = data.roomNumber
    }
}

export default Booking