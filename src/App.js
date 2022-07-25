import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";

function App(props) {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue,setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(()=>{
    fetch('https://62dd89ca79b9f8c30aabc074.mockapi.io/items')
  .then((res) => {
    return res.json();
  }).then((json) => {
    setItems(json);
  })
  },[])

  const onAddToCart =(obj)=>{
    setCartItems(prev => [...prev,obj])
  }

  const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={()=> setCartOpened(false)}/>}
      <Header onClickCart={()=> setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу:  '${searchValue}'`: 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img width={20} src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={()=> setSearchValue('')} className="clear" width={20} src="/img/btn-remove.svg" alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map(item=>(
            <Card
            key={item.title}
            title={item.title} 
            price={item.price} 
            imageUrl={item.imageUrl} 
            onFavorite={()=> console.log('add Favorite')}
            onPlus={(obj)=> onAddToCart(obj)}/> 
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
