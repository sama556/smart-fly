
// Create animated background
function createAnimatedBackground() {
    const bg = document.getElementById('animatedBg');
    const colors = ['rgba(255,255,255,0.1)', 'rgba(200,200,255,0.05)', 'rgba(150,200,255,0.08)'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 30 + 20;
        const animationDelay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}%`;
        shape.style.background = color;
        shape.style.animationDuration = `${animationDuration}s`;
        shape.style.animationDelay = `${animationDelay}s`;
        
        bg.appendChild(shape);
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Profile dropdown functionality
function setupProfileDropdown() {
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    
    profileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });
}

// Photo upload functionality
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePhoto = document.getElementById('profilePhoto');
            profilePhoto.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
        };
        reader.readAsDataURL(file);
    }
}

// Edit field functionality
function editField(field) {
    const fieldElement = event.target.closest('.info-item');
    const valueElement = fieldElement.querySelector('.info-value');
    const currentValue = valueElement.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.style.padding = '5px 10px';
    input.style.border = '2px solid var(--light-blue)';
    input.style.borderRadius = '5px';
    input.style.width = '200px';
    
    valueElement.innerHTML = '';
    valueElement.appendChild(input);
    input.focus();
    input.select();
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'edit-btn';
    saveBtn.style.background = 'var(--accent-gradient)';
    saveBtn.onclick = () => saveField(field, input.value);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'edit-btn';
    cancelBtn.style.background = 'var(--dark-gray)';
    cancelBtn.onclick = () => cancelEdit(valueElement, currentValue);
    
    fieldElement.querySelector('.edit-btn').replaceWith(saveBtn);
    fieldElement.appendChild(cancelBtn);
}

function saveField(field, newValue) {
    // Here you would typically send the data to a server
    alert(`${field} updated to: ${newValue}`);
    location.reload(); // Refresh to show updated value
}

function cancelEdit(valueElement, originalValue) {
    valueElement.textContent = originalValue;
    location.reload(); // Refresh to restore original state
}

// Travelers functionality
function showAddTravelerModal() {
    alert('Add Traveler modal would open here with a form to add new traveler information');
}

function editTraveler(travelerId) {
    alert(`Edit traveler ${travelerId} - This would open a modal with the traveler's current information for editing`);
}

function deleteTraveler(travelerId) {
    if (confirm(`Are you sure you want to delete traveler ${travelerId}?`)) {
        alert(`Traveler ${travelerId} deleted successfully`);
        // In a real application, you would remove the traveler from the database
        // and refresh the page or update the DOM
    }
}

// Password change functionality
function cancelPasswordChange() {
    document.getElementById('passwordForm').reset();
}

document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }
    
    alert('Password changed successfully!');
    this.reset();
});

// Profile navigation functions
function openFavorites() {
    alert('Favorites page coming soon!');
}

function openSettings() {
    alert('Settings page coming soon!');
}

function openHelp() {
    alert('Help & Support page coming soon!');
}

function logout() {
    if (confirm('Are you sure you want to sign out?')) {
        window.location.href = '../login.html';
    }
}

// Wallet functionality
function showAddCardModal() {
    document.getElementById('addCardModal').classList.add('show');
}

function showAddMoneyModal() {
    document.getElementById('addMoneyModal').classList.add('show');
}

function closeAddCardModal() {
    document.getElementById('addCardModal').classList.remove('show');
    document.getElementById('addCardForm').reset();
}

function closeAddMoneyModal() {
    document.getElementById('addMoneyModal').classList.remove('show');
    document.getElementById('addMoneyForm').reset();
}

function showChangePasswordModal() {
    document.getElementById('changePasswordModal').classList.add('show');
}

function closeChangePasswordModal() {
    document.getElementById('changePasswordModal').classList.remove('show');
    document.getElementById('changePasswordForm').reset();
}

function editCard(cardId) {
    alert(`Edit card ${cardId} - This would open a modal with the card's current information for editing`);
}

function deleteCard(cardId) {
    if (confirm(`Are you sure you want to delete card ${cardId}?`)) {
        alert(`Card ${cardId} deleted successfully`);
        // In a real application, you would remove the card from the database
        // and refresh the page or update the DOM
    }
}

