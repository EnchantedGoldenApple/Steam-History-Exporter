function exportTableToCSV(skipKiosks, includeExpenses) {
  const table = document.querySelector(".wallet_history_table");
  if (!table) {
    alert("No history table found!");
    return;
  }

  let rows = Array.from(table.querySelectorAll("tr"));
  let csvContent = "";

  // Add custom header row
  let headers = [
    "Date",
    "Items",
    "Type",
    "Total",
    "Wallet Change",
    "Wallet Balance",
  ];

  // Add the "Expenses" column if the checkbox is checked
  if (includeExpenses) {
    headers.push("Expenses");
  }

  csvContent += headers.map((field) => `"${field}"`).join(",") + "\n";

  // Function to quote data for CSV
  function quoteData(data) {
    return `"${data.trim()}"`;
  }

  function calculateExpense(a,b){
    a=a.replace(/^"+|"+$/g,'');
    b=b.replace(/^"+|"+$/g,'');
    if(a===''||a.trim().startsWith('+'))return b;
    const regex=/^(-?\s*[\d\s]+[,.]?\d*)\s*(.*)$/;
    const matchB=b.match(regex);
    if(!matchB)return'Invalid format for variable Total';
    const[,valueB,currency]=matchB;
    let numB=parseFloat(valueB.replace(/\s/g,'').replace(',','.'));
    const matchA=a.match(regex);
    if(!matchA)return'Invalid format for variable Wallet';
    const[,valueA]=matchA;
    let numA=parseFloat(valueA.replace(/\s/g,'').replace(',','.'));
    let result=(numB+numA).toFixed(2).replace('.',',');
    result=result.replace(/\B(?=(\d{3})+(?!\d))/g,' ');
    return`${result}${currency}`;
  }
  
  
  rows.slice(2).forEach((row) => {
    let typeElement = row.querySelector(".wht_type");
    let date = quoteData(row.querySelector(".wht_date")?.innerText || "");
    let items = quoteData(row.querySelector(".wht_items")?.innerText || "");
    let type = quoteData(typeElement?.innerText || "");
    let total = quoteData(row.querySelector(".wht_total")?.innerText || "");
    let walletChange = quoteData(
      row.querySelector(".wht_wallet_change")?.innerText || ""
    );
    let walletBalance = quoteData(
      row.querySelector(".wht_wallet_balance")?.innerText || ""
    );
    let expenses = "";

    // Skip rows that match "Purchase" and "Kiosk" if the checkbox is checked
    if (
      skipKiosks &&
      typeElement?.innerHTML.includes("Purchase") &&
      typeElement?.innerHTML.includes("Kiosk")
    ) {
      return;
    }

    // If the type is "Purchase" and the row is not refunded, calculate the expense
    if (
      includeExpenses &&
      typeElement?.innerHTML.includes("Purchase") &&
      !row.querySelector(".wht_refunded")
    ) {
      expenses = quoteData(calculateExpense(walletChange, total));
    }

    // Combine the data from the row into a CSV string
    let rowContent = [date, items, type, total, walletChange, walletBalance];

    // If expenses column is included, append it
    if (includeExpenses) {
      rowContent.push(expenses);
    }

    csvContent += rowContent.join(",") + "\n";
  });

  downloadCSV(csvContent, "steam_history.csv");
}

function downloadCSV(csvContent, filename) {
  let blob = new Blob([csvContent], { type: "text/csv" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "export_history") {
    exportTableToCSV(request.skipKiosks, request.includeExpenses);
  }
});
