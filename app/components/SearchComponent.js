import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { IoClose } from "react-icons/io5";

export default function SearchComponent({ step, setStep, onSelect, selectedResult, setSelectedResult, }) {
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm.length > 0) {
            const fetchResults = async () => {
                try {
                    console.log("Fetching results for:", searchTerm); // Log the search term
                    const response = await axios.get(`http://localhost:5000/api/portfolio-types/search?query=${searchTerm}`);
                    console.log("Search results:", response.data); // Log the results
                    setSearchResults(response.data);
                } catch (error) {
                    console.error("Error fetching search results", error);
                }
            };

            fetchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleSelect = (result) => {
        onSelect(result);  // Pass the selected portfolio type to the parent
        setSelectedResult(result); // Store the selected result
        setSearchResults([]); // Clear the search results after selection
        setSearchTerm(result.name); // Optionally, update the search term to the selected result
    };

    const clearSelection = () => {
        setSelectedResult(null);
        setSearchTerm('');
        setSearchResults([]);
    };


    return (
        <div className='w-full flex items-center'>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    {
                        selectedResult === null ? (
                            <div className='w-full'>
                                <form className='w-full flex items-center justify-between' onSubmit={(e) => e.preventDefault()}>
                                    <div className={`rounded-md flex items-center ${isFocused ? 'border-primary border-2' : 'border-gray-400  border'} py-2 px-2 w-[80%]`}>
                                        <CiSearch className={`text-xl mr-3 ${isFocused ? 'text-primary' : 'text-gray-400'}`} />
                                        <input
                                            id='search'
                                            name='search'
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onBlur={() => setIsFocused(false)}
                                            onFocus={() => setIsFocused(true)}
                                            type="text"
                                            placeholder='Search Item'
                                            className='w-full outline-none'
                                        />
                                    </div>
                                </form>
                                {
                                    searchResults.length > 0 && (
                                        <ul className='border border-gray-400 rounded-md mt-2 w-[80%] bg-white'>
                                            {searchResults.map((result) => (
                                                <li
                                                    key={result._id}
                                                    onClick={() => handleSelect(result)}
                                                    className='px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer'
                                                >
                                                    {result.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </div>
                        ) : (
                            <div className='w-full'>
                                <div
                                    key={selectedResult._id}
                                    className='flex justify-between items-center gap-x-3'
                                >
                                    <div className='w-[80%] flex items-center gap-x-3'>
                                        <div className='w-3 h-3 rounded-full bg-primary'></div>
                                        <h1 className='font-semibold'> {selectedResult.name} </h1>
                                    </div>
                                    <div className='cursor-pointer w-[18%] flex justify-end'>
                                        <IoClose onClick={clearSelection} className='font-semibold hover:text-primary' />
                                    </div>
                                </div>
                                <div className='my-12'>
                                    <button onClick={() => { setStep(2); console.log(selectedResult.name) }} className='bg-primary rounded-full text-white text-sm px-3 py-2'>
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
