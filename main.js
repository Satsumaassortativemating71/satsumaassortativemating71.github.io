// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const cursorDot = document.querySelector('.cursor-dot');
const canTrackCursor = cursorDot && window.matchMedia('(pointer: fine)').matches;
const navMenuWrap = document.querySelector('.nav-menu-wrap');
let navMenuCloseTimer;

const checkIfInView = () => {
  const triggerBottom = window.innerHeight * 0.8;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      el.classList.add('in-view');
    } else {
      el.classList.remove('in-view');
    }
  });
};

window.addEventListener('scroll', checkIfInView);
// Initial check on page load
window.addEventListener('load', checkIfInView);

if (canTrackCursor) {
  document.body.classList.add('has-cursor');
  const hoverables = document.querySelectorAll('a, button');

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  const animateCursor = () => {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursorDot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };

  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  window.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
  });

  window.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
  });

  hoverables.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      cursorDot.style.width = '22px';
      cursorDot.style.height = '22px';
      cursorDot.style.borderColor = 'rgba(130, 171, 237, 1)';
    });

    item.addEventListener('mouseleave', () => {
      cursorDot.style.width = '14px';
      cursorDot.style.height = '14px';
      cursorDot.style.borderColor = 'rgba(130, 171, 237, 0.8)';
    });
  });

  animateCursor();
}

if (navMenuWrap) {
  const navMenuTrigger = navMenuWrap.querySelector('.nav-menu-trigger');

  const openMenu = () => {
    clearTimeout(navMenuCloseTimer);
    navMenuWrap.classList.add('is-open');
    if (navMenuTrigger) {
      navMenuTrigger.setAttribute('aria-expanded', 'true');
    }
  };

  const closeMenu = () => {
    clearTimeout(navMenuCloseTimer);
    navMenuCloseTimer = setTimeout(() => {
      navMenuWrap.classList.remove('is-open');
      if (navMenuTrigger) {
        navMenuTrigger.setAttribute('aria-expanded', 'false');
      }
    }, 700);
  };

  navMenuWrap.addEventListener('mouseenter', openMenu);
  navMenuWrap.addEventListener('mouseleave', closeMenu);
  navMenuWrap.addEventListener('focusin', openMenu);
  navMenuWrap.addEventListener('focusout', closeMenu);
}


