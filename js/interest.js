// Phần tính lãi suất
const calculateBtn = document.getElementById("calculateInterest");
const interestResult = document.getElementById("interestResult");

calculateBtn?.addEventListener("click", () => {
  const principal = parseFloat(document.getElementById("principal").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const years = parseFloat(document.getElementById("years").value);

  if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
    interestResult.innerHTML =
      "❌ Please fill in all fields with valid numbers.";
    return;
  }

  const total = principal * Math.pow(1 + rate, years);
  const interest = total - principal;

  interestResult.innerHTML = `
    ✅ Total after ${years} years: <strong>$${total.toFixed(2)}</strong><br/>
    📈 Total interest earned: <strong>$${interest.toFixed(2)}</strong>
  `;
});

// Phần so sánh các mức lãi suất
const compareBtn = document.getElementById("compareRates");
const compareResult = document.getElementById("compareResult");

compareBtn?.addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("comparePrincipal").value);
  const years = parseFloat(document.getElementById("compareYears").value);
  const ratesStr = document.getElementById("rates").value;

  if (isNaN(amount) || isNaN(years) || ratesStr.trim() === "") {
    compareResult.innerHTML =
      "<li>❌ Please fill in all fields correctly.</li>";
    return;
  }

  const rates = ratesStr
    .split(",")
    .map((r) => parseFloat(r.trim()) / 100)
    .filter((r) => !isNaN(r));

  if (rates.length === 0) {
    compareResult.innerHTML = "<li>❌ No valid interest rates provided.</li>";
    return;
  }

  compareResult.innerHTML = "";
  rates.forEach((rate, index) => {
    const final = amount * Math.pow(1 + rate, years);
    const li = document.createElement("li");
    li.textContent = `Rate ${rate * 100}% → $${final.toFixed(2)}`;
    compareResult.appendChild(li);
  });
});
