import React,{ useState, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

import SwiperCore,{Autoplay} from 'swiper';
import {Swiper,SwiperSlide} from 'swiper/react';

import Button ,{OutlineButton}from '../button/Button';

import tmdbApi ,{category,movieType} from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './hero-slide.scss';

import 'swiper/css';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems,setMovieItems]=useState([]);

    useEffect(() => {

        fetch(apiConfig.baseUrl+'movie/'+movieType.popular+'?api_key='+apiConfig.apikey,{
            method: 'GET',
            Headers: {'Accept': 'application/json'}
        }).then(
            response => response.json()
        ).then(response =>setMovieItems(response.results.slice(1,5))
        ).catch(error => console.log(error))



        // const getMovies = async () =>{
        //     const params = {page:1}
        //     try{
        //         const response = await tmdbApi.getMoviesList(movieType.popular,{params});
        //         setMovieItems(response.results.slice(0,4));
        //         console.log(response);
        //     }catch{
        //         console.log('error');
        //     }
        // }
        // getMovies();
    }, []);
    

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidespreview={1}
                autoplay={{delay: 4000}}
            >
                {
                    movieItems.map((item,i)=>(
                        <SwiperSlide key={i}>
                            {({isActive})=>(
                                <HeroSlideItem item={item} className={`${isActive? 'active' : ''}`}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

const HeroSlideItem=props=>{
    let history=useNavigate();
    const item =props.item;

    const background=apiConfig.originalImage(item.backdrop_path?item.backdrop_path:item.poster_path);

    return(
        <div 
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage:`url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={()=>history.push('/movie/'+item.id)}>
                            Rate now
                        </Button>
                        <OutlineButton onClick={()=>console.log('trailer')}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default HeroSlide;