import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const [data, setData] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetch("http://localhost:3400/add-product", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  const handleSearch = async (e) => {
    const key = e.target.value;
    setInput(key);
    if (key) {
      const result = await fetch(`http://localhost:3400/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      let data = await result.json();
      console.log(data);
      if (result) {
        setData(data);
      }
    } else {
      getData();
    }
  };

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:3400/delete/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    getData();
  };
  return (
    <>
      <div>
        <input
          className="w-1/2 rounded-md my-2 p-2"
          value={input}
          placeholder="Search (product name, brand , category)"
          onChange={handleSearch}
        ></input>
        <button
          onClick={getData}
          className=" bg-slate-400 mx-2 p-1 rounded-md text-slate-900"
        >
          <RefreshIcon />
        </button>
      </div>
      <section className="w-full rounded-lg ">
        <table className=" border-collapse min-w-full  text-center bg-white  text-sm text-gray-500 rounded-lg">
          <thead className="border font-medium rounded-lg">
            <tr>
              <th scope="col" className=" px-6 py-4">
                id
              </th>
              <th scope="col" className=" px-6 py-4">
                Product Name
              </th>
              <th scope="col" className=" px-6 py-4">
                Brand
              </th>
              <th scope="col" className=" px-6 py-4">
                Category
              </th>
              <th scope="col" className=" px-6 py-4">
                Price
              </th>
              <th scope="col" className=" px-6 py-4">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <>
                    <tr
                      className="transition duration-300 ease-in-out hover:bg-neutral-100"
                      id={item._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {item.brand}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {item.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {item.price}
                      </td>
                      <td>
                        <Link to={"/UpdateProd/" + item._id}>
                          <EditIcon className=" text-blue-950" />
                        </Link>
                        <Link onClick={() => handleDelete(item._id)}>
                          <DeleteIcon className="text-red-600" />
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr>
                <td>Data NOt Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
