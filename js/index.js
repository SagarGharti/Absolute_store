 let items = [
    {
      id: 1,
      item_name: "Acer",
      item_price: 60000,
    },
    {
      id: 2,
      item_name: "Lenovo",
      item_price: 50000,
    },
    {
      id: 3,
      item_name: "Lenovo Yoga",
      item_price: 70000,
    },
    {
      id: 4,
      item_name: "Dell",
      item_price: 90000,
    },
    {
      id: 5,
      item_name: "sari",
      item_price: 6000,
    },
    {
      id: 6,
      item_name: "sari",
      item_price: 6000,
    },
    {
      id: 7,
      item_name: "sari",
      item_price: 6000,
    },
    {
      id: 8,
      item_name: "sari",
      item_price: 6000,
    },
  ];

  function itemClicked(id) {
    let currentCartItems = localStorage.getItem("cart_items");
    let parsedCurrentItems = JSON.parse(currentCartItems) || [];

    let currentItem = items.filter((item) => item.id == id);
    parsedCurrentItems.push(currentItem[0]);

    localStorage.setItem("cart_items", JSON.stringify(parsedCurrentItems));
    getCurrentCartItems();
  }

  function getCurrentCartItems() {
    let currentCartItems = localStorage.getItem("cart_items");
    let parsedCurrentItems = JSON.parse(currentCartItems);
    $("#cart_items_count").html(parsedCurrentItems?.length || 0);
  }

  function calculateCartItems() {
    let displayString = "";

    let currentCartItems = localStorage.getItem("cart_items") || [];
    if (currentCartItems.length <= 0) {
      displayString = "";
      displayString = `<p> No cart items added!</p>`;
      $("#cartModalBody").html(displayString);
      loadModal();
    } else {
      displayString = "";
      displayString = `<table class="table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Item Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>`;
      let parsedCurrentItems = JSON.parse(currentCartItems);
      let totalAmount = 0;

      // add each item row
      parsedCurrentItems.forEach((cartItem, index) => {
        displayString =
          displayString +
          `
        <tr>
          <td>${index + 1}</td>
          <td>${cartItem.item_name}</td>
          <td>${cartItem.item_price}</td>
        </tr>
        `;
        totalAmount = totalAmount + cartItem.item_price;
      });

      displayString =
        displayString +
        `
      </tbody>
      </table>
      `;
      // calculate total price

      displayString =
        displayString +
        `
      <p> Total amount = ${totalAmount}</p>
      <p> Total number of Items = ${parsedCurrentItems.length} </p>
      `;
      $("#cartModalBody").html(displayString);
      loadModal();
    }
  }

  function clearCart() {
    localStorage.clear();

    // hides the modal
    $("#cartInfoModal").modal("hide");

    // refresh cart items count
    getCurrentCartItems();
  }

  function loadModal() {
    $("#cartInfoModal").modal("show");
  }
