
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import Favorites from "./pages/Favorites";

function App(props) {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([])

  React.useEffect(() => {
    axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/items').then((res) => {
      setItems(res.data);
    })
    axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    })
    axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://62dd89ca79b9f8c30aabc074.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj])
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

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart} />
          }>
        </Route>
        <Route path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
