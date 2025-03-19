"use client";

import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import ProductList from "../ProductList/ProductList";
import { getProducts } from "@/services/productServices";
import { getCategories } from "@/services/categorySercivves";
import { useSearchParams } from "next/navigation";

function FilterProduct(props:any){
    const { initialProducts } = props;
    const [products, setProducts] = useState(initialProducts.products);

    // item pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    // filter price
    const [priceRange, setPriceRange] = useState([0, 200])

    // category
    const [category, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // console.log(selectedCategory);

    //sort
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    // console.log(sortOrder);

    // search
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    // console.log(searchQuery);
    useEffect(() =>{
        const fetchProducts = async () =>{
            const result = await getProducts(page,9, priceRange,selectedCategory, sortOrder,"");
            setProducts(result.products);
            setTotalPages(result.totalPages);
        }
        const fetchCategory = async () =>{
            const result = await getCategories(undefined,undefined);
            setCategories(result.data);
        }

        fetchProducts();
        fetchCategory();
    },[page,priceRange,selectedCategory,sortOrder,searchQuery]);
    return(
        <>
            <Filter setPriceRange={setPriceRange} categories = {category} setSelectedCategory={setSelectedCategory}/>
            <ProductList products= {products} page={page} totalPages={totalPages} setPage={setPage} setSortOrder={setSortOrder}/>
        </>
    )
}
export default FilterProduct;