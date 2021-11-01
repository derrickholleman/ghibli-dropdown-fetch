import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movieData, setMovieData] = useState({});
  const [movieId, setMovieId] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    async function loadMovies() {
      try {
        const moviesRes = await axios.get(
          `https://ghibliapi.herokuapp.com/films/${movieId}`,
          { signal: abortController.signal }
        );
        const moviesJSON = moviesRes.data;
        setMovieData(moviesJSON);
      } catch (err) {
        console.error(err);
      }
    }

    loadMovies();

    return () => {
      abortController.abort();
    };
  }, [movieId]);

  const handleChange = (e) => {
    setMovieId(e.target.value);
  };

  return (
    <div className="App">
      <h1>Get Info About A Ghibli Movie</h1>

      <select id="dropdown-menu" onChange={handleChange}>
        <option value="">-- Select a movie --</option>
        <option value="2baf70d1-42bb-4437-b551-e5fed5a87abe">
          Castle In The Sky
        </option>
        <option value="12cfb892-aac0-4c5b-94af-521852e46d6a">
          Grave of the Fireflies
        </option>
        <option value="58611129-2dbc-4a81-a72f-77ddfc1b1b49">
          My Neighbor Totoro
        </option>
        <option value="ea660b10-85c4-4ae3-8a5f-41cea3648e3e">
          Kiki's Delivery Service
        </option>
        <option value="4e236f34-b981-41c3-8c65-f8c9000b94e7">
          Only Yesterday
        </option>
        <option value="ebbb6b7c-945c-41ee-a792-de0e43191bd8">
          Porco Rosso
        </option>
        <option value="1b67aa9a-2e4a-45af-ac98-64d6ad15b16c">Pom Poko</option>
        <option value="dc2e6bd1-8156-4886-adff-b39e6043af0c">
          Sprited Away
        </option>
      </select>

      {movieData.id && (
        <div>
          <p>
            {movieData.title} ({movieData.release_date})
          </p>
          <p>{movieData.description}</p>
          <p>{movieData.director}</p>
          <img src={movieData.image} alt={`${movieData.title} poster`} />
        </div>
      )}
    </div>
  );
}

export default App;
