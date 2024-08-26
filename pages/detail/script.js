const detailContain = document.querySelector(".detail-contain");
const btnCart = document.getElementById("addCart");
const cartIcon = document.querySelector(".cart");

const getDetailBook = async () => {
  const url = new URLSearchParams(window.location.search);

  const bookId = url.get("id");

  const respone = await fetch("../../mockData.json");

  const data = await respone.json();

  const findBookById = data.find(
    (item) => item.id.toString() === bookId.toString()
  );

  detailContain.innerHTML = `
    <div class="detail">
        <div class="detail-image">
            <img src="../../${findBookById.imgUrl}">
        </div>
        <div class="detail-info">
            <h2>${findBookById.title}</h2>
            <p>${findBookById.description}</p>
            <div class="detail-price">
                <span class="price">$${findBookById.price}</span>    
            </div>
        </div>
    </div>
    `;

  btnCart.addEventListener("click", (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Cần đăng nhập");
      window.location.href = "../authenticate/login/index.html";
      return;
    }
    if (cart) {
      const item = cart.findIndex((item) => item.id === findBookById.id);

      if (item !== -1) {
        cart[item].count += 1;
      } else {
        cart.push({ id: findBookById.id, count: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`Đã thêm sản phẩm vào giỏ hàng!`);
    } else {
      const data = [
        {
          id: findBookById.id,
          count: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(data));
      alert(`Đã thêm sản phẩm vào giỏ hàng!`);
    }
    setCartItem();
  });
};

const setCartItem = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart && cart.length > 0) {
    cartIcon.innerHTML = `
        <p class="cart-item">${cart.length}</p>
        <img src="../../assets/icons/shopping-cart.png" alt="shopping-cart">
        `;
  }
};
setCartItem();
getDetailBook();
