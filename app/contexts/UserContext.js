'use client'

const { createContext, useState, useEffect } = require("react");
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [newUserAction, setNewUserAction] = useState('guide');
    const [chosenTemplate, setChosenTemplate] = useState(null);
    const [isCompleteTemplateSetup, setIsCompleteTemplateSetup] = useState(false);
    const savedUserData = localStorage.getItem('userData');
    const savedToken = localStorage.getItem('authToken');
    // console.log('savedToken is:', savedToken) // Check token from localStorage
    // console.log('savedData is:', savedUserData) // Check token from localStorage

    // Function to handle token storage and data fetch on page load
    useEffect(() => {
        // const savedUserData = localStorage.getItem('userData');
        // const savedToken = localStorage.getItem('authToken');
        // console.log('savedToken is:', savedToken) // Check token from localStorage

        if (savedUserData && savedToken) {
            // User data already exists in localStorage, no need to fetch again
            setUserData(JSON.parse(savedUserData));
            setLoading(false);
        } else if (savedToken) {
            // If only the token is present, fetch the user data
            fetchUserData(savedToken);
        } else {
            console.error('No token found');
            setLoading(false);
        }
    }, []); // Only run once on component mount


    // Function to handle token storage and data fetch on page load
    useEffect(() => {

        fetchUserData()
    }, []);
    // Function to fetch user data using the token
    const fetchUserData = async (savedToken) => {
        try {
            const res = await axios.get('http://localhost:5000/api/users/userdata', {
                headers: {
                    'x-auth-token': savedToken,
                },
            });

            // Update userData with fetched data
            const fetchedData = res.data;
            setUserData(fetchedData);
            localStorage.setItem('userData', JSON.stringify(fetchedData)); // Store in localStorage

            // Set chosen template if available
            if (fetchedData.chosenTemplate) {
                setChosenTemplate(fetchedData.chosenTemplate);
            }

            // Set completeTemplateSetup status
            if (fetchedData.templateComplete) {
                setIsCompleteTemplateSetup(true);
            }

        } catch (err) {
            console.error('Error fetching user data:', err);
            localStorage.removeItem('authToken'); // If there's an error, clear the token
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    // Function to logout and clear the token
    const logoutUser = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUserData(null); // Clear userData state
        setChosenTemplate(null);
        setIsCompleteTemplateSetup(false);
        console.log('User logged out, token and data cleared');
    };

    // Fetch only live data and merge it with userData
    const fetchLiveData = async () => {
        if (savedToken) {
            try {
                const res = await axios.get('http://localhost:5000/api/users/live-data', {
                    headers: {
                        'x-auth-token': savedToken,
                    },
                });

                const liveData = res.data;

                // Merge live data with existing userData without overwriting everything
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    ...liveData,
                }));

                // Fetch templateComplete status if available and set it
                if (liveData.templateComplete !== undefined) {
                    setIsCompleteTemplateSetup(liveData.templateComplete);
                }
            } catch (err) {
                console.error('Error fetching live data:', err);
            }
        } else {
            console.error('No token found');
        }
    };

    useEffect(() => {
        // Poll live data every 10 seconds
        const intervalId = setInterval(() => {
            fetchLiveData();
        }, 1000); // Adjust polling time as needed

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const updateChosenTemplate = async (chosenTemplateValue) => {
        // const token = localStorage.getItem('authToken');

        try {
            const res = await axios.put(
                'http://localhost:5000/api/users/chosen-template',
                { chosenTemplate: chosenTemplateValue },
                {
                    headers: {
                        'x-auth-token': savedToken,
                    },
                }
            );

            // Update chosenTemplate in the context
            setChosenTemplate(chosenTemplateValue);
            console.log('Template updated successfully:', res.data);

            completeTemplateSetup();
        } catch (err) {
            console.error('Error updating chosen template:', err);
        }

        setNewUserAction('guide');
    };

    const completeTemplateSetup = async () => {
        // const token = localStorage.getItem('authToken');

        try {
            const res = await axios.put(
                'http://localhost:5000/api/users/template-complete',
                {},
                {
                    headers: {
                        'x-auth-token': savedToken,
                    },
                }
            );

            setIsCompleteTemplateSetup(true);
            console.log('Template setup marked as complete:', res.data);
        } catch (err) {
            console.error('Error completing template setup:', err);
        }
    };

    return (
        <UserContext.Provider value={{
            completeTemplateSetup,
            updateChosenTemplate,
            userData,
            loading,
            newUserAction,
            setNewUserAction,
            chosenTemplate,
            isCompleteTemplateSetup, setIsCompleteTemplateSetup,
            setChosenTemplate,
            logoutUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};
