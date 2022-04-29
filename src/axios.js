import axios from "axios";

const movieImages = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

const movieTrailers = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3"
})

export { movieImages, movieTrailers };