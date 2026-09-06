/* =====================================================
   SPICE GARDEN RESTAURANT
   SCRIPT.JS — PART 1
   Basic Setup + Mobile Menu
===================================================== */


/* =====================================================
   CART DATA
===================================================== */

let cart = [];



/* =====================================================
   RESTAURANT CONTACT DETAILS
===================================================== */

/*
   IMPORTANT:
   These are demo details.

   Replace them later with the real restaurant
   WhatsApp number and email address.
*/

const WHATSAPP_NUMBER = "919100000000";

const REVIEW_EMAIL = "restaurant@example.com";



/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- MOBILE MENU ---------- */

    const menuToggle = document.getElementById("menuToggle");

    const navMenu = document.getElementById("navMenu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("show");

        });


        /* Close menu when a navigation link is clicked */

        const navLinks = navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

            });

        });

    }



    /* ---------- SHOW STARTERS BY DEFAULT ---------- */

    const firstCategory = document.getElementById("starters");

    const firstButton = document.querySelector(".category");


    if (firstCategory) {

        firstCategory.classList.add("active-category");

    }


    if (firstButton) {

        firstButton.classList.add("active");

    }



    /* ---------- INITIAL CART ---------- */

    updateCart();

});
/* =====================================================
   MENU CATEGORY SWITCHING
   SCRIPT.JS — PART 2
===================================================== */


/* =====================================================
   SHOW MENU CATEGORY
===================================================== */

function showCategory(categoryId, clickedButton) {

    /* ---------- GET ALL CATEGORIES ---------- */

    const categories =
        document.querySelectorAll(".food-category");


    /* ---------- HIDE ALL CATEGORIES ---------- */

    categories.forEach(function (category) {

        category.classList.remove("active-category");

    });



    /* ---------- SHOW SELECTED CATEGORY ---------- */

    const selectedCategory =
        document.getElementById(categoryId);


    if (selectedCategory) {

        selectedCategory.classList.add("active-category");

    }



    /* ---------- REMOVE ACTIVE FROM ALL BUTTONS ---------- */

    const categoryButtons =
        document.querySelectorAll(".category");


    categoryButtons.forEach(function (button) {

        button.classList.remove("active");

    });



    /* ---------- ACTIVATE CLICKED BUTTON ---------- */

    if (clickedButton) {

        clickedButton.classList.add("active");

    }

}



/* =====================================================
   GO TO SECTION
===================================================== */

function goToSection(sectionId) {

    const section =
        document.getElementById(sectionId);


    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

      }
/* =====================================================
   UPGRADED SHOPPING CART
===================================================== */

function addToCart(name, price) {

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    showCartMessage(name + " added to cart!");
}


/* ================= CART MESSAGE ================= */

