import React, { useEffect, useState } from 'react';
import '../styles/components_styles/card.scss';
import apiConfig from '../api/apiConfig';
import tmdbApi from '../api/tmdbApi';

const Card = ({ movie }) => {

    function clickLike(e) {
        let likeIcon = e.target.closest('.likeIcon');
        likeIcon.classList.toggle('active');
    }

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            const params = { language: 'fr-FR' };
            const response = await tmdbApi.getGenres('movie', { params });
            setGenres(response.genres);
        };
        getGenres();
    }, []);

    return (
        <div className='flexItem'>
            <div className="overlay"></div>
            <img src=
                {
                    apiConfig.w500Image(movie.poster_path)
                }
                alt="Poster" />
            <div className='gridItemContent'>
                <div className="headerCard">
                    <div className="title">
                        <h3>
                            {movie && movie.title ? (movie.title.length > 20 ? movie.title.substring(0, 15) + '...' : movie.title) : null}
                            {movie && movie.name ? (movie.name.length > 20 ? movie.name.substring(0, 15) + '...' : movie.name) : null}
                        </h3>
                        <div className="likeIcon" onClick={clickLike}>
                            <i className='bx bxs-heart'></i>
                        </div>
                    </div>
                    <div className="info">
                        <p>
                            Durée:
                            <span>
                                {
                                    // format duration
                                    // Math.floor(duration / 60) + 'h' + duration % 60 + 'min'
                                    // Math.floor(movie.runtime / 60) + 'h' + movie.runtime % 60 + 'min'
                                }
                            </span>
                        </p>
                        <hr />
                        <p>
                            Sortie: <span> 
                            {movie.release_date ? movie.release_date.split('-').reverse().join('-') : movie.first_air_date.split('-').reverse().join('-')}
                                    </span>
                        </p>
                        <hr />
                        <p>
                            Genre: <span>
                                {
                                    // Récupérer le nom du genre
                                    genres.filter(genre => genre.id === movie.genre_ids[0]).map(genre => genre.name)
                                }
                            </span>
                        </p>
                        <hr />
                        <p>Note:<span>{
                            // Math floor pour arrondir la note
                            Math.floor(movie.vote_average) + '/10'
                        }</span></p>
                    </div>
                </div>
                <div className="bodyCard">
                    <p>
                        {movie.overview.substring(0, 150) + '...'}
                    </p>
                </div>
                <div className="footerCard">
                    <button>Details</button>
                    <button>Bande Annonce</button>
                </div>
            </div>
        </div>
    )
}

export default Card