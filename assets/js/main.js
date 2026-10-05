/* =============================================================
       EDIT EVERYTHING HERE — the page builds itself from this data
    ============================================================= */
    const SITE = {
      firstName: "Your",
      lastName: "Name",
      lab: "Fab Lab Barcelona",
      year: 2026
    };

    const FINAL_PROJECT = {
      name: "Project codename",
      lede: "One sentence on what it is and who it's for.",
      idea: "Describe the problem, what you're building, and why. Update this as the project evolves through the weeks.",
      video: "", // e.g. "video/final.mp4"
      progress: [
        ["Sketch & concept", "done"],
        ["CAD model", "in progress"],
        ["Electronics", "planned"],
        ["Fabrication", "planned"],
        ["Integration", "planned"]
      ]
    };

    // status: "done" or "pending". Leave img empty until you have a photo.
    const WEEKS = [
      { num: "01", date: "Jan 21 – Jan 27", title: "Principles and Practices", status: "done", img: "",
        summary: "<p>Set up my Git repository, learned the Fab Academy workflow and built this website from scratch with plain HTML, CSS and JavaScript.</p><p>Sketched a first idea for my final project.</p>",
        tools: ["Git", "HTML", "CSS", "VS Code"],
        reflection: "Write honestly about how the week felt: what clicked, what fought back.",
        learnings: ["Commit small and often", "Compress images before pushing", "Documentation is part of the work"],
        meta: { Time: "~12 h", Machines: "—", Materials: "—" } },
      { num: "02", date: "Jan 28 – Feb 03", title: "Computer-Aided Design", status: "done", img: "" },
      { num: "03", date: "Feb 04 – Feb 10", title: "Computer-Controlled Cutting", img: "" },
      { num: "04", date: "Feb 11 – Feb 17", title: "Embedded Programming", img: "" },
      { num: "05", date: "Feb 18 – Feb 24", title: "3D Scanning and Printing", img: "" },
      { num: "06", date: "Feb 25 – Mar 03", title: "Electronics Design", img: "" },
      { num: "07", date: "Mar 04 – Mar 10", title: "Computer-Controlled Machining", img: "" },
      { num: "08", date: "Mar 11 – Mar 17", title: "Electronics Production", img: "" },
      { num: "09", date: "Mar 18 – Mar 24", title: "Input Devices", img: "" },
      { num: "10", date: "Mar 25 – Mar 31", title: "Output Devices", img: "" },
      { num: "11", date: "Apr 01 – Apr 07", title: "Networking and Communications", img: "" },
      { num: "12", date: "Apr 08 – Apr 14", title: "Mechanical and Machine Design", img: "" },
      { num: "14", date: "Apr 22 – Apr 28", title: "Molding and Casting", img: "" },
      { num: "15", date: "Apr 29 – May 05", title: "Interface and Application Programming", img: "" },
      { num: "16", date: "May 06 – May 12", title: "System Integration", img: "" },
      { num: "17", date: "May 13 – May 19", title: "Wildcard Week", img: "" },
      { num: "18", date: "May 20 – May 26", title: "Applications and Implications", img: "" },
      { num: "19", date: "May 27 – Jun 02", title: "Invention and Intellectual Property", img: "" },
      { num: "20", date: "Jun 03 – Jun 09", title: "Final Project Requirements", img: "" }
    ];

    /* ============================================================= */
    const $ = (id) => document.getElementById(id);
    const pageFor = (w) => w.page || `assignments/week${w.num}.html`;

    // media block: hatched placeholder, image on top if it loads
    function fillMedia(el, src, isVideo) {
      el.querySelectorAll("img,video").forEach((n) => n.remove());
      if (!src) return;
      const node = document.createElement(isVideo ? "video" : "img");
      node.src = src;
      if (isVideo) { node.controls = true; node.playsInline = true; }
      else { node.alt = ""; node.loading = "lazy"; }
      node.onerror = () => node.remove();
      el.appendChild(node);
    }

    // --- site text
    $("first-name").textContent = SITE.firstName;
    $("last-name").textContent = SITE.lastName;
    $("lab").textContent = SITE.lab;
    $("year").textContent = SITE.year;
    $("foot-name").textContent = `${SITE.firstName} ${SITE.lastName} · ${SITE.lab} · ${SITE.year}`;
    document.title = `Fab Academy ${SITE.year} · ${SITE.firstName} ${SITE.lastName}`;
    const doneCount = WEEKS.filter((w) => w.status === "done").length;
    $("log-count").textContent = `${doneCount} of ${WEEKS.length} weeks documented`;

    // --- cards
    const track = $("track");
    WEEKS.forEach((w, i) => {
      const card = document.createElement("button");
      card.className = "card";
      card.setAttribute("aria-label", `Week ${w.num}: ${w.title}`);
      card.innerHTML = `
        <span class="hole a"></span><span class="hole b"></span>
        <div class="card-top"><span>Week</span><span>${w.date}</span></div>
        <div class="card-num">${w.num}</div>
        <div class="card-title">${w.title}</div>
        <div class="media" data-label="No photo yet"></div>
        <div class="card-foot">
          <span class="status ${w.status === "done" ? "done" : ""}"><i></i>${w.status === "done" ? "Documented" : "In progress"}</span>
          <span>Read log</span>
        </div>`;
      fillMedia(card.querySelector(".media"), w.img);
      card.addEventListener("click", () => openDetails(i));
      track.appendChild(card);
    });

    // --- carousel nav + progress
    const step = () => track.querySelector(".card").offsetWidth + 20;
    $("prev").onclick = () => track.scrollBy({ left: -step() * 2, behavior: "smooth" });
    $("next").onclick = () => track.scrollBy({ left: step() * 2, behavior: "smooth" });
    function updateProgress() {
      const max = track.scrollWidth - track.clientWidth;
      const pct = max > 0 ? track.scrollLeft / max : 1;
      $("progress").style.width = `${Math.max(pct * 100, 4)}%`;
      const idx = Math.min(WEEKS.length - 1, Math.round(track.scrollLeft / step()));
      $("counter").textContent = `${String(idx + 1).padStart(2, "0")} / ${WEEKS.length}`;
    }
    track.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    // vertical wheel scrolls the track sideways
    track.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { track.scrollLeft += e.deltaY; e.preventDefault(); }
    }, { passive: false });
    updateProgress();

    // --- week picker
    const pickerBtn = $("picker-btn"), pickerList = $("picker-list");
    WEEKS.forEach((w, i) => {
      const b = document.createElement("button");
      b.innerHTML = `<span class="n">${w.num}</span><span>${w.title}</span>`;
      b.onclick = () => { togglePicker(false); openDetails(i); };
      pickerList.appendChild(b);
    });
    function togglePicker(force) {
      const open = force ?? !pickerList.classList.contains("open");
      pickerList.classList.toggle("open", open);
      pickerBtn.setAttribute("aria-expanded", open);
    }
    pickerBtn.onclick = (e) => { e.stopPropagation(); togglePicker(); };
    document.addEventListener("click", (e) => { if (!pickerList.contains(e.target)) togglePicker(false); });

    // --- details view
    let current = 0;
    const details = $("details");
    function openDetails(i) {
      current = i;
      const w = WEEKS[i];
      $("d-badge").textContent = `Week ${w.num}`;
      $("d-title").textContent = w.title;
      $("d-date").textContent = w.date;
      fillMedia($("d-hero"), w.img);
      $("d-summary").innerHTML = w.summary || "<p>This week hasn't been written up yet. Check back soon, or open the full page.</p>";
      $("d-tools").innerHTML = (w.tools || []).map((t) => `<span>${t}</span>`).join("");
      $("d-reflection").textContent = w.reflection || "Reflection coming soon.";
      $("d-learnings").innerHTML = (w.learnings || ["To be added"]).map((l) => `<li>${l}</li>`).join("");
      $("d-meta").innerHTML = Object.entries(w.meta || { Status: "In progress" }).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
      $("full-page").href = pageFor(w);

      const prev = WEEKS[i - 1], next = WEEKS[i + 1];
      $("d-prev").disabled = !prev; $("d-next").disabled = !next;
      $("d-prev").querySelector("strong").textContent = prev ? prev.title : "Start";
      $("d-next").querySelector("strong").textContent = next ? next.title : "End";

      details.scrollTop = 0;
      details.classList.add("open");
      details.setAttribute("aria-hidden", "false");
      document.body.classList.add("locked");
      history.replaceState(null, "", `#week-${w.num}`);
      $("close-details").focus();
    }
    function closeDetails() {
      details.classList.remove("open");
      details.setAttribute("aria-hidden", "true");
      document.body.classList.remove("locked");
      history.replaceState(null, "", location.pathname);
      track.children[current]?.scrollIntoView({ inline: "start", block: "nearest" });
    }
    $("close-details").onclick = closeDetails;
    $("d-prev").onclick = () => current > 0 && openDetails(current - 1);
    $("d-next").onclick = () => current < WEEKS.length - 1 && openDetails(current + 1);

    // --- final project drawer
    const drawer = $("drawer");
    $("fp-name").textContent = FINAL_PROJECT.name;
    $("fp-lede").textContent = FINAL_PROJECT.lede;
    $("fp-idea").textContent = FINAL_PROJECT.idea;
    $("fp-progress").innerHTML = FINAL_PROJECT.progress.map(([s, st]) => `<li>${s}<span>${st}</span></li>`).join("");
    fillMedia($("fp-media"), FINAL_PROJECT.video, true);
    function setDrawer(open) {
      drawer.classList.toggle("open", open);
      drawer.setAttribute("aria-hidden", !open);
      document.body.classList.toggle("locked", open);
      if (open) $("close-drawer").focus();
    }
    document.querySelectorAll("[data-open-fp]").forEach((el) =>
      el.addEventListener("click", (e) => { e.preventDefault(); setDrawer(true); }));
    $("close-drawer").onclick = () => setDrawer(false);

    // --- keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (drawer.classList.contains("open")) setDrawer(false);
        else if (details.classList.contains("open")) closeDetails();
        else togglePicker(false);
      }
      if (details.classList.contains("open")) {
        if (e.key === "ArrowRight") $("d-next").click();
        if (e.key === "ArrowLeft") $("d-prev").click();
      }
    });

    // deep link: index.html#week-05
    const m = location.hash.match(/^#week-(\d+)/);
    if (m) { const i = WEEKS.findIndex((w) => w.num === m[1].padStart(2, "0")); if (i >= 0) openDetails(i); }

    /* ============ BINARY RAIN BACKGROUND ============ */
    (function () {
      const canvas = $("binary-bg"), ctx = canvas.getContext("2d");
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const size = 16;
      let w, h, cols, drops, bits;

      function resize() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
        cols = Math.ceil(w / size);
        drops = Array.from({ length: cols }, () => Math.random() * -80);
        bits = Array.from({ length: cols }, () => (Math.random() < 0.5 ? "0" : "1"));
        ctx.fillStyle = "#0a1628"; ctx.fillRect(0, 0, w, h);
      }

      function frame() {
        ctx.fillStyle = "rgba(10, 22, 40, 0.14)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = `600 ${size}px "IBM Plex Mono", monospace`;
        for (let i = 0; i < cols; i++) {
          const y = drops[i] * size;
          const hot = Math.random() > 0.985; // rare yellow flash
          ctx.fillStyle = hot
            ? "rgba(245, 197, 24, 0.9)"
            : `rgba(70, 130, 230, ${(0.18 + Math.random() * 0.22).toFixed(2)})`;
          ctx.fillText(bits[i], i * size, y);
          if (y > h + size * 2 && Math.random() > 0.975) {
            drops[i] = Math.random() * -40;
            bits[i] = Math.random() < 0.5 ? "0" : "1";
          } else {
            drops[i] += 0.35 + Math.random() * 0.2;
          }
        }
        if (!reduce) requestAnimationFrame(frame);
      }

      resize();
      addEventListener("resize", resize);
      if (reduce) { for (let k = 0; k < 120; k++) frame(); } else frame();
    })();
