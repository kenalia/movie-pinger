import React, {useState} from 'react';
import { MovieList } from "./MovieList";
import {getAllWatchers, searchByTitle} from "../Utils/API";

import './Homepage.scss';
import {Button} from "antd";

export const Homepage = () => {
    const [movie, setMovie] = useState<MovieInfo>({ Title: 'Yeah'} as MovieInfo);
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<MovieInfo[]>([]);
    const [watchers, setWatchers] = useState<Watcher[]>([]);

    const handleSearch = () => {
        searchByTitle(search, setResults);
    }

    const handleKeypress = (e: any) => {
        if(e.code === 'Enter')
          handleSearch();
    }

    return (
        <div className="homepage">
            <input className='searchBar' placeholder='Search for a movie...' value={search} onKeyPress={handleKeypress} onChange={(e) => setSearch(e.target.value)} />
            <MovieList title='' movies={results}/>
            <Button onClick ={() => getAllWatchers(setWatchers)}>Sell All Users</Button>
            <ul>
              { watchers.map((i: Watcher) => <li>{i.uid}</li>)}
            </ul>
        </div>
    )
}