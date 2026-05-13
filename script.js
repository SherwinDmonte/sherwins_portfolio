
const EMAILJS_PUBLIC_KEY  = "a8aLw_J0ZINiMcdMR";  
const EMAILJS_SERVICE_ID  = "service_7k75vac";   
const EMAILJS_TEMPLATE_ID = "template_0fzq009"; 

/* ===== DOM READY ===== */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initAOS();
  initTyped();
  initNavbar();
  initParticles();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  emailjs.init(EMAILJS_PUBLIC_KEY);
});

/* ─────────────────────────────────────────────
   LOADER
───────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 800);
  });
  document.body.style.overflow = "hidden";
}

/* ─────────────────────────────────────────────
   AOS – SCROLL ANIMATIONS
───────────────────────────────────────────── */
function initAOS() {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
  });
}

/* ─────────────────────────────────────────────
   TYPED.JS – TYPING EFFECT
───────────────────────────────────────────── */
function initTyped() {
  const el = document.getElementById("typed-text");
  if (!el) return;
  new Typed(el, {
    strings: [
      "Software Developer",
      "Full Stack Developer",
      "Computer Engineering Student",
      "Problem Solver",
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: false,
  });
}

/* ─────────────────────────────────────────────
   NAVBAR – STICKY + ACTIVE LINKS
───────────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById("mainNav");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  const onScroll = () => {
    // Scrolled class
    nav.classList.toggle("scrolled", window.scrollY > 60);

    // Active nav link via IntersectionObserver fallback
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Close mobile menu on link click
  links.forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = document.getElementById("navMenu");
      if (collapse.classList.contains("show")) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    });
  });
}

/* ─────────────────────────────────────────────
   PARTICLE BACKGROUND
───────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles;

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    particles = Array.from({ length: 70 }, () => createParticle());
  };

  const createParticle = () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.1,
  });

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      // Move
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 204, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 204, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  resize();
  draw();
}

/* ─────────────────────────────────────────────
   ANIMATED SKILL BARS
───────────────────────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-progress .progress-bar");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width || "0";
          bar.style.width = width + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTERS
───────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current);
    }, 16);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ─────────────────────────────────────────────
   EMAILJS CONTACT FORM
───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic validation
    const fields = ["name", "email", "subject", "message"];
    let valid = true;

    fields.forEach((id) => {
      const el = document.getElementById(id);
      const val = el.value.trim();
      if (!val) {
        el.style.borderColor = "#ff4757";
        valid = false;
      } else {
        el.style.borderColor = "";
      }
    });

    // Email format check
    const emailEl = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailEl.value && !emailRegex.test(emailEl.value)) {
      emailEl.style.borderColor = "#ff4757";
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (!valid) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Toggle loading state
    const btn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");
    const btnLoader = document.getElementById("btnLoader");
    btn.disabled = true;
    btnText.classList.add("d-none");
    btnLoader.classList.remove("d-none");

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      showToast("Message sent successfully! I'll get back to you soon. 🚀", "success");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      showToast("Something went wrong. Please try again or email me directly.", "error");
    } finally {
      btn.disabled = false;
      btnText.classList.remove("d-none");
      btnLoader.classList.add("d-none");
    }
  });

  // Clear error state on input
  form.querySelectorAll(".custom-input").forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
    });
  });
}

/* ─────────────────────────────────────────────
   TOAST NOTIFICATIONS
───────────────────────────────────────────── */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const id = "toast-" + Date.now();

  const icon =
    type === "success"
      ? '<i class="fas fa-check-circle toast-icon"></i>'
      : '<i class="fas fa-exclamation-circle toast-icon"></i>';

  const html = `
    <div id="${id}" class="toast custom-toast toast-${type} align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex align-items-center p-3 gap-2">
        ${icon}
        <div class="toast-body flex-grow-1" style="font-size:0.875rem; color:var(--text);">${message}</div>
        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", html);
  const toastEl = document.getElementById(id);
  const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
  toast.show();
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

/* ─────────────────────────────────────────────
   BACK TO TOP BUTTON
───────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("visible", window.scrollY > 400),
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ─────────────────────────────────────────────
   SMOOTH SCROLL (for older browsers)
───────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}
