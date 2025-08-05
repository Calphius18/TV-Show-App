import React from 'react'

const showCard = ({ show: { name, poster_path, first_air_date, vote_average, original_language } }) => {
  return (
    <div className='show-card'>
        <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/no-movie.png"} 
        alt={name} 
        />
        
        <div className="mt-4">
            <h3 className='text-white'>{name}</h3>

            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Rating" />
                    <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                </div>

                <span>•</span>
                <p className="lang"> {original_language}</p>

                <span>•</span>
                <p className="year">{first_air_date ? new Date(first_air_date).getFullYear() : "N/A"}</p>

            </div>
            
        </div>
        
    </div>
  )
}

export default showCard