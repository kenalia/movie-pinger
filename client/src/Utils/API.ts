
export const getMovieByTitle = (title: string, callback: (m: MovieInfo) => void) => {
    fetch(`/movies/byTitle/${title}`).then((data) => data.json()).then((data: MovieInfo) => callback(
        data));
}

export const pingWatcher = (userid: number, movie: string) => {
    fetch(`/watchers/pingWatcher?userid=${userid}&movie=${movie}`, {
        method: 'POST'
    }).then((data) => data.json()).then((data) => console.log(data));
}

export const searchByTitle = (title: string, callback: (m: MovieInfo[]) => void) => {
    fetch(`/api/v1/search/${title}`).then((data) => data.json()).then((data: any) => { console.log(data); callback(data.Search as MovieInfo[])});
}

export const addNewWatcher = (username: string, password: string, email?: string) => {
    fetch(`/watchers/addNewWatcher?user=${username}&pass=${password}${email ? `&email=${email}` : ''}`, {
        method: 'POST'
    })
        .then((data) => data.json()).then((data) => console.log(data.reason))
}

export const getWatcherList = (userid: string) => {
    fetch(`/watchers/watcherList?user=${userid}`)
        .then((data) => data.json()).then((data) => console.log(data));
}

export const getAllWatchers = () => {
    fetch(`/watchers/allWatchers`)
        .then((data) => data.json()).then((data) => console.log(data));
}