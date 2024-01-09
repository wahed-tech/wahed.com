// Function to animate the count-up effect with thousands separator
function animateCountUp(targetElement) {
    const startValue = 0; // Starting value
    const endValue = parseInt(targetElement.getAttribute("data-number")); // Get the target number
    const duration = 500; // Animation duration in milliseconds
    const interval = 5; // Update interval in milliseconds
    const steps = duration / interval;
    const stepValue = (endValue - startValue) / steps;
    let current = startValue;
  
    const update = () => {
      current += stepValue;
      if (current <= endValue) {
        targetElement.innerText = Math.floor(current).toLocaleString(); // Use toLocaleString for thousands separator
        requestAnimationFrame(update);
      } else {
        targetElement.innerText = endValue.toLocaleString(); // Ensure the final value has a separator
      }
    };
  
    requestAnimationFrame(update);
  }
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        animateCountUp(target);
        observer.unobserve(target); // Unobserve once the animation is triggered
      }
    });
  });
  
  // Target elements and observe them
  const countUpElements = document.querySelectorAll(".count-up");
  countUpElements.forEach((element) => {
    observer.observe(element);
  });
  