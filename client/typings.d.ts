interface MovieInfo {
    Title: string;
    Director: string;
    Poster: string;
    Year: string;
    imdbID: string;
}

interface Watcher {
    id: number,
    uid: string
}

interface RecCount {
    movieid: string;
    count: number;
}

interface ProfileData {
    id: string,
    uid: string,
    recList: MovieInfo[],
    recCounts: RecCount[],
    toWatch: MovieInfo[]
}

interface WatcherMovie {
    movieid: string;
    rec_count: number;
    pending: boolean;
}