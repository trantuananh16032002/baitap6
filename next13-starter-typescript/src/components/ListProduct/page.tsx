"use client";

import { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import { getProducts } from "@/lib/getProducts"; // Import hàm fetch dữ liệu

const flickityOptions = {
  groupCells: true,
  wrapAround: true,
  autoPlay: 3000,
};

export default function Carousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <Flickity className="carousel mt-5" options={flickityOptions}>
      {products.map((product) => (
        <div key={product._id} className="carousel-cell products__slide--item">
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
            <span className="products__slide--item__price--new">{product.price}VND</span>
          </div>
        </div>
      ))}
    </Flickity>
  );
}
