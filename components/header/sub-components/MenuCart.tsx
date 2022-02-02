import React, { Fragment } from "react";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import Image from "next/image";

type Iprops = {
  cartData: any;
  currency: any;
  removeFromCart: any;
};

const MenuCart = ({ cartData, currency, removeFromCart }: Iprops) => {
  const { addToast } = useToasts();
  let cartTotalPrice = 0;

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single: any, key: number) => {
              const discountedPrice: any = getDiscountPrice(
                single.price,
                single.discount
              );
              const finalProductPrice: any = (
                single.price * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice: any = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    {single.image && single.image[0] && (
                      <Link passHref={true} href={"/product/" + single.id}>
                        <Image
                          alt="PRODUCT"
                          src={single.image[0]}
                          className="img-fluid"
                          width={100}
                          height={80}
                          layout="responsive"
                          priority
                        />
                      </Link>
                    )}
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link href={"/product/" + single.id}>
                        {single.name}
                      </Link>
                    </h4>
                    <h6>Qty: {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? currency.currencySymbol + finalDiscountedPrice
                        : currency.currencySymbol + finalProductPrice}
                    </span>
                    {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single.selectedProductColor}</span>
                        <span>Size: {single.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => removeFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <span className="default-btn">
              <Link href={"/cart"}>View Cart</Link>
            </span>
            <span className="default-btn">
              <Link href={"/checkout"}>Checkout</Link>
            </span>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
