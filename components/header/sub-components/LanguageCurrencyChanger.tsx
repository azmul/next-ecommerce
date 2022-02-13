import React from "react";
import { changeLanguage } from "redux-multilanguage";
import { useSelector } from "react-redux";
import {RootState} from "redux/store";

type Iprops = { 
  currency: any;
  changeCurrency: any;
  currentLanguageCode: any;
  dispatch: any;
}

const LanguageCurrencyChanger = ({
  currency,
  changeCurrency,
  currentLanguageCode,
  dispatch
}: Iprops) => {
  const setting: any = useSelector((state: RootState) => state.settingData.setting);

  const changeLanguageTrigger = (e: any) => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === "en"
            ? "English"
            : currentLanguageCode === "bn"
            ? "Bangla"
            : ""}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={e => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            <li>
              <button value="bn" onClick={e => changeLanguageTrigger(e)}>
                Bangla
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>Call Us {setting && setting.call_us_number}</p>
      </div>
    </div>
  );
};

export default LanguageCurrencyChanger;
