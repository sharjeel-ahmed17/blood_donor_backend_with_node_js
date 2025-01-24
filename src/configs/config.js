const config = {
    PORT: process.env.PORT || 5000, 
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    UPLOAD_DIR: 'uploads', 
    COOKIE_SECRET : process.env.COOKIE_SECRET,
    ACCESS_TOKEN_SECRET : process.env.AUTH_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    MONGO_URI : process.env.MONGO_URI,
  };
  
  export default config;
  