import React, { useState } from "react";
import { ProductList } from "./ProductList";

export const Products = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("cloth");
  const [error, setError] = useState(false);

  /** this function checks simple validation and enters the data into the database using the fetch */
  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !brand || !price || !category) {
      setError(true);
      return false;
    }

    const userid = JSON.parse(localStorage.getItem("admin"))._id;
    const data = {
      name,
      brand,
      price,
      category,
      userid,
    };
    const prod = fetch("http://localhost:3400/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="p-12 bg-slate-300 w-full">
      <h1 className="text-2xl">Product</h1>
      <ProductList />
      <br></br>
      <section className="flex h-1/2 w-full flex-row j items-center border-t-2 border-white">
        <form className="flex flex-col  w-full justify-start items-start space-y-1">
          <p className="text-md">Add New Product</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of Product"
            className="w-1/3 border rounded-md p-2"
          />
          {error && !name && (
            <span className="text-sm text-red-600 ">enter the prod_name</span>
          )}

          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Name of Brand"
            className="w-1/3 border rounded-md p-2"
          />
          {error && !brand && (
            <span className="text-sm text-red-600 ">enter the Brand name</span>
          )}

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-1/3 border rounded-md p-2"
          />
          {error && !price && (
            <span className="text-sm text-red-600 ">enter the price </span>
          )}

          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-1/3 border rounded-md p-2"
          >
            <option value="cloth">cloth</option>
            <option value="shoes">shoes</option>
            <option value="home appliance">home appliance</option>
            <option value="electronic gadgetes">electronic gadgetes</option>
            <option value="Beauty">Beauty</option>
          </select>
          {error && !category && (
            <span className="text-sm text-red-600 ">Select the category</span>
          )}
          <br />
          <button
            onClick={handleAdd}
            className=" bg-blue-950 text-white w-1/3 rounded-md p-2 uppercase"
          >
            Add
          </button>
        </form>
      </section>
    </section>
  );
};
