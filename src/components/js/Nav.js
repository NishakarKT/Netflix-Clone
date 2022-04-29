import React, { useState, useEffect } from "react";
import "../css/Nav.css";
import axios from "axios";
import { movieTrailers } from "../../axios";
import requests from "../../requests";
import YouTube from "react-youtube";
import { NavLink } from "react-router-dom";

// importing icons
import SearchIcon from '@material-ui/icons/Search';
import RedeemIcon from '@material-ui/icons/Redeem';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Nav = () => {
    const [UserImgSrc, setUserImgSrc] = useState();
    const [search, setSearch] = useState("");
    const [trailerID, setTrailerID] = useState("");
    const [show, handleShow] = useState(false);

    const opts = {
        height: "398",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    const scrollHandler = () => {
        if (window.scrollY > 100)
            handleShow(true);
        else
            handleShow(false);
    }

    const searchTrailer = async () => {
        let id = "";
        const res = await movieTrailers.get(requests.fetchTrailer + search + " official trailer").then(res => res.data.items).catch(err => console.log(err));
        setTrailerID(res[0].id.videoId); // atleast we have the first video, if we don't get any matches
        for (let i = 0; i < res.length; i++) {
            id = res[i].id.videoId;
            if (id && res[i].snippet.title.toLowerCase().includes(" official trailer " || " trailer ")) {
                setTrailerID(id);
                break;
            }
        }
        window.scrollTo(0, 400);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const request = await axios.get("https://randomuser.me/api/");
            setUserImgSrc(request.data.results[0].picture.medium);
        }
        fetchUser();

        // scroll effect
        window.addEventListener("scroll", scrollHandler)
        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, []);

    return (
        <>
            <div className={`nav ${show ? "showNav" : null}`}>
                <div className="nav__left">
                    <img className="nav__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="" />
                    <div className="nav__options">
                        <NavLink exact to="/" className="nav__optionLink" activeClassName="nav__optionLinkActive">Home</NavLink>
                        <NavLink to="/tv-shows" className="nav__optionLink" activeClassName="nav__optionLinkActive">TV Shows</NavLink>
                        <NavLink to="/movies" className="nav__optionLink" activeClassName="nav__optionLinkActive">Movies</NavLink>
                        <NavLink to="/recently-added" className="nav__optionLink" activeClassName="nav__optionLinkActive">Recently Added</NavLink>
                        <NavLink to="/my-list" className="nav__optionLink" activeClassName="nav__optionLinkActive">My List</NavLink>
                    </div>
                </div>
                <input className="nav__search" type="text" placeholder="search" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.keyCode === 13) searchTrailer() }} />
                <SearchIcon onClick={searchTrailer} />
                <div className="nav__right">
                    <NavLink to="/kids" className="nav__optionLink" activeClassName="nav__optionLinkActive">KIDS</NavLink>
                    <NavLink to="/dvd" className="nav__optionLink" activeClassName="nav__optionLinkActive">DVD</NavLink>
                    <RedeemIcon />
                    <NotificationsIcon />
                    <img className="nav__user" src={UserImgSrc} alt="" />
                </div>
            </div>
            { trailerID && (<YouTube videoId={trailerID} opts={opts} />)}
        </>
    );
};

export default Nav;