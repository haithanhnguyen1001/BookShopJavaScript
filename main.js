const listBook = document.querySelector(".list");

const getDataFromJson = async () => {
  const respone = await fetch("mockData.json");

  const data = await respone.json();

  if (data) {
    listBook.innerHTML = data.map((item) => {
      return `
            <div class="item">
                <img src="./assets/icons/open-book.png" alt="open-book" class="icon-ab">
                <img src="${item.imgUrl}" alt="${item.title}">
                <div class="product-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="pages/detail/index.html?id=${item.id}" class="btn">View</a>
                </div>
            </div>
            
            `;
    });
  }
};

getDataFromJson();
