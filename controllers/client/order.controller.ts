import { Request, Response } from "express";

//-[post]: /order
export const order = async (req: Request, res: Response) => {
  const data = req.body

  res.json({
    code: 200,
    message: "Đặt hàng thành công!"
  })
}