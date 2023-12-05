import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import tmdbApi, { category } from '../../api/tmdbApi';

const MovieList = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {language: 'fr-FR'};

            if(props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                    
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        };
        getList();
    }, []);

    return (
        <div className='movieList'>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {
                    items.map(item => (
                        <SwiperSlide key={item.id}>
                            {(item.overview) ? <Card movie={item} /> : console.log('No overview')}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList