import styles from './Card.module.scss'
import React from 'react';
import ContentLoader from "react-content-loader"

function Card({id,imageUrl,title,price,onFavorite,onPlus,favorited = false,added=false,loading = false}) {
   const [isAdded,setIsAdded] = React.useState(added);
   const [isFavorite, setIsFavorite] = React.useState(favorited);

   const onClickPlus = () =>{
      onPlus({id,imageUrl,title,price})
      setIsAdded(!isAdded);
   }

   const onClickFavorite = () => {
      onFavorite({id,title,imageUrl,price})
      setIsFavorite(!isFavorite);
   }

   return (
      <div className={styles.card}>
         {
            loading? <ContentLoader 
            speed={3}
            width={220}
            height={330}
            viewBox="0 0 220 330"
            backgroundColor="#fcfcfc"
            foregroundColor="#eae8f2"
          >
            <rect x="0" y="0" rx="37" ry="37" width="220" height="330" />
          </ContentLoader> : <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img width={15} src={isFavorite ? "/img/heart-liked.svg" :"/img/heart-unliked.svg"} alt="Unliked" />
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
         </div></>
         }
        
      </div>
   )
}

export default Card;