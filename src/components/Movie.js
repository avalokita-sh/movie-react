import React from "react";

const PLACEHOLDER_IMG = "https://i.pinimg.com/originals/2f/ec/bf/2fecbfb2b7b34535d44d3bbe2e893eba.png";

const Movie = ({ movie, toggleFromFavorites }) => {
  const poster =
    movie.Poster === "N/A" ? PLACEHOLDER_IMG : movie.Poster;
  return (
    <div className="card movie">
      <div className="image">
        <img
            width="200"
            alt={movie.Title}
            src={poster}
          />
      </div>
      <div className="content">
        <div className="description">
          <span className="right floated" onClick={() => toggleFromFavorites(movie)}>
            <button className="ui icon button">
              <i className="heart icon" aria-hidden="true"></i>
            </button>
          </span>
          <span>
            {movie.Year}
          </span>
        </div>
      </div>
      <div className="content">
        {movie.Title}
      </div>
    </div>
    );
};


export default Movie;