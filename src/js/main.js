(function ($) {
  // Document ready
  $(function () {
    // Floating manager label
    $(".floating-manager-wrap").addClass("active");

    $(".floating-manager__label-wrap").on("click", function () {
      const parent = $(this).closest(".floating-manager-wrap");
      parent.toggleClass("active");
    });
    $(".floating-manager__close-btn").on("click", function () {
      const parent = $(this).closest(".floating-manager-wrap");
      parent.removeClass("active");
    });

    // Product page gallery
    $(".product-page-gallery").each(function () {
      const thumbs = $(this).find(".gallery-thumbs")[0];
      const gallery = $(this).find(".gallery-top")[0];

      const thumbsArrowPrev = $(this)
        .find(".gallery-thumbs-wrap")
        .find(".swiper-button-prev")[0];
      const thumbsArrowNext = $(this)
        .find(".gallery-thumbs-wrap")
        .find(".swiper-button-next")[0];

      let galleryThumbs = new Swiper(thumbs, {
        spaceBetween: 16,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      let galleryTop = new Swiper(gallery, {
        spaceBetween: 10,
        thumbs: {
          swiper: galleryThumbs,
        },
        navigation: {
          prevEl: thumbsArrowPrev,
          nextEl: thumbsArrowNext,
        },
      });
    });

    // Popups
    $(".open-contact-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#contactFormPopup").addClass("active");

      const product = $(this).data("product");

      if (product) {
        $("#contactFormPopup").find(".overlay-form-product-name").val(product);
      }
    });

    // Close overlay on outside click
    $(".overlay-cdk").on("click", function (e) {
      if (e.target !== e.currentTarget) return;

      $(".overlay-cdk").removeClass("active");
      $("body").removeClass("overflow-hidden");
    });

    // Close overlay on button click
    $(".overlay-cdk__close-btn").on("click", function (e) {
      $(".overlay-cdk").removeClass("active");
      $("body").removeClass("overflow-hidden");
    });

    // Open catalog dropdown
    $(".catalog-table__collapse-btn").on("click", function () {
      $(".catalog-table__collapse").removeClass("active");
      const parent = $(this).closest(".catalog-table__collapse");
      parent.addClass("active");

      const content = parent.find(".catalog-table__collapse-btn-text").html();
      parent.find(".catalog-table__collapse-body-header").html(content);

      parent
        .find(".catalog-table__collapse-body-wrap")
        .append(
          `<button class="catalog-table__collapse-close-btn"><i class="icon-cross"></i></button>`,
        );
    });
    // Close catalog dropdown on button click
    $(document).on("click", ".catalog-table__collapse-close-btn", function () {
      const parent = $(this).closest(".catalog-table__collapse");
      parent.removeClass("active");
    });
    // Close catalog dropdown on outside click
    $("body").on("click", function (e) {
      const hasParent = $(e.target).closest(".catalog-table__collapse");
      if (!hasParent.length) {
        $(".catalog-table__collapse").removeClass("active");
      }
    });

    // Toggle catalog page collapse
    $(".catalog-page-collapse__btn").on("click", function (e) {
      e.preventDefault();

      const parent = $(this).closest(".catalog-page-collapse");

      // $(".catalog-table__collapse").removeClass("active");
      if (parent.hasClass("active")) {
        parent.find(".catalog-page-collapse__body").slideUp();
        parent.removeClass("active");
      } else {
        parent.find(".catalog-page-collapse__body").slideDown();
        parent.addClass("active");
      }

      // const content = parent.find(".catalog-table__collapse-btn-text").html();
      // parent.find(".catalog-table__collapse-body-header").html(content);

      // parent
      //   .find(".catalog-table__collapse-body-wrap")
      //   .append(
      //     `<button class="catalog-table__collapse-close-btn"><i class="icon-cross"></i></button>`,
      //   );
    });

    // Scrolling slider
    $(".scrolling-container").each(function () {
      const scrollbar = $(this)
        .closest(".scrolling-container-wrap")
        .find(".swiper-scrollbar")[0];

      const slidesLength = $(this).find(".swiper-slide").length;

      let swiperConfig = {
        freeMode: true,
        spaceBetween: 12,
        slidesPerView: "auto",
        scrollbar: {
          el: scrollbar,
          hide: false,
          draggable: true,
          snapOnRelease: false,
        },
        on: {
          afterInit: (e) => {
            $(e.$el).css("padding-right", "15%");
            e.update();
            e.scrollbar.updateSize();
          },
        },
      };

      if (slidesLength >= 5) {
        swiperConfig = {
          ...swiperConfig,
          slidesPerColumn: 2,
          slidesPerColumnFill: "row",
        };
      } else {
        swiperConfig = {
          ...swiperConfig,
        };
      }

      new Swiper($(this)[0], swiperConfig);
    });
    $(".scrolling-container-lined").each(function () {
      const scrollbar = $(this)
        .closest(".scrolling-container-lined-wrap")
        .find(".swiper-scrollbar")[0];

      new Swiper($(this)[0], {
        freeMode: true,
        spaceBetween: 20,
        slidesPerView: "auto",
        scrollbar: {
          el: scrollbar,
          hide: false,
          draggable: true,
          snapOnRelease: false,
        },
        on: {
          afterInit: (e) => {
            $(e.$el).css("padding-right", "15%");
            e.update();
            e.scrollbar.updateSize();
          },
        },
      });
    });
    $(".partners-swiper").each(function () {
      const parent = $(this).closest(".partners-swiper-wrap");
      const arrowPrev = parent.find(".swiper-button-prev")[0];
      const arrowNext = parent.find(".swiper-button-next")[0];

      new Swiper($(this)[0], {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: arrowNext,
          prevEl: arrowPrev,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
        },
      });
    });

    // Youtube player
    if ($(".player-tabs").length) {
      loadPlayer();
    }

    // Player tabs
    $(".player-tabs__controller-btn").on("click", function () {
      const id = $(this).data("id");
      if (!id) {
        console.error("Data id attribute not provided!");
        return;
      }
      $(this)
        .closest(".player-tabs-container")
        .find(".player-tabs__controller-btn")
        .removeClass("active");
      $(this).addClass("active");

      $(this)
        .closest(".player-tabs-container")
        .find(".player-tabs__item")
        .removeClass("active");

      $(this)
        .closest(".player-tabs-container")
        .find(".player-tabs__item")
        .each(function () {
          const tabId = $(this).data("id");
          // Destroy all iframes
          $(this)
            .find("iframe")
            .each(function () {
              $(this).attr("src", "");
            });
          // Set active class
          if (id === tabId) {
            $(this).addClass("active");
          }
        });
      // Load player for new active tab
      setTimeout(() => {
        loadPlayer(), 100;
      });
    });

    // Load player src into active tab depending on current time
    function loadPlayer() {
      const allowedOffset = [
        "-12:00",
        "-11:00",
        "-10:00",
        "-09:30",
        "-09:00",
        "-08:00",
        "-07:00",
        "-06:00",
        "-05:00",
        "-04:00",
        "-03:30",
        "-03:00",
        "-02:00",
        "-01:00",
        "+00:00",
        "+01:00",
        "+02:00",
        "+03:00",
        "+03:30",
        "+04:00",
        "+04:30",
        "+05:00",
        "+05:30",
        "+05:45",
        "+06:00",
        "+06:30",
        "+07:00",
        "+08:00",
        "+08:45",
        "+09:00",
        "+09:30",
        "+10:00",
        "+10:30",
        "+11:00",
        "+12:00",
        "+12:45",
        "+13:00",
        "+14:00",
      ];

      $(".player-tabs__item.active").each(function () {
        let offset = $(this)
          .find('input[name="iframe_source_time_offset"]')
          .val();
        if (!allowedOffset.includes(offset)) {
          offset = "+00:00";
        }

        const m_date = moment().utcOffset(offset);

        const m_morning = moment().utcOffset(offset).set({
          hour: 6,
          minute: 0,
          second: 0,
        });
        const m_day = moment().utcOffset(offset).set({
          hour: 12,
          minute: 0,
          second: 0,
        });
        const m_evening = moment().utcOffset(offset).set({
          hour: 18,
          minute: 0,
          second: 0,
        });

        if (m_date.isBetween(m_morning, m_day, undefined, "[]")) {
          // Morning
          const src = $(this).find('input[name="iframe_source_morning"]').val();
          $(this).find(".player-tabs__item-iframe").attr("src", src);
        } else if (m_date.isBetween(m_day, m_evening, undefined, "[]")) {
          // Day
          const src = $(this).find('input[name="iframe_source_day"]').val();
          $(this).find(".player-tabs__item-iframe").attr("src", src);
        } else {
          // night / Fallback
          const src = $(this).find('input[name="iframe_source_night"]').val();
          $(this).find(".player-tabs__item-iframe").attr("src", src);
        }
      });
    }

    // Toggle mobile sliderbar
    $(".toggle-mobile-slidebar").on("click", function () {
      $("#slidebarContainer").addClass("active");
      $("body").addClass("overflow-hidden");

      $("#slidebarContainer").css({
        transition: 0,
        transform: "translateX(-300px)",
      });
      setTimeout(() => {
        $("#slidebarContainer").css({
          transition: "400ms",
          transform: "translateX(0)",
        });
      }, 0);
    });
    $(".close-mobile-slidebar").on("click", function (e) {
      closeSlidebar();
    });
    $(".main-header__mobile-slidebar-wrap").on("click", function (e) {
      if (e.target !== e.currentTarget) return;

      closeSlidebar();
    });
    function closeSlidebar() {
      $("#slidebarContainer").css({
        transition: "400ms",
        transform: "translateX(-300px)",
      });

      setTimeout(() => {
        $("#slidebarContainer").removeClass("active");
        $("body").removeClass("overflow-hidden");
      }, 400);
    }

    // Toggle catalog menu
    $(".toggle-catalog-menu").on("click", function () {
      if (!$(".main-header__catalog-menu").hasClass("active")) {
        // Remove body overflow
        $("body").addClass("overflow-hidden");

        // Set header to fixed
        $(".main-header").addClass("catalog-is-open");
        const headerHeight = $(".main-header").height();

        // Set catalog menu to fixed and set position
        $(".main-header__catalog-menu")
          .addClass("active")
          .css({
            height: `calc(100% - ${headerHeight}px)`,
            top: headerHeight,
          });

        // Switch burger icon
        $(".main-header__catalog-btn-icon")
          .removeClass("icon-burger")
          .addClass("icon-cross");
      } else {
        // Return overflow
        $("body").removeClass("overflow-hidden");

        // Remove header fixed class
        $(".main-header").removeClass("catalog-is-open");

        // Remove catalog menu fixed class and reset position
        $(".main-header__catalog-menu").removeClass("active").css({
          height: "",
          top: "",
        });

        // Switch burger icon back
        $(".main-header__catalog-btn-icon")
          .removeClass("icon-cross")
          .addClass("icon-burger");
      }
    });
    // Filter catalog menu by letters
    $(".filter-catalog-menu").on("click", function () {
      const dataValue = $(this).data("menu-value");
      if (!dataValue) {
        console.error("No data-menu-value attribute provided!");
        return;
      }
      if (!$(this).hasClass("active")) {
        $(".filter-catalog-menu").removeClass("active");
        $(this).addClass("active");

        // Return all sections
        $(".catalog-menu-section").each(function () {
          $(this).parent().removeClass("d-none");
        });
        // Hide selected sections
        $(".catalog-menu-section").each(function () {
          const dataSectionValue = $(this).data("menu-value");
          if (dataSectionValue !== dataValue) {
            $(this).parent().addClass("d-none");
          }
        });
      } else {
        // Remove filters if clicked on active
        $(".filter-catalog-menu").removeClass("active");
        $(".catalog-menu-section").each(function () {
          $(this).parent().removeClass("d-none");
        });
      }
    });

    $(window).on("scroll", function () {
      stickHeader();
    });

    stickHeader();

    var startHeader = null;
    var totalHeader = null;
    function stickHeader() {
      const el = $(".main-header")[0];

      if (!el) {
        return;
      }

      if (startHeader === null) {
        startHeader = window.pageYOffset + el.getBoundingClientRect().top;
      }
      if (totalHeader === null) {
        totalHeader = window.pageYOffset + el.getBoundingClientRect().bottom;
      }

      if (
        $(window).scrollTop() > startHeader &&
        !$(".main-header").hasClass("main-header--fixed")
      ) {
        $(".main-header").addClass("main-header--fixed");
        $("body").css("padding-top", $(".main-header").height());
      }

      if (
        $(".main-header").hasClass("main-header--fixed") &&
        totalHeader !== null &&
        $(window).scrollTop() <= startHeader
      ) {
        $(".main-header").removeClass("main-header--fixed");
        $("body").css("padding-top", 0);
      }
    }
  });
})(jQuery);
