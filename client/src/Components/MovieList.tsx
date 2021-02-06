import React from 'react';
import './MovieList.scss';

type MLProps = {
    movies: MovieInfo[];
}

export const MovieList = (props: MLProps) => {

    return <div className='movieList'>
        { props.movies.map((i, ix) => <MovieListItem key={ix} info={i}/>)}
    </div>

}

type MLIProps = {
    info: MovieInfo;
}

export const MovieListItem = (props: MLIProps) => {

    const { info } = props;

    return <div className='mlItem'>
        <img src={info.Poster} alt=""/>
        <div className='infoCol'>
            <p title={info.Title}>{info.Title.length > 25 ? info.Title.substring(0,25) + '...' : info.Title} ({info.Year})</p>
        </div>
    </div>
}