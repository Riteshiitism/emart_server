const Product = require('./../models/productModel')

const findBytag = async (name)=>{
    // console.log(name);
    // const obj = await Product.find({tagsUI: {$elemMatch:{}}})
    // const obj = await Product.find();

    const obj = await Product.find({
        tagsUI: { $all: name }
      });


    // find({awards: {$elemMatch: {award:'National Medal', year:1975}}})


    // console.log(obj);


    // db.collection.find({
    //     "entries.name": "frank",
    //     "entries.email": "daniel@email.com"
    //   })
    // console.log(obj, typeof obj)
    if(obj == null){
        return([])
    }
    else{
    return((obj))}
}

module.exports ={
    findBytag
}
