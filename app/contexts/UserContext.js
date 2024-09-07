'use client'

const { createContext, useState, useEffect } = require("react");
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [newUserAction, setNewUserAction] = useState('guide');
    const [chosenTemplate, setChosenTemplate] = useState(null);
    const [iscompleteTemplateSetjup, setIsCompleteTemplateSetup] = useState(false);

    useEffect(() => {
        // Check localStorage for userData on initial load
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            setUserData(JSON.parse(savedUserData)); // Set userData from localStorage if available
        } else {
            // Fetch user data if no saved data is found in localStorage
            const fetchUserData = async () => {
                const token = localStorage.getItem('authToken'); // Get token from localStorage
                if (token) {
                    try {
                        const res = await axios.get('http://localhost:5000/api/users/userdata', {
                            headers: {
                                'x-auth-token': token, // Send token in headers for authentication
                            },
                        });

                        // Update userData with fetched data
                        const fetchedData = res.data;
                        setUserData(fetchedData);
                        localStorage.setItem('userData', JSON.stringify(fetchedData)); // Store fetched user data in localStorage

                        // Set chosen template if available
                        if (fetchedData.chosenTemplate) {
                            setChosenTemplate(fetchedData.chosenTemplate);
                        }

                        // Set completeTemplateSetup status
                        if (fetchedData.templateComplete) {
                            setCompleteTemplateSetup(true);
                        }

                    } catch (err) {
                        console.error('Error fetching user data:', err);

                        // If the token is invalid or an error occurs, clear it and log the user out
                        localStorage.removeItem('authToken');
                    } finally {
                        setLoading(false); // Set loading to false after the request completes
                    }
                } else {
                    console.error('No token found');
                    setLoading(false); // Set loading to false if no token is found
                }
            };

            fetchUserData();
        }


    }, []); // This effect runs on component mount to check for the auth token




    // Function to fetch live data from the backend
    const fetchLiveData = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const res = await axios.get('http://localhost:5000/api/users/live-data', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setUserData(res.data);  // Update userData state with live data
            } catch (err) {
                console.error('Error fetching live data:', err);
            }
        } else {
            console.error('No token found');
        }
    };

    useEffect(() => {
        // Initial fetch of the data
        fetchLiveData();

        // Set up polling to fetch live data every 10 seconds
        const intervalId = setInterval(() => {
            fetchLiveData();
        }, 500);  // Adjust interval as needed

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const updateChosenTemplate = async (chosenTemplateValue) => {
        const token = localStorage.getItem('authToken');  // Get token from localStorage

        try {
            const res = await axios.put(
                'http://localhost:5000/api/users/chosen-template',
                { chosenTemplate: chosenTemplateValue },  // Send the new template choice
                {
                    headers: {
                        'x-auth-token': token,  // Send token in headers for authentication
                    },
                }
            );

            // Update chosenTemplate in the context
            setChosenTemplate(chosenTemplateValue);
            console.log('Template updated successfully:', res.data);

            // Mark template setup as complete
            completeTemplateSetup();
        } catch (err) {
            console.error('Error updating chosen template:', err);
        }

        setNewUserAction('guide'); // Navigate to guide action
    };

    const completeTemplateSetup = async () => {
        const token = localStorage.getItem('authToken');  // Get token from localStorage

        try {
            const res = await axios.put(
                'http://localhost:5000/api/users/template-complete',  // Endpoint for completing template setup
                {},
                {
                    headers: {
                        'x-auth-token': token,  // Send token in headers for authentication
                    },
                }
            );

            // Mark template setup as complete
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
            setChosenTemplate
        }}>
            {children}
        </UserContext.Provider>
    );
};
