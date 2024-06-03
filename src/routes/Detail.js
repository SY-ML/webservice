import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Load from '../components/Load';
import Post from '../components/Post';
import '../history.css'; // Import CSS

function Detail() {
  const { id } = useParams();
  const movieId = Number(id); // Convert id to a number
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
        const json = await response.json();
        setMovie(json.data.movie);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="flex-container">
        <div className="flex-item-left movie-details-box">
          <h1>{movie.title} ({movie.year})</h1>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <p>{movie.description_full}</p>
          <p><strong>Genre:</strong> {movie.genres.join(', ')}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
        </div>
        <div className="flex-item-right">
          <Post movie_id={movieId} onNewPost={handleNewPost} />
          <Load movie_id={movieId} />
        </div>
      </div>
    </div>
  );
}

export default Detail;
