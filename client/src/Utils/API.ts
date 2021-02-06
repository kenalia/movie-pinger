
export const getMovieByTitle = (title: string, callback: (m: MovieInfo) => void) => {
    fetch(`/movies/byTitle/${title}`).then((data) => data.json()).then((data: MovieInfo) => callback(
        data));
}

export const pingWatcher = (uid: string, movie: string) => {
    fetch(`/watchers/pingWatcher?uid=${uid}&movie=${movie}`, {
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