import React, {useEffect, useState} from 'react';
import {
    Route,
    Link,
    useRouteMatch,
    useParams,
    RouteComponentProps
} from "react-router-dom";
import './Profile.scss';
import {getProfileData} from "../Utils/API";

type Params = { id: string};

export const Profile = ({ match }: RouteComponentProps<Params>) => {

    const [userdata, setUserdata] = useState<ProfileData>();

    useEffect(() => {
        getProfileData(match.params.id, setUserdata);
    }, []);

    return (
        <div className='profile'>
            <h1>{userdata?.uid}</h1>
        </div>
    )
}