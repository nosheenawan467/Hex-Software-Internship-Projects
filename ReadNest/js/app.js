/*==============================
        STICKY NAVBAR
==============================*/

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}
/*==================================================
        ACTIVE NAVIGATION
==================================================*/

const sections=document.querySelectorAll("section[id]");

const navLinks=document.querySelectorAll(

".nav-links a, .sidebar a"

);

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.offsetHeight;

        if(window.scrollY>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(

            link.getAttribute("href")==="#" + current

        ){

            link.classList.add("active");

        }

    });

});
/*==============================
        LOADER
==============================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 300);

        }, 700);

    }

});

/*==============================
        MOBILE MENU
==============================*/

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.add("active");

    });

}

if (closeBtn && sidebar) {

    closeBtn.addEventListener("click", () => {

        sidebar.classList.remove("active");

    });

}

window.addEventListener("click", (e) => {

    if (sidebar && e.target === sidebar) {

        sidebar.classList.remove("active");

    }

});


const searchResults=document.getElementById("searchResults");

const searchSection=document.getElementById("searchResultsSection");
/*==============================
        BOOK DATA
==============================*/

const defaultBooks = [

{
title:"Atomic Habits",
author:"James Clear",
genre:"Self Help",
rating:5,
image:"images/books/atomic-habits.jpg",
borrowed:false,
completed:false
},

{
title:"The Alchemist",
author:"Paulo Coelho",
genre:"Fiction",
rating:5,
image:"images/books/the-alchemist.jpg",
borrowed:false,
completed:false
},

{
title:"The Midnight Library",
author:"Matt Haig",
genre:"Fantasy",
rating:5,
image:"images/books/the-midnight-library.jpg",
borrowed:false,
completed:false
},

{
title:"The Psychology of Money",
author:"Morgan Housel",
genre:"Business",
rating:5,
image:"images/books/psychology-money.JPG",
borrowed:false,
completed:false
},

{
title:"Sapiens",
author:"Yuval Noah Harari",
genre:"History",
rating:5,
image:"images/books/sapiens.JPG",
borrowed:false
},

{
title:"Think and Grow Rich",
author:"Napoleon Hill",
genre:"Business",
rating:5,
image:"images/books/think-&-grow-rich.JPG",
borrowed:false,
completed:false
},

{
title:"Ikigai",
author:"Héctor García",
genre:"Self Help",
rating:5,
image:"images/books/Ikigai.jpg",
borrowed:false,
completed:false
},

{
title:"Rich Dad Poor Dad",
author:"Robert Kiyosaki",
genre:"Business",
rating:5,
image:"images/books/rich-dad.JPG",
borrowed:false,
completed:false
},

{
title:"Deep Work",
author:"Cal Newport",
genre:"Productivity",
rating:5,
image:"images/books/deep-work.jpg",
borrowed:false,
completed:false
},

{
title:"Clean Code",
author:"Robert C. Martin",
genre:"Programming",
rating:5,
image:"images/books/clean-code.JPG",
borrowed:false,
completed:false
},

{
title:"The Hobbit",
author:"J.R.R. Tolkien",
genre:"Fantasy",
rating:5,
image:"images/books/hobbit.JPG",
borrowed:false,
completed:false
},

{
title:"The Silent Patient",
author:"Alex Michaelides",
genre:"Mystery",
rating:5,
image:"images/books/silent-patient.jpg",
borrowed:false,
completed:false
}

];

/*==============================
        LOCAL STORAGE
==============================*/

let books = JSON.parse(localStorage.getItem("books"));

if (!books) {

    books = defaultBooks;

    localStorage.setItem("books", JSON.stringify(books));

}

