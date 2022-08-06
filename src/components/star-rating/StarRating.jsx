import React,{ useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './star-rating.scss';



const StarRating = (props) => {
    const [rating,setRating] =useState(-1);

    const setRate= rate =>evt=> {
        setRating(rate);
        
    }
    
    const rateClicked = rate =>evt=> {
        props.rating(rate);
    }

    return (
        <div>
            {[...Array(5)].map((star,i)=>{
                return (
                    <FontAwesomeIcon key={i} icon={faStar}
                        className="star"
                        color={rating > i-1 ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={setRate(i)}
                        onMouseLeave={setRate(-1)}
                        onClick={rateClicked(i+1)}
                    />
                );
            })}
        </div>
    );
}

export default StarRating;