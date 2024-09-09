// contexts/SiteContext.js


'use client'


const { createContext, useState, useEffect } = require("react");
import axios from 'axios';

// Create SiteContext
export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
    // State for holding site information
    const [siteInfo, setSiteInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBioComplete, setIsBioComplete] = useState(false); // Track bio completion
    const [locationData, setLocationData] = useState(null);
    const [modal, setModal] = useState(false)

    const handleModalClick = () => {
        setModal(!modal);
    }

    const token = localStorage.getItem('authToken'); // Get token from localStorage

    // Function to fetch the site information
    const fetchSiteInfo = async () => {

        setLoading(true);
        console.log('ttooken', token)


        try {
            const response = await axios.get('http://localhost:5000/api/site', {
                headers: {
                    'x-auth-token': token, // Assuming token is in localStorage
                },
            });
            setSiteInfo(response.data);
            console.log('Site information fetched successfully');
            console.log('Biography complete:', response.data.bioComplete); // Log completion status

            // Set the bio completion status if available
            if (response.data.bioComplete !== undefined) {
                setIsBioComplete(response.data.bioComplete);
            }
            console.log(isBioComplete);

            setIsBioComplete(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching site information');
        } finally {
            setLoading(false);
        }
    };

    // Function to update the site information (with file uploads)
    const updateSiteInfo = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:5000/api/site', formData, {
                headers: {
                    'x-auth-token': localStorage.getItem('authToken'),
                    'Content-Type': 'multipart/form-data', // Ensure you're sending a form data
                },
            });
            setSiteInfo(response.data); // Update state with new site info
            await fetchSiteInfo(); // Fetch updated info after submission
            console.log('Site information updated successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating site information');
        } finally {
            setLoading(false);
        }
    };



    // Function to patch the site information (for partial updates)
    const patchSiteInfo = async (updates) => {
        setLoading(true);
        try {
            const response = await axios.patch('http://localhost:5000/api/site', updates, {
                headers: {
                    'x-auth-token': localStorage.getItem('authToken'),
                },
            });
            setSiteInfo(response.data); // Update state with patched info
            console.log('Biography complete:', response.data.bioComplete); // Log completion status
        } catch (err) {
            setError(err.response?.data?.message || 'Error patching site information');
        } finally {
            setLoading(false);
        }
    };


    // Fetch countries, states, cities data from public folder on component mount
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await fetch('/countries+states+cities (1).json');
                const data = await response.json();
                setLocationData(data);
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        fetchLocationData();
    }, []);

    // Helper function to get country name
    const getCountryName = (countryId) => {
        if (!locationData) return 'Loading...';
        const country = locationData.find((country) => country.id === countryId);
        return country ? country.name : 'Unknown Country';
    };

    // Helper function to get state name
    const getStateName = (countryId, stateId) => {
        if (!locationData) return 'Loading...';
        const country = locationData.find((country) => country.id === countryId);
        if (!country) return 'Unknown State';
        const state = country.states.find((state) => state.id === stateId);
        return state ? state.name : 'Unknown State';
    };

    // Helper function to get city name
    const getCityName = (countryId, stateId, cityId) => {
        if (!locationData) return 'Loading...';
        const country = locationData.find((country) => country.id === countryId);
        if (!country) return 'Unknown City';
        const state = country.states.find((state) => state.id === stateId);
        if (!state) return 'Unknown City';
        const city = state.cities.find((city) => city.id === cityId);
        return city ? city.name : 'Unknown City';
    };


    // New function to handle adding expertise
    // Add expertise to the site info
    // Add expertise to the site info
    const addExpertise = async (expertiseItem) => {
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:5000/api/site/add-expertise', expertiseItem, {
                headers: { 'x-auth-token': token },
            });
            // Update site info with the new expertise
            setSiteInfo(response.data);
            console.log('successs')
            await fetchSiteInfo();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expertise');
        } finally {
            setLoading(false);
        }
    };


    const addWorkToExpertise = async (expertiseId, workData) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('workTitle', workData.workTitle);
            formData.append('workDescription', workData.workDescription);
            formData.append('workLink', workData.workLink);
            if (workData.workFile) {
                formData.append('workFile', workData.workFile);
            }

            const response = await axios.post(`http://localhost:5000/api/site/add-work-to-expertise/${expertiseId}`, formData, {
                headers: {
                    'x-auth-token': token, // Ensure token is sent
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Fetch updated site information
            await fetchSiteInfo();
            console.log('Work added successfully');
        } catch (err) {
            console.error('Error adding work:', err.response?.data?.message || 'Server error');
            setError(err.response?.data?.message || 'Server error');
        } finally {
            setLoading(false);
        }
    };



    // Clear errors
    const clearError = () => setError(null);

    return (
        <SiteContext.Provider
            value={{
                siteInfo,
                loading,
                error,
                fetchSiteInfo,
                updateSiteInfo,
                patchSiteInfo,
                clearError,
                getCityName,
                getStateName,
                isBioComplete,
                modal,
                setModal,
                handleModalClick,
                getCountryName,
                addExpertise,
                addWorkToExpertise
                ,
            }}
        >
            {children}
        </SiteContext.Provider >
    );
};
