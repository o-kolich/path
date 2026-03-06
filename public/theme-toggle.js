(function () {
  const root = document.documentElement;
  const btn = document.querySelector("[data-mode-toggle]");
  const storageKey = "theme-preference";

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      return;
    }
    root.removeAttribute("data-theme");
  };

  const preferred = localStorage.getItem(storageKey);
  if (preferred) {
    applyTheme(preferred);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  if (!btn) return;

  btn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(storageKey, next);
  });
})();
