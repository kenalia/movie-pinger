import React, {useEffect, useState} from 'react';
import {
    Route,
    Link,
    useRouteMatch,
    useParams,
    RouteComponentProps, useHistory
} from "react-router-dom";
import './Profile.scss';
import {getProfileData, pingWatcher} from "../Utils/API";
import {Button, Input} from "antd";
import {MovieList} from "./MovieList";

type Params = { id: string};

export const Profile = ({ match }: RouteComponentProps<Params>) => {

    const [userdata, setUserdata] = useState<ProfileData>({
        id: '',
        uid: '',
        recList: [],
        recCounts: [],
        toWatch: []
    });
    const [recID, setRecID] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        if(match.params.id === 'self') {
            const token = sessionStorage.getItem('authtoken');
            if(!token) history.push('/login');

            const id = sessionStorage.getItem('uniqueid') || '';
            if(!id) history.push('/login');

            getProfileData(id, setUserdata);
        }
        getProfileData(match.params.id, setUserdata);
    }, []);

    return (
        <div className='profile'>
            <h1>Profile</h1>
            <h1>{userdata?.uid}</h1>
            <Input onChange={(e) => setRecID(e.target.value)} />
            <Button onClick={() => pingWatcher(match.params.id, recID)}>Recommend to Watcher</Button>
            <MovieList title='Will Watch' movies={userdata?.toWatch}/>
            <MovieList title='Should Watch' movies={userdata.recList}/>
        </div>
    )
}