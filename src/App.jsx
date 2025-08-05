import  { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import TVShowCard from './components/TVShowCard.jsx'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingTVShows } from './appwrite.js'
import { Analytics } from "@vercel/analytics/react";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [TVShowList, setTvShowList] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 1000, [searchTerm]);


  const fetchTvShow = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/tv?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      if(data.Response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch shows")
        setTvShowList([]);
        return;
      } 
      setTvShowList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      } 

    } catch (error) {
      console.error(`Error fetching shows: ${error}`);
      setErrorMessage("Error fetching shows. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const showTrendingTVShows = async () => {
    try {
      const shows = await getTrendingTVShows();
      setTrendingTVShows(shows);
    } catch (error) {
      console.error(`Error fetching trending shows: ${error}`);
    }
  }

  useEffect(() => {
    fetchTvShow(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    showTrendingTVShows();
  }, []);

  return (
    <main>

      <div className="pattern"/>
      
        <div className="wrapper">
      
        <header>
          <img src="./banner 1.jpeg" alt="Hero Banner" />          
          <h1>Find Your <span className='text-gradient'>TV Shows</span></h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        </header>

        {trendingTVShows.length > 0 && (
          <section className="trending-tvshows">
            <h2>Trending TV Shows</h2>
            <ul>
              {trendingTVShows.map((show, index) => (
                <li key={show.$id}>
                  <p>{index + 1}</p>
                   <img src={show.poster_url} alt={show.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-tvshows">
          <h2>All TV Shows</h2>

          {isLoading ? (<Spinner />) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>)
          :  (
            <ul>
              {TVShowList.map((show) => {
                return (
                 <TVShowCard 
                   key={show.id}
                   show={show}
                 />
                )
              })}
            </ul>
          )
          }
        </section>


      </div>


      <Analytics />
    </main>
  )
}

export default App