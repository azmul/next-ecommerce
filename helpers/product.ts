import { any } from "prop-types";

// get products
export const getProducts = (
  products: any,
  category: any,
  type: any,
  limit: any
) => {
  const finalProducts = category
    ? products.filter(
        (product: any) =>
          product.category.filter((single: any) => single === category)[0]
      )
    : products;
  if (type && type === "new") {
    const newProducts = finalProducts.filter((single: any) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a: any, b: any) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      (single: any) => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price: any, discount: any) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQty = (
  cartItems: any,
  product: any,
  color: any,
  size: any
) => {
  let productInCart = cartItems.filter(
    (single: any) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single: any) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter((single: any) => product.id === single.id)[0]
        .quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (
  products: any,
  sortType: any,
  sortValue: any
) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        (product: any) =>
          product.category.filter((single: any) => single === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        (product: any) =>
          product.tag.filter((single: any) => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        (product: any) =>
          product.variation &&
          product.variation.filter(
            (single: any) => single.color === sortValue
          )[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        (product: any) =>
          product.variation &&
          product.variation.filter(
            (single: any) =>
              single.size.filter((single: any) => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get unique element
const getUniqueElemArray = (array: any) => {
  let uniqueElemArray = array.filter(function (v: any, i: any, self: any) {
    return i === self.indexOf(v);
  });
  return uniqueElemArray;
};

// get unique categories
export const getUniqueCategories = (products: any) => {
  let productCategories: any = [];
  products &&
    products.map((product: any) => {
      return (
        product.category &&
        product.category.map((single: any) => {
          return productCategories.push(single);
        })
      );
    });
  const uniqueProductCategories = getUniqueElemArray(productCategories);
  return uniqueProductCategories;
};

// get unique tags
export const getUniqueTags = (products: any) => {
  let productTags: any = [];
  products &&
    products.map((product: any) => {
      return (
        product.tag &&
        product.tag.map((single: any) => {
          return productTags.push(single);
        })
      );
    });
  const uniqueProductTags = getUniqueElemArray(productTags);
  return uniqueProductTags;
};

// get unique colors
export const getUniqueColors = (products: any) => {
  let productColors: any = [];
  products &&
    products.map((product: any) => {
      return (
        product.variation &&
        product.variation.map((single: any) => {
          return productColors.push(single.color);
        })
      );
    });
  const uniqueProductColors = getUniqueElemArray(productColors);
  return uniqueProductColors;
};

// get unique sizes
export const getProductsUniqueSizes = (products: any) => {
  let productSizes: any = [];
  products &&
    products.map((product: any) => {
      return (
        product.variation &&
        product.variation.map((single: any) => {
          return single.size.map((single: any) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const uniqueProductSizes = getUniqueElemArray(productSizes);
  return uniqueProductSizes;
};

// get product unique sizes
export const getUniqueSizes = (product: any) => {
  let productSizes: any = [];
  product.variation &&
    product.variation.map((singleVariation: any) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize: any) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const uniqueProductSizes = getUniqueElemArray(productSizes);
  return uniqueProductSizes;
};

export const setActiveSort = (e: any) => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach((elem) => {
    elem.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e: any) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((elem) => {
    elem.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e: any) => {
  const shopTopFilterWrapper: any = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
