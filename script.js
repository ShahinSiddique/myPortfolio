"use strict";


/* ================= ELEMENTS ================= */

const body =
  document.body;

const themeToggle =
  document.getElementById("theme-toggle");

const menuToggle =
  document.getElementById("menu-toggle");

const menuIcon =
  menuToggle.querySelector("i");

const navMenu =
  document.getElementById("nav-menu");

const navLinks =
  document.querySelectorAll(".nav-link");

const sections =
  document.querySelectorAll("main section[id]");

const typingText =
  document.getElementById("typing-text");

const contactForm =
  document.getElementById("contact-form");

const formMessage =
  document.getElementById("form-message");

const scrollTopButton =
  document.getElementById("scroll-top");

const currentYear =
  document.getElementById("current-year");


/* ================= CURRENT YEAR ================= */

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/* ================= TYPING EFFECT ================= */

const roles = [
  "Full Stack Developer",
  "API Developer",
  "AI Agent Builder"
];

let roleIndex = 0;
let letterIndex = 0;
let deleting = false;


function runTypingEffect() {
  if (!typingText) {
    return;
  }

  const currentRole =
    roles[roleIndex];


  if (!deleting) {
    typingText.textContent =
      currentRole.substring(
        0,
        letterIndex + 1
      );

    letterIndex += 1;


    if (letterIndex === currentRole.length) {
      deleting = true;

      setTimeout(
        runTypingEffect,
        1500
      );

      return;
    }
  } else {
    typingText.textContent =
      currentRole.substring(
        0,
        letterIndex - 1
      );

    letterIndex -= 1;


    if (letterIndex === 0) {
      deleting = false;

      roleIndex =
        (roleIndex + 1) % roles.length;
    }
  }


  const typingSpeed =
    deleting ? 55 : 95;


  setTimeout(
    runTypingEffect,
    typingSpeed
  );
}


runTypingEffect();


/* ================= DAY AND DARK MODE ================= */

const savedTheme =
  localStorage.getItem("portfolio-theme");


function updateThemeButton() {
  const dayModeActive =
    body.classList.contains("light-mode");


  if (dayModeActive) {
    themeToggle.textContent =
      "Dark Mode";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );
  } else {
    themeToggle.textContent =
      "Day Mode";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to day mode"
    );
  }
}


/* Load saved mode */

if (savedTheme === "light") {
  body.classList.add("light-mode");
} else {
  body.classList.remove("light-mode");
}

updateThemeButton();


/* Change mode */

themeToggle.addEventListener(
  "click",
  function () {
    body.classList.toggle("light-mode");

    const dayModeActive =
      body.classList.contains("light-mode");


    if (dayModeActive) {
      localStorage.setItem(
        "portfolio-theme",
        "light"
      );
    } else {
      localStorage.setItem(
        "portfolio-theme",
        "dark"
      );
    }


    updateThemeButton();
  }
);


/* ================= MOBILE MENU ================= */

menuToggle.addEventListener(
  "click",
  function () {
    navMenu.classList.toggle("show");
    body.classList.toggle("menu-open");

    const menuOpen =
      navMenu.classList.contains("show");


    if (menuOpen) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");

      menuToggle.setAttribute(
        "aria-label",
        "Close menu"
      );
    } else {
      closeMobileMenu();
    }
  }
);


function closeMobileMenu() {
  navMenu.classList.remove("show");
  body.classList.remove("menu-open");

  menuIcon.classList.remove("fa-xmark");
  menuIcon.classList.add("fa-bars");

  menuToggle.setAttribute(
    "aria-label",
    "Open menu"
  );
}


navLinks.forEach(function (link) {
  link.addEventListener(
    "click",
    closeMobileMenu
  );
});


window.addEventListener(
  "resize",
  function () {
    if (window.innerWidth > 820) {
      closeMobileMenu();
    }
  }
);


/* ================= ACTIVE NAVIGATION ================= */

function updateActiveNavigation() {
  let currentSection =
    "home";


  sections.forEach(function (section) {
    const sectionTop =
      section.offsetTop - 170;

    const sectionHeight =
      section.offsetHeight;


    if (
      window.scrollY >= sectionTop &&
      window.scrollY <
        sectionTop + sectionHeight
    ) {
      currentSection =
        section.getAttribute("id");
    }
  });


  navLinks.forEach(function (link) {
    link.classList.remove("active");


    if (
      link.getAttribute("href") ===
      `#${currentSection}`
    ) {
      link.classList.add("active");
    }
  });
}


/* ================= SCROLL ================= */

function handleScroll() {
  updateActiveNavigation();


  if (window.scrollY > 500) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }
}


window.addEventListener(
  "scroll",
  handleScroll
);


scrollTopButton.addEventListener(
  "click",
  function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);


/* ================= CONTACT FORM ================= */

contactForm.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();


    const name =
      document
        .getElementById("name")
        .value
        .trim();

    const email =
      document
        .getElementById("email")
        .value
        .trim();

    const subject =
      document
        .getElementById("subject")
        .value
        .trim();

    const message =
      document
        .getElementById("message")
        .value
        .trim();


    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      formMessage.textContent =
        "Please complete all fields.";

      return;
    }


    const emailSubject =
      encodeURIComponent(
        `${subject} - Portfolio message from ${name}`
      );


    const emailBody =
      encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
      );


    const mailtoLink =
      `mailto:Shahinsiddique00@gmail.com` +
      `?subject=${emailSubject}` +
      `&body=${emailBody}`;


    formMessage.textContent =
      "Opening your email application...";


    window.location.href =
      mailtoLink;


    setTimeout(
      function () {
        contactForm.reset();

        formMessage.textContent =
          "Your email application should now be open.";
      },
      800
    );
  }
);


/* ================= INITIAL RUN ================= */

handleScroll();