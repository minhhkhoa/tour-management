import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, //-tu dong tang
    allowNull: false, //- chap nhan null: false
    primaryKey: true, //-khoa chinh
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(10),
  },
  status: {
    type: DataTypes.STRING(20)
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, { //- ten table
  tableName: "orders",
  timestamps: true //-tu dong qly createAt, updateAt
})

export default Order