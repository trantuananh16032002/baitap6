// "use client";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
// import { getProducts } from "@/lib/getProducts";
import FilterProduct from "./FilterProduct/FilterProduct";
import { getProducts } from "@/services/productServices";

async function ListProduct(){
    const products = await getProducts(undefined,undefined,undefined,undefined,undefined,undefined);
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
                    <FilterProduct initialProducts={products}/>
                </div>
            </div>
            <Footer />
        </>
    )   
}
export default ListProduct