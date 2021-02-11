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
import {Homepage} from "./Components/Homepage";
import {LoginBox} from "./Components/LoginBox";
import {Profile} from "./Components/Profile";
import {Footer} from "./Components/Footer";
import {Navbar} from "./Components/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  const [token, setToken] = useState('');

  return (
    <div className="app">
      <BrowserRouter>
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
