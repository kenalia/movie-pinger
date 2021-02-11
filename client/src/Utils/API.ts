
export const getMovieByTitle = (title: string, callback: (m: MovieInfo) => void) => {
    fetch(`/movies/byTitle/${title}`).then((data) => data.json()).then((data: MovieInfo) => callback(
        data));
}

export const pingWatcher = (userid: string, movie: string) => {
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

export const getWatcherList = async (userid: string, callback: (d: MovieInfo[]) => void) => {
    fetch(`/watchers/watcherList?id=${userid}`)
        .then((data) => data.json()).then((data) => console.log(data));
}

export const getAllWatchers = (callback: (w: Watcher[]) => void) => {
    fetch(`/watchers/allWatchers`)
        .then((data) => data.json()).then((data) => callback(data));
}

export const loginWatcher = (userid: string, password: string, callback: (d: any) => void) => {
    fetch(`/auth/login?userid=${userid}&pass=${password}`)
        .then((data) => data.json()).then((data) => callback(data));
};

export const testAuth = () => {
    fetch(`/auth/test?token=${sessionStorage.getItem('authtoken')}`)
        .then((data) => data.json()).then((data) => console.log(data));
}

export const getWatcherName = async (userid: string, callback: (d: string) => void): Promise<void> => {
    fetch(`/watchers/watcherName?id=${userid}`)
        .then((data) => data.json()).then((data) => callback(data.username)).then(() => {return new Promise<void>((resolve => {}))})
}

export const getProfileData = async (id: string, callback: (d: ProfileData) => void) => {
    // get list
    // seperate into each
    // get user data
    let prof: ProfileData = {
        id: id,
        uid: '',
        recCounts: [],
        recList: [],
        toWatch: []
    }

    let res = await fetch(`/watchers/watcherList?id=${id}`);

    let list: WatcherMovie[] = await res.json();
    console.log(list);
    let recs: string[] = [], rest: string[] = [];

    list.forEach((i) => {
        if(i.pending) {
            recs.push(i.movieid);
            prof.recCounts.push({ movieid: i.movieid, count: i.rec_count});
            return;
        }

        rest.push(i.movieid);
    });

    let data: any;

    for(let i = 0; i < recs.length; i++) {
        res = await fetch(`/movies/byID?id=${recs[i]}`);
        data = await res.json();
        prof.recList.push(data as MovieInfo);
    }

    for(let i = 0; i < rest.length; i++) {
        res = await fetch(`/movies/byID?id=${rest[i]}`);
        data = await res.json();
        prof.toWatch.push(data as MovieInfo);
    }

    res = await fetch(`/watchers/watcherName?id=${id}`);
    data = await res.json();
    prof.uid = data.username;

    callback(prof);
}