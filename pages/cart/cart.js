const dataTable = document.querySelector(".data-table");
const total = document.querySelector(".total");
const getData = async () => {
  const respone = await fetch("../../mockData.json");
  const data = await respone.json();
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  if (cart.length === 0) {
    dataTable.textContent = "Không có sản phẩm nào trong giỏ hàng";
    return;
  }
  const cartItems = cart.map((item) => {
    const book = data.find((book) => book.id === item.id);
    return {
      id: book.id,
      quantity: item.count,
      title: book.title,
      price: book.price,
    };
  });
  let thanhTien = 0;
  dataTable.innerHTML = cartItems.reduce((acc, item) => {
    let result = +item.quantity * +item.price;
    thanhTien += result;
    return (
      acc +
      `
      <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${result}</td>
        <td><button style = "background-color: #f44336;
            color: white;
            padding: 5px 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;" class="delete-btn" onclick="deleteProjectFromCart(${item.id})">X</button></td>
      </tr>
    `
    );
  }, "");
  total.textContent = thanhTien;
};

const deleteProjectFromCart = async (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  await getData();
};

getData();
