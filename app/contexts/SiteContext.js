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
    const token = localStorage.getItem('authToken'); // Get token from localStorage

    // Function to fetch the site information
    const fetchSiteInfo = async () => {
        setLoading(true);

        try {
            const response = await axios.get('http://localhost:5000/api/site', {
                headers: {
                    'x-auth-token': token, // Assuming token is in localStorage
                },
            });
            setSiteInfo(response.data);
            console.log('Site information fetched successfully');
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
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSiteInfo(response.data); // Update state with new site info
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
        } catch (err) {
            setError(err.response?.data?.message || 'Error patching site information');
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
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};
