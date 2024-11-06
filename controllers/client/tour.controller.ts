import { Request, Response } from "express"

import Tour from "../../models/tour.model";


//-[get]: /tours/
export const index = async (req: Request, res: Response) => {
  //- select * from tours where status = 'active' and deleted = false
  const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true //-ve lai data dung la 1 arr gom cac obj
  })

  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour du lich",
    tours: tours
  });
}