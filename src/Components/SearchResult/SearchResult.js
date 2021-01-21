import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import { useParams } from "react-router-dom";
import { requests } from "../../Axios/requests";
import Nav from "../Nav/Nav";
import Row from "../Row/Row";
import axios from "axios";
import ax from "../../Axios/axios";
import Loading from "../Loading/Loading";
import { truncate } from "../../Utils/truncate";

function SearchResult() {
  const { query } = useParams();
  const [searchResultData, setSearchResultData] = useState([]);
  const [noResultFound, setNoResultFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const chunk = 15;

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();

    //fetch data form TMDb API for given query
    async function fetchData() {
      //just making 6 requests to TMDb for a given query
      await axios
        .all([
          ax.get(`${requests.fetchSearchResultMovies}${query}&page=1`, {
            cancelToken: source.token,
          }),
          ax.get(`${requests.fetchSearchResultSeries}${query}&page=1`, {
            cancelToken: source.token,
          }),
          ax.get(`${requests.fetchSearchResultMovies}${query}&page=2`, {
            cancelToken: source.token,
          }),
          ax.get(`${requests.fetchSearchResultSeries}${query}&page=2`, {
            cancelToken: source.token,
          }),
          ax.get(`${requests.fetchSearchResultMovies}${query}&page=3`, {
            cancelToken: source.token,
          }),
          ax.get(`${requests.fetchSearchResultSeries}${query}&page=3`, {
            cancelToken: source.token,
          }),
        ])
        .then(
          axios.spread(
            (request1, request2, request3, request4, request5, request6) => {
              if (
                request1.data.results?.length === 0 &&
                request2.data.results?.length === 0 &&
                request3.data.results?.length === 0 &&
                request4.data.results?.length === 0 &&
                request5.data.results?.length === 0 &&
                request6.data.results?.length === 0
              ) {
                setNoResultFound(true);
              } else {
                //filtering results with no backdrop image
                const data1 = request1.data.results.filter(
                  (item) => item?.backdrop_path
                );
                const data2 = request2.data.results.filter(
                  (item) => item?.backdrop_path
                );
                const data3 = request3.data.results.filter(
                  (item) => item?.backdrop_path
                );
                const data4 = request4.data.results.filter(
                  (item) => item?.backdrop_path
                );
                const data5 = request5.data.results.filter(
                  (item) => item?.backdrop_path
                );
                const data6 = request6.data.results.filter(
                  (item) => item?.backdrop_path
                );

                if (
                  data1?.length === 0 &&
                  data2?.length === 0 &&
                  data3?.length === 0 &&
                  data4?.length === 0 &&
                  data5?.length === 0 &&
                  data6?.length === 0
                ) {
                  setNoResultFound(true);
                } else {
                  setNoResultFound(false);
                  setSearchResultData([]);
                  const Data = [
                    ...data1,
                    ...data2,
                    ...data3,
                    ...data4,
                    ...data5,
                    ...data6,
                  ];
                  setSearchResultData(Data);
                }
              }
              setLoading(false);
            }
          )
        )
        .catch(() => {
          setNoResultFound(true);
          setLoading(false);
        });
    }
    //if query is too large
    if (query?.length > 50) {
      setNoResultFound(true);
      setLoading(false);
    } else {
      fetchData();
    }
    return () => {
      //clean up
      setNoResultFound(false);
      setSearchResultData([]);
      source.cancel();
    };
  }, [query]);

  //show loader while fetching data using axios
  if (loading) {
    return (
      <Loading
        LoaderType="Bars"
        addStyle={{
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          zIndex: "99999",
        }}
      />
    );
  }

  return (
    <>
      <Nav />
      {noResultFound ? (
        <div className="searchResult noResultFound">
          <div className="suggestions">
            <div>
              Your search for
              <span className="search__query">" {truncate(query, 40)} "</span>
              did not have any matches.
            </div>
            <div>Suggestions:</div>
            <ul>
              <li>Check the connection.</li>
              <li>Try different keyword.</li>
              <li>Looking for a movie or TV show?</li>
              <li>Try using a movie, TV show title, an actor or director.</li>
              <li>Try a genre like comedy, romance, sport or drama.</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="searchResult">
          {searchResultData && (
            <>
              <Row isSearch SearchResult={searchResultData?.slice(0, chunk)} />
              <Row
                isSearch
                SearchResult={searchResultData?.slice(chunk, 2 * chunk)}
              />
              <Row
                isSearch
                SearchResult={searchResultData?.slice(2 * chunk, 3 * chunk)}
              />
              <Row
                isSearch
                SearchResult={searchResultData?.slice(3 * chunk, 4 * chunk)}
              />
              <Row
                isSearch
                SearchResult={searchResultData?.slice(4 * chunk, 5 * chunk)}
              />
              <Row isSearch SearchResult={searchResultData?.slice(5 * chunk)} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SearchResult;
