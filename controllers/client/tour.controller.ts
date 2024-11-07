import { Request, Response } from "express"

import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
import Tour from "../../models/tour.model";


//-[get]: /tours/:slugCategory
export const index = async (req: Request, res: Response) => {

  /*
    SELECT tours.* , price * (1 - discount / 100) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = 'du-lich-trong-nuoc'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  */
  const slugCategory = req.params.slugCategory

  const tours = await sequelize.query(`
    SELECT tours.* , ROUND(price * (1 - discount / 100), 0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';  
  `, {
    //- dinh nghia kieu muon lay (tránh lồng dữ liệu trả ra)
    type: QueryTypes.SELECT
  })

  tours.forEach(item => {
    if (item["images"]) {
      const images = JSON.parse(item["images"])
      //-tao key moi chua anh dau tien
      item['image'] = images[0]
    }

    //- chinh gia tien ve so
    item["price_special"] = parseFloat(item["price_special"])
  })


  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours
  });
}

//-[get]: /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  /*
    select *
    form tours
    where slug = ':slugTour'
    and deleted = false
    and status = 'active
  */

  const slugTour = req.params.slugTour

  const tourDetail = await Tour.findOne({
    where: {
      slug: slugTour,
      deleted: false,
      status: 'active'
    },
    raw: true
  })

  tourDetail["images"] = JSON.parse(tourDetail["images"])

  //-tinh gia moi
  //-addkey
  tourDetail["price_special"] = tourDetail["price"] * (1 - tourDetail["discount"] / 100)


  res.render("client/pages/tours/detail", {
    pageTitle: "Chi tiết tour",
    tourDetail: tourDetail
  })
}