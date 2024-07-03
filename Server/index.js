const express = reaquire("express");
const cors = reaquire("cors");
const mongoose = reaquire("mongoose");


const app = express();
const socket = require("socket.io");
require("dotenv").config();