function initHomeRevealEffects() {
  const revealTargets = Array.from(document.querySelectorAll(".reveal-on-scroll"));
  if (!revealTargets.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    revealTargets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    return;
  }

  revealTargets.forEach(function (target, index) {
    target.style.setProperty("--reveal-delay", `${Math.min(index * 60, 360)}ms`);
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  revealTargets.forEach(function (target) {
    observer.observe(target);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initHomeRevealEffects();
});
