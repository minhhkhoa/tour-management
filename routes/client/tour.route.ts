import { Request, Response, Router } from "express"

import Tour from "../../models/tour.model";

const router: Router = Router()

router.get("/", async (req: Request, res: Response) => {

  const tours = await Tour.findAll({
    raw: true //-ve lai data dung la 1 arr gom cac obj
  })

  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour du lich",
    tours: tours
  });
})


export const tourRoutes: Router = router