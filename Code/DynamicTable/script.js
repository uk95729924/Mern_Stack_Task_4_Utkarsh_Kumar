// Initial data array
let data = [
    ["Name", "Age", "Country"],
    ["Alice", 25, "USA"],
    ["Bob", 30, "UK"],
    ["Charlie", 35, "Canada"]
];

// Function to create and display the table
function createTable(dataArray) {
    const container = document.getElementById("table-container");
    container.innerHTML = ""; // Clear previous table

    const table = document.createElement("table");

    dataArray.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");

        row.forEach((cell, colIndex) => {
            const cellElement = rowIndex === 0 ? document.createElement("th") : document.createElement("td");
            cellElement.textContent = cell;

            // Add sorting functionality to header
            if (rowIndex === 0) {
                cellElement.addEventListener("click", () => sortTable(colIndex));
            }

            tr.appendChild(cellElement);
        });

        table.appendChild(tr);
    });

    container.appendChild(table);
}

// Function to sort the table
function sortTable(columnIndex) {
    const headers = data[0];
    const rows = data.slice(1);

    // Toggle sorting order
    const isAscending = headers[columnIndex].includes("↑");
    headers[columnIndex] = headers[columnIndex].replace(" ↑", "").replace(" ↓", "") + (isAscending ? " ↓" : " ↑");

    rows.sort((a, b) => {
        if (isAscending) {
            return a[columnIndex] > b[columnIndex] ? -1 : 1;
        } else {
            return a[columnIndex] < b[columnIndex] ? -1 : 1;
        }
    });

    // Rebuild the table
    data = [headers, ...rows];
    createTable(data);
}

// Add new row to the table
document.getElementById("add-row-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const country = document.getElementById("country").value;

    // Add new row to data
    data.push([name, age, country]);

    // Reset the form
    this.reset();

    // Update the table
    createTable(data);
});

// Initialize the table
createTable(data);
