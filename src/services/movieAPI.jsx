const fetchMovies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/movies/movies`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error fetching movies');
        return [];
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };
  
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/movies/movies/${movieId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error fetching movie details');
        return null;
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };
  
  const createMovie = async (formDataWithFile) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/movies/createMovie`, {
        method: 'POST',
        body: formDataWithFile,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Video created successfully:', data);
        return { success: true, data };
      } else {
        console.error('Error creating video');
        return { success: false, error: 'Error creating video' };
      }
    } catch (error) {
      console.error('Error creating video:', error);
      return { success: false, error: 'Error creating video' };
    }
  };
  
  export { fetchMovies, fetchMovieDetails, createMovie };
  