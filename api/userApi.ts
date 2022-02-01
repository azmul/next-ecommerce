import { api } from "./apiHelper";
import { Endpoints } from "./apiConst";

/** Register User */
export const registerUser = async (
    params: any
  ) => {
    const url = `${Endpoints.USER}/register`;
    
    const resp = await api.post(url,  {
      ...params
    });
    return resp.data;
};

/** Login User */
export const loginUser = async (
  params: any
) => {
  const url = `${Endpoints.USER}/login`;
  
  const resp = await api.post(url,  {
    ...params
  });
  return resp.data;
};

/** Login User */
export const getUser = async (
  id: string | number
) => {
  const url = `${Endpoints.USER}/${id}`;
  
  const resp = await api.get(url);
  return resp.data;
};

/** Change Password  */
export const changePassword = async (
  params: any
) => {
  const url = `${Endpoints.USER}/password/change`;
  const resp = await api.patch(url,  {
    ...params
  });
  return resp.data;
};

/** Update Profile User */
export const updateProfile = async (
  params: any
) => {
  const url = Endpoints.USER;
  
  const resp = await api.patch(url,  {
    ...params
  });
  return resp.data;
};