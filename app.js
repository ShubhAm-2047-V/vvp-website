/**
 * V.V.P. Polytechnic - Interactive Logic (Premium Redesign)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initStatsCounter();
  initDepartmentModal();
  initEligibilityChecker();
  initWhiteboard();
  initFacilitiesTabs();
  initInquiryForm();
  initScrollReveal();
  
  // Custom storytelling engine (Scrubbing Video)
  initPreloaderAndStory();

  // Premium design features
  initCursorAndGlow();
  initGlassGlow();
  initCardTilt();
  initMagneticButtons();
  initTimelineAnimation();
  initPlacementStats();
  initPlacementChartAnimation();
  initCustomSliders();
  initGalleryLightbox();
  initNoticesSearchAndFilter();
  initGalleryFilters();
  initScrollProgressBar();
  initScrollVelocityWaves();
});

/* ==========================================================================
   1. Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light'; // Light theme default on load

  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let targetTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });
}

/* ==========================================================================
   2. Mobile Hamburger Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const menuItems = document.querySelectorAll('.nav-link, .menu-cta');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking a nav link or CTA inside it
  menuItems.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* ==========================================================================
   3. Animated Counter Stats
   ========================================================================== */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-item h3');
  const speed = 100; // lower is faster

  const runCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const text = el.innerText;
    const isPercent = text.includes('%');
    const isPlus = text.includes('+');
    let count = 0;
    
    const updateCount = () => {
      const increment = target / speed;
      if (count < target) {
        count += increment;
        el.innerText = Math.ceil(count) + (isPercent ? '%' : '') + (isPlus ? '+' : '');
        setTimeout(updateCount, 15);
      } else {
        el.innerText = target + (isPercent ? '%' : '') + (isPlus ? '+' : '');
      }
    };
    updateCount();
  };

  // Run on intersection
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

/* ==========================================================================
   4. Department Bento Immersive Overlay
   ========================================================================== */
const DEPT_DETAILS = {
  computer: {
    title: 'Computer Engineering',
    icon: 'fa-code',
    desc: 'Computer Engineering bridges hardware and software engineering. Students learn algorithms, modern data structures, database designs, web technologies, software testing, and core object-oriented programming methodologies.',
    intake: '60 Seats',
    duration: '3 Years (6 Semesters)',
    labs: [
      'Software Development Lab (C, C++, Java)',
      'Advanced Database Management Systems Lab',
      'Computer Networks & Cybersecurity Station',
      'Linux Operating Systems & Shell Programming Lab',
      'Web Technologies & Projects Center'
    ]
  },
  aiml: {
    title: 'Artificial Intelligence & ML',
    icon: 'fa-brain',
    desc: 'This cutting-edge diploma course prepares students for the future of automation. Curriculum covers Python programming, data analytics tools, fundamentals of neural networks, machine learning algorithms, and intelligent systems integration.',
    intake: '60 Seats',
    duration: '3 Years (6 Semesters)',
    labs: [
      'Python & Scripting Infrastructure Lab',
      'Machine Learning Models Development Lab',
      'Data Analytics & Visualisation Studio',
      'Artificial Intelligence Solutions Center',
      'Cloud Computing and API Operations Terminal'
    ]
  },
  extc: {
    title: 'Electronics & Telecommunication',
    icon: 'fa-tower-broadcast',
    desc: 'Focuses on communication systems and embedded systems technology. Students study microcontrollers, digital signal processing, fiber optics, satellite communication networks, VLSI circuit designs, and electronic hardware layout.',
    intake: '60 Seats',
    duration: '3 Years (6 Semesters)',
    labs: [
      'Digital Electronics & Logic Gates Design Lab',
      'Microcontrollers & Embedded C Development Lab',
      'Communication Systems & Antenna Design Unit',
      'Consumer Electronics & PCB Designing Workshop',
      'Instrumentation and Measurement Systems Lab'
    ]
  },
  electrical: {
    title: 'Electrical Engineering',
    icon: 'fa-bolt',
    desc: 'Covers fundamental concepts of electricity, electromagnetism, and electrical power. Students explore AC/DC machine design, power generation systems, smart transmission grids, power electronics controls, and residential/industrial automation systems.',
    intake: '60 Seats',
    duration: '3 Years (6 Semesters)',
    labs: [
      'Electrical Machines & DC Motors Testing Station',
      'Electrical Measurements & Instrumentation Lab',
      'Switchgear, Relays & Circuit Protection Lab',
      'Power Electronics & Electric Drive Controls',
      'Industrial Automation & PLC/SCADA Workshop'
    ]
  },
  mechanical: {
    title: 'Mechanical Engineering',
    icon: 'fa-gears',
    desc: 'Focuses on mechanical components design, thermal systems, and manufacturing processes. Includes instruction on computer-aided modeling (CAD/CAM), thermal engineering, fluid control machinery, metrology, and robotics automation.',
    intake: '60 Seats',
    duration: '3 Years (6 Semesters)',
    labs: [
      'Computer Aided Drafting (CAD) & Solid Modeling Lab',
      'Thermal Engineering & IC Engines Testing Lab',
      'Fluid Mechanics & Hydraulic Machinery Center',
      'Theory of Machines & Metrology Instruments Room',
      'Machining Shop & CNC Automation Center'
    ]
  },
  civil: {
    title: 'Civil Engineering',
    icon: 'fa-trowel-bricks',
    desc: 'Equips students with drafting, structural planning, and site supervision skills. Key subject matters include surveying, concrete technology, geotechnical parameters analysis, highway infrastructure, and environmental engineering designs.',
    intake: '60 Seats',
    duration: '3 Years (6 Semesters)',
    labs: [
      'Surveying & Advanced Levelling Instruments Yard',
      'Concrete Technology & Compressive Strength Tester',
      'Geotechnical Engineering & Soil Mechanics Lab',
      'Transportation & Bitumen Testing Lab',
      'Environmental Engineering & Public Health Water Lab'
    ]
  }
};

const DEPT_FACULTY = {
  computer: [
    { name: "Dr. R. R. Shah", title: "H.O.D. & Professor" },
    { name: "Prof. S. V. Loni", title: "Assistant Professor" },
    { name: "Prof. P. G. Mane", title: "Lecturer" }
  ],
  aiml: [
    { name: "Dr. A. S. Patil", title: "H.O.D. & Professor" },
    { name: "Prof. M. B. Kamble", title: "Assistant Professor" },
    { name: "Prof. S. R. Joshi", title: "Lecturer" }
  ],
  extc: [
    { name: "Dr. V. R. Pawar", title: "H.O.D. & Professor" },
    { name: "Prof. K. H. Shinde", title: "Assistant Professor" },
    { name: "Prof. P. P. Kulkarni", title: "Lecturer" }
  ],
  electrical: [
    { name: "Dr. S. M. Bagal", title: "H.O.D. & Professor" },
    { name: "Prof. G. D. Dange", title: "Assistant Professor" },
    { name: "Prof. V. V. Mane", title: "Lecturer" }
  ],
  mechanical: [
    { name: "Dr. S. K. Patil", title: "H.O.D. & Professor" },
    { name: "Prof. R. T. Vyas", title: "Assistant Professor" },
    { name: "Prof. A. S. Shinde", title: "Lecturer" }
  ],
  civil: [
    { name: "Dr. M. S. Dhok", title: "H.O.D. & Professor" },
    { name: "Prof. S. R. Gaikwad", title: "Assistant Professor" },
    { name: "Prof. P. A. Patil", title: "Lecturer" }
  ]
};

