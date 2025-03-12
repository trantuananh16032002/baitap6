
function Footer(){
    return(
        <>
            <div className="footer">
                <div className="container">
                    <div className="footer__banner">
                        <span>STAY UPTO DATE ABOUT OUR LATEST OFFERS</span>
                        <div className="footer__banner--box">
                            <div className="footer__banner--box__email">
                                <img src="/img/letter.svg" alt=""/>
                                <input type="text" placeholder="Enter your email address"/>
                            </div>
                            <button>Subscribe to Newsletter</button>
                        </div>
                    </div>
                    <div className="footer__content">
                        <div className="footer__content--first">
                            <div className="footer__content--first__logo"><img src="/img/logo2.svg" alt=""/></div>
                            <p className="footer__content--first__content">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                            <div className="footer__content--first__icon">
                                <img src="/img/iconsoc.svg" alt=""/>
                                <img src="/img/iconsoc.svg" alt=""/>
                                <img src="/img/iconsoc.svg" alt=""/>
                                <img src="/img/iconsoc.svg" alt=""/>
                            </div>
                        </div>
                        <div className="footer__content--second">
                            <span className="footer__content--second__title">Company</span>
                            <div className="footer__content--second__content">
                                <a>About</a>
                                <a>Features</a>
                                <a>Works</a>
                                <a>Career</a>
                            </div>
                        </div>
                        <div className="footer__content--second">
                            <span className="footer__content--second__title">Help</span>
                            <div className="footer__content--second__content">
                                <a>Customer Support</a>
                                <a>Delivery Details</a>
                                <a>Terms & Conditions</a>
                                <a>Privacy Policy</a>
                            </div>
                        </div>
                        <div className="footer__content--second">
                            <span className="footer__content--second__title">FAQ</span>
                            <div className="footer__content--second__content">
                                <a>Account</a>
                                <a>Manage Deliveries</a>
                                <a>Orders</a>
                                <a>Payments</a>
                            </div>
                        </div>
                        <div className="footer__content--second">
                            <span className="footer__content--second__title">Resources</span>
                            <div className="footer__content--second__content">
                                <a>Free eBooks</a>
                                <a>Development Tutorial</a>
                                <a>How to - Blog</a>
                                <a>Youtube Playlist</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer__line"></div>
                    <div className="footer__bottom">
                        <div className="footer__bottom--content">Shop.co © 2000-2023, All Rights Reserved</div>
                        <div className="footer__bottom--logo">
                            <img src="/img/fboticon.svg" alt=""/>
                            <img src="/img/fboticon.svg" alt=""/>
                            <img src="/img/fboticon.svg" alt=""/>
                            <img src="/img/fboticon.svg" alt=""/>
                            <img src="/img/fboticon.svg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;