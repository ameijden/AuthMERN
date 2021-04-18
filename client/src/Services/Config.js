const CLIENT = "https://localhost:3000";
const SERVER = "http://localhost:3001";
const config = {
  CLIENT: CLIENT,
  SERVER: SERVER,
  FB: {
    CLIENT_ID: "746430976075576",
    REDIRECT_URI: CLIENT + "/login/facebook",
    AUTH_CODE_URL: "https://www.facebook.com/v10.0/dialog/oauth",
  },
  INSTAGRAM: {
    CLIENT_ID: "1581250652069590",
    REDIRECT_URI: CLIENT + "/login/instagram",
    AUTH_CODE_URL: "https://api.instagram.com/oauth/authorize",
  },
};

export default config;
