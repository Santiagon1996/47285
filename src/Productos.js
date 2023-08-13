export class Productos {
    static idIncrement = 0
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Productos.incrimentarId()
    }
    static incrimentarId(){
        this.idIncrement++
        return this.idIncrement
    }
    

}