let borrowHistory = JSON.parse(localStorage.getItem("borrowHistory")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/*==============================
        SAVE FUNCTIONS
==============================*/

function saveBooks() {

    localStorage.setItem("books", JSON.stringify(books));

}

function saveHistory() {

    localStorage.setItem("borrowHistory", JSON.stringify(borrowHistory));

}

function saveWishlist() {

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

}

/*==============================
        UPDATE STATS
==============================*/
function updateStats(){

    const totalBooks=document.getElementById("totalBooks");
    const readingCount=document.getElementById("readingCount");
    const historyCount=document.getElementById("historyCount");
    const wishlistCount=document.getElementById("wishlistCount");

    if(totalBooks){

        totalBooks.textContent=books.length;

    }

    if(readingCount){

        readingCount.textContent=
        books.filter(book=>book.borrowed).length;

    }

    if(historyCount){

        historyCount.textContent=borrowHistory.length;

    }

    if(wishlistCount){

        wishlistCount.textContent=wishlist.length;

    }

}
/*==============================
        BOOK CONTAINER
==============================*/

const booksContainer=document.getElementById("booksContainer");


/*==============================
        CREATE BOOK CARD
==============================*/

function createBookCard(book){

    let stars="";

    for(let i=0;i<book.rating;i++){

        stars+=`<i class="fa-solid fa-star"></i>`;

    }

    return `

    <div class="swiper-slide">

        <div class="book-card">

            <div class="book-cover">

                <img
                src="${book.image}"
                alt="${book.title} Book Cover">

                <span class="genre-badge">

                    ${book.genre}

                </span>

            </div>

            <div class="book-content">

                <h3 class="book-title">

                    ${book.title}

                </h3>

                <p class="book-author">

                    ${book.author}

                </p>

                <div class="book-rating">

                    ${stars}

                </div>

                <div class="book-footer">

                    <button

                    class="view-btn borrow-btn"

                    data-title="${book.title}">

                    ${book.borrowed ? "Return" : "Borrow"}

                    </button>

                    <div class="book-actions">

                        <button

                        class="wishlist-btn"

                        data-title="${book.title}">

                            <i class="fa-regular fa-heart"></i>

                        </button>

                        <button>

                            <i class="fa-solid fa-ellipsis"></i>

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

    `;

}


/*==============================
        RENDER BOOKS
==============================*/

function renderBooks(bookArray=books){

    if(!booksContainer) return;

    let html="";

    bookArray.forEach(book=>{

        html+=createBookCard(book);

    });

    booksContainer.innerHTML=html;
if(booksSwiper){

    booksSwiper.update();

}

}


/*==============================
        BOOK SWIPER
==============================*/

let booksSwiper = null;

if(document.querySelector(".booksSwiper")){

booksSwiper = new Swiper(".booksSwiper",{

    loop:false,

    speed:700,

    spaceBetween:24,

    grabCursor:true,

    autoplay:{

        delay:3500,

        disableOnInteraction:false,

        pauseOnMouseEnter:true

    },

    navigation:{

        nextEl:".books-next",

        prevEl:".books-prev"

    },

    breakpoints:{

        0:{slidesPerView:1.2},
        576:{slidesPerView:2},
        768:{slidesPerView:3},
        992:{slidesPerView:4},
        1200:{slidesPerView:5}

    }

});

}

const searchSwiper=new Swiper(".booksSwiperSearch",{

    loop:false,

    spaceBetween:25,

    grabCursor:true,

    breakpoints:{

        0:{slidesPerView:1.2},

        576:{slidesPerView:2},

        768:{slidesPerView:3},

        992:{slidesPerView:4},

        1200:{slidesPerView:5}

    }

});


/*==============================
        INITIAL LOAD
==============================*/

updateStats();

renderBooks();
saveBooks();
saveHistory();
saveWishlist();


const searchInput=document.getElementById("searchInput");
const genreFilter=document.getElementById("genreFilter");
const resetBtn=document.querySelector(".reset-btn");


function filterBooks(){

    const keyword=searchInput ? searchInput.value.toLowerCase() : "";

    const genre=genreFilter ? genreFilter.value : "";

    const filtered=books.filter(book=>{

        const matchKeyword=

            book.title.toLowerCase().includes(keyword)

            ||

            book.author.toLowerCase().includes(keyword);

        const matchGenre=

            genre==="" || book.genre===genre;

        const matchAuthor=

            author==="" || book.author===author;

        let matchStatus=true;

        if(status==="Borrowed"){

            matchStatus=book.borrowed;

        }

        if(status==="Available"){

            matchStatus=!book.borrowed;

        }

        return(

            matchKeyword &&

            matchGenre &&

            matchAuthor &&

            matchStatus

        );

    });

    renderBooks(filtered);

}


if(searchInput){

searchInput.addEventListener("input",()=>{

    const keyword=searchInput.value.trim().toLowerCase();

    if(keyword===""){

        searchSection.style.display="none";

        searchResults.innerHTML="";

        return;

    }

    const result=books.filter(book=>

        book.title.toLowerCase().includes(keyword)

        ||

        book.author.toLowerCase().includes(keyword)

    );

    searchSection.style.display="block";

    searchResults.innerHTML="";

    result.forEach(book=>{

        searchResults.innerHTML+=createBookCard(book);

    });

});

}

if(genreFilter){

genreFilter.addEventListener("change",filterBooks);

}


if(resetBtn){

resetBtn.addEventListener("click",()=>{

    if(searchInput) searchInput.value="";

    if(genreFilter) genreFilter.selectedIndex=0;

    renderBooks();

});

}


/*==============================
        NAV SEARCH ICON
==============================*/

const searchIcon=document.querySelector(".search-icon");

if(searchIcon){

searchIcon.addEventListener("click",()=>{

    const section=document.getElementById("search");

    if(section){

        section.scrollIntoView({

            behavior:"smooth"

        });

    }

});

}

/*==============================
        BORROW HISTORY
==============================*/

const borrowHistoryContainer=document.getElementById("borrowHistory");

function renderBorrowHistory(){

    if(!borrowHistoryContainer) return;

    borrowHistoryContainer.innerHTML="";

    if(borrowHistory.length===0){

        borrowHistoryContainer.innerHTML=`
        <p class="empty-history">
You haven't borrowed any books yet.

Click "Borrow" on any book to start your reading journey.
        </p>
        `;

        return;

    }

    borrowHistory.forEach(book=>{

        borrowHistoryContainer.innerHTML+=`

        <div class="borrow-item">

            <div class="borrow-dot"></div>

            <img src="${book.image}" alt="${book.title}">

            <div class="borrow-info">

                <h4>${book.title}</h4>

                <p>${book.author}</p>

            </div>

            <span class="status ${book.status==="Returned" ? "returned" : "pending"}">

                ${book.status}

            </span>

        </div>

        `;

    });

}

/*==============================
        RENDER WISHLIST
==============================*/

const wishlistGrid=document.getElementById("wishlistGrid");

function renderWishlist(){

    if(!wishlistGrid) return;

    wishlistGrid.innerHTML="";

    if(wishlist.length===0){

        wishlistGrid.innerHTML=`

            <p class="empty-text">

                No books in wishlist.

            </p>

        `;

        return;

    }

    wishlist.forEach(book=>{

        wishlistGrid.innerHTML+=`

        <div class="wishlist-book">

            <img src="${book.image}" alt="${book.title}">

            <h5>${book.title}</h5>

            <p>${book.author}</p>

        </div>

        `;

    });

}

/*==============================
        BORROW / RETURN
==============================*/

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("borrow-btn")) return;

    const title=e.target.dataset.title;

    const book=books.find(item=>item.title===title);

    if(!book) return;

    book.borrowed=!book.borrowed;

    if(book.borrowed){

        borrowHistory.unshift({

            title:book.title,

            author:book.author,

            image:book.image,

            status:"Borrowed",

            date:new Date().toLocaleDateString()

        });

    }

    else{

        borrowHistory=borrowHistory.map(item=>{

            if(item.title===book.title){

                item.status="Returned";

            }

            return item;

        });

    }

    saveBooks();

    saveHistory();

    renderBooks();

    renderBorrowHistory();

    updateStats();

});

