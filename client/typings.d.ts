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
    id: number,
    uid: string,
    recList: MovieInfo[],
    recCounts: RecCount[],
    toWatch: MovieInfo[]
}