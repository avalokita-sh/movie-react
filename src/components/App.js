import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./Movie";
import Search from "./Search";
import useLocalStorage from '../hooks/useLocalStorage';

const OMDB_API_URL = "https://www.omdbapi.com/?s=sea&apikey=f4ef1fe6";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [showFavorites, setShowFavorites] = useState(false);
	const [myList, setMylist] = useLocalStorage('myList',[]);
  	const [errorMessage, setErrorMessage] = useState(null);  	

	useEffect(() => {
		fetch(OMDB_API_URL)
		  .then(response => response.json())
		  .then(res => {
		    setMovies(res.Search);
		    setLoading(false);
		  });
	}, []);

	useEffect(() => {
    	setMylist(myList);
	},[myList]);

    const search = (searchTerm,searchType) => {
	    setLoading(true);
	    setErrorMessage(null);

	    fetch(`https://www.omdbapi.com/?s=${searchTerm}&type=${searchType}&apikey=f4ef1fe6`)
	      .then(response => response.json())
	      .then(res => {
	        if (res.Response === "True") {
	          setMovies(res.Search);
	          setLoading(false);
	        } else {
	          setErrorMessage(res.Error);
	          setLoading(false);
	        }
	    });
  	};

    const toggleFromFavorites = (movie) => {	
    	let list = myList;
    	let found = list.find(fav => fav.imdbID === movie.imdbID);
    	if(!found){
    		//if movie not in my favorites list then add
    		setMylist([...list,movie]);
    	} else {
    		//if movie is in my favorites list then remove
	    	let myListDetails = list.filter(fav => fav.imdbID !== movie.imdbID);
	    	setMylist(myListDetails);
    	} 
    }
    return (
     <div className="App">
      <div className="App-header">
      	<div className="active item">
	      <h4 onClick={() => setShowFavorites(false)}>Home</h4>
	    </div>
	    <h2 onClick={() => setShowFavorites(false)}>Movies</h2>
	    <div className="right menu">
	      <h4 onClick={() => setShowFavorites(true)}>Favorites</h4>
	    </div>
	  </div>
      <Search search={search} />
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
        <div className="ui cards movies">
          {!showFavorites && movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} toggleFromFavorites={toggleFromFavorites} />
          ))}
          {showFavorites && myList.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} toggleFromFavorites={toggleFromFavorites}/>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default App;