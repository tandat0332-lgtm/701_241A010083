
/* ===========================
   BÀI 1: TÌM KIẾM SẢN PHẨM
=========================== */

// Đoạn code xử lý Bài 1 trong file js/script.js
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const notFoundMessage = document.getElementById('notFoundMessage');

if (productGrid) {
    // Danh sách 10 sản phẩm (gồm 5 sản phẩm cũ và 5 sản phẩm mới thêm vào)
    const products = [
        { id: 1, name: "Điện thoại iPhone 15", price: "22.990.000đ", img: "images/iphone15.webp" },
        { id: 2, name: "Laptop Dell XPS 13", price: "35.500.000đ", img: "images/laptop.webp" },
        { id: 3, name: "Tai nghe Sony WH-1000XM5", price: "8.490.000đ", img: "images/tai nghe.webp" },
        { id: 4, name: "Đồng hồ Apple Watch Series 9", price: "10.290.000đ", img: "images/apple watch.webp" },
        { id: 5, name: "Bàn phím Cơ Keychron K2", price: "1.950.000đ", img: "images/bàn phím.webp" },
        // --- 5 sản phẩm mới bổ sung thêm ---
        { id: 6, name: "Máy ảnh Canon EOS R50", price: "18.990.000đ", img: "images/OIP.webp" },
        { id: 7, name: "Loa Bluetooth JBL Charge 5", price: "3.690.000đ", img: "images/loa.webp" },
        { id: 8, name: "Chuột Logitech MX Master 3S", price: "2.490.000đ", img: "images/chuột.webp" },
        { id: 9, name: "Màn hình LG UltraWide 29 inch", price: "6.290.000đ", img: "images/màn hình.webp" },
        { id: 10, name: "Ổ cứng SSD Samsung T7 1TB", price: "2.790.000đ", img: "images/ssd.webp" }
    ];

    function renderProducts(items) {
        productGrid.innerHTML = "";
        if (items.length === 0) {
            notFoundMessage.style.display = "block";
        } else {
            notFoundMessage.style.display = "none";
            items.forEach(p => {
                const div = document.createElement('div');
                div.className = 'p-card';
                div.innerHTML = `
                    <img src="${p.img}" alt="${p.name}">
                    <h4>${p.name}</h4>
                    <p>${p.price}</p>
                `;
                productGrid.appendChild(div);
            });
        }
    }
    
    // Hiển thị toàn bộ danh sách ban đầu
    renderProducts(products);

    // Xử lý sự kiện tìm kiếm không phân biệt hoa/thường
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = products.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered);
    });
}
/* ===========================
   BÀI 2: FORM ĐĂNG KÝ
=========================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name")
            .value.trim();

        const email = document.getElementById("email")
            .value.trim();

        const password = document.getElementById("password")
            .value;

        const terms = document.getElementById("terms").checked;
        const message = document.getElementById("formMessage");

        message.style.color = "#b42318";

        if (name === "") {
            message.textContent = "Vui lòng nhập họ và tên.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            message.textContent = "Email không hợp lệ.";
            return;
        }

        const passwordValid =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password);

        if (!passwordValid) {
            message.textContent =
                "Mật khẩu phải có ít nhất 8 ký tự, " +
                "gồm chữ hoa, chữ thường và số.";
            return;
        }

        if (!terms) {
            message.textContent =
                "Bạn cần đồng ý với điều khoản.";
            return;
        }

        try {
            // Chỉ lưu tên và email, không lưu mật khẩu.
            const user = {
                name: name,
                email: email,
                registeredAt: new Date().toISOString()
            };

            localStorage.setItem(
                "registeredUser",
                JSON.stringify(user)
            );

            message.style.color = "green";
            message.textContent =
                "Đăng ký thành công! Dữ liệu đã được lưu.";

            registerForm.reset();

        } catch (error) {
            message.textContent =
                "Không thể lưu dữ liệu trên trình duyệt.";
        }
    });
}


/* ===========================
   BÀI 3: ĐỒNG HỒ ĐẾM NGƯỢC
=========================== */

const timer = document.getElementById("timer");

if (timer) {
    const startButton = document.getElementById("startTimer");
    const pauseButton = document.getElementById("pauseTimer");
    const resetButton = document.getElementById("resetTimer");
    const timerMessage = document.getElementById("timerMessage");

    const initialTime = 600;
    let remainingTime = initialTime;
    let interval = null;
    let finished = false;

    function updateTimer() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        timer.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        timer.classList.toggle(
            "warning",
            remainingTime > 0 && remainingTime < 60
        );
    }

    function stopTimer() {
        if (interval !== null) {
            clearInterval(interval);
            interval = null;
        }
    }

    function endTimer() {
        stopTimer();
        remainingTime = 0;
        finished = true;
        updateTimer();

        timerMessage.textContent = "Đã hết thời gian!";
        window.alert("Đã hết 10 phút!");
    }

    startButton.addEventListener("click", function() {
        if (interval !== null || finished) return;

        timerMessage.textContent = "Đồng hồ đang chạy.";

        interval = setInterval(function() {
            remainingTime--;

            if (remainingTime <= 0) {
                endTimer();
            } else {
                updateTimer();
            }
        }, 1000);
    });

    pauseButton.addEventListener("click", function() {
        stopTimer();

        if (!finished) {
            timerMessage.textContent = "Đồng hồ đã tạm dừng.";
        }
    });

    resetButton.addEventListener("click", function() {
        stopTimer();

        remainingTime = initialTime;
        finished = false;

        updateTimer();
        timerMessage.textContent = "Đã đặt lại 10 phút.";
    });

    updateTimer();
}
