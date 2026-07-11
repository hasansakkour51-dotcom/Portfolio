function loadComponent(id, url, name, callback, call, call2, call3) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
      if (call) call();
      if (call2) call2();
      if (call3) call3();
    });
}

// HERO
loadComponent(
  "hero",
  "../Components/hero/html/hero.html",
  "hero",
  () => {
    new Typed(".text", {
      strings: ["Frontend Developer", "Web Designer", "UI/UX Designer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  }
);

// HEADER
loadComponent("header", "../Components/header/html/header.html", "header");

// ABOUT
loadComponent("about", "../Components/aboutUs/html/aboutUs.html", "about");

// SERVICES
loadComponent("services", "../Components/services/html/services.html", "services");

// SKILLS
loadComponent(
  "skills",
  "../Components/skills/html/skills.html",
  "skills",
  () => {
    const circles = document.querySelectorAll(".outer-circle");
    const circlePercents = document.querySelectorAll(".percent");

    const lines = document.querySelectorAll(".line-fill");
    const linePercents = document.querySelectorAll(".line-percent");

    let animated = false;

    const startAnimation = () => {
      if (animated) return;
      animated = true;

      // CIRCLES
      circles.forEach((circle, index) => {
        const value = parseInt(circle.getAttribute("data-value"));
        let start = 0;

        const animate = setInterval(() => {
          start++;

          const angle = (start / 100) * 360;
          circle.style.background = `conic-gradient(#0ef ${angle}deg, #b400ff ${angle}deg, #081b29 0deg)`;

          circlePercents[index].textContent = start + "%";

          if (start >= value) clearInterval(animate);
        }, 15);
      });

      // LINES
      lines.forEach((line, index) => {
        const value = parseInt(line.getAttribute("data-value"));
        let start = 0;

        const animate = setInterval(() => {
          start++;

          line.style.width = start + "%";
          linePercents[index].textContent = start + "%";

          if (start >= value) clearInterval(animate);
        }, 15);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) startAnimation();
      },
      { threshold: 0.4 }
    );

    observer.observe(document.querySelector("#skills"));
  }
);

// PROJECTS
loadComponent(
  "latestProject",
  "../Components/latestProject/html/latestProject.html",
  "latestProject"
);

// CONTACT
loadComponent(
  "contact",
  "../Components/contactUs/html/contactUs.html",
  "contact"
);

// FOOTER + ACTIVE NAV
loadComponent(
  "footer",
  "../Components/footer/html/footer.html",
  "footer",
  () => {
    initActiveNav();
  }
);

// ACTIVE NAVIGATION FUNCTION
function initActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}
