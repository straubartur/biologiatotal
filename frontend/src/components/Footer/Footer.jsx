import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <a href="https://www.biologiatotal.com.br/">Biologia Total</a>
              </li>
              <li>
                <a href="https://www.biologiatotal.com.br/">About Us</a>
              </li>
              <li>
                <a href="https://www.biologiatotal.com.br/">Blog</a>
              </li>
            </ul>
          </nav>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}, Designed by{" "}
            <a
              href="https://www.biologiatotal.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Invision
            </a>. Coded by{" "}
            <a
              href="https://www.biologiatotal.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Biologia Total
            </a>.
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
