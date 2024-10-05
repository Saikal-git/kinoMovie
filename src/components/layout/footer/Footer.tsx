import scss from "./Footer.module.scss";
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.footerSpan}>
            <span>Terms Of Use</span>
            <span>Privacy-Policy</span>
            <span>About</span>
            <span>Blog</span>
            <span>FAQ</span>
          </div>
          <span className={scss.EcoMovie}>
            EcoMovie - a unique website providing fascinating information about
            movies and TV shows. Here you can discover all the <br /> necessary
            details about your favorite films, actors, directors, ratings, and
            much more. EcoMovie boasts a stylish and intuitive <br /> interface
            that makes your search for cinematic masterpieces as convenient and
            enjoyable as possible.
          </span>
          <div className={scss.Icons}>
            <div className={scss.FaDiscord}>
              <FaDiscord />
            </div>
            <div className={scss.FaDiscord}>
              <FaInstagram />
            </div>
            <div className={scss.FaDiscord}>
              <FaVk />
            </div>
            <div className={scss.FaDiscord}>
              <FaLinkedin />
            </div>
            <div className={scss.FaDiscord}>
              <FaGithub />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
