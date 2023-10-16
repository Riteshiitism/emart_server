const router = require("express").Router();
const User = require("../models/userModel");
const Product = require("../models/productModel");

router.get("/:userId", async (req, res) => {
  var user = req.params.userId;
  const entries = await User.findById(user);
  try {
    res.send(JSON.stringify(entries.wishListProduct));
  } catch {
    res.send("Nhi Mila Bhai");
  }
});
router.get("/product/:productId", async (req, res) => {
  var id = req.params.productId;
  const result = await Product.findById(id);
  if (result) {
    res.send(JSON.stringify(result));
  } else {
    res.send("Nhi Mila Bhai");
  }
});

router.put("/add-wishlist/:_id", async (req, res) => {
  let userId = req.params._id;
  let productId = req.body.productId;
  User.updateOne(
    { _id: userId, wishListProduct: { $ne: productId } }, // Match the document and check if the value is not already present
    { $addToSet: { wishListProduct: productId } }, // Add the value to the array if it's not already present
    (error, result) => {
      if (error) {
        console.error('Error updating document:', error);
      } else {
        // console.log('Document updated successfully:', result);
      }
    }
  );
  res.send({ userId, productId });
});
router.put("/delete-wishlist/:_id", async (req, res) => {
  let userId = req.params._id;
  let productId = req.body.productId;
  console.log({user:userId});
  console.log({product:productId});
  let result = await User.findByIdAndUpdate(
    userId,

    { $pull: { wishListProduct: productId } },

    { new: true }
  );
  console.log(result);
  res.send({ userId, productId });
});
router.post("/:userId", async (req, res) => {
  var user = req.params.userId;
  var entries = await User.findById(user);
  // console.log(entries);
  try {
    // console.log(req.body);
    let flag = 0;
    var list = entries.wishListProduct;
    for (var i = 0; i < list.length; i++) {
      if (req.body.productId === list[i]) {
        flag = 1;
      }
    }
    if (flag === 0) {
      list.push(req.body.productId);
      let saveItem = await entries.save();
      res.status(200).send(saveItem);
    } else res.status(200).send("product already existed in wishlist");
  } catch {
    console.log("kuch dikkat hai bhai product add nhi ho raha");
  }
});

module.exports = router;
