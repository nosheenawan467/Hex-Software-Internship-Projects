const swiper = new Swiper(".heroSwiper", {

    loop:true,

    speed:900,

    spaceBetween:30,

    autoplay:{

        delay:5000,

        disableOnInteraction:false,

    },

    pagination:{

        el:".swiper-pagination",

        clickable:true,

    },

    navigation:{

        nextEl:".swiper-button-next",

        prevEl:".swiper-button-prev",

    },

});