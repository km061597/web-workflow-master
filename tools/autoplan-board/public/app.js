const detailButtons = [...document.querySelectorAll(".card-toggle")];
const token = document.querySelector('meta[name="autoplan-token"]')?.content ?? "";
const brokerOutput = document.querySelector(".broker-output");

for (const button of detailButtons) {
  const detail = document.getElementById(button.getAttribute("aria-controls"));
  if (!detail) continue;

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    detail.hidden = expanded;
  });

  button.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = detailButtons.indexOf(button);
    const next =
      event.key === "Home"
        ? detailButtons[0]
        : event.key === "End"
          ? detailButtons.at(-1)
          : event.key === "ArrowDown"
            ? detailButtons[index + 1]
            : detailButtons[index - 1];
    next?.focus();
  });
}

for (const button of document.querySelectorAll(".broker-action")) {
  button.addEventListener("click", async () => {
    const action = button.getAttribute("data-broker-action");
    if (!action || !token) return;
    button.disabled = true;
    if (brokerOutput) brokerOutput.textContent = `${action}: running`;
    try {
      const response = await fetch("/api/broker", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-autoplan-token": token,
        },
        body: JSON.stringify({ action, args: [] }),
      });
      const json = await response.json();
      if (brokerOutput) {
        brokerOutput.textContent = json.ok
          ? `${action}: ${json.job?.status ?? "accepted"}`
          : `${action}: ${json.error ?? "failed"}`;
      }
    } catch (error) {
      if (brokerOutput) brokerOutput.textContent = `${action}: ${error.message}`;
    } finally {
      button.disabled = false;
    }
  });
}
