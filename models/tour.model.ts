import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tour = sequelize.define("Tour", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, //-tu dong tang
    allowNull: false, //- chap nhan null: false
    primaryKey: true, //-khoa chinh
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(10)
  },
  images: {
    type: DataTypes.TEXT('long')
  },
  price: {
    type: DataTypes.INTEGER
  },
  discount: {
    type: DataTypes.INTEGER
  },
  information: {
    type: DataTypes.TEXT('long')
  },
  schedule: { //-lich trinh
    type: DataTypes.TEXT('long')
  },
  timeStart: {
    type: DataTypes.DATE
  },
  stock: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.STRING(20)
  },
  position: {
    type: DataTypes.INTEGER
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, { //- ten table
  tableName: "tours",
  timestamps: true //-tu dong qly createAt, updateAt
})

export default Tour