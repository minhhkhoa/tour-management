import express, { Express, Request, Response} from "express"
import sequelize from "./config/database"
import dotenv from "dotenv"
import Tour from "./models/tour.model"

dotenv.config()

//-goi bien
sequelize


const app: Express = express();
const port: number | string = process.env.PORT || 3000;


app.set("views", "./views");
app.set("view engine", "pug");


app.get('/tours', async (req: Request, res: Response) => {

  const tours = await Tour.findAll({
    raw: true //-ve lai data dung la 1 arr gom cac obj
  })

  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour du lich",
    tours: tours
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});