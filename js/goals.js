document.addEventListener("DOMContentLoaded", () => {
  const goalBtn = document.getElementById("calculateGoal");
  const retireBtn = document.getElementById("calculateRetirement");

  if (goalBtn) {
    goalBtn.addEventListener("click", () => {
      const goalAmount = parseFloat(
        document.getElementById("goalAmount").value
      );
      const monthlySavings = parseFloat(
        document.getElementById("monthlySavings").value
      );

      if (!goalAmount || !monthlySavings || monthlySavings <= 0) {
        document.getElementById("goalResult").innerText =
          "Please enter valid numbers.";
        return;
      }

      const monthsNeeded = Math.ceil(goalAmount / monthlySavings);
      const years = Math.floor(monthsNeeded / 12);
      const months = monthsNeeded % 12;

      document.getElementById(
        "goalResult"
      ).innerText = `You need approximately ${years} years and ${months} months to reach your goal.`;
    });
  }

  if (retireBtn) {
    retireBtn.addEventListener("click", () => {
      const currentAge = parseInt(document.getElementById("currentAge").value);
      const retireAge = parseInt(document.getElementById("retireAge").value);
      const monthlySave = parseFloat(
        document.getElementById("monthlyRetireSavings").value
      );
      const annualReturn = 0.05; // 5% giả định

      if (
        !currentAge ||
        !retireAge ||
        !monthlySave ||
        retireAge <= currentAge
      ) {
        document.getElementById("retireResult").innerText =
          "Please enter valid retirement data.";
        return;
      }

      const months = (retireAge - currentAge) * 12;
      let futureValue = 0;

      for (let i = 0; i < months; i++) {
        futureValue = (futureValue + monthlySave) * (1 + annualReturn / 12);
      }

      document.getElementById(
        "retireResult"
      ).innerText = `You will save approximately $${futureValue.toLocaleString(
        undefined,
        { maximumFractionDigits: 0 }
      )} by age ${retireAge}.`;
    });
  }
});
