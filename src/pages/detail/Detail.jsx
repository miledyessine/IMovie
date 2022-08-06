import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import axios from 'axios';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import StarRating from '../../components/star-rating/StarRating';

import MovieList from '../../components/movie-list/MovieList';

import {useCookies} from 'react-cookie';

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    const [token,setToken]=useCookies(["user-token"]);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    

    const rated=(rate)=> {

        const rateInfo={
            data:{
                rate,
                movieId:item.id
            }
        }

        const add= fetch('http://localhost:1337/api/ratings?populate=%2A',{
            method: 'POST',
            headers: {
                'Authorization':'Bearer '+token["user-token"],
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(rateInfo)
        }).then( (response) => {
            console.log(response.json());
        })
    }

    

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                    
                                </div>
                                <h2>Rate it: <StarRating rating={rated}/></h2>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
