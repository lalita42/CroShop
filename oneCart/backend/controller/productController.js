import { uploadOnCloudinary } from "../config/cloudinary.js"
import { Product } from "../model/productModel.js"


export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    console.log("📦 Request Body:", req.body);
    console.log("📷 Uploaded Files:", req.files);

    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
      return res.status(400).json({ message: "All 4 images are required" });
    }

    // ✅ Parse sizes safely
    let parsedSizes = [];
    if (sizes) {
      try {
        parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
      } catch (err) {
        return res.status(400).json({ message: "Invalid sizes format. Must be JSON array or array." });
      }
    }

    // ✅ Custom validation for Laddu Gopal Dress
    if (category === "Laddu Gopal Dress" && (!parsedSizes || parsedSizes.length === 0)) {
      return res.status(400).json({ message: "Sizes are required for Laddu Gopal Dress" });
    }

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);
    const image4 = await uploadOnCloudinary(req.files.image4[0].path);

    const ProductData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes.length > 0 ? parsedSizes : undefined, // only save if present
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(ProductData);
    return res.status(201).json(product);
  } catch (error) {
    console.error("❌ AddProduct Error:", error.message);
    return res.status(500).json({ message: `AddProduct error: ${error.message}` });
  }
};

export const listProduct = async (req, res)=>{
    try{
    const product = await Product.find()
    return res.status(200).json(product)

  }catch (error){
    console.log("ListProduct error")
    return res.status(500).json({message:`ListProduct error ${error}`})

  }
}

export const removeProduct = async (req,res)=> {
  try{
    let {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    return res.status(200).json(product)
  } catch(error){
    return res.status(500).json({message:`RemoveProduct error ${error}`})
  }
}