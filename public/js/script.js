//-start slider tour detail
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
//-end lider tour detail



//-start cart 

//-ktra xem trong local storage da co cart hay chua, neu ch thi phai add vao
const cart = localStorage.getItem("cart")
if (!cart) { //-ch co
  localStorage.setItem("cart", JSON.stringify([]))
}

//-them tour vao cart
const formAddToCard = document.querySelector("[form-add-to-cart]")
if (formAddToCard) {
  formAddToCard.addEventListener("submit", (event) => {
    event.preventDefault()

    const quantity = parseInt(event.target.elements.quantity.value)
    const tourId = parseInt(formAddToCard.getAttribute("tour-id"))

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"))

      //-check xem da co tour do chua de update quantity
      const isExistTour = cart.findIndex(item => item.tourId == tourId)

      if (isExistTour == -1) { //-neu ch ton tai ==> them moi
        cart.push({
          tourId: tourId,
          quantity: quantity
        })
      } else{ //-neu ton tai thi update quantity
        cart[isExistTour].quantity = cart[isExistTour].quantity + quantity
      }


      //-update vao storgare
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  })
}

//-end cart