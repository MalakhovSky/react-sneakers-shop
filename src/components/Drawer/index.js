import Info from "../Info";
import React from "react";
import styles from './Drawer.module.scss'
import axios from "axios";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] ,opened}) {
  const {cartItems,setCartItems,totalPrice} = useCart();
  const [isOrderCoplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://62dd89ca79b9f8c30aabc074.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62dd89ca79b9f8c30aabc074.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      // alert('Ошибка при создании заказа :(');
      //MockApi have not PUT;
    }
    setIsLoading(false);
  };

  return (
    <div className= {`${styles.overlay} ${opened ? styles.overlayVisible:''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} width={20} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    width={20}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice + Math.round(totalPrice /100 *5)} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice /100 *5)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ
              </button>
            </div>
          </div>
        ) : (
          <Info title={isOrderCoplete ? "Заказ оформлен" : "Корзина пустая"}
            description={isOrderCoplete ? `Заказ #${orderId} скоро будет передан в доставку!` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={isOrderCoplete ? "img/complete-order.svg" : "/img/empty-cart.svg"} />
        )}
      </div>
    </div>
  );
}

export default Drawer;