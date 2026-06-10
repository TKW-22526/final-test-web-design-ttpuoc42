let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = {
    1: {
        name: "Áo Bóng Đá Nam",
        price: 250000,
        image: "../assets/ao1.jpg",
        description: "Áo bóng đá nam chất liệu cao cấp, thoáng khí và co giãn tốt."
    },
    2: {
        name: "Quần Jogger Thể Thao",
        price: 199000,
        image: "../assets/quan1.jpg",
        description: "Quần jogger thể thao trẻ trung, năng động, phù hợp đi chơi và tập luyện."
    },
    3: {
        name: "Giày Adidas Predator",
        price: 890000,
        image: "../assets/giay1.jpg",
        description: "Giày Adidas Predator thiết kế mạnh mẽ, chống trượt và bền đẹp."
    },
    4: {
        name: "Bộ Thể Thao Nam",
        price: 450000,
        image: "../assets/bo1.jpg",
        description: "Bộ thể thao nam cao cấp, thoáng mát, phù hợp luyện tập hằng ngày."
    },
    5: {
        name: "Áo Polo Thể Thao",
        price: 299000,
        image: "../assets/ao2.jpg",
        description: "Áo polo thể thao lịch lãm, dễ phối đồ và thoải mái khi vận động."
    },
    6: {
        name: "Giày Chạy Bộ Nike",
        price: 1250000,
        image: "../assets/giay2.jpg",
        description: "Giày chạy bộ Nike siêu nhẹ, hỗ trợ giảm chấn và tăng độ bám đường."
    },
    7: {
        name: "Túi Thể Thao Adidas",
        price: 350000,
        image: "../assets/tui1.jpg",
        description: "Túi thể thao Adidas rộng rãi, tiện lợi khi đi tập gym hoặc du lịch."
    }
};

function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "đ";
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function showMessage(message) {
    const oldToast = document.querySelector(".toast-message");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2200);
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartCount) {
        cartCount.innerText = totalQuantity;
    }

    if (!cartItems || !totalPrice) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Giỏ hàng của bạn đang trống.</p>`;
        totalPrice.innerText = "0đ";
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-img">

            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>${formatMoney(item.price)}</p>

                <div class="quantity-box">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Xóa sản phẩm
                </button>
            </div>
        </div>
    `).join("");

    totalPrice.innerText = formatMoney(total);
}

function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    showMessage("✔ Đã thêm sản phẩm vào giỏ hàng");
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    saveCart();
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
    showMessage("Đã xóa sản phẩm khỏi giỏ hàng");
}

function openCart() {
    document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        showMessage("Giỏ hàng đang trống");
        return;
    }

    showMessage("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");

    cart = [];
    localStorage.removeItem("cart");

    updateCart();

    setTimeout(() => {
        closeCart();
    }, 1000);
}

function buyNow(productName) {
    showMessage("Bạn đã chọn mua: " + productName);
}

function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id || !products[id]) return;

    const name = document.getElementById("product-name");
    const price = document.getElementById("product-price");
    const image = document.getElementById("product-image");
    const description = document.getElementById("product-description");

    if (name) name.innerText = products[id].name;
    if (price) price.innerText = formatMoney(products[id].price);
    if (image) {
        image.src = products[id].image;
        image.alt = products[id].name;
    }
    if (description) description.innerText = products[id].description;
}

function addCurrentProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (products[id]) {
        addToCart(products[id].name, products[id].price, products[id].image);
    }
}

function buyCurrentProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (products[id]) {
        buyNow(products[id].name);
    }
}

window.addEventListener("click", function(event) {
    const modal = document.getElementById("cartModal");

    if (event.target === modal) {
        closeCart();
    }
});

window.addEventListener("load", function() {
    updateCart();
    loadProduct();
});
// ======================
// SLIDER TỰ ĐỘNG
// ======================

let currentSlide = 0;

function autoSlider(){

    const slides =
    document.querySelectorAll(".slide");

    const dots =
    document.querySelectorAll(".dot");

    if(slides.length === 0) return;

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

setInterval(autoSlider,4000);

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(item => item.email === email && item.password === password);

    if (!user) {
        showMessage("Email hoặc mật khẩu không đúng");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    showMessage("Đăng nhập thành công!");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1000);
}

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const phone = document.getElementById("register-phone").value.trim();
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm").value;

    if (password.length < 6) {
        showMessage("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Mật khẩu nhập lại không khớp");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        showMessage("Email này đã được đăng ký");
        return;
    }

    const newUser = {
        name,
        email,
        phone,
        password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    showMessage("Đăng ký thành công!");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1000);
}   