// Floating Particles Background
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Show message function
    function showMessage(text, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.textContent = text;
        
        if (type === 'success') {
            message.style.background = 'rgba(74, 222, 128, 0.2)';
            message.style.color = '#4ade80';
            message.style.border = '1px solid rgba(74, 222, 128, 0.3)';
        } else {
            message.style.background = 'rgba(239, 68, 68, 0.2)';
            message.style.color = '#ef4444';
            message.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        }
        
        message.style.padding = '12px 15px';
        message.style.borderRadius = '12px';
        message.style.marginBottom = '1.5rem';
        message.style.fontSize = '0.95rem';
        message.style.textAlign = 'center';
        message.style.backdropFilter = 'blur(10px)';
        
        const form = document.querySelector('form');
        if (form) {
            form.insertBefore(message, form.firstChild);
        }
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 300);
        }, 5000);
    }
    
    // Setup forms
    function setupForm(formId, passwordInputId, userType) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const submitBtn = document.getElementById('submitBtn');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById(passwordInputId);
        
        // Password toggle
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                const icon = this.querySelector('.eye-icon');
                if (icon) {
                    icon.textContent = type === 'password' ? '👁️' : '🙈';
                }
            });
        }
        
        // Form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const idValue = formData.get('studentId') || formData.get('teacherId') || formData.get('username');
            const password = formData.get('password');
            
            if (!idValue || !password) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log(`${userType} Login:`, { id: idValue, password });
            
            if (submitBtn) {
                submitBtn.classList.remove('loading');
            }
            showMessage('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'attendance.html';
            }, 1000);
        });
    }
    
    // Initialize all forms
    setupForm('studentLoginForm', 'studentPassword', 'Student');
    setupForm('teacherLoginForm', 'teacherPassword', 'Teacher');
    setupForm('adminLoginForm', 'adminPassword', 'Admin');
});

