import styles from './Card.module.scss'
import React from 'react';

function Card({imageUrl,title,price,onFavorite,onPlus}) {
   const [isAdded,setIsAdded] = React.useState();

   const onClickPlus = () =>{
      onPlus({imageUrl,title,price})
      setIsAdded(!isAdded);
   }


   return (
      <div className={styles.card}>
         <div className={styles.favorite} onClick={onFavorite}>
            <img width={15} src="/img/heart-unliked.svg" alt="Unliked" />
         </div>
         <img width={133} height={133} src={imageUrl} alt="Sneakers" />
         <h5>{title}</h5>
         <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
               <span>Цена:</span>
               <b>{price} руб.</b>
            </div>
               <img className={styles.plus} onClick={onClickPlus}  width={20}
               src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg" } alt="Plus" />
         </div>
      </div>
   )
}

export default Card;