import type { NextPage } from "next";
import React, { useEffect, useState, useMemo } from "react";
import styles from "styles/Home.module.css";
import { useDispatch } from "react-redux";
import Paginator from "react-hooks-paginator";
import { getSortedProducts } from "helpers/product";
import ProductSidebar from "wrappers/product/ProductSidebar";
import ProductTopbar from "wrappers/product/ProductTopbar";
import ProductsList from "wrappers/product/Products";
import { NextSeo } from "next-seo";
import { Endpoints } from "api/apiConst";
import { FETCH_COLLECTIONS_PRODUCTS } from "redux/actions/productActions";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { api } from "api/apiHelper";

const pageLimit = 20;

const Products: NextPage = ({data}: any) => {
  const SEO = {
    title: "Product | Kureghorbd",
    openGraph: {
      title: "Product | Kureghorbd",
    },
  };
  const dispatch = useDispatch();
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const reduxStoreProducts: any[] = useSelector(
    (state: RootState) => state.productData.products
  );

  const products: any[] = useMemo(
    () => (data ? data : reduxStoreProducts),
    [data, reduxStoreProducts]
  );

  dispatch({
    type: FETCH_COLLECTIONS_PRODUCTS,
    payload: products,
  });

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

  return (
    <div id="page" className={styles.container}>
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
              <ProductTopbar
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                productCount={products.length}
                sortedProductCount={currentData.length}
              />

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
                  pagePrevText="??"
                  pageNextText="??"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const productsResponse = await api.get(`${Endpoints.PRODUCTS}/collection`);

    return {
      props: {
        data: productsResponse.data.data,
      },
      revalidate: 10,
    };
  } finally {
  }
}

export default Products;
