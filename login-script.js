// Gooey Text Morphing Animation
const texts = ["Engineering", "Is", "Really", "Awesome"];
let textIndex = 0;

function initGooeyText() {
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    
    if (!text1 || !text2) return;
    
    let morph = 0;
    let cooldown = 0.25;
    let morphTime = 1;
    
    // Set initial texts
    text1.textContent = texts[texts.length - 1];
    text2.textContent = texts[0];
    
    const setMorph = (fraction) => {
        if (text1 && text2) {
            text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            
            fraction = 1 - fraction;
            text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        }
    };
    
    const doCooldown = () => {
        morph = 0;
        if (text1 && text2) {
            text2.style.filter = '';
            text2.style.opacity = '100%';
            text1.style.filter = '';
            text1.style.opacity = '0%';
        }
    };
    
    const doMorph = () => {
        morph -= cooldown;
        cooldown = 0;
        let fraction = morph / morphTime;
        
        if (fraction > 1) {
            cooldown = 0.25;
            fraction = 1;
        }
        
        setMorph(fraction);
    };
    
    function animate() {
        requestAnimationFrame(animate);
        
        const shouldIncrementIndex = cooldown > 0;
        cooldown -= 0.016; // ~60fps
        
        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex = (textIndex + 1) % texts.length;
                if (text1 && text2) {
                    text1.textContent = texts[textIndex];
                    text2.textContent = texts[(textIndex + 1) % texts.length];
                }
            }
            doMorph();
        } else {
            doCooldown();
        }
        
        morph += 0.016;
    }
    
    animate();
}

// Loading Screen Management
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Initialize gooey text animation
    initGooeyText();
    
    // Show loading screen for 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }, 3000);
    
    // Handle login card clicks
    const loginCards = document.querySelectorAll('.login-card');
    loginCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const userType = this.getAttribute('data-type');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Redirect to appropriate login page
            setTimeout(() => {
                if (userType === 'student') {
                    window.location.href = 'student-login.html';
                } else if (userType === 'teacher') {
                    window.location.href = 'teacher-login.html';
                } else if (userType === 'principal') {
                    window.location.href = 'admin-login.html';
                }
            }, 300);
        });
    });
});

