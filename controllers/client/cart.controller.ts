import { Request, Response } from "express"
import Tour from "../../models/tour.model";


//-[get]: /cart
export const index = async (req: Request, res: Response) => {


  res.render("client/pages/cart/index",{
    pageTitle: "Trang giỏ hàng"
  })
}

//-[post]: /cart/list-json
export const listJson = async (req: Request, res: Response) => {
  const tours = req.body

  for (const tour of tours) { //-lap qua tung ptu
    const infoTour = await Tour.findOne({
      where: {
        id: tour.tourId,
        deleted: false,
        status: "active"
      },
      raw: true
    })
    //-addkey can thiet
    tour["info"] = infoTour

    tour["image"] = JSON.parse(infoTour["images"])[0]

    tour["price_special"] = (Number)(infoTour["price"] * (1 - infoTour["discount"] / 100)).toFixed();

    tour["total"] = (Number)(tour["price_special"] * tour["quantity"]).toFixed();

  }

  
  res.json({
    tours: tours
  })
}