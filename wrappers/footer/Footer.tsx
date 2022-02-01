import React, { useState, useEffect } from "react";
import Link  from "next/link";
import { animateScroll } from "react-scroll";
import FooterCopyright from "../../components/footer/FooterCopyright";
import FooterNewsletter from "../../components/footer/FooterNewsletter";
import { useSelector } from "react-redux";
import {RootState} from "../../redux/store";

type Iprops = { 
    backgroundColorClass?: any;
    spaceTopClass?: any;
    spaceBottomClass?: string;
    containerClass?: any;
    extraFooterClass?: any;
    sideMenu?: any;
  }

const Footer = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  containerClass,
  extraFooterClass,
  sideMenu,
}: Iprops) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);
  const setting = useSelector((state: RootState) => state.settingData.setting);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ""
      } ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${extraFooterClass ? extraFooterClass : ""}`}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo={"/assets/img/logo/logo.png"}
              spaceBottomClass="mb-30"
            />
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>ABOUT US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link href={"/about"}>About us</Link>
                  </li>
                  <li>
                    <Link href={"/contact"}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-6"
            }`}
          >
            <div
              className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-145"
                  : "footer-widget mb-30 ml-75"
              }`}
            >
              <div className="footer-title">
                <h3>FOLLOW US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  {setting && setting.facebook_link && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={setting.facebook_link}
                      >
                        Facebook
                      </a>
                    </li>
                  )}
                  {setting && setting.twitter_link && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={setting.twitter_link}
                      >
                        Twitter
                      </a>
                    </li>
                  )}
                  {setting && setting.youtube_link && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={setting.youtube_link}
                      >
                        Youtube
                      </a>
                    </li>
                  )}
                  {setting && setting.pinterest_link && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={setting.pinterest_link}
                      >
                        Pinterest
                      </a>
                    </li>
                  )}
                  {setting && setting.instagram_link && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={setting.instagram_link}
                      >
                        Instagram
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
            }`}
          >
            {/* footer newsletter */}
            <FooterNewsletter
              spaceBottomClass="mb-30"
              spaceLeftClass="ml-70"
              sideMenu={sideMenu}
            />
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
