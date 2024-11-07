import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";
import { Json } from "sequelize/types/utils";

//-[post]: /order
export const order = async (req: Request, res: Response) => {
  const data = req.body

  //-luu data vao bang order
  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",
  }

  //-tao moi ban ghi
  const order = await Order.create(dataOrder)

  //-update lai don hang
  const orderId = order.dataValues.id //-lay ra id can update lai code

  const code = generateOrderCode(orderId) //- tao code moi

  await Order.update({
    code: code //-data moi can cap nhat
  }, {
    //-cap nhat o dau
    where: {
      id: orderId
    }
  })

  //-luu data vao bang orders_item
  for (const item of data.cart) {
    const dataItem = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity
    }

    //-lay du lieu cua tour do
    const infoTour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active"
      },
      raw: true
    })

    dataItem["price"] = infoTour["price"]
    dataItem["discount"] = infoTour["discount"]
    dataItem["timeStart"] = infoTour["timeStart"]

    //-luu
    await OrderItem.create(dataItem)
  }

  res.json({
    code: 200,
    message: "Đặt hàng thành công!",
    orderCode: code //- muc dich de dung cai nay lam trang dat hang thanh cong voi ma don hang nay
  })
}

//-[get]: /order/success
export const success = async (req: Request, res: Response) => {

  //-lay order code
  const orderCode = req.query.orderCode

  //- lay ra thong tin don hang
  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false
    },
    raw: true
  })

  //- 1 don co the co nhieu tour
  const ordersItem = await OrderItem.findAll({
    where: {
      orderId: order["id"]
    },
    raw: true
  })

  for (const item of ordersItem) {
    item["price_special"] = item["price"] * (1 - item["discount"] / 100)

    //- tinh tong tien cua 1 tour(1 dong)
    item["total"] = item["price_special"] * item["quantity"]

    const tourInfo = await Tour.findOne({
      where: {
        id: item["tourId"]
      },
      raw: true
    })

    //-add key
    item["title"] = tourInfo["title"]
    
    item["slug"] = tourInfo["slug"]

    item["image"] = JSON.parse(tourInfo["images"])[0]
  }

  //-tong tien cua tat ca 
  order["total_price"] = ordersItem.reduce((sum, item) => sum + item["total"], 0)


  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    ordersItem: ordersItem
  })
}