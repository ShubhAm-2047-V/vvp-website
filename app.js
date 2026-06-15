/**
 * V.V.P. Polytechnic - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initStatsCounter();
  initDepartmentModal();
  initEligibilityChecker();
  initFacilitiesTabs();
  initInquiryForm();
  initScrollReveal();
  
  // Custom storytelling engine
  initPreloaderAndStory();

  // Premium design features
  initCursorAndGlow();
  initCardTilt();
  initMagneticButtons();
  initTimelineAnimation();
  initPlacementStats();
  initCustomSliders();
  initGalleryLightbox();
});

/* ==========================================================================
   1. Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

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
  const navLinks = document.querySelectorAll('.nav-link');

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

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
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
   4. Department Interactive Modals
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

function initDepartmentModal() {
  const deptCards = document.querySelectorAll('.dept-card');
  const modal = document.getElementById('deptModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');

  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalIntake = document.getElementById('modalIntake');
  const modalDuration = document.getElementById('modalDuration');
  const modalLabsList = document.getElementById('modalLabsList');

  const openModal = (deptKey) => {
    const data = DEPT_DETAILS[deptKey];
    if (!data) return;

    // Fill content
    modalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
    modalTitle.innerText = data.title;
    modalDesc.innerText = data.desc;
    modalIntake.innerText = data.intake;
    modalDuration.innerText = data.duration;
    
    modalLabsList.innerHTML = '';
    data.labs.forEach(lab => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-chevron-right" style="color:var(--color-accent); font-size:0.875rem; margin-right: 0.5rem;"></i> ${lab}`;
      modalLabsList.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  };

  const closeModal = () => {
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
      // DTE 1st Year Rules: SSC pass with aggregate >= 35%. Must have math & science.
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
      // Direct 2nd Year Rules: HSC Science, VOC, or ITI. Generally >= 35% is required.
      if (aggregate >= 35.0) {
        resultDiv.classList.add('success');
        resultDiv.innerHTML = `
          <h4><i class="fa-solid fa-circle-check"></i> Eligible for Direct 2nd Year</h4>
          <p>Your 12th/ITI score of <strong>${aggregate}%</strong> meets the eligibility criteria. You are eligible for Direct Second Year admission (entering 3rd Semester) at V.V.P. Polytechnic.</p>
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inqName').value;
    const phone = document.getElementById('inqPhone').value;
    const email = document.getElementById('inqEmail').value;
    const dept = document.getElementById('inqDept').value;
    const message = document.getElementById('inqMessage').value;

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
   8. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}

/* ==========================================================================
   9. Cinematic Video Preloader & GSAP Storytelling Engine
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
      progressBar.style.width = percentage + '%';
      progressText.innerText = percentage + '%';
    }
  };

  xhr.onload = function() {
    if (this.status === 200) {
      const videoBlob = this.response;
      const videoBlobUrl = URL.createObjectURL(videoBlob);
      
      // Hook event before setting src to ensure it triggers correctly
      videoEl.onloadedmetadata = () => {
        // Hide preloader with a slight delay for smooth exit visual
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
    
    // Play video smoothly at normal speed
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn("[Performance Warning] Autoplay was blocked by browser policies. Waiting for interaction.", err);
        // Play on user interaction if blocked
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

      // Debug laggy seeks
      if (seekDuration > 80) {
        console.log(`[Performance Debug] Slow seek detected: ${seekDuration.toFixed(1)}ms`);
      }

      // Check average seek performance after 6 seeks (stabilized statistics)
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
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0
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
      scrub: isMobile ? 1.0 : 1.5,       // High smoothing for target time interpolation
      pin: true,        // Pin the container
      anticipatePin: 1
    }
  });

  // Play the video using a proxy object for smooth rendering
  const videoProxy = { time: 0 };
  tl.to(videoProxy, {
    time: videoDuration - 0.05, // slightly before end to avoid black frame
    duration: 8.5,              // Spread video playback across the entire scroll timeline
    ease: "none"
  }, 0);

  // Seek throttling render loop using requestAnimationFrame
  function renderVideoScrub() {
    if (isFallbackMode) return; // Exit loop if in fallback mode to save CPU cycles

    const destTime = videoProxy.time;
    const currTime = video.currentTime;
    const now = performance.now();
    const diff = Math.abs(destTime - currTime);

    if (diff > 0.01) {
      if (!video.seeking && video.readyState >= 2) {
        if (now - lastSeekTime > seekThrottle || diff < 0.05) {
          video.currentTime = Math.max(0, Math.min(destTime, videoDuration - 0.05));
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

  // Define transition offsets based on mobile to avoid blank screen gaps
  const scene1OutTime = 0.8;
  const scene3InTime = isMobile ? 1.0 : 2.2;
  const scene3OutTime = isMobile ? 2.5 : 4.2;
  const scene4InTime = isMobile ? 2.8 : 5.2;
  const statsDuration = isMobile ? 1.4 : 1.8;
  const statsStartTime = isMobile ? 3.0 : 5.5;
  const scene4OutTime = isMobile ? 5.2 : 8.0;
  const videoFadeTime = isMobile ? 5.3 : 8.5;

  // 3. Scene 1: Logo & Scroll Prompt fades out
  tl.to("#scene-1", {
    opacity: 0,
    y: -50,
    autoAlpha: 0,
    ease: "power1.inOut"
  }, scene1OutTime); // fades out by ~8% of the scroll

  // Scene 2: Camera Enters Gate (camera movement in the video) - happens during scroll space between Scene 1 and 3

  // 4. Scene 3: Welcome text fades in and out
  tl.fromTo("#scene-3", 
    { opacity: 0, y: 50, autoAlpha: 0 },
    { opacity: 1, y: 0, autoAlpha: 1, ease: "power2.out" },
    scene3InTime
  );
  tl.to("#scene-3", 
    { opacity: 0, y: -50, autoAlpha: 0, ease: "power2.in" },
    scene3OutTime
  );

  // 5. Scene 4: Statistics section fades in
  tl.fromTo("#scene-4", 
    { opacity: 0, y: 50, autoAlpha: 0 },
    { opacity: 1, y: 0, autoAlpha: 1, ease: "power2.out" },
    scene4InTime
  );

  // Interpolate/tween statistics values dynamically during Scene 4 display
  const statsVal = { students: 0, courses: 0, faculty: 0, placements: 0 };
  tl.to(statsVal, {
    students: 1500,
    courses: 6,
    faculty: 50,
    placements: 100,
    ease: "power1.out",
    duration: statsDuration,
    onUpdate: () => {
      document.getElementById('stat-students').innerText = Math.round(statsVal.students) + "+";
      document.getElementById('stat-courses').innerText = Math.round(statsVal.courses);
      document.getElementById('stat-faculty').innerText = Math.round(statsVal.faculty) + "+";
      document.getElementById('stat-placements').innerText = Math.round(statsVal.placements) + "%";
    }
  }, statsStartTime);

  // Statistics fade out
  tl.to("#scene-4", 
    { opacity: 0, y: -50, autoAlpha: 0, ease: "power2.in" },
    scene4OutTime
  );

  // Fade and scale down the video container slightly at the transition end
  tl.to(".video-container", {
    opacity: 0.15,
    scale: 0.96,
    ease: "power1.inOut"
  }, videoFadeTime);

  // 6. Navigation bar trigger visibility
  // Navbar fades in when the storytelling ends, and hides when scrolled back up
  ScrollTrigger.create({
    trigger: "#story-pin-container",
    start: "bottom 20%",
    onEnter: () => {
      const navbar = document.getElementById('mainNavbar');
      navbar.classList.remove('navbar-hidden');
      navbar.classList.add('navbar-visible');
    },
    onLeaveBack: () => {
      const navbar = document.getElementById('mainNavbar');
      navbar.classList.add('navbar-hidden');
      navbar.classList.remove('navbar-visible');
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
          offset: -80, // Offset for navbar
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });
}

/* ==========================================================================
   10. Premium Custom Cursor & Mouse Glow Background
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

  // Use GSAP quickTo for ultra-smooth 60fps cursor movement
  const cursorX = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
  const cursorY = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });
  
  window.addEventListener('mousemove', (e) => {
    cursorX(e.clientX);
    cursorY(e.clientY);
    
    // Pass coordinates to background radial glow CSS variables
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // Cursor scaling interactions on hover
  const hoverables = document.querySelectorAll('a, button, .dept-card, .tab-btn, .gallery-item, select, input, textarea, .timeline-content');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ==========================================================================
   11. 3D Tilt Effect on Premium Cards
   ========================================================================== */
function initCardTilt() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || (window.matchMedia("(max-width: 1024px)").matches) 
                   || ('ontouchstart' in window);
                   
  if (isMobile) return;

  const cards = document.querySelectorAll('.dept-card, .about-feat-card, .placement-stat-card, .testimonial-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const rotateX = -(y - yc) / 10;
      const rotateY = (x - xc) / 10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        ease: "power2.out",
        duration: 0.4,
        overwrite: "auto"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
        duration: 0.5,
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
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
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

  // Animate timeline vertical line stretching
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

  // Animate timeline nodes and contents sliding in
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

    currentSlide.classList.remove('active');
    targetSlide.classList.add('active');

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
      images.push({
        src: imgEl.getAttribute('src') || imgEl.src,
        title: titleEl ? titleEl.innerText : 'Campus View',
        desc: descEl ? descEl.innerText : 'VVP Polytechnic Campus'
      });

      item.addEventListener('click', () => {
        openLightbox(index);
      });
    }
  });

  function openLightbox(index) {
    activeIndex = index;
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
