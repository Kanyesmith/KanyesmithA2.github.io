const menuNavigation = document.querySelector(".menu-nav");

if (menuNavigation && "IntersectionObserver" in window) {
  const sectionLinks = [...menuNavigation.querySelectorAll('a[href^="#"]')]
    .map((link) => ({
      link,
      section: document.getElementById(decodeURIComponent(link.hash.slice(1))),
    }))
    .filter(({ section }) => section);

  const observer = new IntersectionObserver((entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visibleSections.length === 0) return;

    const currentSectionId = visibleSections[0].target.id;
    for (const { link, section } of sectionLinks) {
      if (section.id === currentSectionId) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }, {
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  });

  for (const { section } of sectionLinks) {
    observer.observe(section);
  }
}
