import React from "react";
import "./Footer.css";

function Footer() {
  return (
    //elements with class hide__link are only visible in mobile and elements with class
    // footer__links3 and footer__links4 get hidden at various breakpoints.
    <div className="footer">
      <div className="footer__content">
        <h3>Questions? Call 000-800-040-1843</h3>
        <div className="footer__links">
          <ul>
            <li>FAQ</li>
            <li className="hide__link">Account</li>
            <li>Investor Relations</li>
            <li className="hide__link">Ways to Watch</li>
            <li>Privacy</li>
            <li className="hide__link">Corporate Information</li>
            <li>Speed Test</li>
            <li className="hide__link">Netflix Originals</li>
          </ul>
          <ul>
            <li>Help Center</li>
            <li className="hide__link">Media Centre</li>
            <li>Jobs</li>
            <li className="hide__link">Term of Use</li>
            <li>Cookie Preferences</li>
            <li className="hide__link">Contact Us</li>
            <li>Legal Notice</li>
          </ul>
          <ul className="footer__link3">
            <li>Account</li>
            <li>Ways to Watch</li>
            <li>Corporate Information</li>
            <li>Netflix Originals</li>
          </ul>
          <ul className="footer__link4">
            <li>Media Centre</li>
            <li>Term of Use</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
