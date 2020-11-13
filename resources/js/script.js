var dataController = (() => {

    var Article = function(id, type, weight, number, price, isNew, package) {
        this.id = id;
        this.type = type;
        this.weight = weight;
        this.number = number;
        this.price = price;
        this.totalPrice = price;
        this.isNew = isNew;
        this.package = package;
    };

    Article.prototype.calcTotalPrice = () => {
        if(this.package == 'paper') {
            this.totalPrice = this.price;
        }else if(this.package == 'glass') {
            this.totalPrice = Math.floor(this.weight / 2) * 3.99 + this.price;
        }else if(this.package == 'aluminium') {
            this.totalPrice = Math.floor(this.weight / 3) * 7.99 + this.price;
        }
    };
//                                                      DODATI METODU ZA RACUNANJE UKUPNE CENE ARTIKLA (KOLICINA + PAKOVANJE)
    var data = {
        articles: [],
        totalPrice: 0
    };
    
    return {
        // Extracting and returning ID from passed card node
        getCardID: (card) => {
            var ID, cardID, splitID;
            cardID = card.id;

            // Splitting ID
            splitID = cardID.split('-');
            ID = splitID[1];

            return ID;
        },

        // Subtract 250 from quantity
        subtractQuantity: (input) => {
            var inputValue = parseInt(input.value);
    
            if(inputValue <= 250) {
                inputValue = "";
            }else if(inputValue >= 250) {
                inputValue -= 250;
            }
        
            if(input.value !== "") {
                input.value = inputValue;
            }
        },

        // Add 250 to quantity
        addQuantity: (input) => {
            var inputValue = parseInt(input.value);
        
            if(input.value === "") {
                inputValue = 250;
            }else if(inputValue >= 9750) {
                inputValue = 10000;
            }else {
                inputValue += 250;
            }
        
            input.value = inputValue;
        },

        // Add new article object to 'articles' array in 'data' object
        addNewArticleData: (cardID, weight, number, price) => {
            var newArticle, articleID, type, isNew, package;

            if(data.articles.length > 0) {
                articleID = data.articles[data.articles.length - 1].id + 1;
            }else {
                articleID = 0;
            }

            if(cardID == 0) {
                type = 'chocolate';
            }else if(cardID == 1) {
                type = 'blueberry';
            }else if(cardID == 2) {
                type = 'raisin';
            }

            isNew = true;
            package = 'paper';

            newArticle = new Article(articleID, type, weight, number, price, isNew, package);
            data.articles.push(newArticle);
            // console.log(data.articles);
        },

        // Set isNew boolean to false for all articles
        clearIsNew: () => {
            data.articles.forEach(item => {
                item.isNew = false;
            });
        },

        // Get information on changed packaging in specific article
        readPackaging: (target) => {
            if(target.classList.contains('input--radio') || target.classList.contains('radio-label')){
                var radioBtns, ID;

                radioBtns = target.parentNode.parentNode.querySelectorAll('.input--radio');
                ID = dataController.getCardID(radioBtns[0]);
                
                if(radioBtns[0].checked) {
                    console.log('A');
                    return [ID, 'paper'];
                }else if(radioBtns[1].checked) {
                    console.log('B');
                    return [ID, 'glass'];
                }else if(radioBtns[2].checked) {
                    console.log('C');
                    return [ID, 'aluminium'];
                }
            }
        },

        // Change package property in data object
        changePackage: (id, package) => {
            data.articles[id].package = package;
            console.log(data.articles);
        },

        getData: () => {
            return {
                articles: data.articles,
                total: data.totalPrice
            }
        }
        
    };

})();

