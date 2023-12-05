import React from "react";
import Header from "../components/header/Header";
import MovieList from "../components/movieList/MovieList";
import { category, movieType, tvType } from "../api/tmdbApi";
import { Link } from "react-router-dom";
import "../styles/accueil.scss"
import { OutlineButton } from "../components/button/Button";

const Accueil = () => {
  document.title = "React Movies | Accueil";

  return (
    <>
      <Header />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Sortie cette année</h2>
            <Link to="/movie">
              <OutlineButton>Voir plus</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Les mieux notés</h2>
            <Link to="/movie">
              <OutlineButton>Voir plus</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Series Télévisés</h2>
            <Link to="/tv">
              <OutlineButton>Voir plus</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Les mieux notés</h2>
            <Link to="/tv">
              <OutlineButton>Voir plus</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default Accueil;