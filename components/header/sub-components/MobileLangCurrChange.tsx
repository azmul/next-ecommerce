import React from "react";
import { multilanguage, changeLanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { changeCurrency } from "../../../redux/actions/currencyActions";

type Iprops = {
  currency: any
  changeCurrency: any
  currentLanguageCode: any
  dispatch: any
}

const MobileLangCurrChange = ({
  currency,
  changeCurrency,
  currentLanguageCode,
  dispatch
}: Iprops) => {
  const changeLanguageTrigger = (e: any) => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  const changeCurrencyTrigger = (e: any) => {
    const currencyName = e.target.value;
    changeCurrency(currencyName);
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu: any= document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="title mb-2">Choose Language </span>
        <select
          value={currentLanguageCode}
          onChange={e => {
            changeLanguageTrigger(e);
            closeMobileMenu();
          }}
        >
          <option value="en">English</option>
          <option value="bn">Bangla</option>
        </select>
      </div>
      <div className="lang-curr-style">
        <span className="title mb-2">Choose Currency</span>
        <select
          value={currency.currencyName}
          onChange={e => {
            changeCurrencyTrigger(e);
            closeMobileMenu();
          }}
        >
          <option value="USD">USD</option>
          <option value="BDT">BDT</option>
        </select>
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
)(multilanguage(MobileLangCurrChange));