const DEPT_PROJECTS = {
  computer: [
    { title: "Smart College Chatbot", desc: "NLP chatbot for student guidance" },
    { title: "IoT Smart Home Automation", desc: "ESP32 sensors linked to database portal" }
  ],
  aiml: [
    { title: "Medical Disease Predictor", desc: "Machine Learning model with Flask UI" },
    { title: "Smart CCTV Security Monitor", desc: "OpenCV realtime face recognition" }
  ],
  extc: [
    { title: "RFID Automated Toll booth", desc: "Automated billing and barrier gate" },
    { title: "Wearable Health Tracker Telemetry", desc: "Bio-sensors with Bluetooth telemetry" }
  ],
  electrical: [
    { title: "Solar Grid Coordinator System", desc: "Automated solar-grid load manager" },
    { title: "Electric Vehicle Battery Balancer", desc: "Telemetry and cell charge balancer" }
  ],
  mechanical: [
    { title: "3-Axis Portable CNC Machine", desc: "Fully operational mechanical milling unit" },
    { title: "Pneumatic Robotic Handler Arm", desc: "PLC controlled pick and place arm" }
  ],
  civil: [
    { title: "Pervious Rainwater Concrete Blocks", desc: "Rainwater recharging pavements" },
    { title: "GIS Soil Load Mapping Chart", desc: "Digital Solapur soil parameters chart" }
  ]
};

