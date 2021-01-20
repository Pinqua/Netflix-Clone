import { Add, PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ax from "../../Axios/axios";
import axios from "axios";
import { requests, BASE_URL } from "../../Axios/requests";
import "./Banner.css";
import Details from "../Details/Details";
import Loading from "../Loading/Loading";
import { ClickAwayListener } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { truncate } from "../../Utils/truncate";

function Banner() {
  const [item, setItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchData() {
      setLoading(true);
      //  fetching a random banner image from  TMDb API
      let bannerData = requests.fetchNetflixOriginalsTV;

      if (history.location.pathname === "/browse/movies") {
        bannerData = requests.fetchTrendingMovie;
      }
      await ax
        .get(bannerData, {
          cancelToken: source.token,
        })
        .then((response) => {
          setLoading(false);
          const data = response.data.results.filter(
            (item) => item?.backdrop_path
          );
          setItem(data[Math.floor(Math.random() * data?.length - 1)]);
        })
        .catch(() => {
          setLoading(false);
          console.log("Request Failed!");
        });
    }
    fetchData();
    //clean up
    return () => {
      source.cancel();
    };
  }, [history.location.pathname]);

  // for preventing scroll of background while model is open
  useEffect(() => {
    if (showDetails) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [showDetails]);

  return (
    <>
      <header
        className="banner"
        style={
          item
            ? {
                backgroundImage: `linear-gradient(
          90deg,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0.45)),
          url("${BASE_URL}${item?.backdrop_path}")`,
              }
            : {}
        }
      >
        {/* Loader */}

        {loading && (
          <Loading
            LoaderType="ThreeDots"
            addStyle={{
              backgroundColor: "#141414",
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
            }}
          />
        )}

        <div className="banner__contents">
          {history.location.pathname !== "/browse/movies" && (
            <h2 className="banner__contentType">
              <span>NETFLIX</span> ORIGINAL
            </h2>
          )}
          <h1 className="banner__title">
            {item?.title || item?.name || item?.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => {
                setShowDetails(true);
              }}
            >
              <span className="button__text">
                <PlayArrow />
                &nbsp;Play
              </span>
            </button>
            <button
              className="banner__button"
              onClick={() => {
                alert(
                  "Not added this functionality.\nPress Play button to play Trailer"
                );
              }}
            >
              <span className="button__text">
                <Add />
                &nbsp;My List
              </span>
            </button>
          </div>
          <p className="banner__description">{truncate(item?.overview, 150)}</p>
        </div>
        <div className="banner--fadeBottom" />
      </header>

      {/* Model  */}

      {showDetails && (
        <div className="model">
          <ClickAwayListener
            onClickAway={() => {
              setShowDetails(false);
            }}
          >
            <div>
              <Details
                itemDetails={item}
                handleClose={() => {
                  setShowDetails(false);
                }}
              />
            </div>
          </ClickAwayListener>
        </div>
      )}
    </>
  );
}

export default Banner;