function showCartMessage(message) {

    alert("🛒 " + message);
}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    /* Total quantity */

    const totalQuantity = cart.reduce(
        function (total, item) {
            return total + item.quantity;
        },
        0
    );


    /* Total price */

    const totalPrice = cart.reduce(
        function (total, item) {
            return total + (item.price * item.quantity);
        },
        0
    );


    /* Update cart badge */

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }


    /* Empty cart */

    if (cartItems) {

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some delicious dishes to get started.</p>
                </div>
            `;

        } else {

            cartItems.innerHTML = cart.map(
                function (item, index) {

                    const itemTotal =
                        item.price * item.quantity;

                    return `
                        <div class="cart-item">

                            <div class="cart-item-info">

                                <h4>
                                    ${item.name}
                                </h4>

                                <p>
                                    ₹${item.price} each
                                </p>

                            </div>


                            <div class="cart-item-right">

                                <strong class="cart-item-total">
                                    ₹${itemTotal}
                                </strong>


                                <div class="cart-controls">

                                    <button
                                        class="quantity-btn"
                                        onclick="decreaseQuantity(${index})"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>


                                    <span class="quantity-number">
                                        ${item.quantity}
                                    </span>


                                    <button
                                        class="quantity-btn"
                                        onclick="increaseQuantity(${index})"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>


                                    <button
                                        class="remove-item"
                                        onclick="removeFromCart(${index})"
                                        aria-label="Remove item"
                                    >
                                        🗑️
                                    </button>

                                </div>

                            </div>

                        </div>
                    `;
                }
            ).join("");
        }
    }


    /* Update total */

    if (cartTotal) {

        cartTotal.textContent =
            "₹" + totalPrice;
    }
}


/* ================= INCREASE ================= */

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += 1;

    updateCart();
}


/* ================= DECREASE ================= */

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}


/* ================= REMOVE ================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    updateCart();
}


/* ================= CLEAR CART ================= */

function clearCart() {

    if (cart.length === 0) {
        return;
    }

    const confirmClear =
        confirm("Are you sure you want to clear your cart?");

    if (!confirmClear) {
        return;
    }

    cart = [];

    updateCart();
}
/* =====================================================
   CART OPEN / CLOSE
   SCRIPT.JS — PART 4
===================================================== */

function openCart() {

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartPanel =
        document.getElementById("cartPanel");

    if (cartOverlay) {
        cartOverlay.classList.add("show");
    }

    if (cartPanel) {
        cartPanel.classList.add("show");
    }

    document.body.classList.add("cart-open");
}


function closeCart() {

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartPanel =
        document.getElementById("cartPanel");

    if (cartOverlay) {
        cartOverlay.classList.remove("show");
    }

    if (cartPanel) {
        cartPanel.classList.remove("show");
    }

    document.body.classList.remove("cart-open");
}


/* Close cart when clicking outside the panel */

document.addEventListener("click", function (event) {

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartPanel =
        document.getElementById("cartPanel");

    if (
        cartOverlay &&
        cartPanel &&
        event.target === cartOverlay
    ) {
        closeCart();
    }
});


/* Close cart using the Escape key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeCart();
    }
});
/* =====================================================
   WHATSAPP ORDER
   SCRIPT.JS — PART 5
===================================================== */

function orderOnWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items first.");
        return;
    }

    let message = "Hello Spice Garden Restaurant!%0A%0A";
    message += "I would like to order:%0A";

    cart.forEach(function (item) {

        message +=
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            (item.price * item.quantity) +
            "%0A";
    });

    const totalPrice = cart.reduce(
        function (total, item) {
            return total + (item.price * item.quantity);
        },
        0
    );

    message += "%0ATotal: ₹" + totalPrice;

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        message;

    window.open(whatsappURL, "_blank");
}


/* =====================================================
   BOOKING FORM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm =
        document.getElementById("bookingForm");

    const bookingDate =
        document.getElementById("bookingDate");


    // Prevent selecting past dates
    if (bookingDate) {

        const today =
            new Date().toISOString().split("T")[0];

        bookingDate.min = today;
    }


    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const customerName =
                document.getElementById("customerName").value.trim();

            const customerPhone =
                document.getElementById("customerPhone").value.trim();

            const date =
                document.getElementById("bookingDate").value;

            const time =
                document.getElementById("bookingTime").value;

            const members =
                document.getElementById("bookingMembers").value;

            const specialRequest =
                document.getElementById("specialRequest").value.trim();


            if (
                !customerName ||
                !customerPhone ||
                !date ||
                !time ||
                !members
            ) {
                alert("Please fill in all required fields.");
                return;
            }


            // Basic phone number check
            const phoneNumber =
                customerPhone.replace(/\D/g, "");

            if (phoneNumber.length < 10) {
                alert("Please enter a valid phone number.");
                return;
            }


            let bookingMessage =
                "Hello Spice Garden Restaurant!%0A%0A";

            bookingMessage +=
                "I would like to book a table.%0A%0A";

            bookingMessage +=
                "Name: " + encodeURIComponent(customerName) + "%0A";

            bookingMessage +=
                "Phone: " + encodeURIComponent(customerPhone) + "%0A";

            bookingMessage +=
                "Date: " + encodeURIComponent(date) + "%0A";

            bookingMessage +=
                "Time: " + encodeURIComponent(time) + "%0A";

            bookingMessage +=
                "Members: " + encodeURIComponent(members) + "%0A";


            if (specialRequest) {

                bookingMessage +=
                    "Special Request: " +
                    encodeURIComponent(specialRequest) +
                    "%0A";
            }


            const bookingURL =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                bookingMessage;


            window.open(bookingURL, "_blank");

            alert("Your booking request is ready. Please send the WhatsApp message to confirm your reservation.");

            bookingForm.reset();

            if (bookingDate) {

                const today =
                    new Date().toISOString().split("T")[0];

                bookingDate.min = today;
            }
        });
    }
});
/* =====================================================
   REVIEWS + CONTACT
   SCRIPT.JS — PART 6
===================================================== */


/* =====================================================
   WRITE A REVIEW
===================================================== */

function writeReview() {

    const subject =
        encodeURIComponent("Spice Garden Restaurant Review");

    const body =
        encodeURIComponent(
            "Hello Spice Garden Restaurant,\n\n" +
            "I would like to share my review:\n\n"
        );

    const emailURL =
        "mailto:" +
        REVIEW_EMAIL +
        "?subject=" +
        subject +
        "&body=" +
        body;

    window.location.href = emailURL;
}


/* =====================================================
   PHONE NUMBER VALIDATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const customerPhone =
        document.getElementById("customerPhone");

    if (customerPhone) {

        customerPhone.addEventListener("input", function () {

            // Keep only numbers
            this.value = this.value.replace(/\D/g, "");

            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.substring(0, 10);
            }
        });
    }
});


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICKING CART
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navMenu =
        document.getElementById("navMenu");

    if (navMenu) {

        const cartButton =
            navMenu.querySelector(".nav-cart");

        if (cartButton) {

            cartButton.addEventListener("click", function () {

                navMenu.classList.remove("show");

            });
        }
    }
});
/* =====================================================
   FINAL USER EXPERIENCE IMPROVEMENTS
   SCRIPT.JS — PART 7
===================================================== */


/* =====================================================
   CLOSE MOBILE MENU WHEN ESCAPE IS PRESSED
===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const navMenu =
            document.getElementById("navMenu");

        if (navMenu) {
            navMenu.classList.remove("show");
        }
    }
});


/* =====================================================
   CLOSE MOBILE MENU WHEN A NAV LINK IS CLICKED
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navMenu =
        document.getElementById("navMenu");

    if (!navMenu) {
        return;
    }

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

        });
    });
});


/* =====================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const links =
        document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});


/* =====================================================
   UPDATE CART BEFORE PAGE UNLOAD
===================================================== */

window.addEventListener("beforeunload", function () {

    updateCart();

});
/* =====================================================
   FINAL SETUP
   SCRIPT.JS — PART 8
===================================================== */


/* =====================================================
   SET CURRENT YEAR IN FOOTER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
});


/* =====================================================
   PREVENT FORM SUBMISSION WITH ENTER
   WHEN NOT INTENDED
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const forms =
        document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" &&
                event.target.tagName !== "TEXTAREA"
            ) {

                // Allow normal submit button behavior
                if (event.target.type !== "submit") {
                    event.preventDefault();
                }
            }
        });
    });
});


/* =====================================================
   FINAL CART UPDATE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    updateCart();

});
