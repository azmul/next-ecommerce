import {Endpoints} from "../../api/apiConst";
import { api } from "../../api/apiHelper";

export const SETTING = "SETTING";

export const getSetting = () => {
  return async (dispatch: any)  => {
    try {
        const response = await api.get(Endpoints.SETTING);
        dispatch({
          type: SETTING,
          payload: response.data
        });
      } finally {}
  };
};