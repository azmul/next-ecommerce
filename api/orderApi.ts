import { api } from "./apiHelper";
import { Endpoints } from "./apiConst";

/** Send Message */
export const createNewOrder = async (
    params: any
  ) => {
    const url = Endpoints.ORDERS;
    
    const resp = await api.post(url,  {
      ...params
    });
    return resp.data;
};
