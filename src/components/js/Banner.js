import React, { useState, useEffect } from "react";
import "../css/Banner.css";
import { movieImages, movieTrailers } from "../../axios";
import requests from "../../requests";
import YouTube from "react-youtube";

// importing icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';

const Banner = () => {
    const baseURL = "https://image.tmdb.org/t/p/original/";
    const opts = {
        height: "398px",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };
    const truncateText = (text, maxChars) => {
        return text?.length > maxChars ? text.substr(0, maxChars - 1) + "..." : text;
    };

    const [movie, setMovie] = useState({});
    const [trailerID, setTrailerID] = useState("");

    // generating random movie posters for the banner
    useEffect(() => {
        const fetchData = async () => {
            const request = await movieImages.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
        };
        fetchData();
    }, []);

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

    return (
        <>
            <header className="banner"
                style={{
                    background: `url("${baseURL + movie.backdrop_path}") no-repeat center center / cover`
                }}>
                <div className="banner__contents">
                    <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                    <div className="banner__buttons">
                        <a href="#ytVideoBanner"><button className="banner__button banner__play" onClick={() => play(movie)}><PlayArrowIcon />Play</button></a>
                        <button className="banner__button banner__myList"><AddIcon />My List</button>
                    </div>
                    <h1 className="banner__description">{truncateText(movie?.overview, 100)}</h1>
                </div>
                <div className="banner__fadeBottom"></div>
            </header>
            { trailerID && (<YouTube id="ytVideoBanner" videoId={trailerID} opts={opts} />)}
        </>
    );
};

export default Banner;