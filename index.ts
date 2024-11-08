import express, { Express } from "express"
import dotenv from "dotenv"
import clientRoutes from "./routes/client/index.route"
import moment from "moment"
import adminRoutes from "./routes/admin/index.route"
import { systemConfig } from "./config/system"

dotenv.config()


const app: Express = express();
const port: number | string = process.env.PORT || 3000;

//-thay the cho body-parser
app.use(express.json()); // Để parse JSON
app.use(express.urlencoded({ extended: true })); // Để parse URL-encoded
//-end thay the cho body-parser

app.use(express.static("public"))


app.set("views", "./views");
app.set("view engine", "pug");

// app Local variable --> tra ra pug nua
app.locals.moment = moment
app.locals.prefixAdmin = systemConfig.prefixAdmin


//-client route
clientRoutes(app)

//-admin route
adminRoutes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});