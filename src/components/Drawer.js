function Drawer({onClose,onRemove,items = []}) {
   return (
      <div className="overlay">
         <div className="drawer">
            <h2 className="mb-30 d-flex justify-between mb-30">Корзина 
            <img onClick={onClose} width={20} className="cu-p" src="/img/btn-remove.svg" alt="Close"/>
            </h2>

            <div className="items">

               {items.map((obj)=>(
                  <div className="cartItem d-flex align-center mb-20">
                     <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                  <div className="mr-20 flex">
                     <p className="mb-5">{obj.title}</p>
                     <b> {obj.price} руб.</b>
                  </div>
                  <img onClick={()=> onRemove(obj.id)} width={15} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                  </div>
               ))}
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
   )
}


export default Drawer;