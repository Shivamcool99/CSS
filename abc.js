document.addEventListener("DOMContentLoaded", function () {
    fetchData(); // Initial data fetch
  });
  
  async function fetchData() {
    try {
      const stocksData = await getStocksData();
      renderChart(stocksData);
      renderStockList(stocksData);
      renderStockDetails(stocksData[0]); // Assuming the first stock is selected initially
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  async function getStocksData() {
    try {
      const Stocks = [
        "AAPL",
        "MSFT",
        "GOOGL",
        "AMZN",
        "PYPL",
        "TSLA",
        "JPM",
        "NVDA",
        "NFLX",
        "DIS",
      ];
  
      const chartApiUrl = "https://stocks3.onrender.com/api/stocks/getstocksdata";
      const profileApiUrl =
        "https://stocks3.onrender.com/api/stocks/getstocksprofiledata";
      const statsApiUrl =
        "https://stocks3.onrender.com/api/stocks/getstockstatsdata";
  
      const stockPromises = Stocks.map(async (stock) => {
        // Fetch chart data
        const chartResponse = await fetch(`${chartApiUrl}`);
        const chartData1 = await chartResponse.json();
        const chartData = chartData1.stocksData[0].AAPL["5y"];
        //   console.log(chartData1.stocksData[0].AAPL["5y"]);
  
        // Fetch stock profile data
        const profileResponse = await fetch(`${profileApiUrl}`);
        const profileData1 = await profileResponse.json();
        const profileData = profileData1.stocksProfileData[0][stock];
        //   console.log(profileData);
  
        // Fetch stock stats data
        const statsResponse = await fetch(`${statsApiUrl}`);
        const statsData1 = await statsResponse.json();
        const statsData = statsData1.stocksStatsData[0][stock];
        // console.log(statsData);
  
        return {
          name: stock,
          chartData,
          bookValue: statsData.bookValue,
          profit: statsData.profit,
          summary: profileData.summary,
        };
      });
  
      // Wait for all stock promises to resolve
      return Promise.all(stockPromises);
    } catch (error) {
      throw new Error("Error fetching stocks data: " + error.message);
    }
  }
  
  function renderChart(stocksData) {
    const chartSection = document.getElementById("chart-section");
    chartSection.innerHTML = ""; // Clear previous chart
  
    const canvas = document.createElement("canvas");
    canvas.id = "stockChart";
    chartSection.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
  
    //   console.log(JSON.stringify(stocksData[0]));
  
    // Assuming that each stock has an array named 'chartData'
    const datasets = stocksData.map((stockData) => {
      // console.log(stockData);
      const stockName = stockData.name; // Extract stock name (e.g., "AAPL")
      // const stock = stockData[stockName];
      // console.log(stockName);
  
      const chartData = stockData.chartData;
  
      return {
        label: stockName,
        borderColor: getRandomColor(),
        data: chartData,
        fill: false,
      };
    });
  
    const labels =
      stocksData[0]?.chartData?.value.map((_, index) =>
        new Date(
          stocksData[0].chartData.timeStamp[index] * 1000
        ).toLocaleDateString()
      ) || [];
  
      console.log(labels);
  
  //   console.log(datasets);
  
    const data = [];
    datasets.forEach((dataset) => {
      data.push({
        data: [...dataset.data.value],
        borderColor: dataset.borderColor,
        fill: dataset.fill,
      });
    });
  
    const chartData = {
      labels,
      datasets: data,
    };
  
    //   console.log(chartData);
  
    new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets,
      },
      options: {
          legend: {display: false},
      },
    });
  }
  
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function renderStockList(stocksData) {
    const listSection = document.getElementById("list-section");
    const stockList = document.createElement("ul");
  
    stocksData.forEach((stock) => {
      const listItem = document.createElement("li");
      listItem.textContent = stock.name;
      listItem.addEventListener("click", () => handleStockClick(stock));
      stockList.appendChild(listItem);
    });
  
    listSection.innerHTML = ""; // Clear previous content
    listSection.appendChild(stockList);
  }
  
  function renderStockDetails(selectedStock) {
    const detailsSection = document.getElementById("details-section");
  
    const detailsContent = document.createElement("div");
    detailsContent.innerHTML = `
          <h3>${selectedStock.name}</h3>
          <p>Book Value: $${selectedStock.bookValue}</p>
          <p>Profit: <span style="color: ${
            selectedStock.profit > 0 ? "green" : "red"
          };">$${selectedStock.profit}</span></p>
          <p>${selectedStock.summary}</p>
        `;
  
    detailsSection.innerHTML = ""; // Clear previous content
    detailsSection.appendChild(detailsContent);
  }
  
  function handleStockClick(selectedStock) {
    // Handle stock click event
    const chartData = selectedStock.chartData;
  
    if (!chartData || !chartData.value || !chartData.timeStamp) {
      console.error("Invalid chart data format");
      return;
    }
  
    // Assuming that each stock has an array named 'chartData'
    const datasets = [
      {
        label: selectedStock.name,
        borderColor: getRandomColor(),
        data: chartData.value,
        fill: false,
      },
    ];
  
    const labels = chartData.timeStamp.map((timestamp) =>
      new Date(timestamp * 1000).toLocaleDateString()
    );
  
    const chartSection = document.getElementById("chart-section");
    chartSection.innerHTML = ""; // Clear previous chart
  
    const canvas = document.createElement("canvas");
    canvas.id = "stockChart";
    chartSection.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
  
    const chartDataConfig = {
      labels,
      datasets,
    };
  
    new Chart(ctx, {
      type: "line",
      data: chartDataConfig,
      options: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Price",
              },
            },
          ],
        },
      },
    });
  
    renderStockDetails(selectedStock);
  }
  