"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Header(){
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/product/ViewAllProduct?search=${encodeURIComponent(searchTerm)}`);
        }else {
            router.push(`/product/ViewAllProduct`); 
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    return(
        <>
            <div className="top">
                Sign up and get 20% off to your first order <a className="top__underline">Sign Up Now</a>
            </div>
            <div className="container">
                <div className="header">
                    <div className="header__logo">
                        <img src="/img/menu.svg" alt="" className="d-block d-md-none"/>
                        <Link href={"/"}><img src="/img/logo.svg" alt=""/></Link>
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
                        <img src="/img/search.svg" alt="" onClick={handleSearch} style={{ cursor: "pointer" }}/>
                        <input type="text" placeholder="Search for products ..." onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress}/>
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