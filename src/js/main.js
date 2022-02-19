const tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
const secondScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
secondScriptTag.parentNode.insertBefore(tag, secondScriptTag);

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

let isYTApiLoaded = false;

function onYouTubeIframeAPIReady() {
  isYTApiLoaded = true;
}

(function ($) {
  // Document ready
  $(function () {
    let magicGrid = null;
    if (typeof MagicGrid !== "undefined") {
      if (
        $(".masonry-container").length &&
        $(".masonry-container__item").length
      ) {
        magicGrid = new MagicGrid({
          container: ".masonry-container", // Required. Can be a class, id, or an HTMLElement.
          static: false, // Required for static content.
          items: $(".masonry-container__item").length,
          animate: false, // Optional.
          maxColumns: 4,
          center: true,
          gutter: 20,
        });

        magicGrid.listen();
      }
    }

    // Product page info mobile table
    let isPriceTableMobile = false;
    if ($(window).outerWidth(true) < 768) {
      enablePriceTableMobile();
    } else {
      disablePriceTableMobile();
    }
    $(window).on("resize", function () {
      if ($(window).outerWidth(true) < 768) {
        enablePriceTableMobile();
      } else {
        disablePriceTableMobile();
      }
    });
    function enablePriceTableMobile() {
      if (isPriceTableMobile) {
        return;
      }
      isPriceTableMobile = true;

      $(".table-price-mobile tbody>tr>td").each(function (index) {
        if ($(this).text().length >= 25) {
          $(this).addClass("long");
        }
      });
      $(".table-price-mobile tbody>tr").each(function (index) {
        const self = $(this);
        self.children("td").each(function (tdIndex) {
          $(this).data("sort", tdIndex);
        });
        var items = self.children("td").sort(function (a, b) {
          if ($(b).hasClass("long") && !$(a).hasClass("long")) {
            return -1;
          } else if (!$(b).hasClass("long") && $(a).hasClass("long")) {
            return 1;
          } else {
            return 0;
          }
        });
        let short = items.filter(function (item) {
          if (!$(this).hasClass("long")) {
            return $(this);
          }
        });
        // Odd number
        if (Math.abs(short.length % 2) == 1) {
          short.last().addClass("long");
        }
        self.append(items);
      });
      $(".table-price-mobile").each(function (index) {
        let titles = $(this).find("thead>tr>th");
        $(this)
          .find("tbody>tr")
          .each(function (index) {
            if (titles[index]) {
              $(this)
                .find("td")
                .prepend(
                  `<div class="table-price-mobile__header">${titles[index].innerText}</div>`,
                );
            }
          });
      });
    }
    function disablePriceTableMobile() {
      if (!isPriceTableMobile) {
        return;
      }
      isPriceTableMobile = false;

      $(".table-price-mobile>tbody>tr>td").each(function (index) {
        $(this).removeClass("long");
      });
      $(".table-price-mobile>tbody>tr").each(function (index) {
        const self = $(this);
        var items = self.children("td").sort(function (a, b) {
          if (Number($(b).data("sort")) > Number($(a).data("sort"))) {
            return -1;
          } else if (Number($(b).data("sort")) < Number($(a).data("sort"))) {
            return 1;
          } else {
            return 0;
          }
        });
        self.append(items);
      });
      $(".table-price-mobile").each(function (index) {
        let titles = $(this).find("thead>tr>th");
        $(this)
          .find("tbody>tr")
          .each(function (index) {
            $(this).find(".table-price-mobile__header").remove();
          });
      });
    }
    // Simple phone input mask
    $(".phone-input-mask").on("keypress paste", function (evt) {
      // ^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$
      var theEvent = evt || window.event;

      var key = null;
      // Handle paste
      if (theEvent.type === "paste") {
        key = event.clipboardData.getData("text/plain");
      } else {
        // Handle key press
        key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
      }
      var regex = /([0-9() +-])/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    });

    // Floating manager label
    if ($(window).outerWidth(true) > 768) {
      $(".floating-manager-wrap").addClass("active");
    }

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
      console.log(1);
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
        autoHeight: true,
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
    // Contact form popup
    $(".open-contact-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#contactFormPopup").addClass("active");

      const product = $(this).data("product");

      if (product) {
        $("#contactFormPopup").find(".overlay-form-product-name").val(product);
      }
    });

    // Whatsapp popup
    $(".open-whatsapp-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#whatsappFormPopup").addClass("active");
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

      if (parent.find(".catalog-table__collapse-body-header a").length) {
        parent.find(".catalog-table__collapse-body-header a").html(content);
      } else {
        parent.find(".catalog-table__collapse-body-header").html(content);
      }

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

    // Render catalog page collapse
    $(".catalog-p-collapse").each(function (e) {
      let $body = $(this).find(".catalog-p-collapse__body");
      let $list = $(this).find(".catalog-p-collapse__list");
      let $listItems = $(this).find(".catalog-p-collapse__list-item");
      if ($listItems.length <= 3) {
        $list.css("height", "auto");
        $body.find(".catalog-p-collapse__toggle-btn").css("display", "none");
      }
    });

    // Toggle catalog page collapse
    $(".catalog-p-collapse__toggle-btn").on("click", function (e) {
      e.preventDefault();

      const parent = $(this).closest(".catalog-p-collapse");

      if (parent.hasClass("active")) {
        // parent.find(".catalog-page-collapse__body").slideUp();
        $(".catalog-p-collapse").removeClass("active");
      } else {
        // parent.find(".catalog-page-collapse__body").slideDown();
        $(".catalog-p-collapse").removeClass("active");
        parent.addClass("active");
      }
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
          breakpoints: {
            992: {
              slidesPerColumn: 2,
              slidesPerColumnFill: "row",
            },
          },
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

    // Player tabs
    var livePlayer = null;

    $(".player-tabs__controller-btn").on("click", function () {
      if (!isYTApiLoaded) {
        return;
      }

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

      // Destroy player
      livePlayer.stopVideo();
      livePlayer.destroy();
      livePlayer = null; // Clear out the reference to the destroyed player

      $(this)
        .closest(".player-tabs-container")
        .find(".player-tabs__item")
        .each(function () {
          const tabId = $(this).data("id");
          // // Destroy all iframes
          // $(this)
          //   .find("iframe")
          //   .each(function () {
          //     $(this).attr("src", "");
          //   });
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
    // This code loads the IFrame Player API code asynchronously.

    // Youtube player
    if ($(".player-tabs").length) {
      let ytLoadInterval = setInterval(() => {
        if (isYTApiLoaded) {
          loadPlayer();
          clearInterval(ytLoadInterval);
          ytLoadInterval = null;
        }
      }, 500);
    }

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

      let origin = window.origin;
      if (origin.split("www.").length === 1) {
        let originChunks = origin.split("://");
        origin = originChunks[0] + "://" + "www." + originChunks[1];
      }

      $(".player-tabs__item.active").each(function () {
        let offset = $(this)
          .find('input[name="iframe_source_time_offset"]')
          .val();
        if (!allowedOffset.includes(offset)) {
          offset = "+00:00";
        }
        // value="https://www.youtube.com/embed/Xiwuni9qmvY?playlist=Xiwuni9qmvY&autoplay=1&playsinline=1&loop=1&controls=0&rel=0&modestbranding=1&fs=0&frameborder=0&enablejsapi=1&origin=https%3A%2F%2Fhim-kazan.ru&widgetid=1"
        const playerId = $(this).find(".player-tabs__item-iframe").attr("id");

        const m_date = moment().utcOffset(offset);

        let ytId = null;

        // Morning
        const m_src = $(this).find('input[name="iframe_source_morning"]');
        let m_srcVal = m_src.val();

        let m_dataStart = m_src.data("start");
        let m_dataEnd = m_src.data("end");
        let m_start_time = moment(m_dataStart, "HH:mm:ss");
        let m_end_time = moment(m_dataEnd, "HH:mm:ss");
        const m_morning_start = moment()
          .utcOffset(offset)
          .set({
            hour: m_start_time.get("hour"),
            minute: m_start_time.get("minute"),
            second: m_start_time.get("second"),
          });
        const m_morning_end = moment()
          .utcOffset(offset)
          .set({
            hour: m_end_time.get("hour"),
            minute: m_end_time.get("minute"),
            second: m_end_time.get("second"),
          });
        if (m_end_time.isSameOrBefore(m_start_time, "hour")) {
          m_morning_end.add(1, "days");
        }

        // Day
        const d_src = $(this).find('input[name="iframe_source_day"]');
        let d_srcVal = d_src.val();

        let d_dataStart = d_src.data("start");
        let d_dataEnd = d_src.data("end");
        let d_start_time = moment(d_dataStart, "HH:mm:ss");
        let d_end_time = moment(d_dataEnd, "HH:mm:ss");
        const m_day_start = moment()
          .utcOffset(offset)
          .set({
            hour: d_start_time.get("hour"),
            minute: d_start_time.get("minute"),
            second: d_start_time.get("second"),
          });
        const m_day_end = moment()
          .utcOffset(offset)
          .set({
            hour: d_end_time.get("hour"),
            minute: d_end_time.get("minute"),
            second: d_end_time.get("second"),
          });
        if (d_end_time.isSameOrBefore(d_start_time, "hour")) {
          m_day_end.add(1, "days");
        }

        // Evening
        const e_src = $(this).find('input[name="iframe_source_evening"]');
        let e_srcVal = e_src.val();

        let e_dataStart = e_src.data("start");
        let e_dataEnd = e_src.data("end");
        let e_start_time = moment(e_dataStart, "HH:mm:ss");
        let e_end_time = moment(e_dataEnd, "HH:mm:ss");
        const m_evening_start = moment()
          .utcOffset(offset)
          .set({
            hour: e_start_time.get("hour"),
            minute: e_start_time.get("minute"),
            second: e_start_time.get("second"),
          });
        const m_evening_end = moment()
          .utcOffset(offset)
          .set({
            hour: e_end_time.get("hour"),
            minute: e_end_time.get("minute"),
            second: e_end_time.get("second"),
          });
        if (e_end_time.isSameOrBefore(e_start_time, "hour")) {
          m_evening_end.add(1, "days");
        }

        // night / Fallback
        const n_src = $(this).find('input[name="iframe_source_night"]');
        let n_srcVal = n_src.val();

        let n_dataStart = n_src.data("start");
        let n_dataEnd = n_src.data("end");
        let n_start_time = moment(n_dataStart, "HH:mm:ss");
        let n_end_time = moment(n_dataEnd, "HH:mm:ss");

        const m_night_start = moment()
          .utcOffset(offset)
          .set({
            hour: n_start_time.get("hour"),
            minute: n_start_time.get("minute"),
            second: n_start_time.get("second"),
          });
        const m_night_end = moment()
          .utcOffset(offset)
          .set({
            hour: n_end_time.get("hour"),
            minute: n_end_time.get("minute"),
            second: n_end_time.get("second"),
          });

        if (n_end_time.isSameOrBefore(n_start_time, "hour")) {
          m_night_end.add(1, "days");
        }

        if (m_date.isBetween(m_morning_start, m_morning_end, undefined, "[)")) {
          ytId = m_srcVal.split("/embed/")[1];
        } else if (m_date.isBetween(m_day_start, m_day_end, undefined, "[)")) {
          ytId = d_srcVal.split("/embed/")[1];
        } else if (
          m_date.isBetween(m_evening_start, m_evening_end, undefined, "[)")
        ) {
          ytId = e_srcVal.split("/embed/")[1];
        } else if (
          m_date.isBetween(m_night_start, m_night_end, undefined, "[)")
        ) {
          ytId = n_srcVal.split("/embed/")[1];
        } else {
          ytId = n_srcVal.split("/embed/")[1];
        }

        // let ytId = null;
        // if (m_date.isBetween(m_morning, m_day, undefined, "[]")) {
        //   // Morning
        //   const src = $(this).find('input[name="iframe_source_morning"]');
        //   let srcVal = src.val();
        //   ytId = srcVal.split("/embed/")[1];

        //   let dataStart = src.data("start");
        //   console.log("file: main.js - line 474 - dataStart", dataStart);
        //   let dataEnd = src.data("end");
        //   console.log("file: main.js - line 476 - dataEnd", dataEnd);
        // } else if (m_date.isBetween(m_day, m_evening, undefined, "[]")) {
        //   // Day
        //   const src = $(this).find('input[name="iframe_source_day"]');
        //   let srcVal = src.val();
        //   ytId = srcVal.split("/embed/")[1];

        //   let dataStart = src.data("start");
        //   console.log("file: main.js - line 474 - dataStart", dataStart);
        //   let dataEnd = src.data("end");
        //   console.log("file: main.js - line 476 - dataEnd", dataEnd);
        // } else {
        //   // night / Fallback
        //   const src = $(this).find('input[name="iframe_source_night"]');
        //   let srcVal = src.val();
        //   ytId = srcVal.split("/embed/")[1];

        //   let dataStart = src.data("start");
        //   console.log("file: main.js - line 474 - dataStart", dataStart);
        //   let dataEnd = src.data("end");
        //   console.log("file: main.js - line 476 - dataEnd", dataEnd);
        // }

        livePlayer = new YT.Player(playerId, {
          width: "100%",
          videoId: ytId,
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            loop: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            fs: 0,
            frameborder: 0,
            // playlist: ytId,
            origin: origin,
            widgetId: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: function (e) {
              if (e.data === YT.PlayerState.ENDED) {
                livePlayer.playVideo();
              }
            },
          },
        });
      });
    }

    // Toggle mobile search
    $(".toggle-mobile-search").on("click", function (e) {
      e.preventDefault();

      $(".main-header__search-wrap").toggleClass("open");
    });

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
    // $(".toggle-catalog-menu, .main-header__catalog-menu").on(
    //   "mouseenter mouseover",
    //   function () {
    //     if (toggleInterval) {
    //       clearInterval(toggleInterval);
    //       toggleInterval = null;
    //     }
    //     toggleCatalogTimer = 0;
    //     if (!$(".main-header__catalog-menu").hasClass("active")) {
    //       openCatalogMenu();
    //     }
    //   },
    // );

    // let toggleCatalogTimer = 0;
    // let toggleInterval = null;
    // $(".toggle-catalog-menu, .main-header__catalog-menu").on(
    //   "mouseleave",
    //   function () {
    //     if ($(".main-header__catalog-menu").hasClass("active")) {
    //       toggleInterval = setInterval(() => {
    //         toggleCatalogTimer += 0.1;

    //         if (toggleCatalogTimer < 0.4) {
    //           return;
    //         }

    //         closeCatalogMenu();

    //         if (toggleInterval) {
    //           clearInterval(toggleInterval);
    //           toggleInterval = null;
    //         }
    //         toggleCatalogTimer = 0;
    //       }, 100);
    //     }
    //   },
    // );

    $(".toggle-catalog-menu").on("click", function (e) {
      e.preventDefault();
      if (!$(".main-header__catalog-menu").hasClass("active")) {
        openCatalogMenu();
      } else {
        closeCatalogMenu();
      }
    });

    function openCatalogMenu() {
      // Remove body overflow
      $("body").addClass("overflow-hidden");

      // Set header to fixed
      $(".main-header").addClass("catalog-is-open");
      const offset = $(".main-header")[0].getBoundingClientRect().bottom;

      // Set catalog menu to fixed and set position
      $(".main-header__catalog-menu")
        .addClass("active")
        .css({
          height: `calc(100% - ${offset}px)`,
          top: offset,
        });

      // Switch burger icon
      $(".main-header__catalog-btn-icon")
        .removeClass("icon-burger")
        .addClass("icon-cross");

      // // Trigger masonry (masonry)
      // if (magicGrid) {
      //   magicGrid.positionItems();
      // }
    }
    function closeCatalogMenu() {
      // Scroll top inner content
      $(".main-header__catalog-menu-inner-content").scrollTop(0);
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

      // // Switch back inner content (masonry)
      // if (lettersBackup) {
      //   $(".filter-catalog-menu").removeClass("active");
      //   $(".main-header__catalog-menu-body .masonry-container").html(
      //     lettersBackup,
      //   );
      // }

      // // Switch back inner content (flex)
      // $(".catalog-menu-section").each(function () {
      //   $(this).parent().removeClass("d-none");
      // });

      // Switch back inner content (col)
      $(".main-header__catalog-menu-body .row-original").removeClass("d-none");
      $(".main-header__catalog-menu-body .row-filtered").remove();
      // Remove filter btn active state
      $(".filter-catalog-menu").removeClass("active");
    }

    // Backdrop click close
    $(".main-header__catalog-menu").on("click", function (e) {
      if (e.target !== e.currentTarget) return;
      closeCatalogMenu();
    });

    // // Masonry letter backup (masonry)
    // let lettersBackup = $(
    //   ".main-header__catalog-menu-body .masonry-container",
    // ).html();

    // Filter catalog menu by letters
    $(".filter-catalog-menu").on("click", function () {
      const dataValue = $(this).data("menu-value");
      if (!dataValue) {
        console.error("No data-menu-value attribute provided!");
        return;
      }
      if (!$(this).hasClass("active")) {
        // Add btn active state
        $(".filter-catalog-menu").removeClass("active");
        $(this).addClass("active");

        // // Return all sections (masonry)
        // if (lettersBackup) {
        //   $(".main-header__catalog-menu-body .masonry-container").html(
        //     lettersBackup,
        //   );
        // }
        // // Hide selected sections
        // $(".catalog-menu-section").each(function () {
        //   const dataSectionValue = $(this).data("menu-value");
        //   if (dataSectionValue !== dataValue) {
        //     $(this).parent().remove();
        //   }
        // });
        // // Create empty container item for proper magic grid update
        // if ($(".masonry-container__item").length === 0) {
        //   $(".masonry-container").append(
        //     '<div class="masonry-container__item">&nbsp;</div>',
        //   );
        // }

        // // Return all sections (flex)
        // $(".catalog-menu-section").each(function () {
        //   $(this).parent().removeClass("d-none");
        // });
        // // Hide selected sections
        // $(".catalog-menu-section").each(function () {
        //   const dataSectionValue = $(this).data("menu-value");
        //   if (dataSectionValue !== dataValue) {
        //     $(this).parent().addClass("d-none");
        //   }
        // });

        // Return all sections (col)
        // Hide original menu items
        $(".main-header__catalog-menu-body .row-original").addClass("d-none");
        $(".main-header__catalog-menu-body .row-filtered").remove();
        // Create filtered menu container
        $(".main-header__catalog-menu-body").prepend(
          '<div class="row row-filtered"></div>',
        );
        // Append filtered items to the container
        $(
          ".main-header__catalog-menu-body .row-original .catalog-menu-section",
        ).each(function () {
          const dataSectionValue = $(this).data("menu-value");
          if (dataSectionValue === dataValue) {
            let clone = $(this).clone(true);
            $(".main-header__catalog-menu-body .row-filtered").append(clone);
            clone.wrap('<div class="col-md-4 col-lg-3"></div>');
          }
        });
      } else {
        // Remove filters if clicked on active

        // Remove btn active state
        $(".filter-catalog-menu").removeClass("active");

        // // Return all sections (masonry)
        // if (lettersBackup) {
        //   $(".main-header__catalog-menu-body .masonry-container").html(
        //     lettersBackup,
        //   );
        // }

        // // Return all sections (flex)
        // $(".catalog-menu-section").each(function () {
        //   $(this).parent().removeClass("d-none");
        // });

        // Return all sections (col)
        $(".main-header__catalog-menu-body .row-original").removeClass(
          "d-none",
        );
        $(".main-header__catalog-menu-body .row-filtered").remove();
      }

      // // Update masonary grid (masonry)
      // if (magicGrid) {
      //   $(".masonry-container__item").css("opacity", 0);
      //   setTimeout(() => {
      //     magicGrid.positionItems();
      //     $(".masonry-container__item").animate(
      //       {
      //         opacity: 1,
      //       },
      //       200,
      //     );
      //   }, 0);
      // }
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

        $(".floating-manager-wrap").addClass("floating-manager-wrap--scrolled");
      }

      if (
        $(".main-header").hasClass("main-header--fixed") &&
        totalHeader !== null &&
        $(window).scrollTop() <= startHeader
      ) {
        $(".main-header").removeClass("main-header--fixed");
        $("body").css("padding-top", 0);

        $(".floating-manager-wrap").removeClass(
          "floating-manager-wrap--scrolled",
        );
      }
    }
  });
})(jQuery);
