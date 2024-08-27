import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { IoClose } from "react-icons/io5";


export default function SearchComponent() {
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [displaySelected, setDisplaySelected] = useState(false);

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
        setSearchTerm(result.name);
        setDisplaySelected(!displaySelected) // Set the selected result
        setSearchResults([]); // Clear the search results after selection
    };

    return (
        <div className='w-full flex items-center'>
            <div className='w-full'>


                <div className='flex items-center justify-between'>

                    {
                        displaySelected === false ? (
                            <div className='w-full'>
                                <form className='w-full flex items-center justify-between' onSubmit={(e) => e.preventDefault()}>
                                    <div className={`rounded-md flex items-center ${isFocused ? 'border-primary border-2' : 'border-gray-400  border'} py-2 px-2 w-[80%]`}>
                                        <CiSearch className={`text-xl mr-3 ${isFocused ? 'text-primary' : 'text-gray-400'}`} />
                                        <input
                                            id='search'
                                            name='search'
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onBlur={(e) => {
                                                setIsFocused(false);
                                            }}
                                            onFocus={() => setIsFocused(true)}
                                            type="text"
                                            placeholder='Search Item'
                                            className='w-full outline-none'
                                        />
                                    </div>
                                </form>
                            </div>
                        ) :
                            (<div className='w-full'>
                                {searchResults.length > 0 && (
                                    <ul className='mt-2 w-[80%] bg-white'>
                                        {searchResults.map((result) => (

                                            <div
                                                key={result._id}
                                                className='flex justify-between items-center gap-x-3'
                                            >

                                                <div className='w-[80%] flex items-center  gap-x-3'>
                                                    <div className='w-3 h-3 rounded-full bg-primary'></div>
                                                    <h1 className='font-semibold'> {result.name}  </h1>
                                                </div>

                                                <div className='cursor-pointer w-[18%] flex justify-end'>
                                                    <IoClose onClick={() => { setDisplaySelected(!displaySelected); setSearchResults([]); setSearchTerm('') }} className='font-semibold hover:text-primary' />
                                                </div>

                                            </div>
                                        ))}
                                    </ul>
                                )}
                                <div className='my-12'>
                                    <button className='bg-primary rounded-full text-white text-sm px-3 py-2'>
                                        Continue
                                    </button>
                                </div>
                            </div>)
                    }
                </div>

                {
                    displaySelected === true ? (
                        ''
                    ) : (
                        <div className=''>
                            {searchResults.length > 0 && (
                                <ul className='border border-gray-400 rounded-md mt-2 w-[80%] bg-white'>
                                    {searchResults.map((result) => (
                                        <li
                                            key={result._id}
                                            onClick={() => { handleSelect(result); setSearchResults([]) }}
                                            className='px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer'
                                        >
                                            {result.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                }
            </div>
        </div >
    )
}
