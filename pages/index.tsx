import type { NextPage } from 'next'
import React, { useEffect, Fragment } from "react";
import styles from '../styles/Home.module.css'
import { useDispatch } from "react-redux";
import {
  fetchProducts
} from "../redux/actions/productActions";
import { getSetting } from "../redux/actions/settingActions";
import { useClearCacheCtx } from "react-clear-cache";
import { fetchCategories, fetchTags } from "../redux/actions/commonActions";
import { loadLanguages } from "redux-multilanguage";
import HeroSlider from "../wrappers/hero-slider/HeroSlider";
import FeatureIcon from "../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../wrappers/product/TabProduct";
import TestimonialOne from "../wrappers/testimonial/TestimonialOne";
import { useSelector } from "react-redux";
import { getSortedProducts } from "../helpers/product";
import { Collapse, Button } from "antd";
import RelatedProducts from "../wrappers/product/RelatedProducts";
import { useRouter } from "next/router";
import { RootState } from "../redux/store";
import { NextSeo } from "next-seo";

const { Panel } = Collapse;
const CTAGORY = "category";

const Home: NextPage = () => {
  const SEO = {
    title: "Home | Kureghorbd",
    openGraph: {
      title: "Home | Kureghorbd",
    }
  }

  const dispatch = useDispatch();
  const { isLatestVersion, emptyCacheStorage } = useClearCacheCtx();

  const router = useRouter();
  const products = useSelector((state: RootState) => state.productData.homeProducts);
  const categories = useSelector((state: RootState) => state.commonData.categories);
  const productsGrid = [];

  categories.forEach((category) => {
    const categoriesProducts = getSortedProducts(products, CTAGORY, category);
    if (categoriesProducts.length > 0) {
      productsGrid.push({
        category,
        products: categoriesProducts,
      });
    }
  });

  const goToProductDetails = (category) => {
    router.push(`/menu?item=${category}`);
  };

  useEffect(() => {
    dispatch(
      loadLanguages({
        languages: {
          en: require("../translations/english.json"),
          bn: require("../translations/bangla.json"),
        },
      })
    );
    dispatch(fetchProducts());
    dispatch(getSetting());
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

    /** Empty Cache when new version comes */
    useEffect(() => {
      if (!isLatestVersion) {
        emptyCacheStorage();
      }
    }, [emptyCacheStorage, isLatestVersion]);

  return (
    <div className={styles.container}>
       <NextSeo {...SEO} />

      <Fragment>
        {/* hero slider */}
        <HeroSlider />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" />

        {productsGrid.map((item, index) => (
          <div key={Math.random()} className="container">
            <Collapse key={index}>
              <Panel
                key={item.category}
                header={<h4>{item.category} Products</h4>}
                extra={
                  <Button type="primary" onClick={() => goToProductDetails(item.category)}>
                    Show More Products
                  </Button>
                }
              >
                <RelatedProducts products={item.products} />
              </Panel>
            </Collapse>
          </div>
        ))}
        <br />
        <br />
        {/* testimonial */}
        <TestimonialOne />
    </Fragment>
      
    </div>
  )
}

export default Home
