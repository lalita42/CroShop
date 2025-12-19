import React, { useContext, useEffect, useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { Titile } from "../Component/Titile";
import { Card } from "../Component/Card";
import { ShopDataContext } from "../Context/ShopContext";

export const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { product, search, showSearch } = useContext(ShopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // ✅ Updated category & sub-category options
  const categoryOptions = {
    Crochet: ["Toys", "Bags", "Home Decor", "Clothing"],
    "Laddu Gopal Dress": ["Daily Wear", "Festival Special", "Designer", "Accessories"],
    Accessories: ["Mukut", "Mala", "Flute", "Jhula"],
  };

  // ✅ Handle Category Selection
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ✅ Handle SubCategory Selection
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ✅ Apply filters
  const applyFilter = () => {
    let productCopy = product.slice();

    // Search filter
    if (showSearch && search) {
      productCopy = productCopy.filter(
        (item) =>
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // SubCategory filter
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productCopy);
  };

  // ✅ Sorting logic
  const sortProducts = () => {
    let fbCopy = filterProduct.slice();

    switch (sortType) {
      case "low-high":
        setFilterProduct(fbCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(product);
  }, [product]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[rgb(12,32,37)] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2] pb-[110px]">
      {/* Sidebar */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${
          showFilter ? "h-[65vh]" : "h-[8vh]"
        } p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
        </p>
        {!showFilter && <FaAngleRight className="text-[18px] md:hidden" />}
        {showFilter && <FaAngleDown className="text-[18px] md:hidden" />}

        {/* Category Filter */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>

          <div className="w-[230px] flex items-start justify-center gap-[10px] flex-col">
            {Object.keys(categoryOptions).map((cat) => (
              <p
                key={cat}
                className="flex items-center justify-center gap-[10px] text-[16px] font-light"
              >
                <input
                  type="checkbox"
                  value={cat}
                  className="w-3"
                  onChange={toggleCategory}
                />
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">SUB-CATEGORIES</p>

          <div className="w-[230px] flex items-start justify-center gap-[10px] flex-col">
            {Object.values(categoryOptions)
              .flat()
              .map((sub) => (
                <p
                  key={sub}
                  className="flex items-center justify-center gap-[10px] text-[16px] font-light"
                >
                  <input
                    type="checkbox"
                    value={sub}
                    className="w-3"
                    onChange={toggleSubCategory}
                  />
                  {sub}
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-[20%] md:py-[10px]">
        <div className="md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]">
          <Titile text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            name="id"
            className="bg-slate-600 w-[60%] md:w-[150px] px-[10px] py-[10px] text-white rounded-lg hover:border-[#d46d1f] border-[2px]"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="lg:w-[80vh] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]">
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className="text-white text-[18px]">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
