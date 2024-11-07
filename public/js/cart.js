//-sang file default.pug nhung file js da

//-start ve ra danh sach tour
const drawListTour = () => {
  fetch("http://localhost:3000/cart/list-json", { //-gui data tu localstorage cho be
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
    //-cho phan hoi ve
    .then(res => res.json())
    .then(data => {
      //-ve ra giao dien
      const htmlsArray = data.tours.map((item, index) => {
        return `
        <tr>
          <td>
            ${index + 1}
          </td>
          <td>
            <img src= "${item.image}" alt= "${item.info.title}" width="80px" />
          </td>
          <td>
            <a href="/tours/detail/${item.info.slug}">${item.info.title}</a>
          </td>
          <td>
            ${Number(item.price_special).toLocaleString()}đ
          </td>
          <td>
            <input 
              type="number" 
              name="quantity" 
              value="${item.quantity}" 
              min="1" 
              item-id="${item.tourId}" 
              style="width: 60px;" 
            />
          </td>
          <td>${Number(item.total).toLocaleString()}đ</td>
          <td>
            <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
          </td>
        </tr>
      `
      })


      const listTour = document.querySelector("[list-tour]")
      listTour.innerHTML = htmlsArray.join("")

      //-tinh tong tien don hang
      const totalPrice = data.tours.reduce((sum, item) => sum + parseInt(item.total), 0)

      const elementTotalPrice = document.querySelector("[total-price]")
      elementTotalPrice.innerHTML = totalPrice.toLocaleString()


      //goi ham
      deleteItemInCart()

      updateQuantityInCart()
    })
}
//-end ve ra danh sach tour


//-start  xoa sp
const deleteItemInCart = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]")
  listBtnDelete.forEach(button => {
    button.addEventListener("click", () => {
      const tourId = button.getAttribute("btn-delete")

      const cart = JSON.parse(localStorage.getItem("cart"))

      //-tao ra cart moi sau khi xoa
      const newCart = cart.filter(item => item.tourId != tourId)

      //-luu moi
      localStorage.setItem("cart", JSON.stringify(newCart))

      //- sau khi xoa song thi ve lai giao dien
      drawListTour()
    })
  })
}
//-end xoa sp


//-start update quantity
const updateQuantityInCart = () => {
  const listInputUpdate = document.querySelectorAll("[list-tour] input[item-id]")
  listInputUpdate.forEach(input => {
    input.addEventListener("change", () => {
      const tourId = input.getAttribute("item-id")

      //-lay ra giatri
      const quantity = parseInt(input.value)

      const cart = JSON.parse(localStorage.getItem("cart"))

      //- lay ra dua can update
      const tourUpdate = cart.find(item => item.tourId == tourId)
      tourUpdate.quantity = quantity

      // //-luu moi
      localStorage.setItem("cart", JSON.stringify(cart))

      // //- sau khi xoa song thi ve lai giao dien
      drawListTour()
    })
  })
}
//-end update quantity



//-lay ra data va in ra giao dien
//-goi ham
drawListTour()
//-end lay ra data va in ra giao dien


//-satrt đặt tour
const formOrder = document.querySelector("[form-order]")
if (formOrder) {
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault(); //-ngan chan hanh vi mac dinh la load lai trang

    //-lay infor ng dat
    const fullName = event.target.elements.fullName.value
    const phone = event.target.elements.phone.value
    const note = event.target.elements.note.value

    //-lay ra gio hang
    const cart = JSON.parse(localStorage.getItem("cart"))


    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: cart
    }

    //-gui len be bang API
    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if(data.code === 200){
          //-dat thanh cong thi xoa gio hang di
          localStorage.removeItem("cart")

          //-di den trang dat hang thanh cong
          window.location.href = `/order/success?orderCode=${data.orderCode}`
        } else{
          alert("Đặt hàng thất bại")
        }
      })
  })
}
//-end đặt tour