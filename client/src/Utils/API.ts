
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

export const addNewWatcher = (username: string, password: string, callback: (d: any) => void, email?: string) => {
    fetch(`/watchers/addNewWatcher?user=${username}&pass=${password}${email ? `&email=${email}` : ''}`, {
        method: 'POST'
    })
        .then((data) => data.json()).then((data) => callback(data));
}

export const getWatcherList = (userid: string, callback: (d: MovieInfo[]) => void) => {
    fetch(`/watchers/watcherList?user=${userid}`)
        .then((data) => data.json()).then((data) => console.log(data));
}

export const getAllWatchers = (callback: (w: Watcher[]) => void) => {
    fetch(`/watchers/allWatchers`)
        .then((data) => data.json()).then((data) => callback(data));
}

export const loginWatcher = (userid: string, password: string, callback: (d: any) => void) => {
    console.log(userid, password);
    fetch(`/auth/login?userid=${userid}&pass=${password}`)
        .then((data) => data.json()).then((data) => callback(data));
};

export const testAuth = () => {
    fetch(`/auth/test?token=${sessionStorage.getItem('authtoken')}`)
        .then((data) => data.json()).then((data) => console.log(data));
}

export const getProfileData = async (id: string, callback: (d: any) => void) => {
    // get list
    // seperate into each
    // get user data
    let list: MovieInfo[];
    console.log('getting');

    await getWatcherList(id, (d) => console.log(d));
}