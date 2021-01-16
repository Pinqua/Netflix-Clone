import { ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import "./LandingPage.css";
import Jumbotron from "../Jumbotron/Jumbotron";
import Collapsible from "../Collapsible/Collapsible";
import faqData from "../../Fixtures/faq.json";
import jumboData from "../../Fixtures/jumbo.json";
import { Link, useHistory } from "react-router-dom";
import netflixLogo from "../../Images/netflixLogo.png";

function LandingPage() {
  const history = useHistory();

  const formHandler = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  return (
    <div className="landing">
      <div className="landing__main">
        <div className="landing__nav clearfix">
          <Link to="/">
            <img src={netflixLogo} alt="netflix logo" />
          </Link>
          <button onClick={() => history.push("/signin")} type="button">
            Sign In
          </button>
        </div>
        <div className="landing__text">
          <div className="landing__headings">
            <h1 className="landing__heading">
              Unlimited movies, TV shows and more.
            </h1>
            <div className="landing__subheading">
              Watch anywhere. Cancel anytime.
            </div>
          </div>
          <h2>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h2>
          <form className="landing__email" onSubmit={formHandler}>
            <input required type="email" placeholder="Email address" />
            <button type="submit">
              Get started&nbsp;
              <ArrowForwardIos />
            </button>
          </form>
        </div>
      </div>

      <div>
        <div className="jumbotrones">
          {jumboData.map((data) => (
            <Jumbotron
              key={data.id}
              img={data.img}
              img_position={data.img_position}
              alt={data.alt}
              title={data.title}
              content={data.content}
            />
          ))}
        </div>
        <div className="faq">
          <h1>Frequently Asked Questions</h1>
          <div className="collapsibles">
            {faqData.map((data) => (
              <Collapsible
                key={data.id}
                header={data.header}
                body={data.body}
              />
            ))}
          </div>
          <h2>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h2>
          <form className="landing__email" onSubmit={formHandler}>
            <input required type="email" placeholder="Email address" />
            <button type="submit">
              Get Started&nbsp;
              <ArrowForwardIos />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
