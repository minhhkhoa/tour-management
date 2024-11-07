import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";

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

  res.json({
    code: 200,
    message: "Đặt hàng thành công!",
    orderCode: code //- muc dich de dung cai nay lam trang dat hang thanh cong voi ma don hang nay
  })
}