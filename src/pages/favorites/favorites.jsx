import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../context";
import { Link } from "react-router-dom";
import RecipeItem from "../../component/recipeItem";

const Favorites = () => {
  const { favorites } = useContext(GlobalContext);
  
  return (
    <div
      className={
        favorites && favorites.length > 0
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          : "flex justify-center"
      }
    >
      {favorites && favorites.length > 0 ? (
        favorites.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <p>
          Favorites is empty ....
          <Link to={"/"} className="hover:underline hover:text-blue-500">
            Back To Home
          </Link>
        </p>
      )}
    </div>
  );
};

export default Favorites;
