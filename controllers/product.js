const Product = require('./../models/productModel')

const  findByName  = async  (name)=>{
    name=name.toLowerCase();
    const products = await Product.find()
    const results = products.filter((product)=> product.name.toLowerCase().includes(name));
    // console.log(results);
    return results;
}   
const filterByPrice = async (price) => {
    try {
        console.log(price);
        const objs = await Product.find({
            "price": {
                $lt: price
            }
        });

        // console.log(objs);
        return objs; // Return the array of matching documents
    } catch (error) {
        console.error("Error:", error);
        throw error; // Handle errors properly
    }
}

const CreateProduct = async (obj)=>{
    const entry = new Product(obj)
    // console.log(entry)
    // console.log()
    try{
        await entry.save()
        // res.send(entry.tagsUI);
      }
      catch(err){
          console.log("Error occured while saving the entry",err)
      }

    return(entry)
}
const findByID = async (list)=>{
    // console.log(list);
    const obj = await Product.find({
        '_id':{
            $in:list
        }
    })
    // console.log(obj);
    return(obj)
}
module.exports = {
    findByName,CreateProduct,filterByPrice,findByID
}