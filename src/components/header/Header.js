import React, { useEffect, useState } from "react";
import tmdbApi, { movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { gsap } from "gsap";
import "../../styles/components_styles/header.scss";
import { useRef } from "react";


const Header = () => {

  // Init state
  const [movies, setMovies] = useState([]);
  const [item, setItem] = useState(null);
  const [credits, setCredits] = useState(null);

  // Get params
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      const params = {page: 1, language: "fr-FR"};
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {params});
        setMovies(response.results.slice(0, 8));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  const getDetails = async (id) => {
    const response = await tmdbApi.detail("movie", id, {params:{}});
    setItem(response);
  }

  useEffect(() => {
    if(movies.length > 0){
      getDetails(movies[current].id);
    }
  }, [current, movies]);

  // Get Credits
  const getCredits = async (id) => {
    const response = await tmdbApi.credits("movie", id);
    setCredits(response);
  }

  // Define the elements to animate
  const backgroundRef = useRef(null);
  const posterRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {

    // Create an animation timeline
    const tl = gsap.timeline();

    // Reset the timeline
    tl.clear();

    // Add animations to the timeline
    tl.fromTo(
      backgroundRef.current,
      { opacity: 0 },
      { opacity: 1,delay: .6, duration: 1 }
    );

    tl.fromTo(
      posterRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, delay: 1, duration: .5 }
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, delay: 1.2, duration: .5 },
    );

    // Start the animation timeline
    tl.play();
  }, [current]);

  useEffect(() => {
    if(movies.length > 0){
      getCredits(movies[current].id);
    }
  }, [current, movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current + 1) % movies.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) {
    return null;
  }

  const currentMovie = movies[current];
  
  return (
    <>
      <header>
        <div className="background" ref={backgroundRef}>
          <img
            src={apiConfig.originalImage(currentMovie.backdrop_path)}
            alt={currentMovie.title}
          />
        </div>
        <div className="content">
          <div className="left" ref={posterRef}>
            <img
              src={apiConfig.w500Image(currentMovie.poster_path)}
              alt=""
            />
          </div>
          <div className="right" ref={contentRef}>
            <h1>{currentMovie.title}</h1>
            <div className="genres">
              {
                item && item.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))
              }
            </div>
            <div className="rating">
              <div className="circle">
                <div className="outer">
                  <div className="inner">
                    <span>{Math.floor(currentMovie.vote_average)}</span>
                  </div>
                </div>
              </div>
              <p>Note des utilisateurs</p>
            </div>
            <div className="overview">
              <h3>Synopsis</h3>
              <p>{currentMovie.overview.substring(0, 300) + "..."}</p>
            </div>
            <div className="actor">
              <div className="actorList">
                {
                  credits && credits.cast.slice(0, 8).map((actor) => (
                    <div className="actorItem" key={actor.id}>
                      <p>{actor.name}</p>
                      <span>{actor.character}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;