
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

      console.log("Fetched Data:");
      console.log(rows); // Log the fetched rows data

      const getValueByColumnName = (columnName) => {
        const headerRow = rows[0].split(",");
        const columnIndex = headerRow.findIndex(
          (header) => header.trim() === columnName
        );
        if (columnIndex !== -1) {
          return rows[1].split(",")[columnIndex]; // Keep the index as 1 to target the first row of data in Sheet 2
        }
        return "";
      };

      const elements = document.querySelectorAll("[umma-data]");

      elements.forEach((element) => {
        const attributeName = element.getAttribute("umma-data");
        const value = getValueByColumnName(attributeName);
        element.innerText = value;
      });

      console.log("Processed Data:");
      console.log(elements); // Log the processed elements data
    })
    .catch((error) => {
      console.error("Error fetching Google Sheet data:", error);
    });
});


}