var uiController = (() => {

    var DOMstrings = {
        // Headings
        heading1: '.heading-primary',
        // Navigation bar
        navList: '.navigation__list',
        navItem: '.navigation__item',
        navLink: '.navigation__link',
        menuIcon: '.navigation__icon',
        navContainer: '.container-navigation',
        collapse: 'collapse',
        activeLink: 'active-link',
        activeItem: 'active-item',
        cartIcon: '.to-cart',
        cartNotification: '.notification',

        // Back to top button
        backToTop: '.back-to-top',
        pop: 'pop-icon',

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
        subBtn: 'btn-sub',
        addBtn: 'btn-add',
        checkBtn: 'btn-check',
        input: '.card__input',
        //Back side card elements
        cancelBtn: 'btn-cancel',
        addToCart: 'addtc',
        summaryOrder: '.card__summary-order',
        summaryMessage: '.card__summary-message',
        checked: '.checked',
        cookiesBack: '.cookie__back',
        //Back side card values
        weight: '.order__weight',
        number: '.order__number',
        price: '.order__price',

        // Cart
        cartSection: '.section-cart',
        cart: '.cart',
        ordersContainer: '.order__container',
        orderArticle: '.order__article',
        totalContainer: '.total-price',


        // Ecology
        eco: '.container-trees',
        counter: '.counter',
        counterNumContainer: '.counter__number',
        counterNum: '.counter__number img',
        treeContainer: '.tree__wrap',
        tree: '.tree img',

        // Footer
        contactsContainer: '.footer__contacts',
        contact: 'contact',
        contactIcon: '.contact-icon'
    };

//-----------------------------------------------------------------------------------
    // Control variables for limiting function iteration 
    var ecoControl = true;

    // New article HTML template
    var articleTemplate = `<div class="order__article">
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
                                        <input type="number" class="input input--pcs" min = "0" max = "667" readonly>
                                        <label>pcs.</label>
                                    </div>
                                </div>
                            </div>
                            <div class="article__package">
                                <div class="input__group">
                                    <div class="input__group--sub">
                                        <input type="radio" class="input input--radio" checked>
                                        <label class="radio-label">paper bag ($0)</label>
                                    </div>
                                    <div class="input__group--sub">
                                        <input type="radio" class="input input--radio">
                                        <label class="radio-label">glass jar ($3.99)</label>
                                    </div>
                                    <div class="input__group--sub">
                                        <input type="radio" class="input input--radio">
                                        <label class="radio-label">aluminium box ($7.99)</label>
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
//-----------------------------------------------------------------------------------

    // Clear active navigation item
    var clearActiveNav = () => {
        for(let i = 0; i < 5; i++) {
            document.querySelectorAll(DOMstrings.navLink)[i].classList.remove(DOMstrings.activeLink);
            document.querySelectorAll(DOMstrings.navItem)[i].classList.remove(DOMstrings.activeItem);
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
// ==================================================================================================================== Navigation
        // Navigation selection on click
        selectNavClick: event => {
            var linkID, splitID, ID;

            linkID = event.target.id;

            if(linkID) {
                // Splitting ID
                splitID = linkID.split('-');
                ID = parseInt(splitID[1]);

                clearActiveNav();

                document.querySelectorAll(DOMstrings.navLink)[ID].classList.add(DOMstrings.activeLink);
                document.querySelectorAll(DOMstrings.navItem)[ID].classList.add(DOMstrings.activeItem);
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
            footer = document.querySelector(DOMstrings.contactsContainer);

            setTimeout(() => {
                if (isInViewport(circles[2]) || isInViewport(bakery)) {
                    clearActiveNav();
                    navLinks[0].classList.add(DOMstrings.activeLink);
                    navItems[0].classList.add(DOMstrings.activeItem);
                }else if (isInViewport(packaging)) {
                    clearActiveNav();
                    navLinks[1].classList.add(DOMstrings.activeLink);
                    navItems[1].classList.add(DOMstrings.activeItem);
                }else if (isInViewport(cards)) {
                    clearActiveNav();
                    navLinks[2].classList.add(DOMstrings.activeLink);
                    navItems[2].classList.add(DOMstrings.activeItem);
                }else if (isInViewport(eko)) {
                    clearActiveNav();
                    navLinks[3].classList.add(DOMstrings.activeLink);
                    navItems[3].classList.add(DOMstrings.activeItem);
                }else if (isInViewport(footer)) {
                    clearActiveNav();
                    navLinks[4].classList.add(DOMstrings.activeLink);
                    navItems[4].classList.add(DOMstrings.activeItem);
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

            if(scrollPosition() > 1 && list.classList.contains(DOMstrings.collapse)) {
                bg.classList.add("slide-down");
            }else if(!list.classList.contains(DOMstrings.collapse)) {
                setTimeout(() => {
                    bg.classList.remove("slide-down");
                }, 1500);
            }

            icon.classList.toggle("rotate-right");
            list.classList.toggle(DOMstrings.collapse);
        },

        // Menu show/hide on scroll
        toggleNavOnScroll: () => {
            if(scrollPosition() > 1 && !document.querySelector(DOMstrings.navList).classList.contains(DOMstrings.collapse)){
                uiController.toggleNav();
            }else if(scrollPosition() < 1 && document.querySelector(DOMstrings.navList).classList.contains(DOMstrings.collapse)) {
                uiController.toggleNav();
            }
        },

        // Button to top show/hide on scroll
        btnToTopDisplay: () => {
            var backToTop, vh;
            
            backToTop = document.querySelector(DOMstrings.backToTop);
            vh = document.documentElement.clientHeight || window.innerHeight;

            if(scrollPosition() > vh * .8 && !backToTop.classList.contains(DOMstrings.pop)) {
                backToTop.classList.add(DOMstrings.pop);
                backToTop.classList.remove("to-bottom");
                backToTop.style.display = "block";
            }else if(scrollPosition() < vh * .8 && backToTop.classList.contains(DOMstrings.pop)){
                backToTop.classList.add("to-bottom");
                backToTop.classList.remove(DOMstrings.pop);
                setTimeout(() => {
                    backToTop.style.display = "none";
                }, 500);
            }
        },

        // Animating cart icon
        animateCartIcon: () => {
            var icon = document.querySelector(DOMstrings.cartIcon);

            if(icon.style.visibility === "visible") {
                icon.classList.add("shake-icon");

                setTimeout(function() {
                    icon.classList.remove("shake-icon");
                }, 1100);

            }else if(icon.style.visibility !== "visible"){
                icon.classList.add("pop-icon");

                setTimeout(function() {
                    icon.classList.remove("pop-icon");
                }, 1100);

            }
            
            icon.style.visibility = "visible";
            document.querySelector(DOMstrings.cartNotification).style.visibility = "visible";
        },
// ================================================================================================================= About section
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
// ============================================================================================================= Packaging section
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
// =============================================================================================================== Pricing section
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

        // Rotating front and back side of targeted card
        rotateCard: (target) => {
            target.firstElementChild.classList.toggle("hide-front");
            target.lastElementChild.classList.toggle("show-back");
        },

        // Puts red highlight on card input if value is invalid
        invalidInput: (input) => {
            input.classList.toggle("highlight");
            setTimeout(() => {
                input.classList.toggle("highlight");
            }, 2000);
        },

        // Converting value from card input into weight, cookie number and price
        calculateCard: (input, ID) => {          
            document.querySelectorAll(DOMstrings.weight)[ID].innerHTML = Math.round((input.value / 1000) * 1000) / 1000;
            document.querySelectorAll(DOMstrings.number)[ID].innerHTML = Math.round(input.value / 15);
            document.querySelectorAll(DOMstrings.price)[ID].innerHTML = Math.round((input.value / 15 * .09) * 100) / 100;
        },

        // Reseting values from input(fron side) and weight,number,price (back side) if card is canceled on 'X'
        resetCard: (input, ID) => {
            document.querySelectorAll(DOMstrings.weight)[ID].innerHTML = 0;
            document.querySelectorAll(DOMstrings.number)[ID].innerHTML = 0;
            document.querySelectorAll(DOMstrings.price)[ID].innerHTML = 0;
            input.value = "";
        },

        // animate back side card elements
        backSideAnimations: (ID) => {
            document.querySelectorAll(DOMstrings.summaryOrder)[ID].classList.toggle("dis-to-right");
            document.querySelectorAll(DOMstrings.summaryMessage)[ID].classList.toggle("show");
            document.querySelectorAll(DOMstrings.checked)[ID].classList.toggle("checked-on");
            document.querySelectorAll(DOMstrings.cookiesBack)[ID].classList.toggle("hide");

            var x = document.querySelectorAll('.' + DOMstrings.cancelBtn)[ID];
            x.style.opacity == 1 ? x.style.opacity = 0 : x.style.opacity = 1
        },
// ========================================================================================================================== Cart
        // Cart display
        showCart: () => {
            document.querySelector(DOMstrings.cartSection).style.display = "flex";

            setTimeout(function() {
                document.querySelector(DOMstrings.cartSection).classList.add("show-bg-cart");

                setTimeout(function() {
                    document.querySelector(DOMstrings.cart).classList.add("show-cart");
                    document.querySelector(DOMstrings.cartNotification).style.visibility = "hidden";
                }, 500);
            }, 10);
        },

        // Cart hide
        hideCart: (event) => {
            var cart = document.querySelector(DOMstrings.cart);
            var cartSection = document.querySelector(DOMstrings.cartSection);

            if (event.target == cartSection && event.target !== cart) {
                cart.classList.remove("show-cart");
        
                setTimeout(() => {
                    cartSection.classList.remove("show-bg-cart");
        
                    setTimeout(() => {
                        cartSection.style.display = "none";
                    }, 500);
        
                }, 1000);
        
                return true;
            }
        },

        // Add new article to UI
        addNewArticleUI: () => {
            var container = document.querySelector(DOMstrings.ordersContainer);

            if(container.innerHTML === "") {
                container.innerHTML = articleTemplate;
            }else {
                container.lastElementChild.insertAdjacentHTML("afterend", articleTemplate);
            }
        },

        // Setting attributes for DOM article
        setNewArticle: (ID) => {
            var articleHTML = document.querySelectorAll('.order__article')[ID];

            articleHTML.setAttribute('id', 'order-' + ID);

            articleHTML.querySelector('.input--kg').setAttribute("id", "kg-" + ID);
            articleHTML.getElementsByTagName("label")[0].setAttribute("for", "kg-" + ID);
            articleHTML.querySelector('.input--pcs').setAttribute("id", "pcs-" + ID);
            articleHTML.getElementsByTagName("label")[1].setAttribute("for", "pcs-" + ID);
            
            articleHTML.querySelectorAll('.input--radio')[0].setAttribute('id', 'paper-' + ID);
            articleHTML.querySelectorAll('.input--radio')[1].setAttribute('id', 'glass-' + ID);
            articleHTML.querySelectorAll('.input--radio')[2].setAttribute('id', 'aluminium-' + ID);
            for(var i = 0; i <= 2; i++) {
                articleHTML.querySelectorAll('.input--radio')[i].setAttribute('name', 'radio-' + ID);
            }
            articleHTML.getElementsByTagName('label')[2].setAttribute('for', 'paper-' + ID);
            articleHTML.getElementsByTagName('label')[3].setAttribute('for', 'glass-' + ID);
            articleHTML.getElementsByTagName('label')[4].setAttribute('for', 'aluminium-' + ID);

            

            return {
                image: articleHTML.querySelector('.package-image'),
                inputKg: articleHTML.querySelector('.input--kg'),
                inputPcs: articleHTML.querySelector('.input--pcs'),
                radioGroup: articleHTML.querySelector('.input__group'),
                priceQuantity: articleHTML.querySelector('.qty'),
                pricePackage: articleHTML.querySelector('.pkg'),
                priceSummary: articleHTML.querySelector('.summ')
            }
            
        },

        // Filling in DOM article
        fillArticle: (articleElements, newArticle) => {
            
            if (newArticle.type == 'chocolate') {
                articleElements.image.src = "resources/img/cart/paper-choco.png";
            }else if (newArticle.type == 'blueberry') {
                articleElements.image.src = "resources/img/cart/paper-blue.png";
            }else if (newArticle.type == 'raisin') {
                articleElements.image.src = "resources/img/cart/paper-raisin.png";
            }

            articleElements.inputKg.value = newArticle.weight;
            articleElements.inputPcs.value = newArticle.number;
            articleElements.priceQuantity.innerText = Number(newArticle.price).toFixed(2);
            articleElements.priceSummary.innerText = Number(newArticle.price).toFixed(2);
        },

        // Scroll order container if overflow
        scrollContainer: () => {
            var allArticles, lastArticle, position;

            allArticles = document.querySelectorAll('.order__article');
            lastArticle = allArticles[allArticles.length - 1];
            position = lastArticle.offsetTop;
            setTimeout(() => {
                document.querySelector(".order__container").scrollTop = position;
            }, 1400);
        },

        // Align order container if there is overflow
        cartAlign: () => {
            var cart, articles, totalDiv;
            cart = document.querySelector('.cart');
            articles = document.querySelectorAll(".order__article");
            totalDiv = document.querySelector(".total-price");

            if(articles.length > 3) {
                totalDiv.style.paddingRight = "4.5rem";
                cart.querySelector(".order__heading").style.marginRight = "1.5rem";
                cart.querySelector(".order__heading").style.width = "73.5%";
            }else {
                totalDiv.style.paddingRight = "3rem";
                cart.querySelector(".order__heading").style.marginRight = "0";
                cart.querySelector(".order__heading").style.width = "75%";
            }
        },

        // Adding slide in animations (new articles)
        addSlideIn: article => {
            // article.style.display = "flex";
            article.classList.add("article-in");
        },

        // Removing slide in animation
        removeSlideIn: article => {
            article.classList.remove('article-in');
        },

        // Show/hide remove option
        showHideRemoveOption: (data) => {
            data.articles.forEach(article => {
                if(article.isNew == true) {
                    var articleDOM, curRemove;
                    articleDOM = document.querySelectorAll('.order__article')[article.id];
                    curRemove = document.querySelectorAll('.remove')[article.id];
                    
                    articleDOM.addEventListener('mouseover', () => {
                        curRemove.style.bottom = "0";
                    });
    
                    articleDOM.addEventListener('mouseout', () => {
                        curRemove.style.bottom = "-3.5rem";
                    });
                }
            });
        },

// =================================================================================================================== Eco section
        // Animate numbers slide in counter display
        animateTreeCounter: () => {
            
            if(isInViewport(document.querySelector(DOMstrings.eco)) && ecoControl) {
                var plantedInt, plantedStr, plantedArr, treeNum;

                plantedInt = Math.floor(Math.random() * 13000) + 1;
                console.log(plantedInt);
                plantedStr = plantedInt.toString();
                plantedArr = [...plantedStr];
        
                if(plantedInt < 1000) {
                    plantedArr.unshift('0', '0');
                    treeNum = 0;
                }else if(plantedInt < 10000 && plantedInt >= 1000) {
                    plantedArr.unshift('0');
                    treeNum = Number(plantedArr[1]);
                }else if(plantedInt >= 10000) {
                    treeNum = 10;
                    document.querySelectorAll(DOMstrings.counterNumContainer).forEach((numContainer) => {
                        numContainer.style.backgroundColor = "#38e07c";
                    });
                }
        
                document.querySelectorAll(DOMstrings.counterNum).forEach((num, i) => {
                    num.style.top = "-" + plantedArr[i] + "00%";
                });
        
                uiController.animateTrees(treeNum);

                ecoControl = false;
            }
        },

        // Animate random tree poping out of ground (related to random number in 'animateTreeCounter' function)
        animateTrees: (treeNum) => {
            var randomNum, trees;
            for (let i = 0; i < treeNum; i++) {
                randomNum = Math.floor(Math.random() * 2) + 1;
                trees = document.querySelectorAll(DOMstrings.tree);

                if(randomNum == 1) {
                    trees[i].src = "resources/img/tree-1.png";
                    trees[i].alt = "Tree";
                }else if(randomNum == 2) {
                    trees[i].src = "resources/img/tree-2.png";
                    trees[i].alt = "Pine Tree";
                }

                setTimeout(function() {
                    trees[i].classList.add("tree-pop");
                    document.querySelectorAll(DOMstrings.treeContainer)[i].classList.add("tree-squish");
                }, i * 200 );
            }
        },

        // shake animation for contact icons in footer
        shakeIcon: (event) => {
            if(event.target.classList.contains(DOMstrings.contact)) {
                event.target.firstElementChild.classList.add("shake-icon");

                setTimeout(() => {
                    event.target.firstElementChild.classList.remove("shake-icon");
                }, 1000);
            }
        },
// ============================================================================================================== Helper functions       
        // disable element for short period of time to prevent spamming
        disableShort: (element, time) => {
            element.style.pointerEvents = "none";
            setTimeout(() => {
                element.style.pointerEvents = "auto";
            }, time);
        },

        // Forwards 'DOMstrings' object
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
            uiCtrl.animateTreeCounter();
        });
        document.querySelector(DOM.cardContainer).addEventListener('mousedown', (event) => {
            changeQuantity(event);
            checkQuantity(event);
            cancelOrder(event);
            successfulOrder(event);
        });

        document.querySelector(DOM.cartIcon).addEventListener('mousedown', () => {
            uiCtrl.showCart();
            addNewArticles();
            animateNewArticles();
            uiCtrl.scrollContainer();
            uiCtrl.cartAlign();
            addHoverListenersToNewArticles();
        });

        document.querySelector(DOM.cartSection).addEventListener('click', (event) => {
            cartExit(event);
            changePackaging(event);
            
        });

        document.querySelector(DOM.contactsContainer).addEventListener('mouseover', (event) => {
            uiCtrl.shakeIcon(event);
        });
    };

    var changeQuantity = event => {
        var card, ID, input;

        if(event.target.classList.contains(DOM.subBtn) || event.target.classList.contains(DOM.addBtn)) {
            card = event.target.parentNode.parentNode.parentNode;
            ID = dataCtrl.getCardID(card);
            input = document.querySelectorAll('.card__input')[ID];

            if(event.target.classList.contains(DOM.subBtn)) {
                dataCtrl.subtractQuantity(input);
            }else if(event.target.classList.contains(DOM.addBtn)) {
                dataCtrl.addQuantity(input);
            }
        }
    };

    var checkQuantity = event => {
        var card, ID, input;

        if(event.target.classList.contains(DOM.checkBtn)) {     
            uiCtrl.disableShort(event.target, 2000);

            card = event.target.parentNode.parentNode.parentNode.parentNode;
            ID = dataCtrl.getCardID(card);
            input = document.querySelectorAll('.card__input')[ID];

            if(input.value !== "" && input.value >= 250) {
                uiCtrl.calculateCard(input, ID);
                uiCtrl.rotateCard(card);
            }else {
                uiCtrl.invalidInput(input);
            }
        }
    };

    var cancelOrder = event => {
        var card, ID, input;

        if(event.target.classList.contains(DOM.cancelBtn)) {
            card = event.target.parentNode.parentNode.parentNode.parentNode;
            ID = dataCtrl.getCardID(card);
            input = document.querySelectorAll('.card__input')[ID];

            setTimeout(() => {
                uiCtrl.resetCard(input, ID);
            }, 400);
            uiCtrl.rotateCard(card);
        }
        
    };

    var successfulOrder = event => {
        var card, ID, input, weight, number, price;
        
        if(event.target.classList.contains(DOM.addToCart)) {
            uiCtrl.disableShort(event.target, 2000);
            uiCtrl.animateCartIcon();

            card = event.target.parentNode.parentNode.parentNode.parentNode;
            ID = dataCtrl.getCardID(card);
            input = document.querySelectorAll('.card__input')[ID];

            uiCtrl.backSideAnimations(ID);
            
            setTimeout(() => {
                uiCtrl.rotateCard(card);

                setTimeout(() => {
                    uiCtrl.backSideAnimations(ID);
                    uiCtrl.resetCard(input, ID)
                }, 400);
            }, 2000);

            weight = document.querySelectorAll(DOM.weight)[ID].innerHTML;
            number = document.querySelectorAll(DOM.number)[ID].innerHTML;
            price = document.querySelectorAll(DOM.price)[ID].innerHTML;
            
            dataCtrl.addNewArticleData(ID, weight, number, price);
        }
    };

    var addNewArticles = () => {
        var allArticles = dataCtrl.getData().articles;
        var newArticles = [];

        newArticles = allArticles.filter(article => {
            return article.isNew == true;
        });

        if(newArticles.length > 0) {
            newArticles.forEach(article => {
                uiCtrl.addNewArticleUI();
                var articleElements = uiCtrl.setNewArticle(article.id);
                uiCtrl.fillArticle(articleElements, article);
            });
        }
    };

    var animateNewArticles = () => {
        var data, articleDOM;

        data = dataCtrl.getData();
        data.articles.forEach((article, i) => {
            if(article.isNew == true) {
                setTimeout(() => {
                    articleDOM = document.querySelectorAll('.order__article')[article.id];
                    uiCtrl.addSlideIn(articleDOM);
                }, i * 100);
            }
        });
        
    };

    var addHoverListenersToNewArticles = () => {
        var data = dataCtrl.getData();
        uiCtrl.showHideRemoveOption(data);
    };

    var changePackaging = (event) => {
        var [id, package] = dataCtrl.readPackaging(event.target);
        
        dataCtrl.changePackage(id, package);
    };

    var cartExit = event => {
        var activated = false;
        activated = uiCtrl.hideCart(event);
        if (activated == true) {
            dataCtrl.clearIsNew();
            document.querySelectorAll('.order__article').forEach(articleDOM => {
                uiCtrl.removeSlideIn(articleDOM);
            });
        }
        
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
// ********************************************************** CART *********************************************************

// ***************************************************************** Adding Articles to the cart *****************************************************************

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