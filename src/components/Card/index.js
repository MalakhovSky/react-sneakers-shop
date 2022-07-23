import styles from './Card.module.scss'
import React from 'react';

function Card(props) {
   const [isAdded,setIsAdded] = React.useState();
   const onClickPlus = () =>{
      setIsAdded(true);
   }
   return (
      <div className={styles.card}>
         <div className={styles.favorite} onClick={props.onFavorite}>
            <img width={15} src="/img/heart-unliked.svg" alt="Unliked" />
         </div>
         <img width={133} src={props.imageUrl} alt="Sneakers" />
         <h5>{props.title}</h5>
         <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
               <span>Цена:</span>
               <b>{props.price} руб.</b>
            </div>
               <img className={styles.plus} onClick={onClickPlus}  width={20}
               src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg" } alt="Plus" />
         </div>
      </div>
   )
}

export default Card;