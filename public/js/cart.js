//-sang file default.pug nhung file js da

//-lay ra data va in ra giao dien
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
  })
//-end lay ra data va in ra giao dien
