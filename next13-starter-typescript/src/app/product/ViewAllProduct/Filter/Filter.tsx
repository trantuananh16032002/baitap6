"use client";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Filter(props:any) {
    const {setPriceRange,categories,setSelectedCategory} = props;
    // console.log(categories);

    //filter with price -------------------------------------------------------------
    const [localPriceRange, setLocalPriceRange] = useState([10, 100]);
    const handleChange = (value: any) => {
        setLocalPriceRange(value);
    };
    // console.log(localPriceRange);
    const applyFilter = () => {
        setPriceRange(localPriceRange); 
    };
    
    // tree --------------------------------------------------------------------------
    const buildCategoryTree = (categories: any[], parentId: any = null): any[] => {
        if (!categories) {
            return [];
        }
        return categories
            .filter((category: any) => category.parent_id === parentId)  
            .map((category: any) => ({
                ...category,
                children: buildCategoryTree(categories, category._id)
            }));
    };
    
    // if (categories && categories.length > 0) { 
    //     const categoryTree = buildCategoryTree(categories); 
    //     console.log(categoryTree); 
    // }
    const categoryTree = buildCategoryTree(categories);

    const [openCategories, setOpenCategories] = useState<string[]>([]);
    const handleToggleCategory = (categoryId: string) => {
        setOpenCategories((prev) => 
          prev.includes(categoryId)
            ? prev.filter((id) => id !== categoryId)  
            : [...prev, categoryId]
        );
    };

    const renderCategories = (categories: any[]) => {
        return categories.map((category: any) => (
            <div key={category._id}>
                <div className="filter__category--item">
                    <span 
                        className="filter__category--item__text"
                        onClick={() => handleCategorySelect(category._id)}
                    > {category.title}
                    </span>
                    <img
                        src="/img/right.svg"
                        alt=""
                        className={`filter__category--item__img ${openCategories.includes(category._id) ? 'open' : ''}`}
                        onClick={() => handleToggleCategory(category._id)}
                    />
                </div>
                {openCategories.includes(category._id) && category.children.length > 0 && (
                    <div className="filter__category--sub" style={{paddingLeft:"20px"}}>
                        {renderCategories(category.children)} {/* Đệ quy hiển thị danh mục con */}
                    </div>
                )}
            </div>
        ));
    };

    // set ID category
    const handleCategorySelect = (categoryId:any) => {
        setSelectedCategory(categoryId);
    };
    return(
        <>
            <div className="filter">
                <div className="filter__header">
                    <span className="filter__header--title">Filters</span>
                    <img src="/img/filter.svg" alt="" className="filter__header--img" />
                </div>

                <div className="filter__line"></div>

                <div className="filter__category">
                    {/* list category */}
                    {/* {categoryTree.map((category) => (
                        <div key={category._id}>
                            <div className="filter__category--item">
                                <span className="filter__category--item__text">{category.title}</span>
                                <img
                                    src="/img/right.svg"
                                    alt=""
                                    className="filter__category--item__img"
                                    onClick={() => handleToggleCategory(category._id)} 
                                />
                            </div>
                            {openCategories.includes(category._id) && category.children.length > 0 && (
                                <div className="filter__category--sub">
                                    {category.children.map((childCategory: any) => (
                                        <div key={childCategory._id} className="filter__category--item">
                                            <span className="filter__category--item__text">{childCategory.title}</span>
                                            <img
                                                src="/img/right.svg"
                                                alt=""
                                                className="filter__category--item__img"
                                                onClick={() => handleToggleCategory(childCategory._id)} 
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))} */}
                    {renderCategories(categoryTree)}
                    {/* <div className="filter__category--item">
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
                    </div> */}
                </div>
                <div className="filter__line"></div>
                <div className="filter__price">
                    <span className="filter__price--title">Price</span>
                    <div className="filter__price--slider">
                        <Slider
                            range
                            min={0}
                            max={200}
                            defaultValue={localPriceRange}
                            onChange={handleChange}
                            allowCross={false}
                        />
                    </div>
                    <div className="filter__price--values">
                        <span>${localPriceRange[0]}</span> - <span>${localPriceRange[1]}</span>
                    </div>
                </div>
                <div className="filter__line"></div>
                <button className="filter__apply" onClick={applyFilter}>Apply Filter</button>
            </div>
        </>
    )
}
export default Filter