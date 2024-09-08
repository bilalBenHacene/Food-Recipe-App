import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Clock from "./../../assets/clock.svg";
import AddFavorite from "../../component/addFavorite";
import { GlobalContext } from "../../context";

const Details = () => {
  const { id } = useParams();
  const { handleFavoriteList, favorites } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState([]);
  const fetchDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data?.recipe) setDetails(data.data.recipe);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails(id);
  }, []);

  return (
    <section className="container mx-auto p-10 md:p-20 antialiased ">
      <article className=" flex flex-wrap md:flex-nowrap bg-slate-50 mx-auto w-full group">
        <img
          className="w-full h-auto object-cover md:w-1/4"
          src={details?.image_url}
          alt=""
        />
        <div className="w-full">
          <div className="p-5 pb-10">
            <h1 className="text-2xl font-semibold text-gray-800 mt-4">
              {details?.title}
            </h1>
            <section className="text-xl text-gray-400 mt-2 leading-relaxed">
              <h3 className="font-semibold text-2xl uppercase italic text-left p-3">
                Ingredients :
              </h3>
              <ul className="p-3 has-[li]:text-left list-disc">
                {details?.ingredients?.map((item, index) => (
                  <li key={index}>
                    {item.quantity ? `[${item.quantity} ${item.unit}] :` : ""}
                    {item.description}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="bg-blue-50 p-5 w-full">
            <div className="sm:flex sm:justify-between">
              <div>
                <div className="text-lg text-gray-900 font-bold">
                  {details?.publisher}
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    <img src={Clock} alt="" className="h-5 w-5" />
                  </div>
                  <div className="text-gray-600 text-sm md:text-base mt-1">
                    {` ${details.cooking_time} m`}
                  </div>
                </div>
              </div>
              <button className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-purple-500 hover:bg-purple-400 font-bold text-white md:text-lg rounded-lg shadow-md flex items-center justify-center gap-x-1" onClick={()=>handleFavoriteList(details)}>
               
                <AddFavorite fillColor={(favorites.indexOf(details) ==-1)?"#ffffff" :"#4f46e5"} />
                <span>{(favorites.indexOf(details) ==-1)? "Add":"Remove"}</span>
              </button>
            </div>
            <div className="mt-3 text-gray-600 text-sm md:text-sm">
              *Places to visit:{" "}
              <a
                href={details?.source_url}
                target="_blank"
                className="hover:text-blue-500 hover:underline"
              >
                {details?.source_url}
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Details;
