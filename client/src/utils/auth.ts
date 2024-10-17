import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    // return false if there is no token or if the token is expired
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // Use the .exp property to check if the token is expired and multiply by
      // 1000 to convert seconds to milliseconds - gives us a Unix timestamp
      // the exp property is from the JWT spec and is inherent to the token
      return decoded.exp ? decoded.exp * 1000 < Date.now() : true;
    } catch (err) {
      console.error("Failed to authenticate", err);
      return true;
    }
  }

  getToken(): string | void {
    // TODO: return the token
    return localStorage.getItem("id_token") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    const token = idToken;
    localStorage.setItem("id_token", token);
    // TODO: redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("id_token");
    // TODO: redirect to the login page
    window.location.assign("/auth/login");
  }
}

export default new AuthService();
