import React, { useEffect } from "react";
import styles from "styles/Home.module.css";
import { api } from "api/apiHelper";
import { Endpoints } from "api/apiConst";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getSortedProducts } from "helpers/product";
import ProductDescriptionTab from "wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "wrappers/product/ProductImageDescription";
import RelatedProducts from "wrappers/product/RelatedProducts";
import { NextSeo } from "next-seo";
import * as gtag from "lib/gtag";

const CTAGORY = "category";

const ProductDetails = ({ product }) => {
  const SEO = {
    title: `Kureghor Ecommerce | ${product.name}`,
    description: `Kureghor Ecommerce | ${product.shortDescription}`,
    openGraph: {
      title: `Kureghor Ecommerce | ${product.name}`,
      description: `Kureghor Ecommerce | ${product.shortDescription}`,
    },
  };

  const products: any[] = useSelector(
    (state: RootState) => state.productData.products
  );
  const category =
    product && product.category ? product.category[0] : undefined;
  const filteredProducts = getSortedProducts(products, CTAGORY, category);

  useEffect(() => {
    gtag.event({
      action: "Product_Check",
      category: "PRODUCT",
      label: product.name,
      value: product.name,
    });
  }, [product]);

  return (
    <div className={styles.container}>
      <NextSeo {...SEO} />
      <ProductImageDescription
        spaceTopClass="pt-50"
        spaceBottomClass="pb-30"
        product={product}
      />

      {category && filteredProducts.length > 0 && (
        <RelatedProducts
          title={"Related Products"}
          products={filteredProducts}
        />
      )}
      <br />
      <br />
      {/* product description tab */}
      <ProductDescriptionTab spaceBottomClass="pb-50" product={product} />
    </div>
  );
};

export async function getStaticPaths() {
  try {
    const response = await api.get(`${Endpoints.PRODUCTS}/all`);
    const products = response.data.data;
    const paths = products.map((product) => {
      return {
        params: {
          slug: product.url,
        },
      };
    });
    return { paths, fallback: "blocking" };
  } finally {
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await api.get(
      `${Endpoints.PRODUCTS}/details/${params.slug}`
    );
    return {
      props: {
        product: response.data,
      },
      revalidate: 10,
    };
  } finally {
  }
}
export default ProductDetails;
