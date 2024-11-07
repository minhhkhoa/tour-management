import { Request, Response } from "express"

import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
import Tour from "../../models/tour.model";


//-[get]: /cart
export const index = async (req: Request, res: Response) => {


  res.render("client/pages/cart/index",{
    pageTitle: "Trang giỏ hàng"
  })
}