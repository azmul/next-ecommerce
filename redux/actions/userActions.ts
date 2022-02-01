import {Endpoints} from "../../api/apiConst";
import { api } from "../../api/apiHelper";

export const FETCH_USER = "FETCH_USER";
export const USER_TOKEN = "USER_TOKEN";


export const getUser = (id: string) => {
    return async (dispatch: any)  => {
        try {
            const response = await api.get(`${Endpoints.USER}/${id}`);
            dispatch({
              type: FETCH_USER,
              payload: response.data,
            });
          } finally {
          }
         
    };
  };