/*==============================
        WISHLIST
==============================*/

document.addEventListener("click",(e)=>{

    const btn=e.target.closest(".wishlist-btn");

    if(!btn) return;

    const title=btn.dataset.title;

    const book=books.find(b=>b.title===title);

    const exists=wishlist.find(item=>item.title===title);

    if(exists){

        wishlist=wishlist.filter(item=>item.title!==title);

    }else{

        wishlist.push(book);

    }

    saveWishlist();

    renderWishlist();

    updateStats();

});

/*==============================
        CURRENTLY READING
==============================*/

const readingList=document.getElementById("readingList");

function renderReading(){

    if(!readingList) return;

    readingList.innerHTML="";

    const readingBooks=books.filter(book=>book.borrowed);

    if(readingBooks.length===0){

        readingList.innerHTML=`

        <p class="empty-history">

        Borrow a book to start reading.

        </p>

        `;

        return;

    }

    readingBooks.forEach(book=>{

        readingList.innerHTML+=`

        <div class="reading-card">

            <img src="${book.image}" alt="${book.title}">

            <div class="reading-info">

                <h4>${book.title}</h4>

                <p>${book.author}</p>

                <div class="progress">

                    <span style="width:60%"></span>

                </div>

                <div class="progress-info">

                    <span>60% Complete</span>

                </div>

                <button class="continue-btn">

                    Continue Reading

                </button>

            </div>

        </div>

        `;

    });

}


/*==============================
        PAGE INIT
==============================*/

renderBooks();

renderBorrowHistory();
renderWishlist();

renderReading();

updateStats();

saveBooks();

saveHistory();

saveWishlist();