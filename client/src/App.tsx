import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import { MovieList } from "./Components/MovieList";
import {addNewWatcher, getAllWatchers, getMovieByTitle, getWatcherList, pingWatcher, searchByTitle} from "./Utils/API";
import {LoginBox} from "./Components/LoginBox";

function App() {
  const [movie, setMovie] = useState<MovieInfo>({ Title: 'Yeah'} as MovieInfo);
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<MovieInfo[]>([]);

  const handleKeypress = (e: any) => {

    console.log(e.code);
    if(e.code === 'Enter')
      handleSearch();
  }

  const handleSearch = () => {
    searchByTitle(search, setResults);
    getAllWatchers();
  }

  return (
    <div className="App">
        {/*<input className='searchBar' placeholder='Search for a movie...' value={search} onKeyPress={handleKeypress} onChange={(e) => setSearch(e.target.value)} />*/}
        {/*<MovieList movies={results}/>*/}
        <LoginBox/>
      <div>footer</div>
    </div>
  );
}

export default App;
