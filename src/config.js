module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DBATABASE_URL || "postgres://upbtspbcmvjxsr:253a6a41a43c20a905c9a7ca4a1e29aec8bab8f2ce8b10afc8fcbbc27ae0e3ae@ec2-107-22-211-248.compute-1.amazonaws.com:5432/d7ciaupm2mg170",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || 10800,
  CLIENT_ORIGIN: process.env.DB_URL || "postgres://upbtspbcmvjxsr:253a6a41a43c20a905c9a7ca4a1e29aec8bab8f2ce8b10afc8fcbbc27ae0e3ae@ec2-107-22-211-248.compute-1.amazonaws.com:5432/d7ciaupm2mg170"
  //remember to change CLIENT_ORIGIN back to the pinballer database
};
