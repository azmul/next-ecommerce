import React from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { changeCurrency } from "redux/actions/currencyActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";
import { useSelector } from "react-redux";
import {RootState} from "redux/store";

type Iprops = {
  currency?: any;
  changeCurrency?: any;
  currentLanguageCode?: any;
  dispatch?: any;
  borderStyle?: any;
}

const HeaderTop = ({
  currency,
  changeCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle
}: Iprops) => {
  const setting = useSelector((state: RootState) => state.settingData.setting);

  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`}
    >
      <LanguageCurrencyChanger
        currency={currency}
        changeCurrency={changeCurrency}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
      />
      <div className="header-offer">
        <p>
          Free delivery on order over{" "}
          <span>
            {currency.currencySymbol + ((setting && setting.free_delivery_money ? Number(setting.free_delivery_money) : 1) * currency.currencyRate).toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeCurrency: (currencyName: any) => {
      dispatch(changeCurrency(currencyName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTop));
