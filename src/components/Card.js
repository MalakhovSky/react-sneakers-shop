function Card(props) {
   return (
      <div className="card">
         <div className="favorite">
            <img width={15} src="/img/heart-unliked.svg" alt="Unliked" />
         </div>
         <img width={133} src="/img/sneakers/1.jpg" alt="Sneakers" />
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
   )
}

export default Card;