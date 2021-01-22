export const API_KEY = process.env.REACT_APP_API_KEY;

export const BASE_URL = "https://image.tmdb.org/t/p/original";

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,

  // TV

  fetchTrendingTV: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginalsTV: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
  // fetchLatestTV: `/tv/latest?api_key=${API_KEY}`,
  fetchAiringTodayTV: `/tv/airing_today?api_key=${API_KEY}&language=en-US`,
  fetchPopularTV: `/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedTV: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,

  //  Movies

  fetchTrendingMovie: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchNowPlayingMovies: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
  //fetchLatestMovies: `/movie/latest?api_key=${API_KEY}`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`,
  fetchDocumentariesMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US`,

  //Search

  fetchSearchResult: `/search/multi?api_key=${API_KEY}&language=en-US&query=`,
  fetchSearchResultMovies: `/search/movie?api_key=${API_KEY}&language=en-US&query=`,
  fetchSearchResultSeries: `/search/tv?api_key=${API_KEY}&language=en-US&query=`,
};
