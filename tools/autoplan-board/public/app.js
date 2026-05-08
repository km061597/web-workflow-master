const detailButtons = [...document.querySelectorAll(".card-toggle")];

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