function initDepartmentModal() {
  const deptCards = document.querySelectorAll('.dept-card');
  const modal = document.getElementById('deptModal');
  const overlay = document.getElementById('deptImmersiveOverlay');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');

  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalIntake = document.getElementById('modalIntake');
  const modalDuration = document.getElementById('modalDuration');
  const modalLabsList = document.getElementById('modalLabsList');
  
  const modalFacultyList = document.getElementById('modalFacultyList');
  const modalProjectsList = document.getElementById('modalProjectsList');

  const openModal = (deptKey) => {
    const data = DEPT_DETAILS[deptKey];
    if (!data) return;

    // Fill content
    modalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
    modalTitle.innerText = data.title;
    modalDesc.innerText = data.desc;
    modalIntake.innerText = data.intake;
    modalDuration.innerText = data.duration;
    
    // Labs List
    modalLabsList.innerHTML = '';
    data.labs.forEach(lab => {
      const li = document.createElement('li');
      li.className = 'lab-item-mini';
      li.innerHTML = `<i class="fa-solid fa-circle-chevron-right"></i> ${lab}`;
      modalLabsList.appendChild(li);
    });

    // Faculty List
    modalFacultyList.innerHTML = '';
    const faculty = DEPT_FACULTY[deptKey] || [];
    faculty.forEach(fac => {
      const nameInitials = fac.name.split(" ").slice(1).map(n => n[0]).join("") || "F";
      const item = document.createElement('div');
      item.className = 'faculty-mini-card';
      item.innerHTML = `
        <div class="faculty-avatar-mini">${nameInitials}</div>
        <div class="faculty-details-mini">
          <strong>${fac.name}</strong>
          <span>${fac.title}</span>
        </div>
      `;
      modalFacultyList.appendChild(item);
    });

    // Projects List
    modalProjectsList.innerHTML = '';
    const projects = DEPT_PROJECTS[deptKey] || [];
    projects.forEach(proj => {
      const item = document.createElement('div');
      item.className = 'faculty-mini-card';
      item.innerHTML = `
        <div class="faculty-avatar-mini" style="background: rgba(0,210,255,0.08); border-color: rgba(0,210,255,0.25); color: var(--color-accent);"><i class="fa-solid fa-lightbulb" style="font-size:0.95rem;"></i></div>
        <div class="faculty-details-mini">
          <strong>${proj.title}</strong>
          <span style="display:block; margin-top:0.15rem;">${proj.desc}</span>
        </div>
      `;
      modalProjectsList.appendChild(item);
    });

    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
    
    // Trigger GSAP Stagger scale animation for bento overlay cards
    gsap.fromTo(".overlay-bento-card",
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08, delay: 0.1 }
    );
  };

  const closeModal = () => {
    overlay.classList.remove('active');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  deptCards.forEach(card => {
    card.addEventListener('click', () => {
      const deptKey = card.getAttribute('data-dept');
      openModal(deptKey);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   5. Dynamic Eligibility Checker
   ========================================================================== */
function initEligibilityChecker() {
  const form = document.getElementById('eligibilityForm');
  const entrySelect = document.getElementById('entryLevel');
  const mathsGroup = document.getElementById('mathsScoreGroup');
  const resultDiv = document.getElementById('calcResult');

  // Toggle math score field depending on First/Second year selection
  entrySelect.addEventListener('change', () => {
    if (entrySelect.value === 'second') {
      mathsGroup.style.display = 'none';
      document.getElementById('mathsMarks').removeAttribute('required');
    } else {
      mathsGroup.style.display = 'block';
      document.getElementById('mathsMarks').setAttribute('required', 'required');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const entry = entrySelect.value;
    const aggregate = parseFloat(document.getElementById('aggregateMarks').value);
    const maths = parseFloat(document.getElementById('mathsMarks').value || 0);
    const category = document.getElementById('studentCategory').value;

    resultDiv.className = 'calc-result'; // Reset classes
    
    if (entry === 'first') {
      if (aggregate >= 35.0) {
        resultDiv.classList.add('success');
        resultDiv.innerHTML = `
          <h4><i class="fa-solid fa-circle-check"></i> Eligible for Admission</h4>
          <p>Based on your SSC score of <strong>${aggregate}%</strong>, you satisfy the minimum DTE requirement of 35% aggregate. You are eligible to apply for 1st Year Diploma Engineering courses at V.V.P. Polytechnic.</p>
        `;
      } else {
        resultDiv.classList.add('error');
        resultDiv.innerHTML = `
          <h4><i class="fa-solid fa-circle-xmark"></i> Not Eligible</h4>
          <p>Your aggregate score of <strong>${aggregate}%</strong> is below the DTE prescribed minimum threshold of 35% for admission.</p>
        `;
      }
    } else {
      if (aggregate >= 35.0) {
        resultDiv.classList.add('success');
        resultDiv.innerHTML = `
          <h4><i class="fa-solid fa-circle-check"></i> Eligible for Direct 2nd Year</h4>
          <p>Your 12th/ITI score of <strong>${aggregate}%</strong> meets the lateral entry criteria. You are eligible for Direct Second Year admission (entering 3rd Semester) at V.V.P. Polytechnic.</p>
        `;
      } else {
        resultDiv.classList.add('error');
        resultDiv.innerHTML = `
          <h4><i class="fa-solid fa-circle-xmark"></i> Not Eligible</h4>
          <p>Your aggregate score of <strong>${aggregate}%</strong> is below the minimum required criteria of 35% for Lateral Entry (Direct Second Year) admission.</p>
        `;
      }
    }
  });
}

/* ==========================================================================
   6. Facilities Tab System
   ========================================================================== */
function initFacilitiesTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === tabTarget) {
          content.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   7. Form Submissions & Notification System (Toast)
   ========================================================================== */
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inqName').value;
    const phone = document.getElementById('inqPhone').value;
    const email = document.getElementById('inqEmail').value;
    const dept = document.getElementById('inqDept').value;

    // Trigger Success Toast
    showToast(`Thank you, ${name}! Your inquiry regarding ${dept} has been received. Our counselor will call you on ${phone} soon.`, 'success');
    
    // Clear Form
    form.reset();
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  const iconColor = type === 'success' ? 'var(--color-success)' : '#ef4444';
  
  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color:${iconColor}; font-size:1.25rem;"></i>
    <p style="margin: 0; font-size:0.9rem;">${message}</p>
  `;
  
  container.appendChild(toast);
  
  // Slide out and remove toast after 5s
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

/* ==========================================================================
   8. Scroll Reveal Animations (GSAP) — Premium Fluid Edition
   ========================================================================== */
function initScrollReveal() {
  // -- Core .reveal elements: smooth float-up with spring easing --
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 55, filter: 'blur(3px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // -- Bento grid: staggered spring-pop entrance --
  const bentoGrid = document.querySelector('.bento-grid');
  if (bentoGrid) {
    gsap.fromTo(bentoGrid.querySelectorAll('.bento-card'),
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        ease: "back.out(1.6)",
        stagger: { amount: 0.55, from: "start" },
        scrollTrigger: { trigger: bentoGrid, start: "top 84%" }
      }
    );
  }

  // -- Dept grid: staggered with alternating y directions --
  const deptGrid = document.querySelector('.dept-grid');
  if (deptGrid) {
    gsap.fromTo(deptGrid.querySelectorAll('.dept-card'),
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: { amount: 0.5, from: "start" },
        scrollTrigger: { trigger: deptGrid, start: "top 84%" }
      }
    );
  }

  // -- Leadership grid: cascade left-to-right --
  const leaderGrid = document.querySelector('.leadership-grid');
  if (leaderGrid) {
    gsap.fromTo(leaderGrid.querySelectorAll('.leader-card'),
      { opacity: 0, x: -40, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: { trigger: leaderGrid, start: "top 85%" }
      }
    );
  }

  // -- Section titles: elegant slide-up (separate from parent .reveal to add depth) --
  document.querySelectorAll('.section-title-wrapper .section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.2, // slight delay after the wrapper reveal
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" }
      }
    );
  });

  // -- Mission cards: scale-up --
  document.querySelectorAll('.mission-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 35, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: i * 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: card, start: "top 90%" }
      }
    );
  });

  // -- About feature cards: slide-up stagger --
  const aboutFeatGrid = document.querySelector('.about-features-grid');
  if (aboutFeatGrid) {
    gsap.fromTo(aboutFeatGrid.querySelectorAll('.about-feat-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: aboutFeatGrid, start: "top 88%" }
      }
    );
  }

  // -- Placement stat cards: pop-up --
  document.querySelectorAll('.placement-stat-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        delay: i * 0.15,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: card, start: "top 88%" }
      }
    );
  });

  // -- Notice cards: slide from left --
  document.querySelectorAll('.notice-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 92%" }
      }
    );
  });

  // -- Gallery items: scale-up with stagger --
  const galleryMasonry = document.getElementById('galleryMasonry');
  if (galleryMasonry) {
    gsap.fromTo(galleryMasonry.querySelectorAll('.gallery-item'),
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: { amount: 0.6, from: "random" },
        scrollTrigger: { trigger: galleryMasonry, start: "top 85%" }
      }
    );
  }

  // -- Parallax depth on tab images (subtle Y scroll offset) --
  document.querySelectorAll('.tab-image').forEach(img => {
    gsap.to(img,{
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });
  });
}

/* ==========================================================================
   9. Cinematic Video Preloader & GSAP Storytelling Engine (PRESERVED)
   ========================================================================== */
function initPreloaderAndStory() {
  const videoUrl = 'college-entrance.mp4';
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar');
  const progressText = document.getElementById('preloader-text');
  const videoEl = document.getElementById('story-video');

  if (!videoEl || !preloader) return;

  let fallbackTriggered = false;

  const triggerFallback = () => {
    if (fallbackTriggered) return;
    fallbackTriggered = true;
    console.warn("[Performance Warning] Preload failed or timed out. Falling back to progressive streaming.");
    videoEl.src = videoUrl;
    videoEl.preload = "auto";
    videoEl.load();
    
    // Listen for metadata on direct stream
    videoEl.onloadedmetadata = () => {
      preloader.classList.add('fade-out');
      setupScrollStorytelling(videoEl);
    };
  };

  // Add error event listener on video element to catch blob issues
  videoEl.onerror = () => {
    if (videoEl.src && videoEl.src.startsWith('blob:')) {
      URL.revokeObjectURL(videoEl.src);
      triggerFallback();
    }
  };

  // Fetch the video via XMLHttpRequest to track progress
  const xhr = new XMLHttpRequest();
  xhr.open('GET', videoUrl, true);
  xhr.responseType = 'blob';
  xhr.timeout = 10000; // 10 seconds network timeout

  xhr.onprogress = function(e) {
    if (e.lengthComputable) {
      const percentage = Math.round((e.loaded / e.total) * 100);
      if (progressBar) progressBar.style.width = percentage + '%';
      if (progressText) progressText.innerText = percentage + '%';
    }
  };

  xhr.onload = function() {
    if (this.status === 200) {
      const videoBlob = this.response;
      const videoBlobUrl = URL.createObjectURL(videoBlob);
      
      videoEl.onloadedmetadata = () => {
        setTimeout(() => {
          preloader.classList.add('fade-out');
          setupScrollStorytelling(videoEl);
        }, 500);
      };

      videoEl.src = videoBlobUrl;
      videoEl.load();
    } else {
      triggerFallback();
    }
  };

  xhr.onerror = function() {
    triggerFallback();
  };

  xhr.ontimeout = function() {
    triggerFallback();
  };

  xhr.send();
}

function setupScrollStorytelling(video) {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  const videoDuration = video.duration || 10;
  console.log(`[Performance Debug] Video loaded. Duration: ${videoDuration.toFixed(2)}s`);

  // Detect mobile and touch capabilities
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || (window.matchMedia("(max-width: 768px)").matches) 
                   || ('ontouchstart' in window);

  let isFallbackMode = isMobile;
  let seekCount = 0;
  let totalSeekDuration = 0;
  let lastSeekTime = 0;
  const seekThrottle = 33; // ~30fps throttle limit to prevent overloading hardware decoders

  // Enable/disable Autoplay fallback
  const switchToFallbackMode = () => {
    if (isFallbackMode && video.loop && !video.paused) return; // Already running fallback
    
    isFallbackMode = true;
    console.log("[Performance Debug] Initializing Fallback Autoplay Mode.");
    
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn("[Performance Warning] Autoplay was blocked by browser policies. Waiting for interaction.", err);
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('scroll', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('scroll', playOnInteraction);
      });
    }
  };

  // Performance measurement listeners
  let seekStartTime = 0;
  video.addEventListener('seeking', () => {
    seekStartTime = performance.now();
  });

  video.addEventListener('seeked', () => {
    if (seekStartTime > 0) {
      const seekDuration = performance.now() - seekStartTime;
      seekCount++;
      totalSeekDuration += seekDuration;

      if (seekDuration > 80) {
        console.log(`[Performance Debug] Slow seek detected: ${seekDuration.toFixed(1)}ms`);
      }

      if (!isFallbackMode && seekCount >= 6) {
        const avgSeek = totalSeekDuration / seekCount;
        if (avgSeek > 120) {
          console.warn(`[Performance Warning] Average seek duration too high (${avgSeek.toFixed(1)}ms). Switching to Autoplay Fallback mode to preserve frame rate.`);
          switchToFallbackMode();
        }
      }
    }
  });

  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 2.2, // increased duration for ultra-fluid glide
    easing: (t) => 1 - Math.pow(1 - t, 4), // quartic out easing (smooth deceleration)
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false
  });

  // Connect Lenis to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Force manual scroll restoration and reset to top on load
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Make sure video currentTime starts at 0 and is paused for desktop scrub
  video.currentTime = 0;
  video.pause();

  // Create the GSAP scroll-bound timeline with scrub smoothing (shorter on mobile)
  const scrollLength = isMobile ? 1200 : 5000;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#story-pin-container",
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: isMobile ? 0.6 : 0.8, // Decreased scrub lag for more responsive video seeking and text animations
      pin: true,
      anticipatePin: 1
    }
  });

  // Play the video using a proxy object for smooth rendering
  const videoProxy = { time: 0 };
  tl.to(videoProxy, {
    time: videoDuration - 0.05,
    duration: 8.5,
    ease: "none"
  }, 0);

  // Seek throttling render loop using requestAnimationFrame with LERP smoothing
  let smoothTime = 0;
  function renderVideoScrub() {
    if (isFallbackMode) return; 

    const destTime = videoProxy.time;
    const now = performance.now();
    
    // Smoothly interpolate current time towards target time
    smoothTime += (destTime - smoothTime) * 0.12;
    
    const diff = Math.abs(smoothTime - video.currentTime);

    if (diff > 0.005) {
      if (!video.seeking && video.readyState >= 2) {
        if (now - lastSeekTime > seekThrottle || diff < 0.05) {
          video.currentTime = Math.max(0, Math.min(smoothTime, videoDuration - 0.05));
          lastSeekTime = now;
        }
      }
    }
    requestAnimationFrame(renderVideoScrub);
  }

  // Set initial mode
  if (isMobile) {
    switchToFallbackMode();
  } else {
    console.log("[Performance Debug] Interactive Scroll-Scrub Mode initialized.");
    requestAnimationFrame(renderVideoScrub);
  }

  // Set initial scene states
  gsap.set("#scene-1", { opacity: 1, visibility: "visible" });
  gsap.set("#scene-3", { opacity: 0, visibility: "hidden" });
  gsap.set("#scene-4", { opacity: 0, visibility: "hidden" });

  // Define transition offsets
  const scene1OutTime = 0.8;
  const scene3InTime = isMobile ? 1.0 : 2.2;
  const scene3OutTime = isMobile ? 2.5 : 4.2;
  const scene4InTime = isMobile ? 2.8 : 5.2;
  const statsDuration = isMobile ? 1.4 : 1.8;
  const statsStartTime = isMobile ? 3.0 : 5.5;
  const scene4OutTime = isMobile ? 5.2 : 8.0;
  const videoFadeTime = isMobile ? 5.3 : 8.5;

  // Scene 1 fades out
  tl.to("#scene-1", {
    opacity: 0,
    y: -50,
    autoAlpha: 0,
    ease: "power3.inOut"
  }, scene1OutTime);

  // Scene 3 fades in and out
  tl.fromTo("#scene-3", 
    { opacity: 0, y: 50, autoAlpha: 0 },
    { opacity: 1, y: 0, autoAlpha: 1, ease: "power3.out" },
    scene3InTime
  );
  tl.to("#scene-3", 
    { opacity: 0, y: -50, autoAlpha: 0, ease: "power3.in" },
    scene3OutTime
  );

  // Scene 4 statistics section fades in
  tl.fromTo("#scene-4", 
    { opacity: 0, y: 50, autoAlpha: 0 },
    { opacity: 1, y: 0, autoAlpha: 1, ease: "power3.out" },
    scene4InTime
  );

  // Interpolate/tween statistics values dynamically during Scene 4 display (including excellence)
  const statsVal = { students: 0, courses: 0, faculty: 0, placements: 0, excellence: 0 };
  tl.to(statsVal, {
    students: 1500,
    courses: 6,
    faculty: 50,
    placements: 100,
    excellence: 19,
    ease: "power3.out",
    duration: statsDuration,
    onUpdate: () => {
      const studentsEl = document.getElementById('stat-students');
      const coursesEl = document.getElementById('stat-courses');
      const facultyEl = document.getElementById('stat-faculty');
      const placementsEl = document.getElementById('stat-placements');
      const excellenceEl = document.getElementById('stat-excellence');

      if (studentsEl) studentsEl.innerText = Math.round(statsVal.students) + "+";
      if (coursesEl) coursesEl.innerText = Math.round(statsVal.courses);
      if (facultyEl) facultyEl.innerText = Math.round(statsVal.faculty) + "+";
      if (placementsEl) placementsEl.innerText = Math.round(statsVal.placements) + "%";
      if (excellenceEl) excellenceEl.innerText = Math.round(statsVal.excellence) + "+";
    }
  }, statsStartTime);

  // Statistics fade out
  tl.to("#scene-4", 
    { opacity: 0, y: -50, autoAlpha: 0, ease: "power3.in" },
    scene4OutTime
  );

  // Fade and scale down the video container slightly at the transition end
  tl.to(".video-container", {
    opacity: 0.15,
    scale: 0.96,
    ease: "power3.inOut"
  }, videoFadeTime);

  // Navigation bar morph trigger
  ScrollTrigger.create({
    trigger: "#story-pin-container",
    start: "bottom 20%",
    onEnter: () => {
      const navbar = document.getElementById('mainNavbar');
      if (navbar) {
        navbar.classList.remove('navbar-hero');
        navbar.classList.add('navbar-visible');
      }
    },
    onLeaveBack: () => {
      const navbar = document.getElementById('mainNavbar');
      if (navbar) {
        navbar.classList.add('navbar-hero');
        navbar.classList.remove('navbar-visible');
      }
    }
  });

  // Enable anchor link navigation smooth scroll using Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, {
          offset: -90, // Offset for redesigned navbar
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });
}

/* ==========================================================================
   10. Premium Custom Cursor — Velocity-Aware Spring Cursor
   ========================================================================== */
function initCursorAndGlow() {
  const cursor = document.getElementById('custom-cursor');
  const glow = document.getElementById('bg-glow');
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || (window.matchMedia("(max-width: 1024px)").matches) 
                   || ('ontouchstart' in window);

  if (isMobile) {
    if (cursor) cursor.style.display = 'none';
    if (glow) glow.style.display = 'none';
    return;
  }

  // Use GSAP quickTo for smooth butter cursor — dot is fast, ring lags behind
  const cursorDot = cursor?.querySelector('.cursor-dot');
  const cursorRing = cursor?.querySelector('.cursor-ring');

  if (cursorDot) {
    // Correct alignment by pre-setting GSAP percent translation coordinates
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(cursorDot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(cursorDot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(cursorRing || cursor, "x", { duration: 0.35, ease: "expo.out" });
    const ringY = gsap.quickTo(cursorRing || cursor, "y", { duration: 0.35, ease: "expo.out" });

    window.addEventListener('mousemove', (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  } else {
    // Fallback: full cursor element
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

    window.addEventListener('mousemove', (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // Scale cursor and apply transitions directly via GSAP to prevent CSS layout reflows on width/height
  const hoverables = document.querySelectorAll('a, button, .dept-card, .tab-btn, .gallery-item, select, input, textarea, .timeline-content, .bento-card, .filter-tag, .overlay-close-btn, .notice-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.classList.add('hover');
      if (cursorRing) {
        gsap.to(cursorRing, {
          scale: 1.5,
          borderColor: 'var(--color-accent)',
          backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.classList.remove('hover');
      if (cursorRing) {
        gsap.to(cursorRing, {
          scale: 1.0,
          borderColor: 'var(--color-primary)',
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
  });
}

/* ==========================================================================
   11. 3D Tilt Effect on Premium Cards — Spring Physics
   ========================================================================== */
function initCardTilt() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || (window.matchMedia("(max-width: 1024px)").matches) 
                   || ('ontouchstart' in window);
                   
  if (isMobile) return;

  const cards = document.querySelectorAll('.dept-card, .about-feat-card, .placement-stat-card, .testimonial-card, .bento-card, .leader-card, .notice-card');
  cards.forEach(card => {
    let rect = null;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const rotateX = -(y - yc) / 14;
      const rotateY = (x - xc) / 14;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 900,
        ease: "power2.out",
        duration: 0.35,
        overwrite: "auto"
      });
    });

    card.addEventListener('mouseleave', () => {
      rect = null;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "elastic.out(1, 0.5)",
        duration: 1.2,
        overwrite: "auto"
      });
    });
  });
}

/* ==========================================================================
   12. Magnetic Interactive Buttons
   ========================================================================== */
function initMagneticButtons() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || (window.matchMedia("(max-width: 1024px)").matches) 
                   || ('ontouchstart' in window);
                   
  if (isMobile) return;

  const buttons = document.querySelectorAll('.btn-magnetic');
  buttons.forEach(btn => {
    let rect = null;

    btn.addEventListener('mouseenter', () => {
      rect = btn.getBoundingClientRect();
    });

    btn.addEventListener('mousemove', (e) => {
      if (!rect) rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        ease: "power2.out",
        duration: 0.4,
        overwrite: "auto"
      });
    });

    btn.addEventListener('mouseleave', () => {
      rect = null;
      gsap.to(btn, {
        x: 0,
        y: 0,
        ease: "elastic.out(1.1, 0.4)",
        duration: 0.8,
        overwrite: "auto"
      });
    });
  });
}

/* ==========================================================================
   13. Interactive Timeline Animations (GSAP ScrollTrigger)
   ========================================================================== */
function initTimelineAnimation() {
  const timelineLine = document.querySelector('.timeline-line');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (!timelineLine || timelineItems.length === 0) return;

  gsap.fromTo(timelineLine, 
    { scaleY: 0 },
    { 
      scaleY: 1, 
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 75%",
        end: "bottom 75%",
        scrub: true
      }
    }
  );

  timelineItems.forEach(item => {
    const dot = item.querySelector('.timeline-dot');
    const content = item.querySelector('.timeline-content');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(dot, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }
    )
    .fromTo(content,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.25"
    );
  });
}

/* ==========================================================================
   14. Placement Statistics Count-Up
   ========================================================================== */
function initPlacementStats() {
  const placementRate = document.getElementById('stat-placement-rate');
  const partnersCount = document.getElementById('stat-recruiting-partners');
  
  if (!placementRate || !partnersCount) return;

  const countData = { rate: 0, partners: 0 };
  
  gsap.to(countData, {
    rate: 95,
    partners: 80,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".placement-stats",
      start: "top 85%",
      toggleActions: "play none none none"
    },
    duration: 2.2,
    onUpdate: () => {
      placementRate.innerText = Math.round(countData.rate);
      partnersCount.innerText = Math.round(countData.partners);
    }
  });
}

/* ==========================================================================
   14b. Placement SVG Chart Animation
   ========================================================================== */
function initPlacementChartAnimation() {
  const container = document.querySelector('.placement-chart-container');
  const bars = document.querySelectorAll('.chart-bar');
  if (!container || !bars.length) return;

  ScrollTrigger.create({
    trigger: container,
    start: "top 85%",
    onEnter: () => {
      container.classList.add('chart-active');
    }
  });
}

/* ==========================================================================
   15. Slider Rotators (Alumni Success & Testimonials)
   ========================================================================== */
function initCustomSliders() {
  setupSlider(
    document.getElementById('successSlider'),
    document.getElementById('prevSuccessBtn'),
    document.getElementById('nextSuccessBtn'),
    document.getElementById('successDots'),
    5000
  );

  setupSlider(
    document.getElementById('testimonialSlider'),
    document.getElementById('prevTestimonialBtn'),
    document.getElementById('nextTestimonialBtn'),
    document.getElementById('testimonialDots'),
    6000
  );
}

function setupSlider(sliderContainer, prevBtn, nextBtn, dotsContainer, autoplayInterval) {
  if (!sliderContainer) return;
  
  const slides = sliderContainer.querySelectorAll('.success-slide, .testimonial-slide');
  if (slides.length === 0) return;

  let currentIndex = 0;
  let timer = null;

  // Render dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');

  function goToSlide(index) {
    if (index === currentIndex) return;

    let targetIndex = index;
    if (index >= slides.length) targetIndex = 0;
    if (index < 0) targetIndex = slides.length - 1;

    const currentSlide = slides[currentIndex];
    const targetSlide = slides[targetIndex];

    // Outgoing slide animation
    gsap.to(currentSlide, {
      opacity: 0,
      scale: 0.94,
      y: -15,
      duration: 0.45,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        currentSlide.classList.remove('active');
        // Reset element inline styles so they don't override classes later
        gsap.set(currentSlide, { clearProps: "all" });
      }
    });

    // Incoming slide animation
    targetSlide.classList.add('active');
    gsap.fromTo(targetSlide, 
      { opacity: 0, scale: 0.94, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.5)", overwrite: "auto" }
    );

    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
    if (dots[targetIndex]) dots[targetIndex].classList.add('active');

    currentIndex = targetIndex;
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  function startAutoplay() {
    if (autoplayInterval) {
      timer = setInterval(nextSlide, autoplayInterval);
    }
  }

  function resetAutoplay() {
    if (timer) {
      clearInterval(timer);
      startAutoplay();
    }
  }

  startAutoplay();

  sliderContainer.addEventListener('mouseenter', () => clearInterval(timer));
  sliderContainer.addEventListener('mouseleave', startAutoplay);
}

/* ==========================================================================
   16. Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const backdrop = document.getElementById('lightboxBackdrop');
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0 || !lightbox) return;

  let activeIndex = 0;
  const images = [];

  galleryItems.forEach((item, index) => {
    const imgEl = item.querySelector('img');
    const titleEl = item.querySelector('h4');
    const descEl = item.querySelector('p');
    
    if (imgEl) {
      // Prevent push duplicates when refiltering
      item.addEventListener('click', () => {
        // Find correct current index from active list
        const activeItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
        const indexInActiveList = activeItems.indexOf(item);
        if (indexInActiveList !== -1) {
          openLightbox(activeItems, indexInActiveList);
        }
      });
    }
  });

  function openLightbox(activeItems, idx) {
    activeIndex = idx;
    
    // Build temporary list of active images
    images.length = 0;
    activeItems.forEach(item => {
      const imgEl = item.querySelector('img');
      const titleEl = item.querySelector('h4');
      const descEl = item.querySelector('p');
      images.push({
        src: imgEl.getAttribute('src') || imgEl.src,
        title: titleEl ? titleEl.innerText : 'Campus View',
        desc: descEl ? descEl.innerText : 'VVP Polytechnic Campus'
      });
    });

    updateLightboxContent();
    lightbox.classList.add('active');
    
    gsap.fromTo("#lightboxImg", 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, ease: "power2.out", duration: 0.4 }
    );
    
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const data = images[activeIndex];
    if (!data) return;

    img.src = data.src;
    caption.innerText = `${data.title} - ${data.desc}`;
  }

  function nextImage() {
    if (images.length <= 1) return;
    activeIndex = (activeIndex + 1) % images.length;
    gsap.to("#lightboxImg", {
      opacity: 0,
      scale: 0.95,
      duration: 0.15,
      onComplete: () => {
        updateLightboxContent();
        gsap.to("#lightboxImg", { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
      }
    });
  }

  function prevImage() {
    if (images.length <= 1) return;
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    gsap.to("#lightboxImg", {
      opacity: 0,
      scale: 0.95,
      duration: 0.15,
      onComplete: () => {
        updateLightboxContent();
        gsap.to("#lightboxImg", { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

/* ==========================================================================
   17. Notices Search & Category Filters (NEW)
   ========================================================================== */
function initNoticesSearchAndFilter() {
  const searchInput = document.getElementById('noticeSearch');
  const filterTags = document.querySelectorAll('.filter-tag[data-filter]');
  const noticeCards = document.querySelectorAll('.notice-card');
  
  if (!noticeCards.length) return;
  
  let currentSearchQuery = "";
  let currentCategory = "all";
  
  const filterNotices = () => {
    noticeCards.forEach(card => {
      const title = card.querySelector('h4').innerText.toLowerCase();
      const desc = card.querySelector('p').innerText.toLowerCase();
      const category = card.getAttribute('data-category');
      
      const matchesSearch = title.includes(currentSearchQuery) || desc.includes(currentSearchQuery);
      const matchesCategory = currentCategory === "all" || category === currentCategory;
      
      if (matchesSearch && matchesCategory) {
        card.style.display = "flex";
        gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: "power1.out" });
      } else {
        card.style.display = "none";
      }
    });
  };
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase();
      filterNotices();
    });
  }
  
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      currentCategory = tag.getAttribute('data-filter');
      filterNotices();
    });
  });
}

/* ==========================================================================
   18. Gallery Category Filters (NEW)
   ========================================================================== */
function initGalleryFilters() {
  const gFilterTags = document.querySelectorAll('.filter-tag[data-gfilter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const masonry = document.getElementById('galleryMasonry');
  
  if (!galleryItems.length || !gFilterTags.length) return;
  
  gFilterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      gFilterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      
      const filterValue = tag.getAttribute('data-gfilter');
      
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-gcategory');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          gsap.fromTo(item, 
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }
          );
        } else {
          item.classList.add('hidden');
        }
      });
      
      // Trigger ScrollTrigger refresh to prevent visual gaps in masonry layouts
      ScrollTrigger.refresh();
    });
  });
}

/* ==========================================================================
   19. Global Scroll Progress Bar (NEW)
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100);
      progressBar.style.width = progress + '%';
    }
  });
}

/* ==========================================================================
   20. Card Mouse Spotlight Glow coordinates
   ========================================================================== */
function initGlassGlow() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || (window.matchMedia("(max-width: 1024px)").matches) 
                   || ('ontouchstart' in window);
                   
  if (isMobile) return;
  
  const panels = document.querySelectorAll('.glass-panel');
  panels.forEach(panel => {
    let rect = null;
    panel.addEventListener('mouseenter', () => {
      rect = panel.getBoundingClientRect();
    });
    panel.addEventListener('mousemove', (e) => {
      if (!rect) rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.setProperty('--card-mouse-x', `${x}px`);
      panel.style.setProperty('--card-mouse-y', `${y}px`);
    });
    panel.addEventListener('mouseleave', () => {
      rect = null;
    });
  });
}

/* ==========================================================================
   21. Scroll-Velocity Responsive Wave Dividers
   ========================================================================== */
function initScrollVelocityWaves() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || (window.matchMedia("(max-width: 1024px)").matches) 
                   || ('ontouchstart' in window);
                   
  if (isMobile) return;

  // Manual high-performance scroll speed calculator to avoid GSAP version mismatch errors
  let lastScrollY = window.scrollY;
  let lastScrollTime = Date.now();
  let scrollVelocity = 0;

  window.addEventListener('scroll', () => {
    const now = Date.now();
    const currentScrollY = window.scrollY;
    const timeDiff = now - lastScrollTime;
    
    if (timeDiff > 0) {
      const distance = Math.abs(currentScrollY - lastScrollY);
      scrollVelocity = distance / timeDiff; // pixels per ms
      lastScrollY = currentScrollY;
      lastScrollTime = now;
    }
  }, { passive: true });

  // Cache SVG path collections once to avoid layout thrashing via queries in ticker
  const paths1 = document.querySelectorAll('.animated-divider .wave-line-1');
  const paths2 = document.querySelectorAll('.animated-divider .wave-line-2');
  const paths3 = document.querySelectorAll('.animated-divider .wave-line-3');

  let offset = 0;
  gsap.ticker.add(() => {
    // Decay velocity smoothly back to 0
    scrollVelocity *= 0.94;
    
    // speed ranges from 1.0 (base) up to high multipliers when scrolling fast
    const speed = 1.0 + scrollVelocity * 2.5; 
    offset -= speed * 0.45;
    
    paths1.forEach(path => {
      path.style.strokeDashoffset = offset;
    });
    paths2.forEach(path => {
      path.style.strokeDashoffset = -offset * 0.7; // Opposing scroll direction
    });
    paths3.forEach(path => {
      path.style.strokeDashoffset = offset * 1.35; // Faster scroll offset
    });
  });
}

/* ==========================================================================
   18. Interactive Whiteboard Logic
   ========================================================================== */
function initWhiteboard() {
  const whiteboardGrid = document.getElementById('whiteboardGrid');
  const addNoteBtn = document.getElementById('addNoteBtn');
  const overlay = document.getElementById('whiteboardOverlay');
  const backdrop = document.getElementById('whiteboardBackdrop');
  const closeBtn = document.getElementById('whiteboardModalClose');
  const form = document.getElementById('whiteboardForm');
  const filterTags = document.querySelectorAll('[data-board-filter]');
  
  // Default Sample Notes
  const DEFAULT_NOTES = [
    {
      id: 'default-1',
      title: 'National Level TechFest 2026',
      content: 'Gear up for the annual flagship tech-exposition! Projects showcase, UI designing battles, robo-races, and blind-coding competitions scheduled for early October. Registrations open soon!',
      category: 'program',
      color: 'blue',
      author: 'TechFest Organizer Committee',
      date: 'Jul 10, 2026',
      likes: 18,
      likedBySession: false
    },
    {
      id: 'default-2',
      title: 'TATA Power Recruitment Drive',
      content: 'Campus recruitment and screening test for final-year Mechanical and Electrical diploma candidates. Apply before the deadline on the placement portal.',
      category: 'notice',
      color: 'yellow',
      author: 'Placement Cell Officer',
      date: 'Jul 09, 2026',
      likes: 34,
      likedBySession: false
    },
    {
      id: 'default-3',
      title: 'Android & Kotlin Bootcamp',
      content: 'We are planning a 3-day bootcamp on Android app creation using modern Jetpack Compose for second and final year computer engineering branches.',
      category: 'idea',
      color: 'green',
      author: 'Comp Dept HOD',
      date: 'Jul 08, 2026',
      likes: 27,
      likedBySession: false
    },
    {
      id: 'default-4',
      title: 'Inter-College Sports Tournament',
      content: 'Selections for V.V.P. sports teams (Cricket, Volleyball, Kabaddi) will begin next Monday at the campus sports arena. Be ready with sports kits.',
      category: 'event',
      color: 'pink',
      author: 'Physical Director',
      date: 'Jul 07, 2026',
      likes: 12,
      likedBySession: false
    }
  ];

  // Helper: Retrieve Notes from localStorage
  let notes = [];
  try {
    const savedNotes = localStorage.getItem('vvp_whiteboard_notes');
    if (savedNotes) {
      notes = JSON.parse(savedNotes);
    } else {
      notes = [...DEFAULT_NOTES];
      localStorage.setItem('vvp_whiteboard_notes', JSON.stringify(notes));
    }
  } catch (e) {
    console.error("Local storage not accessible: ", e);
    notes = [...DEFAULT_NOTES];
  }

  // Active filter state
  let currentFilter = 'all';

  // Open Modal
  const openModal = () => {
    overlay.classList.add('active');
    document.getElementById('whiteboardModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close Modal
  const closeModal = () => {
    overlay.classList.remove('active');
    document.getElementById('whiteboardModal').classList.remove('active');
    document.body.style.overflow = '';
    form.reset();
  };

  // Render Pinned Notes to Board Grid
  const renderNotes = () => {
    whiteboardGrid.innerHTML = '';
    
    // Filter notes
    const filteredNotes = currentFilter === 'all' 
      ? notes 
      : notes.filter(note => note.category === currentFilter);

    if (filteredNotes.length === 0) {
      whiteboardGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; opacity: 0.65;">
          <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--color-primary);"></i>
          <h3>No sticky notes pinned under this category.</h3>
          <p style="margin-top: 0.5rem;">Be the first to pin a new notice or program suggestion!</p>
        </div>
      `;
      return;
    }

    filteredNotes.forEach(note => {
      const noteCard = document.createElement('div');
      noteCard.className = `sticky-note ${note.color}`;
      noteCard.id = `note-${note.id}`;
      
      // Determine human readable category badge
      let categoryName = 'Program';
      if (note.category === 'notice') categoryName = 'Notice';
      if (note.category === 'event') categoryName = 'Event';
      if (note.category === 'idea') categoryName = 'Suggestion';

      noteCard.innerHTML = `
        <button class="note-delete" title="Remove Note">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <div class="note-header">
          <span class="note-badge">${categoryName}</span>
        </div>
        <h4 class="note-title">${escapeHTML(note.title)}</h4>
        <p class="note-content">${escapeHTML(note.content)}</p>
        <div class="note-footer">
          <div class="note-meta">
            <span class="note-author">By: ${escapeHTML(note.author || 'Anonymous')}</span>
            <span class="note-date">${note.date}</span>
          </div>
          <button class="note-like-btn ${note.likedBySession ? 'liked' : ''}" title="Like Note">
            <i class="fa-solid fa-heart"></i>
            <span class="like-count">${note.likes}</span>
          </button>
        </div>
      `;

      // Event Listener: Delete Note
      const deleteBtn = noteCard.querySelector('.note-delete');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to remove this sticky note from the whiteboard?")) {
          // Add removing class for slide-out/shrink animation
          noteCard.classList.add('removing');
          
          // Wait for animation, then update state & re-render
          setTimeout(() => {
            notes = notes.filter(n => n.id !== note.id);
            updateStorage();
            renderNotes();
          }, 450);
        }
      });

      // Event Listener: Like Note
      const likeBtn = noteCard.querySelector('.note-like-btn');
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const foundNote = notes.find(n => n.id === note.id);
        if (foundNote) {
          if (foundNote.likedBySession) {
            foundNote.likes--;
            foundNote.likedBySession = false;
            likeBtn.classList.remove('liked');
          } else {
            foundNote.likes++;
            foundNote.likedBySession = true;
            likeBtn.classList.add('liked');
          }
          likeBtn.querySelector('.like-count').innerText = foundNote.likes;
          updateStorage();
        }
      });

      initNoteStretch(noteCard);
      whiteboardGrid.appendChild(noteCard);
    });

    // Trigger GSAP entry animation for sticky notes (bouncing pop-in)
    if (typeof gsap !== 'undefined') {
      gsap.killTweensOf(".sticky-note");
      gsap.fromTo(".sticky-note", 
        { opacity: 0, scale: 0.6, y: 40 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "back.out(1.6)"
        }
      );
    }
  };

  // Helper: Escape HTML to prevent XSS
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Update Local Storage
  const updateStorage = () => {
    localStorage.setItem('vvp_whiteboard_notes', JSON.stringify(notes));
  };

  // Form Submit: Add New Note
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titleVal = document.getElementById('noteTitle').value.trim();
    const contentVal = document.getElementById('noteContent').value.trim();
    const categoryVal = document.getElementById('noteCategory').value;
    const authorVal = document.getElementById('noteAuthor').value.trim() || 'Anonymous';
    
    // Read selected color radio button
    const colorVal = document.querySelector('input[name="noteColor"]:checked').value;
    
    // Create new note object
    const newNote = {
      id: Date.now().toString(),
      title: titleVal,
      content: contentVal,
      category: categoryVal,
      color: colorVal,
      author: authorVal,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      likes: 0,
      likedBySession: false
    };

    // Prepend to notes array to show at the top/front of grid
    notes.unshift(newNote);
    updateStorage();
    
    // Close modal, reset form
    closeModal();
    
    // Re-render notes, adding custom reveal/fade animation to first node
    renderNotes();
    
    // Add visual bounce animation to the newly added note card
    const newCardElement = document.getElementById(`note-${newNote.id}`);
    if (newCardElement) {
      newCardElement.classList.add('adding');
      setTimeout(() => {
        newCardElement.classList.remove('adding');
      }, 500);
    }
  });

  // Filter Buttons event handlers
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Toggle active class on tags
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      
      currentFilter = tag.getAttribute('data-board-filter');
      renderNotes();
    });
  });

  // Event Listeners: Modal toggles
  addNoteBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  const cancelBtn = document.getElementById('whiteboardFormCancel');
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Cursor-tracking warm yellow light glow
  const canvas = document.querySelector('.whiteboard-canvas');
  const glow = document.querySelector('.whiteboard-glow');
  
  if (canvas && glow) {
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.setProperty('--x', `${x}px`);
      glow.style.setProperty('--y', `${y}px`);
      glow.style.opacity = '1'; // Ensure opacity stays at 1 while moving inside
    });
    
    canvas.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
    });
    
    canvas.addEventListener('mouseleave', (e) => {
      // Robust boundary check to prevent false mouseleave triggers from browser overlays
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX >= rect.right ||
        e.clientY < rect.top ||
        e.clientY >= rect.bottom
      ) {
        glow.style.opacity = '0';
      }
    });
  }

  // Helper: Drag & Stretch note Card elastically
  function initNoteStretch(card) {
    let startX = 0, startY = 0;
    let originalRotation = 0;
    let isDragging = false;

    const startDrag = (clientX, clientY, e) => {
      // Don't drag if clicking interactive items inside the card
      if (e.target.closest('.note-delete') || e.target.closest('.note-like-btn') || e.target.closest('a') || e.target.closest('button')) {
        return false;
      }
      
      isDragging = true;
      startX = clientX;
      startY = clientY;
      
      // Parse computed rotation from transform matrix
      const style = window.getComputedStyle(card);
      const transform = style.transform;
      if (transform && transform !== 'none') {
        const values = transform.split('(')[1].split(')')[0].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        originalRotation = Math.atan2(b, a) * (180 / Math.PI);
      } else {
        originalRotation = 0;
      }

      card.classList.add('dragging');
      card.style.zIndex = '50';
      card.style.transition = 'none'; // disable CSS transition during dragging
      return true;
    };

    const moveDrag = (clientX, clientY) => {
      if (!isDragging) return;
      
      const dx = clientX - startX;
      const dy = clientY - startY;
      
      // Damped rubber-band stretch offset
      const stretchX = dx * 0.55;
      const stretchY = dy * 0.55;
      
      // Dynamically rotate card slightly based on drag direction
      const dynamicRotation = originalRotation + (stretchX * 0.06);
      
      // Apply inline styles directly
      card.style.transform = `translate(${stretchX}px, ${stretchY}px) scale(1.05) rotate(${dynamicRotation}deg)`;
      card.style.boxShadow = '0 25px 45px rgba(0, 0, 0, 0.28)';
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      
      // Spring back with GSAP Elastic out easing
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: originalRotation,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          duration: 0.8,
          ease: "elastic.out(1.2, 0.45)",
          onComplete: () => {
            // Reset styles back to CSS controls once bounce finishes
            card.style.transform = '';
            card.style.zIndex = '';
            card.style.boxShadow = '';
            card.style.transition = '';
            card.classList.remove('dragging');
          }
        });
      } else {
        // Fallback if GSAP is not loaded
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.boxShadow = '';
        card.style.transition = '';
        card.classList.remove('dragging');
      }
    };

    // Mouse Event Listeners
    card.addEventListener('mousedown', (e) => {
      if (!startDrag(e.clientX, e.clientY, e)) return;
      e.preventDefault();

      const onMouseMove = (moveEvent) => {
        moveDrag(moveEvent.clientX, moveEvent.clientY);
      };

      const onMouseUp = () => {
        endDrag();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // Touch Event Listeners (Mobile support)
    card.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (!startDrag(touch.clientX, touch.clientY, e)) return;

      const onTouchMove = (moveEvent) => {
        if (!isDragging) return;
        const moveTouch = moveEvent.touches[0];
        moveDrag(moveTouch.clientX, moveTouch.clientY);
        // Prevent default screen scrolling while dragging a note card
        if (moveEvent.cancelable) {
          moveEvent.preventDefault();
        }
      };

      const onTouchEnd = () => {
        endDrag();
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      };

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    }, { passive: true });
  }

  // Initial rendering
  renderNotes();
}
