window.addEventListener("DOMContentLoaded", (event) => {
    // Select elements with the class .returns-radio-field
    const radioFieldElements = document.querySelectorAll(
      ".returns-radio-field, .return-text-for-portfolio, .input-field-label, .historical-graph, .return-disclaimer, .text-field-13, .custom-select",
    );
  
    radioFieldElements.forEach((element) => {
      // Create a skeleton div
      const skeletonDiv = document.createElement("div");
      skeletonDiv.classList.add("skeleton-loader");
  
      // Add the skeleton div to the current element
      element.style.position = "relative";
      element.appendChild(skeletonDiv);
  
      // Get delay from a data attribute or set a default
      let delay = element.dataset.skeletonDelay || 2000;
  
      // Ensure delay is a number
      delay = isNaN(delay) ? 2000 : Number(delay);
  
      setTimeout(() => {
        // Remove the skeleton loader div after delay
        const skeletonDiv = element.querySelector(".skeleton-loader");
        element.removeChild(skeletonDiv);
      }, delay);
    });
  });
  