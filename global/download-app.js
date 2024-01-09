function createPopup(logoSrc, headingText, subheadingText, qrCodeSrc) {
    const wrapper = document.createElement("div");
    wrapper.style.padding = "50px 100px";
    wrapper.style.borderRadius = "24px";
    wrapper.style.backgroundColor = "white";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.position = "relative";
  
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.border = "none";
    closeButton.style.background = "none";
    closeButton.style.fontSize = "24px";
    closeButton.style.cursor = "pointer";
    wrapper.appendChild(closeButton);
  
    const logo = document.createElement("img");
    logo.src = logoSrc;
    logo.style.width = "60px";
    logo.style.height = "60px";
    logo.style.marginBottom = "18px";
    wrapper.appendChild(logo);
  
    const heading = document.createElement("h2");
    heading.innerText = headingText;
    heading.style.fontSize = "50px";
    heading.classList.add("heading-xxlarge");
    heading.style.marginBottom = "24px";
    wrapper.appendChild(heading);
  
    const subheading = document.createElement("p");
    subheading.innerText = subheadingText;
    subheading.style.fontSize = "20px";
    subheading.style.marginBottom = "24px";
    wrapper.appendChild(subheading);
  
    const qrCode = document.createElement("img");
    qrCode.src = qrCodeSrc;
    qrCode.style.width = "160px";
    qrCode.style.height = "160px";
    wrapper.appendChild(qrCode);
  
    return wrapper;
  }
  
  function showPopup(popupContent) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";
  
    overlay.appendChild(popupContent);
    document.body.appendChild(overlay);
  
    popupContent.querySelector("button").addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        document.body.removeChild(overlay);
      }
    });
    /*
      overlay.addEventListener("click", () => {
          document.body.removeChild(overlay);
      }); */
  }
  
  function isDesktop() {
    return window.innerWidth > 1024;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const appButtons = document.querySelectorAll("[app]");
  
    appButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        if (isDesktop()) {
          event.preventDefault();
          const currentURL = window.location.pathname;
  
          if (currentURL === "/uk/waqf") {
            window.location.href = "/download";
          } else {
            const popupContent = createPopup(
              "https://uploads-ssl.webflow.com/6258aa32b493a205485f0800/6459e5cb82a2fe906742d2a2_Frame%205.svg", // This is for the Wahed Logo in popup modal
              "Get the app", // This is for the Heading in popup modal
              "Scan the QR code to download the app", // This is for the subheading in popup modal
              "https://uploads-ssl.webflow.com/6258aa32b493a205485f0800/645d65c0d718edbfce78636d_download-app.svg", // This is for the QR Code image in popup modal
            );
            showPopup(popupContent);
          }
        }
      });
    });
  });