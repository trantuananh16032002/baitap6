import Footer from "@/components/Footer/page"
import Header from "@/components/Header/page"
import { getProductById } from "@/lib/getProductByID";
import ProductAction from "../ProductAction";
import { PUBLIC_DOMAIN } from "@/utils/requests";

async function ProductDetail({ params }: { params: any }){
    const productID = await getProductById(params.id)
    // console.log(product);
    const defaultImages = [
        "/img/prd2.svg",
        "/img/prd2.svg",
        "/img/prd2.svg"
    ];
    
    const img1 = productID.images[1] ? `${PUBLIC_DOMAIN}${productID.images[1]}` : defaultImages[0];
    const img2 = productID.images[2] ? `${PUBLIC_DOMAIN}${productID.images[2]}` : defaultImages[1];
    const img3 = productID.images[3] ? `${PUBLIC_DOMAIN}${productID.images[3]}` : defaultImages[2];
    
    return(
        <>
            <Header></Header>
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
                <div className="detailProduct">
                    <div className="detailProduct__img">
                        <div className="detailProduct__img--small">
                            {/* {productID.images.slice(1).map((image: string, index: number) => (
                                <div key={index} className="detailProduct__img--small__item">
                                    <img src={`${PUBLIC_DOMAIN}${image}`} alt={`Image ${index + 2}`} />
                                </div>
                            ))} */}
                            <div className="detailProduct__img--small__item">
                                <img src={img1} alt="Thumbnail 1" />
                            </div>
                            <div className="detailProduct__img--small__item">
                                <img src={img2} alt="Thumbnail 2" />
                            </div>
                            <div className="detailProduct__img--small__item">
                                <img src={img3} alt="Thumbnail 3" />
                            </div>
                        </div>
                        <div className="detailProduct__img--big">
                            <img
                                src={productID.images.length > 0 ? `${PUBLIC_DOMAIN}${productID.images[0]}` : "/img/prd2.svg"}
                            />
                        </div>
                    </div>

                    <div className="detailProduct__info">
                        <div className="detailProduct__info--detail">
                            <div className="detailProduct__info--detail__title">{productID.title}</div>
                            <div className="detailProduct__info--detail__rate">
                                <div className="detailProduct__info--detail__rate--star">
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                </div>
                                <span className="detailProduct__info--detail__rate--point">4.5/5</span>
                            </div>
                            <div className="detailProduct__info--detail__price">
                                <span>${productID.price}</span>
                            </div>
                            <div className="detailProduct__info--detail__info">
                                <span>{productID.desc}</span>
                            </div>
                            <div className="line"></div>
                        </div>
                        
                        {/* <div className="detailProduct__info--action">
                            <div className="detailProduct__info--action__number">
                                <button><img src="/img/tru.svg" alt=""/></button>
                                <span>1</span>
                                <button><img src="/img/cong.svg" alt=""/></button>
                            </div>
                            <button className="detailProduct__info--action__add">
                                Add to Cart
                            </button>
                        </div> */}
                        <ProductAction product={productID} />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
export default ProductDetail