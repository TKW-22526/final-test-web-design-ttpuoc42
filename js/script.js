
// ======================
// GIỎ HÀNG
// ======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ======================
// CẬP NHẬT GIỎ HÀNG
// ======================

function updateCart(){

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if(cartCount){
        cartCount.innerText = cart.length;
    }

    if(!cartItems || !totalPrice){
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price;

       cartItems.innerHTML += `
<div class="cart-item">

    <img src="${item.image}" class="cart-img">

    <div class="cart-info">

        <h4>${item.name}</h4>

        <p>
            ${item.price.toLocaleString('vi-VN')}đ
        </p>

        <button onclick="removeItem(${index})">
            Xóa
        </button>

    </div>

</div>
`;
    });

    totalPrice.innerText =
    total.toLocaleString('vi-VN') + "đ";
}

// ======================
// THÊM VÀO GIỎ HÀNG
// ======================

function addToCart(name,price,image){

    cart.push({
        name:name,
        price:price,
        image:image
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

    alert("✔ Đã thêm vào giỏ hàng thành công!");
}

// ======================
// XÓA SẢN PHẨM
// ======================

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();
}

// ======================
// MỞ GIỎ HÀNG
// ======================

function openCart(){

    const modal =
    document.getElementById("cartModal");

    if(modal){
        modal.style.display = "flex";
    }

    updateCart();
}

// ======================
// ĐÓNG GIỎ HÀNG
// ======================

function closeCart(){

    const modal =
    document.getElementById("cartModal");

    if(modal){
        modal.style.display = "none";
    }
}

// ======================
// THANH TOÁN
// ======================

function checkout(){

    if(cart.length === 0){

        alert("Giỏ hàng đang trống!");

        return;
    }

    alert(
        "Đặt hàng thành công!\n\nCảm ơn bạn đã mua hàng tại SPORT MEN TRÀ VINH."
    );

    cart = [];

    localStorage.removeItem("cart");

    updateCart();

    closeCart();
}

// ======================
// MUA NGAY
// ======================

function buyNow(productName){

    alert(
        "Cảm ơn bạn đã chọn mua: " +
        productName +
        "\n\nNhân viên sẽ liên hệ xác nhận đơn hàng."
    );

}

// ======================
// DANH SÁCH SẢN PHẨM
// ======================

const products = {

    1:{
        name:"Áo Bóng Đá Nam",
        price:250000,
        image:"../assets/ao1.jpg",
        description:"Áo bóng đá nam chất liệu cao cấp, thoáng khí và co giãn tốt."
    },

    2:{
        name:"Quần Jogger Thể Thao",
        price:199000,
        image:"../assets/quan1.jpg",
        description:"Quần jogger thể thao trẻ trung, năng động."
    },

    3:{
        name:"Giày Adidas Predator",
        price:890000,
        image:"../assets/giay1.jpg",
        description:"Giày Adidas Predator chính hãng, chống trượt và bền đẹp."
    },

    4:{
        name:"Bộ Thể Thao Nam",
        price:450000,
        image:"../assets/bo1.jpg",
        description:"Bộ thể thao nam cao cấp, thoáng mát."
    },

    5:{
        name:"Áo Polo Thể Thao",
        price:299000,
        image:"../assets/ao2.jpg",
        description:"Áo polo thể thao lịch lãm và năng động."
    },

    6:{
        name:"Giày Chạy Bộ Nike",
        price:1250000,
        image:"../assets/giay2.jpg",
        description:"Giày chạy bộ Nike siêu nhẹ, hỗ trợ giảm chấn hiệu quả."
    },

    7:{
        name:"Túi Thể Thao Adidas",
        price:350000,
        image:"../assets/tui1.jpg",
        description:"Túi thể thao Adidas rộng rãi, tiện lợi."
    }

};

// ======================
// HIỂN THỊ CHI TIẾT SẢN PHẨM
// ======================

function loadProduct(){

    const params =
    new URLSearchParams(window.location.search);

    const id = params.get("id");

    if(!id || !products[id]){
        return;
    }

    document.getElementById("product-name").innerText =
    products[id].name;

    document.getElementById("product-price").innerText =
    products[id].price.toLocaleString('vi-VN') + "đ";

    document.getElementById("product-image").src =
    products[id].image;

    document.getElementById("product-description").innerText =
    products[id].description;
}

// ======================
// THÊM SẢN PHẨM HIỆN TẠI
// ======================

function addCurrentProduct(){

    const params =
    new URLSearchParams(window.location.search);

    const id = params.get("id");

    if(products[id]){

        addToCart(
            products[id].name,
            products[id].price,
            products[id].image
        );

    }
}

// ======================
// MUA SẢN PHẨM HIỆN TẠI
// ======================

function buyCurrentProduct(){

    const params =
    new URLSearchParams(window.location.search);

    const id = params.get("id");

    if(products[id]){

        buyNow(products[id].name);

    }
}

// ======================
// KHI TẢI TRANG
// ======================

window.onload = function(){

    updateCart();

    loadProduct();

};
