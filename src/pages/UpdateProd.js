import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
export const UpdateProd = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();

  const getData = async () => {
    const res = fetch(`http://localhost:3400/add-product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setPrice(data.price);
        setBrand(data.brand);
        setCategory(data.category);
      });
  };

  const handleUpdate = (e) => {
    const userid = JSON.parse(localStorage.getItem("admin"))._id;
    const data = {
      name,
      brand,
      price,
      category,
      userid,
    };
    const prod = fetch(`http://localhost:3400/add-product/${params._id}`, {
      method: "PUT",
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="flex  flex-col j items-center border-t-2 border-white p-12 bg-slate-300 w-full space-y-5">
      <h1 className="text-2xl ">Update Products</h1>
      <form className="flex flex-col  w-full items-center space-y-1">
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
          defaultValue="cloth"
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
          onClick={handleUpdate}
          className=" bg-blue-950 text-white w-1/3 rounded-md p-2 uppercase"
        >
          Add
        </button>
      </form>
    </section>
  );
};
