import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr =[
  {title: 'Кроссовки adidas Originals, core black', price: 12999, imageUrl:"/img/sneakers/1.jpg"},
  {title: 'Кеды мужские Adidas Superstar, белые ', price: 10999, imageUrl:"/img/sneakers/2.jpg"},
];



function App(props) {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 >Все кроссовки</h1>
          <div className="search-block d-flex">
            <img width={20} src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex">
          {/* <Card title="Кроссовки adidas Originals, core black" price={11990} imageUrl="/img/sneakers/1.jpg"/>
          <Card title="Кеды мужские Adidas Superstar, белые " price={10990} imageUrl="/img/sneakers/2.jpg"/> */}
          {arr.map(obj=>(
            <Card 
            title={obj.title} 
            price={obj.price} 
            imageUrl={obj.imageUrl} 
            onClick={()=> console.log(obj)}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
