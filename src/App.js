function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
        <div className="drawer">
          <h2 className="mb-30">Корзина</h2>
          
          <div className="items">
            
          <div className="cartItem d-flex align-center mb-20">
           
           <div style={{backgroundImage: 'url(/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
           <div className="mr-20">
             <p className="mb-5">Кроссовки adidas Originals, core black / core black / grey five</p>
             <b>12 999 руб.</b>
           </div>
           <img className="removeBtn" width={20} src="/img/btn-remove.svg" alt="Remove" />
         </div>
         <div className="cartTotalBlock">
         <ul >
              <li className="d-flex justify-between">
                <span>Итого:</span>
                <div></div>
                <b>21498 руб.</b>
              </li>
              <li className="d-flex justify-between">
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб.</b>
                </li>
            </ul>
            <button className="greenButton">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>


      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} src="/img/logo.png" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p>Магазин болдежных кросовок</p>
          </div>
        </div>
        <div>
          <ul className="d-flex">
            <li className="mr-30">
              <img width={18} src="/img/cart.svg" /><span>1205 руб.</span>
            </li>
            <li><img width={18} src="/img/user.svg" /></li>
          </ul>
        </div>
      </header>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 >Все кроссовки</h1>
          <div className="search-block d-flex">
            <img width={20} src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex">
          <div className="card">
            <div className="favorite">
              <img width={15} src="/img/heart-unliked.svg" alt="Unliked" />
            </div>
            <img width={133} src="/img/sneakers/1.jpg" />
            <h5>Кроссовки adidas Originals, core black / core black / grey five</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999p</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/img/plus.svg" alt="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
