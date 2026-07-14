(() => {
  "use strict";

  const C = window.PORTFOLIO_CONTENT;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  /* =============================
     WORK DROPDOWN
  ============================== */
  const trigger = $("#workTrigger");
  const dropdown = $("#workDropdown");
  const menu = trigger.closest(".work-menu");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", String(open));
  }

  trigger.addEventListener("click", event => {
    event.stopPropagation();
    setMenu(!menu.classList.contains("open"));
  });

  menu.addEventListener("mouseenter", () => setMenu(true));
  menu.addEventListener("mouseleave", () => setMenu(false));
  dropdown.addEventListener("click", () => setMenu(false));
  document.addEventListener("click", event => {
    if (!menu.contains(event.target)) setMenu(false);
  });

  /* =============================
     COVER: 1~6
  ============================== */
  let coverIndex = 0;
  const keys = $("#coverKeys");

  C.coverPages.forEach((page, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cover-key";
    button.setAttribute("aria-label", `${index + 1}번 ${page.title}`);
    button.addEventListener("click", () => selectCover(index));
    keys.appendChild(button);
  });

  function selectCover(index) {
    coverIndex = index;
    const page = C.coverPages[index];

    $("#coverCount").textContent = `${String(index + 1).padStart(2, "0")} / 06`;
    $("#coverTitle").textContent = page.title;
    $("#coverDescription").textContent = page.description;

    $$(".cover-key").forEach((button, i) => {
      button.classList.toggle("active", i === index);
    });
  }

  $("#coverPlay").addEventListener("click", () => {
    const target = C.coverPages[coverIndex].target;
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  selectCover(0);

  /* =============================
     POSTERS
  ============================== */
  const grid = $("#posterGrid");

  C.posters.forEach((poster, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "poster-card";
    button.innerHTML = `
      <img src="${poster.image}" alt="${poster.title}">
      <span>0${index + 1}</span>
    `;
    button.addEventListener("click", () => openPoster(index));
    grid.appendChild(button);
  });

  function openPoster(index) {
    const poster = C.posters[index];

    $("#posterModalImage").src = poster.image;
    $("#posterModalImage").alt = poster.title;
    $("#posterModalCopy").innerHTML = `
      <small>POSTER 0${index + 1}</small>
      <h2>${poster.title}</h2>
      <h3>${poster.subtitle}</h3>
      <p>${poster.description}</p>
      <dl>
        <div><dt>YEAR</dt><dd>${poster.year}</dd></div>
        <div><dt>ROLE</dt><dd>${poster.role}</dd></div>
      </dl>
    `;

    $("#posterModal").hidden = false;
    document.body.classList.add("modal-open");
  }

  function closePoster() {
    $("#posterModal").hidden = true;
    document.body.classList.remove("modal-open");
  }

  $$('[data-close-modal]').forEach(element => {
    element.addEventListener("click", closePoster);
  });

  /* =============================
     VIDEOS
  ============================== */
  const thumbs = $("#videoThumbs");
  const youtubeUrl = id => `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1`;

  C.videos.forEach((video, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "video-thumb";
    button.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title} 썸네일">
      <span><b>0${index + 1} ${video.title}</b><small>${video.duration}</small></span>
    `;

    const image = button.querySelector("img");
    image.addEventListener("error", () => {
      image.src = video.fallback;
    }, { once: true });

    button.addEventListener("click", () => selectVideo(index));
    thumbs.appendChild(button);
  });

  function selectVideo(index) {
    const video = C.videos[index];

    $("#youtubePlayer").src = youtubeUrl(video.youtubeId);
    $("#videoDescription").innerHTML = `
      <small>SELECTED FILM 0${index + 1}</small>
      <h2>${video.title}</h2>
      <div class="video-meta">
        <span>${video.category}</span>
        <span>${video.year}</span>
        <span>${video.duration}</span>
      </div>
      <p>${video.description}</p>
      <hr>
      <h3>ROLE</h3>
      <p>${video.role}</p>
    `;

    $$(".video-thumb").forEach((button, i) => {
      button.classList.toggle("active", i === index);
    });
  }

  selectVideo(0);

  /* =============================
     CONTACT FORM: MAILTO
     수정 위치: js/content.js > contactEmail
  ============================== */
  $("#contactForm").addEventListener("submit", event => {
    event.preventDefault();

    const recipient = C.contactEmail.trim();
    if (!recipient || recipient.includes("YOUR_EMAIL_HERE")) {
      $("#formStatus").textContent = "js/content.js의 contactEmail에 받을 메일 주소를 입력해주세요.";
      return;
    }

    const name = $("#contactName").value.trim();
    const email = $("#contactEmail").value.trim();
    const message = $("#contactMessage").value.trim();

    const subject = encodeURIComponent(`[PORTFOLIO MEMO] ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    $("#formStatus").textContent = "메일 앱을 열었습니다.";
  });

  /* =============================
     ACTIVE NAVIGATION
  ============================== */
  const sections = $$(".section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      $$('[data-nav]').forEach(link => {
        link.classList.toggle("active", link.dataset.nav === id);
      });
      trigger.classList.toggle("active", ["web", "poster", "detailed-page", "video"].includes(id));
    });
  }, { threshold: 0.55 });

  sections.forEach(section => observer.observe(section));

  /* =============================
     FULLPAGE: ONE WHEEL = ONE PAGE
  ============================== */
  let pageIndex = 0;
  let moving = false;
  let wheelSum = 0;
  let wheelTimer;

  const fullpageEnabled = () => window.innerWidth > 1100 && window.innerHeight >= 720;

  function syncPageIndex() {
    let bestIndex = 0;
    let bestDistance = Infinity;

    sections.forEach((section, index) => {
      const distance = Math.abs(section.getBoundingClientRect().top);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    pageIndex = bestIndex;
  }

  function goToPage(index) {
    const nextIndex = Math.max(0, Math.min(index, sections.length - 1));
    if (moving || nextIndex === pageIndex) return;

    moving = true;
    pageIndex = nextIndex;
    sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      moving = false;
      wheelSum = 0;
    }, 900);
  }

  window.addEventListener("wheel", event => {
    if (!fullpageEnabled() || document.body.classList.contains("modal-open")) return;

    event.preventDefault();
    if (moving) return;

    wheelSum += event.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => { wheelSum = 0; }, 180);

    if (Math.abs(wheelSum) < 55) return;

    syncPageIndex();
    goToPage(pageIndex + (wheelSum > 0 ? 1 : -1));
  }, { passive: false });

  window.addEventListener("load", syncPageIndex);
  window.addEventListener("resize", syncPageIndex);
})();
