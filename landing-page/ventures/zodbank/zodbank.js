document.addEventListener("DOMContentLoaded", function () {
    // Function to determine if the current device is a mobile device
    function isMobile() {
      return window.innerWidth < 768; // You can adjust the width threshold as needed
    }
  
    // Set perPage based on the screen width
    const perPageValue = isMobile() ? 1 : 3;
    const focusValue = isMobile() ? "left" : "center";
    const paginationValue = isMobile() ? "true" : "false";
  
    new Splide("#splide", {
      type: "loop",
      perPage: perPageValue,
      focus: focusValue,
      autoplay: true,
      interval: 8000,
      flickMaxPages: 1,
      updateOnMove: true,
      pagination: paginationValue,
      padding: "0%",
      //throttle: 300,
    }).mount();
  });
  