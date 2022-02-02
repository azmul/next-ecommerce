import type { NextPage } from "next";
import React, { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { getSortedProducts } from "../helpers/product";
import ShopTopbarFilter from "../wrappers/product/ShopTopbarFilter";
import ProductList from "../wrappers/product/Products";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSearchProducts } from "../redux/actions/productActions";
import ProductLoader from "../components/loader/ProductLoader";
import { NextSeo } from "next-seo";

const SearchPage: NextPage = () => {
  const searchStr = useSelector((state: RootState) => state.commonData.search);

  const SEO = {
    title: `Search | Kureghorbd ${searchStr}`,
    openGraph: {
      title: `Search | Kureghorbd ${searchStr}`,
    }
  }
  
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const dispatch = useDispatch();

  const products = useSelector(
    (state: RootState) => state.productData.searchProducts
  );

  const pageLimit = 100;

  const getLayout = (layout: any) => {
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
    if (searchStr) {
      dispatch(fetchSearchProducts(searchStr));
    }
  }, [dispatch, searchStr]);

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <div className="shop-area pt-50 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* shop topbar filter */}
              <ShopTopbarFilter
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                productCount={products && products.length}
                sortedProductCount={currentData.length}
                products={products}
                getSortParams={getSortParams}
              />
              {products && products.length > 0 ? (
                <>
                  {/* shop page content default */}
                  <ProductList layout={layout} products={currentData} />

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
                </>
              ) : (
                <ProductLoader />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchPage;
