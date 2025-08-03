const incomeInput = document.getElementById("income");
const investInput = document.getElementById("invest");
const educationInput = document.getElementById("education");
const entertainmentInput = document.getElementById("entertainment");
const foodInput = document.getElementById("food");
const livingInput = document.getElementById("living");

const autoBtn = document.getElementById("autoDistribute");
const updateBtn = document.getElementById("updateChart");
const totalSpending = document.getElementById("total-spending");

const ctx = document.getElementById("budgetChart").getContext("2d");

let chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [
      "Investment",
      "Education",
      "Entertainment",
      "Food & Drink",
      "Living",
    ],
    datasets: [
      {
        data: [20, 5, 10, 15, 50],
        backgroundColor: [
          "#D6EAF8", // Xanh pastel rất nhạt
          "#2471A3", // Xanh đậm hơn (Steel Blue)
          "#2980B9", // Xanh biển đậm
          "#5DADE2", // Xanh dương nhạt hơn
          "#3498DB", // Xanh dương chuẩn
        ],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const income = parseFloat(incomeInput.value || 0);
            const percent = context.raw;
            const amount = ((percent / 100) * income).toFixed(2);
            return `${context.label}: $${amount}`;
          },
        },
      },
    },
  },
});

// Lấy tổng phần trăm hiện tại
function getTotalPercent() {
  return (
    parseFloat(investInput.value || 0) +
    parseFloat(educationInput.value || 0) +
    parseFloat(entertainmentInput.value || 0) +
    parseFloat(foodInput.value || 0) +
    parseFloat(livingInput.value || 0)
  );
}

// Tự động phân phối lại phần trăm dựa theo mặc định
function autoDistribute() {
  investInput.value = 20;
  educationInput.value = 5;
  entertainmentInput.value = 10;
  foodInput.value = 15;
  livingInput.value = 50;
  updateChart();
}

// Cập nhật biểu đồ và hiển thị số tiền chi tiêu
function updateChart() {
  const income = parseFloat(incomeInput.value);
  if (isNaN(income) || income <= 0) {
    alert("Please enter a valid income amount.");
    return;
  }

  const total = getTotalPercent();
  if (total !== 100) {
    alert("Total percentage must equal 100%.");
    return;
  }

  const values = [
    parseFloat(investInput.value),
    parseFloat(educationInput.value),
    parseFloat(entertainmentInput.value),
    parseFloat(foodInput.value),
    parseFloat(livingInput.value),
  ];

  chart.data.datasets[0].data = values;
  chart.update();

  // Tính và hiển thị số tiền theo từng khoản
  const labels = [
    "Investment",
    "Education",
    "Entertainment",
    "Food & Drink",
    "Living",
  ];
  const spendingDetails = values
    .map((percent, i) => {
      const amount = (percent / 100) * income;
      return `${labels[i]}: $${amount.toFixed(2)} (${percent}%)`;
    })
    .join("<br>");

  totalSpending.innerHTML = `<h3>Estimated Spending</h3>${spendingDetails}`;
}

// Gắn sự kiện nút
autoBtn.addEventListener("click", autoDistribute);
updateBtn.addEventListener("click", updateChart);

