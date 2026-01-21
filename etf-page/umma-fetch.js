// Function to set blank values for elements with "hlal-data" attribute on page load
function setBlankValues() {
  const elements = document.querySelectorAll("[umma-data]");
  elements.forEach((element) => {
    element.innerText = ""; // Set the text content to blank
  });
}

// Attach the function to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", setBlankValues);

document.addEventListener("DOMContentLoaded", function () {
  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1SFZiD8RgHuxCLqxqvXGe82d4XlI_7WhJBTcI9OFXATE/export?format=csv&gid=1462558836"; // Updated Sheet URL with Sheet 2's gid parameter

  fetch(sheetURL)
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n").map((row) => {
        // Add a comma at the end of each row
        return row + ",";
      });

      // Removed console.log to prevent data exposure in production
      // console.log("Fetched Data:");
      // console.log(rows); // Log the fetched rows data

      // Enhanced sanitization to prevent XSS attacks
      const sanitizeInput = (input) => {
        if (typeof input !== 'string') return '';
        
        let sanitized = input;
        
        // Decode HTML entities first to prevent bypasses like &lt;script&gt;
        const textarea = document.createElement('textarea');
        textarea.innerHTML = sanitized;
        sanitized = textarea.value;
        
        // Remove all script tags and content (handles variations with whitespace)
        sanitized = sanitized.replace(/<script[\s\S]*?<\/script[\s]*>/gi, '');
        
        // Remove all HTML tags
        sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, '');
        
        // Remove dangerous protocols
        sanitized = sanitized.replace(/javascript\s*:/gi, '');
        sanitized = sanitized.replace(/data\s*:/gi, '');
        sanitized = sanitized.replace(/vbscript\s*:/gi, '');
        
        // Remove event handlers
        sanitized = sanitized.replace(/\bon\w+\s*=\s*["']?[^"']*["']?/gi, '');
        
        return sanitized.trim();
      };

      const getValueByColumnName = (columnName) => {
        const headerRow = rows[0].split(",");
        const columnIndex = headerRow.findIndex(
          (header) => header.trim() === columnName
        );
        if (columnIndex !== -1) {
          const rawValue = rows[1].split(",")[columnIndex];
          return sanitizeInput(rawValue);
        }
        return "";
      };

      const elements = document.querySelectorAll("[umma-data]");

      elements.forEach((element) => {
        const attributeName = element.getAttribute("umma-data");
        const value = getValueByColumnName(attributeName);
        element.innerText = value;
      });

      // Removed console.log to prevent data exposure in production
      // console.log("Processed Data:");
      // console.log(elements); // Log the processed elements data
    })
    .catch((error) => {
      console.error("Error fetching Google Sheet data:", error);
    });
});
