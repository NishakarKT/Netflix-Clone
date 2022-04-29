const TMDB_API_KEY = process.env.TMDB_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213`,
    fetchUpcomingMovies: `/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    fetchTrending: `/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US`,
    fetchPopularMovies: `/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    fetchTopRated: `/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=99`,
    fetchTrailer: `/search?part=snippet&type=video&key=${GOOGLE_API_KEY}&maxResults=5&q=`
}

export default requests;