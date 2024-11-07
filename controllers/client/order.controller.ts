import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import { off } from "process";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";

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