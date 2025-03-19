"use client";
import { PUBLIC_DOMAIN } from "@/utils/requests";
import Link from "next/link";
function ProductList(props:any){
    const {products,page, totalPages, setPage, setSortOrder} = props;

    return(
        <>  
            {products.length > 0 ? (
                <div className="productFilter">
                    <div className="productFilter__header">
                        <span className="productFilter__header--category">Casual</span>
                        <div className="productFilter__header--sort">
                            <span>Sắp xếp theo</span>
                            <select onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
                                <option value="asc">Giá tăng dần</option>
                                <option value="desc">Giá giảm dần</option>
                            </select>
                        </div>
                    </div>

                    <div className="productFilter__product">
                        {products?.map((product: any) => (
                            <Link href={`/product/${product._id}`} className="products__link" key={product._id}>
                                <div className="products__slide--item">
                                    <img
                                        className="products__slide--item__img"
                                        src={product.images.length > 0 ? `${PUBLIC_DOMAIN}${product.images[0]}` : "/img/default.jpg"}
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
                                        <span className="products__slide--item__price--new">{product.price}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Phân trang */}
                    <div className="productFilter__pagination mt-5">
                        <button className="productFilter__pagination--previous" disabled={page === 1} onClick={() => setPage(page - 1)}>
                            <img src="/img/arrow-left.svg" alt="" />
                            <span>Previous</span>
                        </button>

                        <div className="productFilter__pagination--list">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button 
                                    key={index + 1} 
                                    className={page === index + 1 ? "active" : ""}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button className="productFilter__pagination--previous" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                            <span>Next</span>
                            <img src="/img/arrow-right.svg" alt="" />
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{textAlign:"center", flex:"1"}} className="productFilter__empty">Không có sản phẩm nào</p>
            )}
        </>
    )
}
export default ProductList