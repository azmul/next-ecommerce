import styles from '../../styles/Home.module.css'
import { api } from "../../api/apiHelper";
import {Endpoints} from "../../api/apiConst";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getSortedProducts } from "../../helpers/product";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import RelatedProducts from "../../wrappers/product/RelatedProducts";
import { NextSeo } from "next-seo";

const CTAGORY = "category";

const ProductDetails = ({product}) => {
  const SEO = {
    title: `Kureghor Ecommerce | ${product.name}`,
    description: `Kureghor Ecommerce | ${product.shortDescription}`,
    openGraph: {
      title: `Kureghor Ecommerce | ${product.name}`,
      description: `Kureghor Ecommerce | ${product.shortDescription}`,
    }
  }

  const products: any[] = useSelector(
    (state: RootState) => state.productData.products
  );
  const category = product && product.category ? product.category[0] : undefined;
  const filteredProducts = getSortedProducts(products, CTAGORY, category);
  

  return (
    <div className={styles.container}>
       <NextSeo {...SEO} />
       <ProductImageDescription
          spaceTopClass="pt-50"
          spaceBottomClass="pb-30"
          product={product}
        />

        {category && filteredProducts.length > 0 && <RelatedProducts title={"Related Products"} products={filteredProducts} /> }
        <br /> 
        <br /> 
        {/* product description tab */}
        <ProductDescriptionTab spaceBottomClass="pb-50" product={product} />
    </div>
  )
}

export async function getStaticPaths() {
  try {
      const response = await api.get(`${Endpoints.PRODUCTS}/all`);
      const products = response.data.data;
      const paths = products.map((product) => {
          return {
              params: {
                  id: product._id,
              }, 
            }
      })
      return {paths, fallback: true}
  } finally {}
}

export async function getStaticProps({params}) {
  try {
      const response = await api.get(`${Endpoints.PRODUCTS}/${params.id}`);
      return {
          props: {
              product: response.data
          }, 
        }
  } finally {}
}

export default ProductDetails