function addTransaction(description, amount, type) {
    const transactionsList = document.querySelector('.transactions-list');
    const transactionItem = document.createElement('div');
    transactionItem.className = 'transaction-item';
    
    const icon = type === 'positive' ? 'fas fa-plus-circle' : 'fas fa-plane';
    const date = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    transactionItem.innerHTML = `
        <div class="transaction-icon">
            <i class="${icon}"></i>
        </div>
        <div class="transaction-details">
            <div class="transaction-description">${description}</div>
            <div class="transaction-date">${date}</div>
        </div>
        <div class="transaction-amount ${type}">${amount}</div>
    `;
    
    // Insert at the beginning of the list
    transactionsList.insertBefore(transactionItem, transactionsList.firstChild);
}

// Form submission handlers
function setupFormHandlers() {
    // Add Money Form
    document.getElementById('addMoneyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('amount').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardHolder = document.getElementById('cardHolder').value;
        
        // Validate form
        if (!amount || !cardNumber || !expiryDate || !cvv || !cardHolder) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate payment processing
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Update wallet balance
            const currentBalance = document.getElementById('walletBalance');
            const currentAmount = parseFloat(currentBalance.textContent.replace(/[^\d.]/g, ''));
            const newAmount = currentAmount + parseFloat(amount);
            currentBalance.textContent = newAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + ' SAR';
            
            // Add transaction
            addTransaction('Wallet Top-up', `+${parseFloat(amount).toFixed(2)} SAR`, 'positive');
            
            // Reset form and close modal
            this.reset();
            closeAddMoneyModal();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            alert(`Successfully added ${amount} SAR to your wallet!`);
        }, 2000);
    });
    
    // Add Card Form
    document.getElementById('addCardForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardNumber = document.getElementById('newCardNumber').value;
        const expiryDate = document.getElementById('newExpiryDate').value;
        const cvv = document.getElementById('newCvv').value;
        const cardHolder = document.getElementById('newCardHolder').value;
        
        // Validate form
        if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate card addition
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Adding Card...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Reset form and close modal
            this.reset();
            closeAddCardModal();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            alert('Card added successfully!');
        }, 1500);
    });
    
    // Change Password Form
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate form
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        // Validate password match
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        
        // Validate password strength
        if (!validatePasswordStrength(newPassword)) {
            alert('Password does not meet the requirements. Please check the requirements below.');
            return;
        }
        
        // Simulate password change
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Changing Password...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Reset form and close modal
            this.reset();
            closeChangePasswordModal();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            alert('Password changed successfully!');
        }, 2000);
    });
}

// Input formatting functions
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substring(0, 19);
    }
    input.value = formattedValue;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function formatCVV(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.substring(0, 4);
    }
    input.value = value;
}

// Password strength validation
function validatePasswordStrength(password) {
    // At least 8 characters
    if (password.length < 8) return false;
    
    // Contains uppercase letter
    if (!/[A-Z]/.test(password)) return false;
    
    // Contains lowercase letter
    if (!/[a-z]/.test(password)) return false;
    
    // Contains number
    if (!/\d/.test(password)) return false;
    
    // Contains special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
    
    return true;
}

// Setup input formatting
function setupInputFormatting() {
    // Card number formatting
    document.getElementById('cardNumber').addEventListener('input', function() {
        formatCardNumber(this);
    });
    
    document.getElementById('newCardNumber').addEventListener('input', function() {
        formatCardNumber(this);
    });
    
    // Expiry date formatting
    document.getElementById('expiryDate').addEventListener('input', function() {
        formatExpiryDate(this);
    });
    
    document.getElementById('newExpiryDate').addEventListener('input', function() {
        formatExpiryDate(this);
    });
    
    // CVV formatting
    document.getElementById('cvv').addEventListener('input', function() {
        formatCVV(this);
    });
    
    document.getElementById('newCvv').addEventListener('input', function() {
        formatCVV(this);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createAnimatedBackground();
    handleHeaderScroll();
    setupMobileMenu();
    setupProfileDropdown();
    setupFormHandlers();
    setupInputFormatting();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('show');
        }
    });
});
