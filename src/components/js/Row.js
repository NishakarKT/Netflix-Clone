import React, { useState, useEffect } from "react";
import "../css/Row.css";
import { movieImages, movieTrailers } from "../../axios";
import YouTube from "react-youtube";
import requests from "../../requests";

const Row = ({ title, fetchURL, topRow }) => {
    const baseURL = "https://image.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([]);
    const [trailerID, setTrailerID] = useState("");
    const opts = {
        height: "398",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    useEffect(() => {
        async function fetchData() {
            const request = await movieImages.get(fetchURL);
            setMovies(request.data.results);
        };
        fetchData();
    }, [fetchURL]);

    const play = async (movie) => {
        const movieName = movie.title || movie.name;
        let id = "";
        if (movieName) {
            const res = await movieTrailers.get(requests.fetchTrailer + movieName + " official trailer").then(res => res.data.items);
            setTrailerID(res[0].id.videoId); // atleast we have the first video, if we don't get any matches
            for (let i = 0; i < res.length; i++) {
                id = res[i].id.videoId;
                if (id && res[i].snippet.title.toLowerCase().includes(" official trailer " || " trailer ")) {
                    setTrailerID(id);
                    break;
                }
            }
        };
    };


    {/* we add a unique key with every row poster, so that if something changes in a row, react doesn't re-render the entire row */ }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <a href={`#ytVideo${title}`} key={movie.id}>
                            <img onClick={() => play(movie)} className={`row__poster ${topRow ? "row__posterTopRow" : null}`} src={baseURL + (topRow ? movie.poster_path : movie.backdrop_path)} alt={movie.name} />
                            <marquee className="row__posterTitle" scrollamount="2">{movie.title || movie.name}</marquee>
                        </a>
                    ))
                }
            </div>
            { trailerID && (<YouTube id={`ytVideo${title}`} videoId={trailerID} opts={opts} />)}
        </div>
    );
};

export default Row;