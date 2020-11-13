var dataController = (function() {
    
    return {
        
    };

})();

var uiController = (function() {

    var DOMstrings = {
        // Headings
        heading1: '.heading-primary',
        // Navigation bar
        navList: '.navigation__list',
        navItem: '.navigation__item',
        navLink: '.navigation__link',
        menuIcon: '.navigation__icon',
        navContainer: '.container-navigation',

        // Back to top button
        backToTop: '.back-to-top',

        // 'Bakery'
        bakery: '.container-bakery',
        bakeryText: '.bakery__box-text',
        bakeryImage: '.bakery__box-image',
        basket: '.basket',
        sign: '.container-sign',
        signSide: '.container-sign__side',
        curtain: '.curtain',
        bgLight: '.bg-fill',

        // 'About' ingredients
        grain: '.grain',
        milk: '.image-circle__milk',
        branch: '.whole-cocoa',
        fruit: '.cocoa-fruit',
        leaf: '.cocoa-leaf',
        cover: '.cocoa-fruit-cover',

        // 'About' layout
        aboutBox: '.about__box',
        circle: '.image-circle',

        // 'Package'
        packaging: '.container-packaging',
        packBox: '.packaging__box',

        // 'Cards'
        cardContainer: '.container-card',
        card: '.card',
        cardFront: '.card__side--front',
        cardBack: '.card__side--back',
        // Front side card elements
        subBtn: '.btn-sub',
        addBtn: '.btn-add',
        checkBtn: '.btn-check',
        input: '.card__input-value',


        counter: '.counter',
        footerContacts: '.footer__contacts',
    };

    // Clear active navigation item
    var clearActiveNav = () => {
        for(let i = 0; i < 5; i++) {
            document.querySelectorAll(DOMstrings.navLink)[i].classList.remove("active-link");
            document.querySelectorAll(DOMstrings.navItem)[i].classList.remove("active-item");
        }
    };

    // Checks if element is entirely inside viewport
    var isInViewport = el => {
        var bounding = el.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Checks if element is partialy inside viewport
    var peekInViewport = el => {
        var bounding, vh;

        bounding = el.getBoundingClientRect();
        vh = document.documentElement.clientHeight || window.innerHeight;

        return bounding.top <= (window.innerHeight || document.documentElement.clientHeight) - vh * .3;
    };

    // Scroll percent calculation
    // var getScrollPercent = () => {
    //     var h = document.documentElement, 
    //         b = document.body,
    //         st = 'scrollTop',
    //         sh = 'scrollHeight';
    //     return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    // };

    // Scroll position
    var scrollPosition = () => {
        return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    return {

        // Navigation selection on click
        selectNavClick: event => {
            var linkID, splitID, ID;

            linkID = event.target.id;

            if(linkID) {
                // Splitting ID
                splitID = linkID.split('-');
                ID = parseInt(splitID[1]);

                clearActiveNav();

                document.querySelectorAll(DOMstrings.navLink)[ID].classList.add("active-link");
                document.querySelectorAll(DOMstrings.navItem)[ID].classList.add("active-item");
            }
        },

        // Navigation selection on scroll
        selectNavScroll: () => {
            var circles, navLinks, navItems, bakery, packaging, cards, eko, footer;

            circles = document.querySelectorAll(DOMstrings.circle);
            navLinks = document.querySelectorAll(DOMstrings.navLink);
            navItems = document.querySelectorAll(DOMstrings.navItem);

            bakery = document.querySelector(DOMstrings.bakery);
            packaging = document.querySelector(DOMstrings.packaging);
            cards = document.querySelector(DOMstrings.cardContainer);
            eko = document.querySelector(DOMstrings.counter);
            footer = document.querySelector(DOMstrings.footerContacts);

            setTimeout(() => {
                if (isInViewport(circles[2]) || isInViewport(bakery)) {
                    clearActiveNav();
                    navLinks[0].classList.add("active-link");
                    navItems[0].classList.add("active-item");
                }else if (isInViewport(packaging)) {
                    clearActiveNav();
                    navLinks[1].classList.add("active-link");
                    navItems[1].classList.add("active-item");
                }else if (isInViewport(cards)) {
                    clearActiveNav();
                    navLinks[2].classList.add("active-link");
                    navItems[2].classList.add("active-item");
                }else if (isInViewport(eko)) {
                    clearActiveNav();
                    navLinks[3].classList.add("active-link");
                    navItems[3].classList.add("active-item");
                }else if (isInViewport(footer)) {
                    clearActiveNav();
                    navLinks[4].classList.add("active-link");
                    navItems[4].classList.add("active-item");
                }else if (isInViewport(document.querySelector(DOMstrings.heading1))){
                    clearActiveNav();
                }
            }, 200);
        },

        // Menu show/hide on click
        toggleNav: () => {
            var icon, list, bg;

            icon = document.querySelector(DOMstrings.menuIcon);
            list = document.querySelector(DOMstrings.navList);
            bg = document.querySelector(DOMstrings.navContainer);

            if(scrollPosition() > 1 && list.classList.contains('collapse')) {
                bg.classList.add("slide-down");
            }else if(!list.classList.contains('collapse')) {
                setTimeout(() => {
                    bg.classList.remove("slide-down");
                }, 1500);
            }

            icon.classList.toggle("rotate-right");
            list.classList.toggle("collapse");
        },

        // Menu show/hide on scroll
        toggleNavOnScroll: () => {
            if(scrollPosition() > 1 && !document.querySelector(DOMstrings.navList).classList.contains('collapse')){
                uiController.toggleNav();
            }else if(scrollPosition() < 1 && document.querySelector(DOMstrings.navList).classList.contains('collapse')) {
                uiController.toggleNav();
            }
        },

        // Button to top show/hide on scroll
        btnToTopDisplay: () => {
            var backToTop, vh;
            
            backToTop = document.querySelector(DOMstrings.backToTop);
            vh = document.documentElement.clientHeight || window.innerHeight;

            if(scrollPosition() > vh * .8 && !backToTop.classList.contains("pop-icon")) {
                backToTop.classList.add("pop-icon");
                backToTop.classList.remove("to-bottom");
                backToTop.style.display = "block";
            }else if(scrollPosition() < vh * .8 && backToTop.classList.contains("pop-icon")){
                backToTop.classList.add("to-bottom");
                backToTop.classList.remove("pop-icon");
                setTimeout(() => {
                    backToTop.style.display = "none";
                }, 500);
            }
        },

        // Bakery section display and animation
        animateBakery: () => {
            var bakery, curtains, baskets, signSides;

            bakery = document.querySelector(DOMstrings.bakery);
            curtains = document.querySelectorAll(DOMstrings.curtain);
            baskets = document.querySelectorAll(DOMstrings.basket);
            signSides = document.querySelectorAll(DOMstrings.signSide)

            // Entry animation
            if(peekInViewport(bakery)) {
                document.querySelector(DOMstrings.bakeryImage).classList.add("from-left");
                document.querySelector(DOMstrings.bakeryText).classList.add("from-right");
            }
            
            // Inner animation
            if(isInViewport(bakery)) {
                curtains[0].classList.add("slide-left");
                curtains[1].classList.add("slide-right");
        
                setTimeout(() => {
                    setTimeout(() => {
                        baskets[0].classList.add("slide-basket");
                    }, 500);
                    setTimeout(() => {
                        baskets[1].classList.add("slide-basket");
                    }, 1000);
                    setTimeout(() => {
                        baskets[2].classList.add("slide-basket");
                    }, 1500);
                }, 1000);
        
                setTimeout(() => {
                    document.querySelector(DOMstrings.sign).classList.add("tilt-sign");
                    setTimeout(() => {
                        signSides[0].classList.add("flip-front");
                        signSides[1].classList.add("flip-back");
                    }, 500);
                }, 4000);
                
                document.querySelector(DOMstrings.bgLight).classList.add("lights-on");
            }
        },

        // About subsections display and animations
        animateAbout: () => {
            var aboutBoxes, circles;

            aboutBoxes = document.querySelectorAll(DOMstrings.aboutBox);
            circles = document.querySelectorAll(DOMstrings.circle);

            aboutBoxes.forEach(box => {
                if(peekInViewport(box)) {
                    box.classList.add("from-bottom");
                }
            });
            
    
            if(isInViewport(circles[0]) ) {
                document.querySelectorAll(DOMstrings.grain)[0].classList.add("rotate-right");
                setTimeout(() => {
                    document.querySelectorAll(DOMstrings.grain)[1].classList.add("rotate-left");
                }, 500);

            }else if(isInViewport(circles[1])) {
                document.querySelector(DOMstrings.milk).classList.add("milk-fill");

            }else if(isInViewport(circles[2])) {
                document.querySelector(DOMstrings.branch).classList.add("rotate-branch");
                setTimeout(() => {
                    document.querySelectorAll(DOMstrings.fruit).forEach((el, i) => {
                        el.classList.add("shake-fruit");
                        document.querySelectorAll(DOMstrings.leaf)[i].classList.add("shake-leaf");
                    });
                    setTimeout(() => {
                        document.querySelector(DOMstrings.cover).classList.add("hide-cover");
                    }, 1000);
                }, 250);
            }
        },

        // Packaging display
        animatePackaging: () => {
            if(peekInViewport(document.querySelector(DOMstrings.packaging))) {
                document.querySelectorAll(DOMstrings.packBox).forEach((box, i) => {
                    setTimeout(() => {
                        box.classList.add("from-bottom");
                    }, i * 200);
                });
            }
        },

        // Cards display
        animateCards: () => {
            if(peekInViewport(document.querySelector(DOMstrings.cardContainer))) {
                document.querySelectorAll(DOMstrings.card).forEach((card, i) => {
                    setTimeout(() => {
                        card.classList.add("from-bottom");
                    }, i * 200);
                });
            }
        },

        getDOMstrings: () => {
            return DOMstrings;
        }
    };

})();

var controller = ((dataCtrl, uiCtrl) => {

    var DOM = uiCtrl.getDOMstrings();

    var setupEventListeners = () => {

        document.querySelector(DOM.navList).addEventListener('click', uiCtrl.selectNavClick);
        document.querySelector(DOM.menuIcon).addEventListener('click', uiCtrl.toggleNav);
        document.querySelector(DOM.backToTop).addEventListener('click', () => {
            window.scrollTo(0, 0);
        });
        window.addEventListener('scroll', () => {
            uiCtrl.selectNavScroll();
            uiCtrl.toggleNavOnScroll();
            uiCtrl.btnToTopDisplay();
            uiCtrl.animateBakery();
            uiCtrl.animateAbout();
            uiCtrl.animatePackaging();
            uiCtrl.animateCards();
        });
        // document.querySelector(DOM.cardContainer).addEventListener('click', )

    };

    return {
        init: () => {
            setupEventListeners();
        }
    };

})(dataController, uiController);

controller.init();

/*
// *************************************************************************************************************************
// ********************************************************* CARDS *********************************************************

// Card sides
var cardContainer = document.querySelector(".container-card");
var cards = document.querySelectorAll(".card");
var fronts = document.querySelectorAll(".card__side--front");
var backs = document.querySelectorAll(".card__side--back");

// Front side - interactive elements
var subBtns = document.querySelectorAll(".btn-sub");
var addBtns = document.querySelectorAll(".btn-add");
var checkBtns = document.querySelectorAll(".btn-check");
var inputs = document.querySelectorAll(".card__input-value");
var inputArea = document.querySelectorAll(".card__input");

// Back side - calculated output elements
var weights = document.querySelectorAll(".order__weight");
var cookieNum = document.querySelectorAll(".order__number");
var prices = document.querySelectorAll(".order__price");

// Back side - animated elements
var cancelBtns = document.querySelectorAll(".btn-cancel");
var toCartBtn = document.querySelectorAll(".addtc");
var orders = document.querySelectorAll(".card__summary-order");
var messages = document.querySelectorAll(".card__summary-message");
var checked = document.querySelectorAll(".checked");
var cBack = document.querySelectorAll(".cookie__back");

// *************************** Funkcije za - + na prednjoj strani ***************************
// -------- ODUZIMANJE --------

subBtns.forEach(function(btn, i) {
    btn.addEventListener("click", function(){
        var inputValue = parseInt(inputs[i].value);
    
        if(inputValue <= 250) {
            inputValue = "";
        }else if(inputValue >= 250) {
            inputValue -= 250;
        }
    
        if(inputs[i].value !== "") {
            inputs[i].value = inputValue;
        }
    });
});

// -------- SABIRANJE --------

addBtns.forEach(function(btn, i) {
    btn.addEventListener("click", function(){
        var inputValue = parseInt(inputs[i].value);
        
        if(inputs[i].value === "") {
            inputValue = 250;
        }else if(inputValue >= 9750) {
            inputValue = 10000;
        }else {
            inputValue += 250;
        }
    
        inputs[i].value = inputValue;
    });
});

// *********** Kalkulacije za zadnju stranu kartica i rotacija kartice ***********

checkBtns.forEach(function(btn, i) {

    inputs[i].addEventListener("keydown", function() {
        if (event.keyCode === 13 && fronts[i].classList.contains("hide-front") == false) {
            checkBtns[i].click();
        }
    });

    checkBtns[i].addEventListener("click", function(){
        disableShort(checkBtns[i], 1000);
        calculateCard(i);
    });
});

function calculateCard(i) {
    if(inputs[i].value !== "" && inputs[i].value >= 15) {
        weights[i].innerHTML = Math.round((inputs[i].value / 1000) * 1000) / 1000;
        cookieNum[i].innerHTML = Math.round(inputs[i].value / 15);
        prices[i].innerHTML = Math.round((inputs[i].value / 15 * .09) * 100) / 100;

        flipCards(i);
    }else {
        inputArea[i].classList.toggle("highlight");
        setTimeout(function() {
            inputArea[i].classList.toggle("highlight");
        }, 2000);
    }
}

function flipCards(i) {
    fronts[i].classList.toggle("hide-front");
    backs[i].classList.toggle("show-back");
}

// *********************** Otkazivanje narudzbe ***********************

cancelBtns.forEach(function(btn, i) {
    btn.addEventListener("click", function() {
        resetValues(i);
        flipCards(i);
    });
});

// *********************** Animacija dodavanja u korpu ***********************

toCartBtn.forEach(function(btn, i) {
    btn.addEventListener("click", function() {
        disableShort(btn, 2000);
        
        // animate card elements
        orders[i].classList.toggle("dis-to-right");
        messages[i].classList.toggle("show");
        checked[i].classList.toggle("checked-on");
        cBack[i].classList.toggle("hide");
        cancelBtns[i].style.opacity = 0;
    
        // reset card elements
        setTimeout(function() {
            flipCards(i);
    
            orders[i].classList.toggle("dis-to-right");
            messages[i].classList.toggle("show");
            cancelBtns[i].style.opacity = 1;
            resetValues(i);
    
            setTimeout(function() {
                checked[i].classList.toggle("checked-on");
                cBack[i].classList.toggle("hide");
            }, 500);
        }, 2000);

        // animate cart icon
        if(cartIcon.style.visibility === "visible") {
            cartIcon.classList.add("shake-icon");

            setTimeout(function() {
                cartIcon.classList.remove("shake-icon");
            }, 1100);

        }else if(cartIcon.style.visibility !== "visible"){
            cartIcon.classList.add("pop-icon");

            setTimeout(function() {
                cartIcon.classList.remove("pop-icon");
            }, 1100);

        }
        
        cartIcon.style.visibility = "visible";
        notification.style.visibility = "visible";

    });
});

function resetValues(i) {
    weights[i].innerHTML = 0;
    cookieNum[i].innerHTML = 0;
    prices[i].innerHTML = 0;
    inputs[i].value = "";
}

function disableShort(element, time) {
    // disable element for short period of time to prevent spamming
    element.style.pointerEvents = "none";
    setTimeout(function() {
        element.style.pointerEvents = "auto";
    }, time);
}

// *************************************************************************************************************************
// ******************************************************** ECOLOGY ********************************************************

var eco = document.querySelector(".container-trees");
var trees = document.querySelectorAll(".tree img");
var treeContainers = document.querySelectorAll(".tree__wrap");
var treeNum;

var counter = document.querySelector(".counter");
var numberContainers = document.querySelectorAll(".counter__number");
var numbers = document.querySelectorAll(".counter__number img");
var ecoControl = true;

// *********************** Tree animation ***********************

window.addEventListener("scroll" , function() {
    if(isInViewport(eco) && ecoControl) {
        var plantedInt = Math.floor(Math.random() * 13000) + 1;
        var plantedStr = plantedInt.toString();
        var plantedArr = [...plantedStr];

        if(plantedInt < 10000) {
            plantedArr.unshift("0");
            treeNum = Number(plantedArr[1]);
        }else if(plantedInt >= 10000) {
            treeNum = 10;
            for(let i = 0; i < 5; i++) {
                numberContainers[i].style.backgroundColor = "#38e07c";
            }
        }

        for(let i = 4; i >= 0; i--) {
            numbers[i].style.top = "-" + plantedArr[i] + "00%" ;
        }

        for (let i = 0; i < treeNum; i++) {
            var randomNum = Math.floor(Math.random() * 2) + 1;
            // console.log(randomNum);
            if(randomNum == 1) {
                trees[i].src = "resources/img/tree-1.png";
                trees[i].alt = "Tree";
            }else if(randomNum == 2) {
                trees[i].src = "resources/img/tree-2.png";
                trees[i].alt = "Pine Tree";
            }
            setTimeout(function() {
                trees[i].classList.add("tree-pop");
                treeContainers[i].classList.add("tree-squish");
            }, i * 200 );
        }
        ecoControl = false;
    }
});

// *********************** Number animation ***********************

// var treeNum;
// var ecoControl = true;

// window.addEventListener("scroll", function() {
//     if(isInViewport(eco) && ecoControl) {
//         var plantedInt = Math.floor(Math.random() * 11000) + 1;
//         var plantedStr = plantedInt.toString();
//         var plantedArr = [...plantedStr];

//         if(plantedInt < 10000) {
//             plantedArr.unshift("0");
//             treeNum = Number(plantedArr[1]);
//         }else if(plantedInt >= 10000) {
//             treeNum = 10;
//             for(let i = 0; i < 5; i++) {
//                 numberContainers[i].style.backgroundColor = "#38e07c";
//             }
//         }

//         for(let i = 4; i >= 0; i--) {
//             numbers[i].style.top = "-" + plantedArr[i] + "00%" ;
//         }
//         ecoControl = false;
//     }
// });


// *************************************************************************************************************************
// ********************************************************* FOOTER ********************************************************
var contactContainer = document.querySelector(".footer__contacts");
var contacts = document.querySelectorAll(".contact");
var iconCont = document.querySelectorAll(".contact img");

contacts.forEach(function(contact, i) {
    contact.addEventListener("mouseover", function() {
        iconCont[i].classList.add("shake-icon");
    });
    contact.addEventListener("mouseleave", function() {
        setTimeout(function() {
            iconCont[i].classList.remove("shake-icon");
        }, 1000);
    });
});

var iconContainer = document.querySelectorAll(".footer__icon");
var colors = ["#3b5998", "#1da1f2", "#007bb6", "linear-gradient(to top right, #feda77 0%, #e51804 33%, #9510b8 66%, #515bd4 100%)", "#eddcc8"];

iconContainer.forEach(function(circle, i) {
    circle.addEventListener("mouseover", function() {
        if(i !== 3) {
            circle.style.background = colors[i];
        }
    });
    circle.addEventListener("mouseleave", function() {
        if(i !== 3) {
            circle.style.background = colors[4];
        }
    });
});


// *************************************************************************************************************************
// ********************************************************** CART *********************************************************
var cartSection = document.querySelector(".section-cart");
var cart = document.querySelector(".cart");

var cartIcon = document.querySelector(".to-cart");
var notification = document.querySelector(".notification");

// *********************** Cart appearance ***********************

cartIcon.addEventListener("click", function() {
    cartSection.style.display = "flex";

    setTimeout(function() {
        cartSection.classList.add("show-bg-cart");

        setTimeout(function() {
            cart.classList.add("show-cart");
            notification.style.visibility = "hidden";
        }, 500);
    }, 10);

    document.querySelectorAll(".new-article").forEach(function(article, i) {
        setTimeout(function() {
            // article.style.display = "flex";
            article.classList.add("article-in");
        }, i * 100);
    });
    
    var lastArticle = articles[articles.length - 1];
    var position = lastArticle.offsetTop;
    setTimeout(function() {
        document.querySelector(".order__container").scrollTop = position;
    }, 1400);
    
    cartAlign();

    // *********************** Show/hide remove bin option ***********************
    var remList = document.querySelectorAll(".remove");
    articles.forEach(function(article, i) {
        article.addEventListener("mouseover", function() {
            remList[i].style.bottom = "0";
        });
        article.addEventListener("mouseout", function() {
            remList[i].style.bottom = "-3.5rem";
        });
    });
});

// *********************** Cart disappearance ***********************

cartSection.addEventListener("click", function(event) {
    var targetElement = event.target;

    if (targetElement == cartSection && targetElement !== cart) {
        cart.classList.remove("show-cart");

        setTimeout(function() {
            cartSection.classList.remove("show-bg-cart");

            setTimeout(function() {
                cartSection.style.display = "none";
            }, 500);

        }, 1000);

        document.querySelectorAll(".new-article").forEach(function(article, i) {
            setTimeout(function() {
                article.classList.remove("new-article");
                article.classList.remove("article-in");
            }, 1000);
        });
    }
});

// cart.addEventListener("mouseleave", function() {
//     cart.style.opacity = "0.8";
//     setTimeout(function() {
//         cart.style.opacity = "1";
//     }, 2000);
// });
// cart.addEventListener("mouseover", function() {
//     cart.style.opacity = "1";
// });

function cartAlign() {
    var articles = ordersContainer.querySelectorAll(".order__article");
    if(articles.length > 3) {
        totalDiv.style.paddingRight = "4.5rem";
        cart.querySelector(".order__heading").style.marginRight = "1.5rem";
        cart.querySelector(".order__heading").style.width = "73.5%";
    }else {
        totalDiv.style.paddingRight = "3rem";
        cart.querySelector(".order__heading").style.marginRight = "0";
        cart.querySelector(".order__heading").style.width = "75%";
    }
}

// ***************************************************************** Adding Articles to the cart *****************************************************************

var ordersContainer = document.querySelector(".order__container");

var totalDiv = document.querySelector(".total-price");

var newArticle = `<div class="order__article">
                            <div class="article__image">
                                <img src="" class="package-image" alt="Package image">
                            </div>
                            <div class="article__quantity">
                                <div class="input__group">
                                    <div class="input__group--sub">
                                        <input type="number" class="input input--kg" min = "0" max = "10">
                                        <label>Kg</label>
                                    </div>
                                    <div class="input__group--sub">
                                        <input type="number" class="input input--pcs" min = "0" max = "667">
                                        <label>pcs.</label>
                                    </div>
                                </div>
                            </div>
                            <div class="article__package">
                                <div class="input__group">
                                    <div class="input__group--sub">
                                        <input type="radio" class="input input--radio" checked>
                                        <label>paper bag ($0)</label>
                                    </div>
                                    <div class="input__group--sub">
                                        <input type="radio" class="input input--radio">
                                        <label>glass jar ($3.99)</label>
                                    </div>
                                    <div class="input__group--sub">
                                        <input type="radio" class="input input--radio">
                                        <label>aluminium box ($7.99)</label>
                                    </div>
                                </div>
                            </div>
                            <div class="article__price">
                                <div class="input__group">
                                    <div class="input__group--sub">
                                        <span>qty.</span>
                                        <p class="qty">0.00</p>
                                    </div>
                                    <div class="input__group--sub">
                                        <span>pkg.</span>
                                        <p class="pkg">0.00</p>
                                    </div>
                                    <div class="input__group--sub">
                                        <span>Summ:</span>
                                        <p class="summ">0.00</p>
                                    </div>
                                </div>
                                <div class="remove">
                                    <img src="resources/img/flat-icons/bin.png" alt="Trash bin">
                                </div>
                            </div>
                        </div>`;

toCartBtn.forEach(function(btn, i) {
    btn.addEventListener("click", function() {
        
        addNewArticle();
        var articles = document.querySelectorAll(".order__article");
        var currentArticle = articles[articles.length - 1];
        var index = articles.length - 1;
        currentArticle.classList.add("new-article");

        setArticle(currentArticle, i);
        setQuantityAttributes(currentArticle, index);
        setPackageAttributes(currentArticle, index);
        getCardValues(currentArticle, i);
        isPackageEligible(currentArticle);
        calculateArticlePrice(currentArticle);
        calculateTotal();
    });
});


//---------------------------------------------------------------------------------------------------------------------------------
function addNewArticle() {
    if(ordersContainer.innerHTML === "") {
        ordersContainer.innerHTML = newArticle;
    }else {
        articles[articles.length-1].insertAdjacentHTML("afterend", newArticle);
    }
    articles = document.querySelectorAll(".order__article");
}
//---------------------------------------------------------------------------------------------------------------------------------
function setArticle(article, i) {
    var image = article.querySelector(".article__image img");

    if (i == 0) {
        article.classList.add("chocolate");
        image.src = "resources/img/cart/paper-choco.png";
    }else if (i == 1) {
        article.classList.add("blueberry");
        image.src = "resources/img/cart/paper-blue.png";
    }else {
        article.classList.add("raisin");
        image.src = "resources/img/cart/paper-raisin.png";
    }
}
//---------------------------------------------------------------------------------------------------------------------------------
function setQuantityAttributes(article, i) {
    // setting quantity inputs
    article.querySelector(".input--kg").setAttribute("id", "kg-" + (i+1));
    article.querySelector(".input--pcs").setAttribute("id", "pcs-" + (i+1));

    // setting quantity labels
    var qtyLabels = article.querySelector(".article__quantity").getElementsByTagName("label");
    qtyLabels[0].setAttribute("for", "kg-" + (i+1));
    qtyLabels[1].setAttribute("for", "pcs-" + (i+1));
}
//---------------------------------------------------------------------------------------------------------------------------------
function setPackageAttributes(article, i) {
    var packInputs = article.querySelector(".article__package").getElementsByTagName("input");
    var packLabels = article.querySelector(".article__package").getElementsByTagName("label");

    // setting package radio buttons
    for(let j = 0; j < 3; j++) {
        packInputs[j].setAttribute("name", "package-" + (i+1));
    }
    packInputs[0].classList.add("was-checked");
    packInputs[0].setAttribute("id", "paper-" + (i+1));
    packInputs[1].setAttribute("id", "glass-" + (i+1));
    packInputs[2].setAttribute("id", "aluminium-" + (i+1));

    // setting package labels
    packLabels[0].setAttribute("for", "paper-" + (i+1));
    packLabels[1].setAttribute("for", "glass-" + (i+1));
    packLabels[2].setAttribute("for", "aluminium-" + (i+1));
}
//---------------------------------------------------------------------------------------------------------------------------------
function getCardValues(article, i) {
    // getting card inputs
    var orderWeights = document.querySelectorAll(".order__weight");
    var orderPieces = document.querySelectorAll(".order__number");
    var orderPrices = document.querySelectorAll(".order__price");

    // getting quantity price display list
    var qtyDisplay = article.querySelector(".qty");

    // setting values in cart article
    document.getElementById("kg-" + articles.length).value = (Number(orderWeights[i].innerText)).toFixed(2);
    document.getElementById("pcs-" + articles.length).value = Number(orderPieces[i].innerText);
    qtyDisplay.innerText = Number(orderPrices[i].innerText).toFixed(2);
    
}
//---------------------------------------------------------------------------------------------------------------------------------
function calculateQuantityPrice(article) {
    var inputValue = Number(article.querySelector(".input--kg").value);
    var price = inputValue * 6; // 1000 / 15 * 0.09 = 6
    article.querySelector(".qty").innerText = price.toFixed(2);
}
function calculatePackagePrice(article) {
    var radioBtns = article.querySelectorAll(".input--radio");
    var packagePrice;
    if(radioBtns[0].checked) {
        packagePrice = 0;
    }else if(radioBtns[1].checked) {
        packagePrice = 3.99;
    }else if(radioBtns[2].checked) {
        packagePrice = 7.99;
    }
    // calculating new package price
    var inputValue = Number(article.querySelector(".input--kg").value);
    var price = Math.floor(Math.floor(inputValue) / 2) * packagePrice;
    article.querySelector(".pkg").innerText = price.toFixed(2);
}
function calculateArticlePrice(article) {
    // select price display elements
    var qtyDisplay = article.querySelector(".qty");
    var pkgDisplay = article.querySelector(".pkg");
    var summDisplay = article.querySelector(".summ");

    // summ price for each article
    summDisplay.innerText = (Number(qtyDisplay.innerText) + Number(pkgDisplay.innerText)).toFixed(2);
}
function calculateTotal() {
    var totalDisplay = document.querySelector(".total-price p");
    var allSumms = ordersContainer.querySelectorAll(".summ");
    var totalPrice = 0;

    allSumms.forEach(function(summ) {
        totalPrice += Number(summ.innerText);
    });

    totalDisplay.innerText = "$" + totalPrice.toFixed(2);
}
function calculateAll(article) {
    calculateQuantityPrice(article);
    calculatePackagePrice(article);
    calculateArticlePrice(article);
    calculateTotal();
}
//---------------------------------------------------------------------------------------------------------------------------------

// *********************** Article image replacement ***********************

cartIcon.addEventListener("click", function() {
    var articlePackages = ordersContainer.querySelectorAll(".article__package");
    var inputsKg = ordersContainer.querySelectorAll(".input--kg");
    var inputsPcs = ordersContainer.querySelectorAll(".input--pcs");
    var remBtns = ordersContainer.querySelectorAll(".remove");
    
    // console.log("prva provera: ",articlePackages);
    // console.log("prva provera: ",inputsKg);
    // console.log("prva provera: ",inputsPcs);
    // console.log("prva provera: ",removes);
    
    articlePackages.forEach(function(packageGroup, i) {
        var radioBtns = packageGroup.querySelectorAll(".input--radio");

        radioBtns.forEach(function(radio) {
            radio.addEventListener("click", function() {
                var currentArticle = packageGroup.parentElement;
                isChecked(currentArticle);
                calculateAll(currentArticle);
            });
        });
    });

    inputsKg.forEach(function(input, i) {
        input.addEventListener("input", function() {
            isInputKgValid(input);

            var currentArticle = input.parentElement.parentElement.parentElement.parentElement;

            kgToPcs(inputsKg[i], inputsPcs[i]);
            isPackageEligible(currentArticle);
            isChecked(currentArticle);
            calculateAll(currentArticle);
        });

        inputsPcs[i].addEventListener("input", function() {
            isInputPcsValid(inputsPcs[i]);

            var currentArticle = input.parentElement.parentElement.parentElement.parentElement;

            pcsToKg(inputsKg[i], inputsPcs[i]);
            isPackageEligible(currentArticle);
            isChecked(currentArticle);
            calculateAll(currentArticle);
        });
    });

    // *********************** Remove article ***********************
    remBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var currArticle = btn.parentElement.parentElement;
            console.log("articles: ",articles);

            if (articles.length > 1) {
                currArticle.classList.add("article-out");
            }else if (articles.length = 1) {
                currArticle.classList.add("article-out-last");
            }
            
            setTimeout(function() {
                ordersContainer.removeChild(currArticle);

                // Update order list 
                articles = ordersContainer.querySelectorAll(".order__article");
                if(articles.length > 0) {
                    articles.forEach(function(article, i) {
                        setQuantityAttributes(article, i);
                        setPackageAttributes(article, i);
                        calculateAll(article);
                        cartAlign();
                    });
                }else {
                    totalDiv.querySelector("p").innerText = "0.00";
                }
                
                console.log(articles);
                console.log("rem1:",remBtns);
                // remBtns = ordersContainer.querySelectorAll(".remove");
                console.log("rem2:",remBtns);
            }, 2000);
        });
    });
    
});

// input--kg verification 
function isInputKgValid(input) {
    var matched = input.value.match(/^(10|\d{1}(\.\d{1,2})?)$/g);
    // console.log(matched);
    var str = input.value;
    if(!matched) {
        console.log("NOTpassed");
        if(str > 10) {
            input.value = 10;
        }else {
            console.log("pre: ",str);
            str = str.substr(0, str.length - 1);
            console.log("posle: ",str);
            input.value = str;
        }
    }else {
        console.log("passed",matched);
    }
}
// input--pcs verification 
function isInputPcsValid(input) {
    var matched = input.value.match(/^\d{1,3}$/g);
    var str = input.value;
    if(!matched) {
        if(str > 667) {
            input.value = 667;
        }else {
            str = str.substr(0, str.length - 1);
            input.value = str;
        }
    }else {
        if(str > 667) {
            input.value = 667;
        }
    }
}

function isPackageEligible(article) {
    var radioGroup = article.querySelector(".article__package").querySelectorAll(".input__group--sub");
    var input = article.querySelector(".article__quantity").querySelector(".input--kg");

    if (input.value < 2) {
        radioGroup[0].querySelector("input").checked = "checked";
        radioGroup[1].style.pointerEvents = "none";
        radioGroup[1].style.opacity = ".5";
        radioGroup[2].style.pointerEvents = "none";
        radioGroup[2].style.opacity = ".5";
    }else if (input.value >= 2) {
        radioGroup[1].style.pointerEvents = "auto";
        radioGroup[1].style.opacity = "1";
        radioGroup[2].style.pointerEvents = "auto";
        radioGroup[2].style.opacity = "1";
    }
}

function isChecked(article) {
    var radioBtns = article.querySelectorAll(".input--radio");
    var image = article.querySelector(".package-image");
    var srcSubStr;

    // Checking type of article
    if(article.classList.contains("chocolate")) {
        srcSubStr = "choco";
    }else if(article.classList.contains("blueberry")) {
        srcSubStr = "blue";
    }else if(article.classList.contains("raisin")) {
        srcSubStr = "raisin";
    }
    
    // Changing article image and checking previous checked value (RadioStateChange)
    if(radioBtns[0].checked && !(radioBtns[0].classList.contains("was-checked"))) {
        radioBtns[0].classList.add("was-checked");
        radioBtns[1].classList.remove("was-checked");
        radioBtns[2].classList.remove("was-checked");
        image.style.opacity = "0";
        setTimeout(function() {
            image.src = "resources/img/cart/paper-" + srcSubStr + ".png";
            image.style.opacity = "1";
        }, 300);
    }else if(radioBtns[1].checked && !(radioBtns[1].classList.contains("was-checked"))) {
        radioBtns[0].classList.remove("was-checked");
        radioBtns[1].classList.add("was-checked");
        radioBtns[2].classList.remove("was-checked");

        image.style.opacity = "0";
        setTimeout(function() {
            image.src = "resources/img/cart/glass-" + srcSubStr + ".png";
            image.style.opacity = "1";
        }, 300);
    }else if(radioBtns[2].checked && !(radioBtns[2].classList.contains("was-checked"))) {
        radioBtns[0].classList.remove("was-checked");
        radioBtns[1].classList.remove("was-checked");
        radioBtns[2].classList.add("was-checked");

        image.style.opacity = "0";
        setTimeout(function() {
            image.src = "resources/img/cart/alu-" + srcSubStr + ".png";
            image.style.opacity = "1";
        }, 300);
    }    
}

function kgToPcs(inputKg, inputPcs) {
    inputPcs.value = Math.round((inputKg.value * 1000) / 15);
}

function pcsToKg(inputKg, inputPcs) {
    inputKg.value = (inputPcs.value * 15 / 1000).toFixed(2);
}

// *********************** Cart payment form ***********************

var toPaymentBtn = cart.querySelector(".to-shipping");
// var orderHeading = cart.querySelector(".order__heading");
// var cartFooting = cart.querySelector(".order__footing");
var cartH2 = cart.querySelector("h2");
var orderWrapper = cart.querySelector(".order__wrapper");
var infoContainer = cart.querySelector(".info__container");

toPaymentBtn.addEventListener("click", function() {
    // orderHeading.classList.add("hide-heading");
    // ordersContainer.classList.add("hide-order-container");
    // cartFooting.classList.add("hide-order-footing");
    orderWrapper.classList.add("hide-wrapper");
    
    cartH2.style.opacity = "0";
    setTimeout(function() {
        cartH2.innerText = "Shipping informations";
        infoContainer.classList.add("show-info");
        cart.style.height = "51rem";
        orderWrapper.style.height = "0";
        infoContainer.style.height = "auto";
    }, 1000);
    setTimeout(function() {
        cartH2.style.opacity = "1";
    }, 1500);
});
*/