require("dotenv").config();
const { expect } = require("chai");
const supertest = require("supertest");

process.env.TZ = "UTC";
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret";

process.env.TEST_DB_URL =
  process.env.TEST_DB_URL ||
  "postgresql://postgres:aRp3t3r12@localhost/pinballer";

//this is where we can add additional features to chai if we want

global.expect = expect;
global.supertest = supertest;
