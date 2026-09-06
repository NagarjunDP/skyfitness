// SKY FITNESS GYM - INTERACTIVE FRONTEND ENGINE (TYGO FITNESS EDITION)
document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initHeroSlider();
  initNavbar();
  initMobileMenu();
  initTrainingTabs();
  initBMICalculator();
  initPricingTabs();
  initScrollAnimations();
});

/* 1. TYGO-STYLE HERO BANNER SLIDER ENGINE */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots-indicator .dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 5000; // 5 Seconds auto-slide

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Controls Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoSlide();
    });
  });

  // Pause auto slide when user hovers over hero
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);
  }

  // Initialize Auto Slide
  startAutoSlide();
}

/* 2. Navbar Scroll Shrink & Active Link Highlight */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Shrink navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 3. Fullscreen Mobile Drawer Menu Toggle */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileMenu) return;

  function toggleMenu(e) {
    if (e) e.stopPropagation();
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    hamburgerBtn.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* 4. Training Programs Interactive Tab Swapper */
function initTrainingTabs() {
  const tabs = document.querySelectorAll('.training-tab');
  const programName = document.getElementById('programName');
  const programDesc = document.getElementById('programDesc');
  const programImg = document.getElementById('programImg');

  const programData = {
    strength: {
      name: "STRENGTH TRAINING",
      desc: "Progressive overload, powerlifting racks, hex bars, and heavy bumper plates designed for maximum raw strength development and neuromuscular adaptations.",
      img: "./images/real_squat_rack.jpg"
    },
    functional: {
      name: "FUNCTIONAL TRAINING",
      desc: "High-intensity athletic movement, cable stations, battle ropes, and sled pushes on our open gym floor to optimize real-world stamina.",
      img: "./images/real_gym_machines.jpg"
    },
    cardio: {
      name: "CARDIO ENDURANCE",
      desc: "Commercial Aerofit treadmills, ellipticals, and cross-trainers engineered for heart rate zone conditioning and fat burning efficiency.",
      img: "./images/real_cardio_treadmills.jpg"
    },
    weight: {
      name: "WEIGHT TRAINING",
      desc: "Heavy dumbbell racks, incline & flat benches, isolation machinery, and barbell stations for targeted muscle sculpting.",
      img: "./images/real_dumbbells.jpg"
    },
    personal: {
      name: "PERSONAL TRAINING",
      desc: "1-on-1 dedicated coaching, posture correction, personalized nutrition strategy, and structured milestone tracking on the gym floor.",
      img: "./images/real_floor_wide.jpg"
    },
    fatloss: {
      name: "FAT LOSS & SHRED",
      desc: "Caloric expenditure optimization workouts combining metabolic conditioning with resistance circuits for lasting body composition change.",
      img: "./images/real_cardio_ellipticals.jpg"
    },
    muscle: {
      name: "MUSCLE BUILDING",
      desc: "Hypertrophy protocols targeting mechanical tension and volume to construct dense athletic physique with expert form guidance.",
      img: "./images/real_squat_rack.jpg"
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const programKey = tab.getAttribute('data-program');
      const data = programData[programKey];

      if (data && programName && programDesc && programImg) {
        programImg.style.opacity = '0.3';
        setTimeout(() => {
          programName.textContent = data.name;
          programDesc.textContent = data.desc;
          programImg.src = data.img;
          programImg.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* 5. Interactive Front-End BMI Calculator */
function initBMICalculator() {
  const bmiForm = document.getElementById('bmiForm');
  const sexBtns = document.querySelectorAll('.sex-btn');
  const sexInput = document.getElementById('sexInput');
  const bmiResultPanel = document.getElementById('bmiResultPanel');
  const bmiScoreNum = document.getElementById('bmiScoreNum');
  const bmiCategoryBadge = document.getElementById('bmiCategoryBadge');
  const bmiPin = document.getElementById('bmiPin');
  const resetBtn = document.getElementById('bmiResetBtn');

  if (!bmiForm) return;

  // Sex Button Toggle
  sexBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sexBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (sexInput) sexInput.value = btn.getAttribute('data-sex');
    });
  });

  // Calculate BMI Action
  bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weightInput').value);
    const heightCm = parseFloat(document.getElementById('heightInput').value);

    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
      alert('Please enter valid weight (kg) and height (cm).');
      return;
    }

    // Standard Formula: BMI = weight / (height_m)^2
    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    const bmiVal = parseFloat(bmi);

    // Determine Adult BMI Category
    let category = '';
    let badgeColor = '#3b82f6';
    let pinPercentage = 0;

    if (bmiVal < 18.5) {
      category = 'UNDERWEIGHT';
      badgeColor = '#3b82f6';
      pinPercentage = Math.max(5, ((bmiVal - 10) / (18.5 - 10)) * 25);
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      category = 'NORMAL WEIGHT';
      badgeColor = '#00ff66';
      pinPercentage = 25 + ((bmiVal - 18.5) / (24.9 - 18.5)) * 30;
    } else if (bmiVal >= 25.0 && bmiVal <= 29.9) {
      category = 'OVERWEIGHT';
      badgeColor = '#eab308';
      pinPercentage = 55 + ((bmiVal - 25.0) / (29.9 - 25.0)) * 25;
    } else {
      category = 'OBESITY';
      badgeColor = '#ef4444';
      pinPercentage = Math.min(95, 80 + ((bmiVal - 30.0) / (40 - 30.0)) * 20);
    }

    // Animate Result Display
    bmiResultPanel.style.display = 'flex';
    bmiCategoryBadge.textContent = category;
    bmiCategoryBadge.style.color = badgeColor;
    bmiCategoryBadge.style.borderColor = badgeColor;

    // Number Counter Animation
    animateNumber(bmiScoreNum, 0, bmiVal, 600);

    // Animate Scale Pin position
    setTimeout(() => {
      bmiPin.style.left = `${pinPercentage}%`;
    }, 100);
  });

  // Reset Action
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      bmiForm.reset();
      bmiResultPanel.style.display = 'none';
      bmiPin.style.left = '0%';
    });
  }
}

// Helper Number Animation
function animateNumber(element, start, end, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentVal = (progress * (end - start) + start).toFixed(1);
    element.textContent = currentVal;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

/* 6. Scroll Animations via IntersectionObserver */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.hero-headline, .section-title, .intro-text-box, .training-tab, .bmi-card, .principle-row, .facility-card, .trainer-card, .pricing-card, .address-block');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* 7. Dual Pricing Switcher & PT Duration Filters */
function initPricingTabs() {
  const tabBtns = document.querySelectorAll('.pricing-tab-btn');
  const panels = document.querySelectorAll('.pricing-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // PT Duration Sub-filters
  const ptFilterBtns = document.querySelectorAll('.pt-filter-btn');
  const ptGroups = document.querySelectorAll('.pt-duration-group');

  ptFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const durationId = btn.getAttribute('data-pt-duration');

      ptFilterBtns.forEach(b => b.classList.remove('active'));
      ptGroups.forEach(g => g.classList.remove('active'));

      btn.classList.add('active');
      const targetGroup = document.getElementById(durationId);
      if (targetGroup) {
        targetGroup.classList.add('active');
      }
    });
  });
}

/* 8. Luxury Theme Switcher Engine */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('[data-theme-btn]');
  const savedTheme = localStorage.getItem('skyfitness_theme') || 'gold';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('skyfitness_theme', theme);

    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-btn') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Set initial theme
  setTheme(savedTheme);

  // Attach event listeners to theme buttons
  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedTheme = btn.getAttribute('data-theme-btn');
      setTheme(selectedTheme);
    });
  });
}

