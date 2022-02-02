import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { fetchCollectionsProducts } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import Paginator from "react-hooks-paginator";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getSortedProducts } from "../../helpers/product";
import ProductSidebar from "../../wrappers/product/ProductSidebar";
import ProductTopbar from '../../wrappers/product/ProductTopbar';
import ProductsList from "../../wrappers/product/Products";
import { NextSeo } from "next-seo";

const Products: NextPage = () => {
  const SEO = {
    title: "Product | Kureghorbd",
    openGraph: {
      title: "Product | Kureghorbd",
    }
  }
  const dispatch = useDispatch();
  const products: any[] = useSelector(
    (state: RootState) => state.productData.products
  );
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const pageLimit = 1000;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  useEffect(() => {
    dispatch(fetchCollectionsProducts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <NextSeo {...SEO} />
      <div className="shop-area pt-50 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              {/* shop sidebar */}
              <ProductSidebar
                getSortParams={getSortParams}
                sideSpaceClass="mr-30"
              />
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              {/* shop topbar default */}
              <ProductTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

              {/* shop page content default */}
              <ProductsList layout={layout} products={currentData} />

              {/* shop product pagination */}
              <div className="pro-pagination-style text-center mt-30">
                <Paginator
                  totalRecords={sortedProducts.length}
                  pageLimit={pageLimit}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageContainerClass="mb-0 mt-0"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
