import { Link } from "react-router-dom";

function Header(props) {
   return (
      <header className="d-flex justify-between align-center p-40">
         <div className="d-flex align-center">
            <Link to='/'>
               <img width={40} src="/img/logo.png" alt="Logo" />
               <div>
                  <h3 className="text-uppercase">Boldej Sneakers</h3>
                  <p>Магазин болдежных кросовок</p>
               </div>
            </Link>
         </div>
         <div>
            <ul className="d-flex">
               <li onClick={props.onClickCart} className="mr-30 cu-p">
                  <img width={18} src="/img/cart.svg" alt="Cart" /><span >1205 руб.</span>

               </li>
               <li>
                  <Link to='/favorites'>
                     <img width={18} src="/img/heart-unliked.svg" alt="Favorite" />
                  </Link>
               </li>
               <li><img width={18} src="/img/user.svg" alt="User" />
               </li>
            </ul>
         </div>
      </header>
   )
}
export default Header;
