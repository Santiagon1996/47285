export  class Productos {
    static idIncrement = 0;
  
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
      this.id = Productos.incrementarId();
    }
  
    static incrementarId() {
      Productos.idIncrement++;
      return Productos.idIncrement;
    }
  }
  