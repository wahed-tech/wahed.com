// Function to set blank values for elements with "hlal-data" attribute on page load
function setBlankValues() {
  const elements = document.querySelectorAll("[hlal-data]");
  elements.forEach((element) => {
    element.innerText = ""; // Set the text content to blank
  });
}

// Attach the function to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", setBlankValues);

document.addEventListener("DOMContentLoaded", function () {
  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1SFZiD8RgHuxCLqxqvXGe82d4XlI_7WhJBTcI9OFXATE/export?format=csv"; // Updated Sheet URL

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

      // Sanitize input to prevent potential XSS attacks
      const sanitizeInput = (input) => {
        if (typeof input !== 'string') return '';
        // Remove any HTML tags and trim whitespace
        return input.replace(/<[^>]*>/g, '').trim();
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

      const elements = document.querySelectorAll("[hlal-data]");

      elements.forEach((element) => {
        const attributeName = element.getAttribute("hlal-data");
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