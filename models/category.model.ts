import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define("Category", {
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
  image: {
    type: DataTypes.STRING(255)
  },
  description: {
    type: DataTypes.TEXT('long')
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
  tableName: "categories",
  timestamps: true //-tu dong qly createAt, updateAt
})

export default Category