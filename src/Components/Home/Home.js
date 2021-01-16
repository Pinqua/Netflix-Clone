import React from "react";
import Row from "../Row/Row";
import { requests } from "../../Axios/requests";
import Banner from "../Banner/Banner";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import "./Home.css";
import { useStateValue } from "../../ContextApi/stateProvider";
import { truncate } from "../../Utils/truncate";

function Home() {
  const { param } = useParams();
  const [{ user }] = useStateValue();

  return (
    <div className="home">
      <Nav />
      <Banner />
      {param === undefined && (
        <Row
          title="Trending Now"
          isLargeRow
          fetchUrl={requests.fetchTrending}
        />
      )}

      {(param === undefined || param === "tv") && (
        <>
          {param === "tv" && (
            <Row
              title="Trending Now"
              isLargeRow
              fetchUrl={requests.fetchTrendingTV}
            />
          )}
          <Row title="Popular on Netflix" fetchUrl={requests.fetchPopularTV} />
          <Row
            title="Netflix Originals"
            fetchUrl={requests.fetchNetflixOriginalsTV}
          />
          <Row title="New Releases" fetchUrl={requests.fetchAiringTodayTV} />
        </>
      )}

      {param === undefined && (
        <Row
          title={
            "Top Picks for " +
            truncate(
              user?.displayName ? user?.displayName : user?.email.slice(0, -10),
              15
            )
          }
          fetchUrl={requests.fetchTrending}
        />
      )}

      {(param === undefined || param === "movies") && (
        <>
          {/*{param === undefined && <h2>Movies</h2>}
          <Row
            title="Popular on Netflix"
            isLargeRow={param === "movies"}
            fetchUrl={requests.fetchPopularMovies}
          />
          
          <Row
            title="New Release"
            fetchUrl={requests.fetchNowPlayingMovies}
          />
          {/*<Row title="Recently Added" fetchUrl={requests.fetchNowPlayingMovies} />*/}
          {param === "movies" && (
            <Row
              title="Trending Now"
              isLargeRow
              fetchUrl={requests.fetchTrendingMovie}
            />
          )}
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romantic Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row
            title="Documentaries"
            fetchUrl={requests.fetchDocumentariesMovies}
          />
        </>
      )}

      {param === "latest" && (
        <>
          <Row
            title="Worth the Wait"
            isLargeRow
            fetchUrl={requests.fetchPopularTV}
          />
          <Row title="New on Netflix" fetchUrl={requests.fetchAiringTodayTV} />
          <Row
            title="Coming This Week"
            fetchUrl={requests.fetchNowPlayingMovies}
          />
        </>
      )}
    </div>
  );
}

export default Home;
