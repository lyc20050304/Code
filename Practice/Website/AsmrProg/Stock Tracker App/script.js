const symbolInput = document.getElementById("symbol");
const stockList = document.getElementById("stock-list");

function fetchTopStocks() {
  fetch(
    "https://www.alphavantage.co/query?function=SECTOR&apikey=IGCW9F572OQ6FSM5"
  )
    .then((response) => response.json())
    .then((data) => {
      const stocks = data["Rank A: Real-Time Performance"];
      let html = "";

      for (let i = 0; i < 10; i++) {
        const symbol = Object.keys(stocks)[i];
        const change = stocks[symbol];
        const changeColor = parseFloat(change) >= 0 ? "green" : "red";

        html += `
          <li>
            <span class="symbol">${symbol}</span>
            <span class="change" style="color: ${changeColor}">${change}</span>
          </li>`;
      }
      stockList.innerHTML = html;
    })
    .catch((error) => console.error(error));
}

function fetchStockData(symbol) {
  if (!symbol) {
    fetchTopStocks();

    return;
  }

  fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=IGCW9F572OQ6FSM5`
  )
    .then((response) => response.json())
    .then((data) => {
      const quote = data["Global Quote"];

      if (quote && quote["10. change percent"]) {
        const changePercent = quote["10. change percent"].replace("%", "");
        const changeColor = parseFloat(changePercent) >= 0 ? "green" : "red";
        const html = `
          <li>
            <span class="symbol">${symbol}</span>
            <span class="change" style="color: ${changeColor}">${changePercent}</span>
          </li>`;

        stockList.innerHTML = html;
      } else {
        stockList.innerHTML = '<li class="error">Invalid Symbol</li>';
      }
    })
    .catch((error) => console.error(error));
}

fetchTopStocks();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const symbol = symbolInput.value.toUpperCase();

  fetchStockData(symbol);
});
