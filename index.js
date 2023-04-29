class ProductManager{

    constructor(){
        this.producto=[]
    }

    getProducts(){
        console.log(this.producto)
        return this.producto
    }

    getProductsById(id) {
        const buscado = this.producto.find((produc) => produc.id == id)
        if (buscado) {
            return buscado
        } else {
            console.log(`Not Found`)
            return undefined
        }
    }

    #getProductByCode(code){
        const codeInArray= this.producto.find((produc)=>produc.code==code)
        if(codeInArray){
            return true
        }else{
            return false
        }
    }   
    #generarId(){
        let idGenerado=0
        for (let i = 0; i < this.producto.length; i++) {
            const produc = this.producto[i];
            if(produc.id > idGenerado){
                idGenerado = produc.id
            }         
        }
        return ++idGenerado
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        stock= stock ?? 1;
        const productoNuevo = { title, description, price, stock, thumbnail, id:this.#generarId() }
        this.producto = [...this.producto, productoNuevo]
        return true
    }
 
}

