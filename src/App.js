
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import Favorites from "./pages/Favorites";
import AppContext from "./context";



function App(props) {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);



  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/items')
      const cartResponse = await axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/favorites')

      setIsLoading(false);
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    }
    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://62dd89ca79b9f8c30aabc074.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://62dd89ca79b9f8c30aabc074.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj])
      }
    } catch (error) {

    }
  }
  const onRemoveItem = (id) => {
    axios.delete(`https://62dd89ca79b9f8c30aabc074.mockapi.io/cart/${id}`);
    setCartItems(prev => [...prev.filter(item => item.id !== id)])
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
    console.log(event.target.value)
  }

  const onAddToFavorite = async (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://62dd89ca79b9f8c30aabc074.mockapi.io/favorites/${obj.id}`);
    } else {
      const { data } = await axios.post('https://62dd89ca79b9f8c30aabc074.mockapi.io/favorites', obj);
      setFavorites((prev) => [...prev, data]);
    }

  }

  const isItemAdded = (id) =>{
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{cartItems,favorites,items,isItemAdded}}>
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading} />
          }>
        </Route>
        <Route path="/favorites"
          element={
            <Favorites onAddToFavorite={onAddToFavorite} />}>
        </Route>
      </Routes>

    </div>
    </AppContext.Provider>
  );
}

export default App;
