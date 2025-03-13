import Footer from "@/components/Footer/page"
import Header from "@/components/Header/page"

function ProductDetail(){
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
                            <div className="detailProduct__img--small__item">
                                <img src="/img/menu.svg" alt=""/>
                            </div>
                            <div className="detailProduct__img--small__item">
                                <img src="/img/prd2.svg" alt=""/>
                            </div>
                            <div className="detailProduct__img--small__item">
                                <img src="/img/prd2.svg" alt=""/>
                            </div>
                        </div>
                        <div className="detailProduct__img--big">
                            <img src="/img/prd2.svg" alt=""/>
                        </div>
                    </div>

                    <div className="detailProduct__info">
                        <div className="detailProduct__info--detail">
                            <div className="detailProduct__info--detail__title">One Life Graphic T-shirt</div>
                            <div className="detailProduct__info--detail__rate">
                                <div className="detailProduct__info--detail__rate--star">
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                    <img src="/img/star.svg" alt=""/>
                                </div>
                                <span class="detailProduct__info--detail__rate--point">4.5/5</span>
                            </div>
                            <div className="detailProduct__info--detail__price">
                                <span>$260</span>
                            </div>
                            <div className="detailProduct__info--detail__info">
                                <span>This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</span>
                            </div>
                            <div className="line"></div>
                        </div>
                        
                        <div className="detailProduct__info--action">
                            <div className="detailProduct__info--action__number">
                                <button><img src="/img/tru.svg" alt=""/></button>
                                <span>1</span>
                                <button><img src="/img/cong.svg" alt=""/></button>
                            </div>
                            <button className="detailProduct__info--action__add">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
export default ProductDetail