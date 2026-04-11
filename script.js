const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle ? themeToggle.querySelector('i') : null;

const currentTheme = localStorage.getItem('theme') || 'dark'; 

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
} else {
    body.classList.remove('dark-mode');
    if (icon) icon.classList.replace('fa-sun', 'fa-moon');
}
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        if (icon) {
            icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

document.addEventListener('mousemove', (e) => {
    const doodles = document.querySelectorAll('.doodle');
    if (doodles.length === 0) return;

    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    doodles.forEach((doodle, index) => {
        const speed = index === 0 ? 2 : -2; 
        doodle.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${speed * 5}deg)`;
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === "#") return; 
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const nameHeader = document.querySelector(".name-text");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#________";
let interval = null;

function scrambleName() {
  let iteration = 0;
  clearInterval(interval);
  
  interval = setInterval(() => {
    nameHeader.innerText = nameHeader.innerText
      .split("")
      .map((letter, index) => {
        // Keep the space fixed
        if (nameHeader.dataset.value[index] === " ") return " ";
        
        // Lock in the correct letter
        if (index < iteration) {
          return nameHeader.dataset.value[index];
        }
      
        // Random symbol for the rest
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");
    
    if (iteration >= nameHeader.dataset.value.length) {
      clearInterval(interval);
    }
    
    iteration += 1 / 3; 
  }, 30);
}

// ONLY trigger on the initial load
window.addEventListener('load', scrambleName);

// DELETE OR COMMENT OUT THE LINE BELOW
// nameHeader.onmouseover = scrambleName;


// CV Enlargement Logic
const cvTarget = document.getElementById('cv-paper');
const cvOverlay = document.getElementById('cv-overlay');
const closeBtn = document.querySelector('.close-overlay');

if (cvTarget && cvOverlay) {
    // Open Overlay
    cvTarget.addEventListener('click', () => {
        cvOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    });

    // Close Overlay (by clicking background or X)
    const closeOverlay = () => {
        cvOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    cvOverlay.addEventListener('click', closeOverlay);
    closeBtn.addEventListener('click', closeOverlay);
}