const Contenedor = require('./Contenedor');

async function main() {
    const product = new Contenedor('productos.txt');
    //prueba Metodo save
    let newProduct1 = { "title": "Compas", "price": 200 }
    await product.save(newProduct1);

    //Prueba Metodo getAll
    console.log('Muestro todos los productos');
    let allProducts = await product.getAll();
    console.log(allProducts);

    //Prueba Metodo getById
    const idToSearch = 2;
    console.log(`Muestro el producto con id: ${idToSearch}`);
    let productById = await product.getById(idToSearch);
    console.log(productById);

    //Prueba Metodo deleteById
    console.log('Prueba de Eliminacion');
    let ProductoAEliminarId = 4;
    await product.deleteById(ProductoAEliminarId);
    console.log('Nuevo Listado de Productos');
    console.log(await product.getAll());

    //Prueba Metodo deleteAll
    //await product.deleteAll();
    //console.log('Borrado Completo Exitoso Listado Vacio')
    //console.log(await product.getAll());
}

main();