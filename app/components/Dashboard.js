'use client'

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CgCheck, CgExternal } from "react-icons/cg";
import Sites from './Sites';
import { UserContext } from '../contexts/UserContext';
import ChooseTemplate from './ChooseTemplate';
import GiveSiteName from './Biography';
import BasicSetup from './BasicSetup';
import Biography from './Biography';
import GeneralSettings from './GeneralSettings';
import BuildingTemplate from './BuildingTemplate';




export default function Dashboard() {

    // const [userData, setUserData] = useState(null);
    const { userData, completeTemplateSetup, updateChosenTemplate, loading, newUserAction, setNewUserAction } = useContext(UserContext);

    if (loading) {
        return <p>Loading user data...</p>;
    }


    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const token = localStorage.getItem('authToken'); // Get token from localStorage
    //         if (token) {
    //             try {
    //                 const res = await axios.get('http://localhost:5000/api/users/userdata', {
    //                     headers: {
    //                         'x-auth-token': token, // Send token in headers for authentication
    //                     },
    //                 });
    //                 setUserData(res.data);
    //                 // Store the fetched user data in state

    //             } catch (err) {
    //                 console.error('Error fetching user data:', err);
    //             }
    //         } else {
    //             console.error('No token found');
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    // console.log('this is the user data', userData)


    return (
        <div className=' w-full'>









            {
                (
                    () => {
                        switch (newUserAction) {
                            case 'template':
                                return <ChooseTemplate />;
                            case 'name':
                                return <GeneralSettings />;
                            case 'guide':
                                return <BasicSetup />
                            case 'setup':
                                return <BuildingTemplate />
                            default:
                                return ''

                        }
                    }
                )()
            }


            {/* <Sites /> */}
        </div>
    )
}
