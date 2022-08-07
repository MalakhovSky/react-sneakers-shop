
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";



function App(props) {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);



  React.useEffect(() => {
    async function fetchData() {
      try{

        setIsLoading(true);
        const itemsResponse = await axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/items')
      const cartResponse = await axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://62dd89ca79b9f8c30aabc074.mockapi.io/favorites')

      setIsLoading(false);
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    }catch(error){
      alert('ошибка при запросе данных')
    }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62dd89ca79b9f8c30aabc074.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj])
        const {data} =  await axios.post('https://62dd89ca79b9f8c30aabc074.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map((item) =>{
          if (item.parentId === data.parentId){
              return{
                ...item,
                id:data.id
              }
          }
          return item;
        }))
      }
    } catch (error) {
      console.log('Не добавилось в корзину')
    }
  }
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62dd89ca79b9f8c30aabc074.mockapi.io/cart/${id}`);
    setCartItems(prev => [...prev.filter(item => +item.id !== +id)])
    } catch (error) {
      console.log('Ошибка при удалении из корзины')
    }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
    console.log(event.target.value)
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => +favObj.id === +obj.id)) {
        axios.delete(`https://62dd89ca79b9f8c30aabc074.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev => [...prev.filter(item => +item.id !== +obj.id)]));
      } else {
        const { data } = await axios.post('https://62dd89ca79b9f8c30aabc074.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log('избранное не добавилось')
    }
    

  }

  const isItemAdded = (id) =>{
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{cartItems,favorites,items,isItemAdded,onAddToFavorite,setCartOpened,setCartItems,onAddToCart}}>
    <div className="wrapper clear">
      
      <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
      
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
            <Favorites/>}>
        </Route>
        <Route path="/orders"
          element={
            <Orders/>}>
        </Route>
      </Routes>

    </div>
    </AppContext.Provider>
  );
}

export default App;
