// Login Form Handlers
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Admin Login Handler
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
            console.log('Admin Login:', { username, password });
            
            // Redirect to attendance form after successful login
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'attendance.html';
            }, 1000);
        });
    }
    
    // Attendance Form Handler
    const attendanceForm = document.getElementById('attendanceForm');
    if (attendanceForm) {
        // Set today's date as default
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
            dateInput.setAttribute('max', today); // Prevent future dates
        }
        
        attendanceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(attendanceForm);
            const data = {
                studentName: formData.get('studentName').trim(),
                studentId: formData.get('studentId').trim(),
                date: formData.get('date'),
                subject: formData.get('subject').trim(),
                teacherName: formData.get('teacherName').trim(),
                status: formData.get('status'),
                remarks: formData.get('remarks').trim()
            };
            
            // Validation
            if (!data.studentName || !data.studentId || !data.date || 
                !data.subject || !data.teacherName || !data.status) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate student ID format (basic check)
            if (data.studentId.length < 3) {
                showMessage('Student ID must be at least 3 characters long.', 'error');
                return;
            }
            
            // Simulate form submission (in production, this would send to a server)
            console.log('Attendance Submission:', data);
            
            // Show success message
            showMessage('Attendance submitted successfully!', 'success');
            
            // Reset form after a short delay
            setTimeout(() => {
                attendanceForm.reset();
                if (dateInput) {
                    dateInput.value = today;
                }
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        });
    }
});

// Utility function to show messages
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
    
    // Insert message at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(message, form.firstChild);
    } else {
        // If no form, insert in the container
        const container = document.querySelector('.login-form') || 
                         document.querySelector('.attendance-form-wrapper');
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

// Auto-fill current date when page loads
window.addEventListener('load', function() {
    const dateInput = document.getElementById('date');
    if (dateInput && !dateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
});
