"use client";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
function ListProduct(){
    const [priceRange, setPriceRange] = useState([10, 100]); // Giá trị mặc định

    const handleChange = (value:any) => {
        setPriceRange(value);
    };
    return(
        <>  
            
            <Header />
            <div className="container">
                <div className="line line-top"></div>
                <div className="path">
                    <span>Home</span>
                    <img src="/img/right.svg" alt=""/>
                    <span>Home</span>
                    <img src="/img/right.svg" alt=""/>
                    <span>Home</span>
                    <img src="/img/right.svg" alt=""/>
                    <span>Home</span>
                </div>
                <div className="list__product">
                    <div className="filter">
                        <div className="filter__header">
                            <span className="filter__header--title">Filters</span>
                            <img src="/img/filter.svg" alt="" className="filter__header--img" />
                        </div>

                        <div className="filter__line"></div>

                        <div className="filter__category">
                            <div className="filter__category--item">
                                <span className="filter__category--item__text">T-shirts</span>
                                <img src="/img/right.svg" alt="" className="ilter__category--item__img" />
                            </div>
                            <div className="filter__category--item">
                                <span className="filter__category--item__text">T-shirts</span>
                                <img src="/img/right.svg" alt="" className="ilter__category--item__img" />
                            </div>
                            <div className="filter__category--item">
                                <span className="filter__category--item__text">T-shirts</span>
                                <img src="/img/right.svg" alt="" className="ilter__category--item__img" />
                            </div>
                            <div className="filter__category--item">
                                <span className="filter__category--item__text">T-shirts</span>
                                <img src="/img/right.svg" alt="" className="ilter__category--item__img" />
                            </div>
                        </div>
                        <div className="filter__line"></div>
                        <div className="filter__price">
                            <span className="filter__price--title">Price</span>
                            <div className="filter__price--slider">
                                <Slider
                                    range
                                    min={0}
                                    max={500}
                                    defaultValue={priceRange}
                                    onChange={handleChange}
                                    allowCross={false}
                                />
                            </div>
                            <div className="filter__price--values">
                                <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
                            </div>
                        </div>
                        <div className="filter__line"></div>
                        <button className="filter__apply">Apply Filter</button>
                    </div>
                    <div className="productFilter">

                    </div>
                </div>
                
            </div>
            <Footer />
        </>
    )   
}
export default ListProduct