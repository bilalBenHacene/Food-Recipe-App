import React, { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const Context = ({ children }) => {
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const handleFavoriteList = (item) => {
    let copyList = [...favorites];
    let keys=copyList.map(elt=>elt.id)
    if (keys.indexOf(item.id) !== -1)
      copyList = copyList.filter((els) => els.id !== item.id);
    else copyList.push(item);
    setFavorites([...copyList]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
      );
      const data = await response.json();
      if (data?.data?.recipes) setRecipes(data.data.recipes);
      
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setSearchParams("");
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        loading,
        recipes,
        setSearchParams,
        handleSubmit,
        handleFavoriteList,
        favorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
