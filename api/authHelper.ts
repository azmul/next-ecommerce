import cookie from "react-cookies";

const SESSION_TOKEN = "sessionToken";

export class AuthHelper {
  /**
   * Checks if the user is authenticated
   * @returns {boolean}
   */
  static isAuthenticated() {
    const { accessToken, expireAt } = AuthHelper.getTokens();
    return accessToken != null && expireAt != null;
  }

   /**
   * Save token in a cookie
   * @param {string} accessToken
   * @param {string} expireAt
   * @param {string} refreshToken
   */
  static saveTokens(
    accessToken: string,
    expireAt?: string,
    refreshToken?: string
  ) {
    const value = { accessToken, expireAt, refreshToken };
    cookie.save(SESSION_TOKEN, value, { path: "/" });
  }

  /**
   * Loads token from session cookie
   * @returns {object}
   */
  static getTokens() {
    const value = cookie.load(SESSION_TOKEN);

    return {
      accessToken: value && value.accessToken,
      expireAt: value && value.expireAt,
      refreshToken: value && value.refreshToken,
    };
  }

  /**
   * Deletes the session cookie
   */
  static clearTokens() {
    cookie.remove(SESSION_TOKEN, { path: "/" });
  }
}