import React, { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import { API, KEY } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState(`${API}/?key=${KEY}`);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { data, loading, error } = useApi(url);
  const navigate = useNavigate()

  const handleSearch = () => {
    setSearchTriggered(true);
    setUrl(`${API}/?key=${KEY}&q=${searchTerm}`);
    setSearchTerm(''); 
  };

  const handleAddCaption = (img)=>{
    navigate('/caption', { state: { img } })
    console.log('bee')
  }

  return (<div className='bg-gray-100'>
    <p >Name: <span className='text-blue-600'>Mansi</span></p>
    <p>Email: <span className='text-blue-600'> mansi.work0408@gmail.com</span></p>
    <div className="flex flex-col items-center justify-center w-full min-h-screen ">
    
      <div className="flex m-4 w-3/4 max-w-2xl">
        <input
          type="text"
          className="flex-grow border border-gray-300 text-black p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images..."
          value={searchTerm}
        />
        <button
          className="border bg-slate-700 text-white px-4 py-2 rounded-r-lg hover:bg-slate-900 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {searchTriggered ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full max-w-6xl">
           {loading && <p>Loading...</p>}
           {error && <p>Error: {error.message}</p>}
          {data && data.hits ? (
            data.hits.map((images) => (
              <div
                key={images.id}
                className="relative group overflow-hidden rounded-lg shadow-lg "
              >
                <img
                  src={images.largeImageURL}
                  alt={images.tags}
                  className="object-cover w-full h-64"
                />
                <button className="absolute bottom-0 left-0 bg-slate-900 text-white p-2 w-full opacity-80 hover:opacity-100 transition" onClick={()=>handleAddCaption(images.largeImageURL)}>Add Caption</button>
                {/* <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-white text-lg font-bold">
                  {images.tags}
                </div> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No images found. Try searching for something else.</p>
          )}
        </div>
      ) : null}
    </div>
    </div>
  );
};

export default Search;

