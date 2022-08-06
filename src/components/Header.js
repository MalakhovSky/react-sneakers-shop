import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import React from "react";

function Header(props) {
   const {totalPrice} = useCart();



   return (
      <header className="d-flex justify-between align-center p-40">
         <Link to='/'>
            <div className="d-flex align-center">
               <img width={40} src="/img/logo.png" alt="Logo" />
               <div>
                  <h3 className="text-uppercase">Boldej Sneakers</h3>
                  <p>Магазин болдежных кросовок</p>
               </div>
            </div>
         </Link>
         <div>
            <ul className="d-flex">
               <li onClick={props.onClickCart} className="mr-30 cu-p">
                     <img width={18} src="/img/cart.svg" alt="Cart" /><span >{totalPrice} руб.</span>
               </li>
               <li>
                  <Link to='/favorites'>
                     <img width={18} src="/img/heart-unliked.svg" alt="Favorite" />
                  </Link>
               </li>
               <li><Link to='/orders'>
               <img width={18} src="/img/user.svg" alt="User" />
                  </Link>
                  
               </li>
            </ul>
         </div>
      </header>
   )
}
export default Header;
