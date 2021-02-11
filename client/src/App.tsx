import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import { MovieList } from "./Components/MovieList";
import {
  addNewWatcher,
  getAllWatchers,
  getMovieByTitle,
  getWatcherList,
  loginWatcher,
  pingWatcher,
  searchByTitle
} from "./Utils/API";
import {LoginBox} from "./Components/LoginBox";
import {Profile} from "./Components/Profile";
import {Footer} from "./Components/Footer";
import {Navbar} from "./Components/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class Homepage extends React.Component {
  render() {
    return null;
  }
}

function App() {
  const [movie, setMovie] = useState<MovieInfo>({ Title: 'Yeah'} as MovieInfo);
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<MovieInfo[]>([]);
  const [watchers, setWatchers] = useState<Watcher[]>([]);
  const [token, setToken] = useState('');

  const handleKeypress = (e: any) => {

    console.log(e.code);
    if(e.code === 'Enter')
      handleSearch();
  }

  const handleSearch = () => {
    searchByTitle(search, setResults);
  }

  return (
    <div className="app">
      <BrowserRouter>
        {/*<input className='searchBar' placeholder='Search for a movie...' value={search} onKeyPress={handleKeypress} onChange={(e) => setSearch(e.target.value)} />*/}
        {/*<MovieList movies={results}/>*/}
        {/*<button onClick={() => getAllWatchers(setWatchers)}>See All Users</button>*/}
        {/*<ul>*/}
        {/*  { watchers.map((i: Watcher) => <li>{i.uid}</li>)}*/}
        {/*</ul>*/}
        <Navbar/>
        <div className="content">
          <Switch>
            <Route path='/login' component={LoginBox}/>
            <Route path='/watcher/:id' component={Profile}/>
            <Route path='*'>
              <Homepage/>
            </Route>
          </Switch>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
