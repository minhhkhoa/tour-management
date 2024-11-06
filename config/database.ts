import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config() //-import o day nx

const sequelize = new Sequelize(
  process.env.NAME_DB, //-ten db
  process.env.USER_NAME, //-user
  process.env.PASSWORD, //-password
  {
    host: process.env.HOSTING, //-link hosting
    dialect: 'mysql'
  }
)

sequelize.authenticate().then(() => {
  console.log("connect success!")
}).catch((err) => {
  console.log("connect error: ", err)
})

export default sequelize