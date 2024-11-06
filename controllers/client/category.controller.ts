import { Request, Response } from "express";
import Category from "../../models/category.model";

//-[get]: /categories/
export const index = async (req: Request, res:Response) => {

  //- select * from categories where status = 'active' and deleted = false
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true //-ve lai data dung la 1 arr gom cac obj
  })

  res.render("client/pages/categories/index",{
    pageTitle: "Danh mục tour",
    categories: categories
  })
}