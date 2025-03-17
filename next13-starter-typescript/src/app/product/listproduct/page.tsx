"use client";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Link from "next/link";
function ListProduct(){
    const [priceRange, setPriceRange] = useState([10, 100]);
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
                        <div className="productFilter__header">
                            <span className="productFilter__header--category">Casual</span>
                            <span>Sortby</span>
                        </div>
                        <div className="productFilter__product">
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                            <Link href={`/`} className="products__link">
                                <div className=" products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={"/img/prd2.svg"} 
                                    />
                                    <p className="products__slide--item__title">Test</p>
                                    <div className="products__slide--item__rate">
                                        <div className="products__slide--item__rate--star">
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star.svg" alt="" />
                                        <img src="/img/star12.svg" alt="" />
                                        </div>
                                        <div className="products__slide--item__rate--point">4.5/5</div>
                                    </div>
                                    <div className="products__slide--item__price">
                                        <span className="products__slide--item__price--new">100$</span>
                                    </div>
                                </div>
                            </Link> 
                        </div>
                        <div className="productFilter__pagination mt-5">
                            <button className="productFilter__pagination--previous">
                                <img src="/img/arrow-left.svg" alt="" />
                                <span>Previous</span>
                            </button>
                            <div className="productFilter__pagination--list">
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>4</button>
                                <button>5</button>
                            </div>
                            <button className="productFilter__pagination--previous">
                                <span>Next</span>
                                <img src="/img/arrow-right.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer />
        </>
    )   
}
export default ListProduct