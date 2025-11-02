// Login Form Handlers with Black Theme
document.addEventListener('DOMContentLoaded', function() {
    
    // Add input focus styles
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--accent-color)';
            this.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-color)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add button hover effects
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.background = 'var(--accent-hover)';
            this.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'var(--accent-color)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Student Login Handler
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('studentId').value.trim();
            const password = document.getElementById('studentPassword').value;
            
            // Basic validation
            if (!studentId || !password) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate login (in production, this would connect to a backend)
            console.log('Student Login:', { studentId, password });
            
            // Redirect to attendance form after successful login
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'attendance.html';
            }, 1000);
        });
    }
    
    // Teacher Login Handler
    const teacherLoginForm = document.getElementById('teacherLoginForm');
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teacherId = document.getElementById('teacherId').value.trim();
            const password = document.getElementById('teacherPassword').value;
            
            // Basic validation
            if (!teacherId || !password) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate login (in production, this would connect to a backend)
            console.log('Teacher Login:', { teacherId, password });
            
            // Redirect to attendance form after successful login
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'attendance.html';
            }, 1000);
        });
    }
    
    // Admin/Principal Login Handler
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('adminUsername').value.trim();
            const password = document.getElementById('adminPassword').value;
            
            // Basic validation
            if (!username || !password) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate login (in production, this would connect to a backend)
            console.log('Admin/Principal Login:', { username, password });
            
            // Redirect to attendance form after successful login
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'attendance.html';
            }, 1000);
        });
    }
});

// Utility function to show messages with dark theme
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;
    
    // Style the message for dark theme
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
    message.style.borderRadius = '6px';
    message.style.marginBottom = '1.5rem';
    message.style.fontSize = '0.95rem';
    message.style.textAlign = 'center';
    
    // Insert message at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(message, form.firstChild);
    } else {
        // If no form, insert in the container
        const container = document.querySelector('.login-box');
        if (container) {
            container.insertBefore(message, container.firstChild);
        }
    }
    
    // Auto-remove message after 5 seconds
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

