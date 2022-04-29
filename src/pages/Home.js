import React from 'react';
import Nav from "../components/js/Nav";
import Banner from "../components/js/Banner";
import Row from "../components/js/Row";
import requests from "../requests";
import "./Home.css";

function Home() {
    return (
        <>
            <Nav />
            <Banner />
            <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals} topRow={true} />
            <Row title="Upcoming" fetchURL={requests.fetchUpcomingMovies} />
            <Row title="Trending Now" fetchURL={requests.fetchTrending} />
            <Row title="Popular" fetchURL={requests.fetchPopularMovies} />
            <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
            <Row title="Action" fetchURL={requests.fetchActionMovies} />
            <Row title="Comedy" fetchURL={requests.fetchComedyMovies} />
            <Row title="Horror" fetchURL={requests.fetchHorrorMovies} />
            <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
        </>
    );
};

export default Home;
