"use client";

import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import { getProducts } from "@/lib/getProducts";
import { motion } from "framer-motion";
import Link from "next/link";
export default async function Home() {
    const products = await getProducts();
    // console.log(products);
    return(
        <>
          <Header></Header>
          <div className="banner">
              <div className="container">
                  <div>
                  <motion.div
                        className="banner__title"
                        initial={{ opacity: 0, letterSpacing: "-5px" }}
                        animate={{ opacity: 1, letterSpacing: "normal" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        >
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </motion.div>
                      <div className="banner__subtitle">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</div>
                      <button className="banner__button">Shop Now</button>
                      <div className="stats">
                          <div className="stats__item">
                              <span className="stats__item--number">200+</span>
                              <span className="stats__item--info">International Brands</span>
                          </div>
                          <div className="stats__line"></div>
                          <div className="stats__item">
                              <span className="stats__item--number">2,000+</span>
                              <span className="stats__item--info">High-Quality Products</span>
                          </div>
                          <div className="stats__line d-none d-sm-block"></div>
                          <div className="stats__item">
                              <span className="stats__item--number">30,000+</span>
                              <span className="stats__item--info">Happy Customers</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
          <div className="brands">
              <div className="container">
                  <img src="/img/brands1.svg" alt=""/>
                  <img src="/img/brands2.svg" alt=""/>
                  <img src="/img/brands3.svg" alt=""/>
                  <img src="/img/brands4.svg" alt=""/>
                  <img src="/img/brands5.svg" alt=""/>
              </div>
          </div>
          
          <div className="products">
              <div className="container">
                <div className="products__title">NEW ARRIVALS</div>
                <div className="products__wrapper mt-5">
                    {products.map((product) => (
                        <Link key={product._id} href={`/product/${product._id}`} className="products__link">
                            <div key={product._id} className=" products__slide--item">
                                <img
                                    className="products__slide--item__img"
                                    src={product.images.length > 0 ? `http://localhost:5000${product.images[0]}` : "/img/default.jpg"}
                                    alt={product.title}
                                />
                                <p className="products__slide--item__title">{product.title}</p>
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
                                    <span className="products__slide--item__price--new">{product.price}.VND</span>
                                </div>
                            </div>
                        </Link> 
                    ))}
                </div>
                  

                  <div className="products__button">
                      <button>View All</button>
                  </div>
              </div>
          </div>
          
          <div className="customer">
              <div className="container">
                  <div className="customer__header">
                      <div className="customer__header--title">OUR HAPPY CUSTOMERS</div>
                      <div className="customer__header--action">
                          <img src="/img/arrow-left.svg" alt=""/>
                          <img src="/img/arrow-right.svg" alt=""/>
                      </div>
                  </div>
                  <div className="customer__content">
                      <div className="customer__content--wrapper">
                          <div className="customer__content--item">
                              <div className="customer__content--item__star">
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__name">
                                  <span>Sarah M.</span>
                                  <img src="/img/oke.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__content">
                                    "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I&apos;ve bought has exceeded my expectations.”
                              </div>
                          </div>
                          <div className="customer__content--item">
                              <div className="customer__content--item__star">
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__name">
                                  <span>Sarah M.</span>
                                  <img src="/img/oke.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__content">
                                    "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.&quot;"
                              </div>
                          </div>
                          <div className="customer__content--item">
                              <div className="customer__content--item__star">
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__name">
                                  <span>Sarah M.</span>
                                  <img src="/img/oke.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__content">
                                    "As someone who&apos;s always on the lookout for unique fashion pieces, I&apos;m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.&quot;"
                              </div>
                          </div>
                          
                          <div className="customer__content--item">
                              <div className="customer__content--item__star">
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                                  <img src="/img/star.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__name">
                                  <span>Sarah M.</span>
                                  <img src="/img/oke.svg" alt=""/>
                              </div>
                              <div className="customer__content--item__content">
                                  "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”
                              </div>
                          </div>
                      </div>
                      
                  </div>
              </div>
          </div>  
          <Footer></Footer>
        </>
    )
}
