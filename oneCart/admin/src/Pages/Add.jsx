import React, { useState, useEffect, useContext } from "react";
import { Sidebar } from "../Component/Sidebar";
import { Nav } from "../Component/Nav";
import upload from "../assets/Upload.jpg";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthContext";

export const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Crochet");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  // ✅ Category & Subcategory options
  const categoryOptions = {
    Crochet: ["Toys", "Bags", "Home Decor", "Clothing"],
    "Laddu Gopal Dress": ["Daily Wear", "Festival Special", "Designer", "Accessories"],
    Accessories: ["Mukut", "Mala", "Flute", "Jhula"],
  };

  // ✅ Sizes only for Laddu Gopal Dress
  const ladduSizes = ['2"', '3"', '4"', '5"', '6"', '7"', '8"'];

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      const result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        { withCredentials: true }
      );

      console.log("✅ Product added:", result.data);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setBestseller(false);
        setCategory("Crochet");
        setSubCategory("");
        setSizes([]);
      }
    } catch (error) {
      console.log("❌ Error adding product:", error.message);
    }
  };

  // cleanup blob URLs
  useEffect(() => {
    return () => {
      image1 && URL.revokeObjectURL(image1);
      image2 && URL.revokeObjectURL(image2);
      image3 && URL.revokeObjectURL(image3);
      image4 && URL.revokeObjectURL(image4);
    };
  }, [image1, image2, image3, image4]);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative">
      <Nav />
      <Sidebar />
      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]">
        <form
          onSubmit={handleAddProduct}
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white py-[25px]">
            Add Product page
          </div>

          {/* Upload Images */}
          <p className="text-[20px] md:text-[25px] font-semibold">
            Upload Image
          </p>
          <div className="w-[100%] h-[100%] flex items-center justify-start gap-4 flex-wrap">
            {[1, 2, 3, 4].map((num) => (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#4d61f7]"
              >
                <img
                  src={
                    eval(`image${num}`)
                      ? URL.createObjectURL(eval(`image${num}`))
                      : upload
                  }
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#d1d1d1] border-[2px]"
                />
                <input
                  type="file"
                  id={`image${num}`}
                  hidden
                  onChange={(e) => eval(`setImage${num}(e.target.files[0])`)}
                  required
                />
              </label>
            ))}
          </div>

          {/* Product Name */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Product Description */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Description
            </p>
            <textarea
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category & Subcategory */}
          <div className="w-[80%] flex items-center gap-[10px] flex-wrap">
            {/* Category */}
            <div className="md:w-[30%] w-[100%] flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Product Category
              </p>
              <select
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory(categoryOptions[e.target.value][0]);
                  setSizes([]);
                }}
                required
              >
                {Object.keys(categoryOptions).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category */}
            <div className="md:w-[30%] w-[100%] flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Sub-Category
              </p>
              <select
                className="bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                {categoryOptions[category]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Price
            </p>
            <input
              type="number"
              placeholder="₹2000"
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Product Sizes (only for Laddu Gopal Dress) */}
          {category === "Laddu Gopal Dress" && (
            <div className="w-[80%] flex flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold">
                Product Size (inches)
              </p>
              <div className="flex items-center justify-start gap-[15px] flex-wrap">
                {ladduSizes.map((size) => (
                  <div
                    key={size}
                    className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${
                      sizes.includes(size)
                        ? "bg-green-400 text-black border-[#46d1f7]"
                        : ""
                    }`}
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((item) => item !== size)
                          : [...prev, size]
                      )
                    }
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bestseller */}
          <div className="w-[80%] flex items-center gap-[10px] mt-[20px]">
            <input
              type="checkbox"
              id="checkbox"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
              className="w-[25px] h-[25px] cursor-pointer"
            />
            <label
              htmlFor="checkbox"
              className="text-[18px] md:text-[22px] font-semibold"
            >
              Add to BestSeller
            </label>
          </div>

          {/* Submit */}
          <button
            className="w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7]
            flex items-center justify-center gap-[10px] text-black
            active:bg-slate-700 active:text-white active:border-[2px] border-white"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
