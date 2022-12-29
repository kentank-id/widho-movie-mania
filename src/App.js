import './App.css';
import { getMovieList, searchMovie } from './api.js'
import { useEffect, useState } from 'react';

const App = () => {

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className='Movie-wrapper'>
          <div className='Movie-title'>{movie.title}</div>
          <img className='Movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
          <div className='Movie-date'>release: {movie.release_date}</div>
          <div className='Movie-rate'>{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if(q.length>3){
      const query = await searchMovie(q)
      setPopularMovies(query.results)
      // console.log({query:query})
    }
  }

  console.log({ popularMovies: popularMovies })

  return (
    <div className="App">
      <header className="App-header">

        <h1>Widho LK21 Mania</h1>

        <input
          placeholder='Search Your Movie...'
          className='Movie-search'
          onChange={({ target }) => search(target.value)}
        />

        <div className='Movie-container'>
          <PopularMoviesList/>
        </div>

      </header>
    </div>
  );
}

export default App;
