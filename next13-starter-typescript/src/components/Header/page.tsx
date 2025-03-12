function Header(){
    return(
        <>
            <div className="top">
                Sign up and get 20% off to your first order <a className="top__underline">Sign Up Now</a>
            </div>
            <div className="container">
                <div className="header">
                    <div className="header__logo">
                        <img src="/img/menu.svg" alt="" className="d-block d-md-none"/>
                        <img src="/img/logo.svg" alt=""/>
                    </div>
                    <div className="header__nav d-none d-md-block">
                        <ul>
                            <li><a href="">Shop <img src="/img/arrow-down.svg" alt=""/></a></li>
                            <li><a href="">On Sale</a></li>
                            <li><a href="">New Arrivals</a></li>
                            <li><a href="">Brands</a></li>
                        </ul>
                    </div>
                    <div className="search d-none d-md-flex">
                        <img src="/img/search.svg" alt=""/>
                        <input type="text" placeholder="Search for products ..."/>
                    </div>
                    <div className="action">
                        <a href=""><img src="/img/search.svg" alt="" className="d-block d-md-none"/></a>
                        <a href=""><img src="/img/shop.svg" alt=""/></a>
                        <a href=""><img src="/img/user.svg" alt=""/></a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;