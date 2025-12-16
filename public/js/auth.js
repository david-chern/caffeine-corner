// Authentication JavaScript

// API Base URL
const API_BASE = '/api/auth';

// Token management
const TokenManager = {
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  
  isAuthenticated: () => {
    return !!TokenManager.getToken();
  }
};

// User management
const UserManager = {
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  setCurrentUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  
  removeCurrentUser: () => {
    localStorage.removeItem('currentUser');
  }
};

// Update UI based on auth status
function updateAuthUI() {
  const authLink = document.querySelector('.auth-link');
  const navMenu = document.getElementById('navMenu');
  
  const currentUser = UserManager.getCurrentUser();
  
  if (currentUser && authLink) {
    // User is logged in - show just the name
    authLink.textContent = currentUser.name;
    authLink.href = '#';
    authLink.onclick = (e) => {
      e.preventDefault();
      openAccountDashboard();
    };
    authLink.classList.add('user-name-link');
    
    // Add logout option
    let logoutItem = document.getElementById('logout-item');
    if (!logoutItem && navMenu) {
      const cartIconParent = navMenu.querySelector('.cart-icon')?.parentElement;
      if (cartIconParent) {
        logoutItem = document.createElement('li');
        logoutItem.id = 'logout-item';
        logoutItem.innerHTML = '<a href="#" class="nav-link" onclick="logout(); return false;">Logout</a>';
        navMenu.insertBefore(logoutItem, cartIconParent);
      }
    } else if (logoutItem) {
      logoutItem.style.display = 'block';
    }
  } else {
    // User is not logged in
    if (authLink) {
      authLink.textContent = 'Login / Register';
      authLink.href = '#auth';
      authLink.onclick = null;
      authLink.classList.remove('user-name-link');
    }
    
    // Hide logout option
    const logoutItem = document.getElementById('logout-item');
    if (logoutItem) {
      logoutItem.style.display = 'none';
    }
  }
}

// Register function
async function register(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  
  // Client-side validation
  if (password !== confirmPassword) {
    showMessage('Passwords do not match!', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long!', 'error');
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword
      })
    });
    
    // Check if response is ok
    if (!response.ok) {
      // Try to parse error message
      try {
        const errorData = await response.json();
        showMessage(errorData.message || `Error: ${response.status} ${response.statusText}`, 'error');
      } catch (e) {
        showMessage(`Server error: ${response.status} ${response.statusText}`, 'error');
      }
      return;
    }
    
    const data = await response.json();
    
    if (data.success) {
      // Store token and user info
      TokenManager.setToken(data.token);
      UserManager.setCurrentUser(data.user);
      
      showMessage('Registration successful! Welcome to Caffeine Corner!', 'success');
      updateAuthUI();
      
      // Hide auth section and scroll to top
      setTimeout(() => {
        window.location.href = '#home';
        form.reset();
      }, 1500);
    } else {
      showMessage(data.message || 'Registration failed. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showMessage(`Network error: ${error.message}. Please check if the server is running.`, 'error');
  }
}

// Login function
async function login(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    // Check if response is ok
    if (!response.ok) {
      // Try to parse error message
      try {
        const errorData = await response.json();
        showMessage(errorData.message || `Error: ${response.status} ${response.statusText}`, 'error');
      } catch (e) {
        showMessage(`Server error: ${response.status} ${response.statusText}`, 'error');
      }
      return;
    }
    
    const data = await response.json();
    
    if (data.success) {
      // Store token and user info
      TokenManager.setToken(data.token);
      UserManager.setCurrentUser(data.user);
      
      showMessage(`Welcome back, ${data.user.name}!`, 'success');
      updateAuthUI();
      
      // Hide auth section and scroll to top
      setTimeout(() => {
        window.location.href = '#home';
        form.reset();
      }, 1500);
    } else {
      showMessage(data.message || 'Invalid email or password.', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showMessage(`Network error: ${error.message}. Please check if the server is running.`, 'error');
  }
}

// Logout function
function logout() {
  TokenManager.removeToken();
  UserManager.removeCurrentUser();
  
  // Check if we're on account page, redirect to home
  if (window.location.pathname.includes('account.html')) {
    window.location.href = 'index.html#home';
  } else {
    showMessage('You have been logged out.', 'success');
    updateAuthUI();
    window.location.href = '#home';
  }
}

// Show message to user
function showMessage(message, type = 'info') {
  // Remove existing messages
  const existingMessage = document.getElementById('auth-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.id = 'auth-message';
  messageDiv.className = `auth-message auth-message-${type}`;
  messageDiv.textContent = message;
  
  // Insert message into auth container
  const authContainer = document.querySelector('.auth-container');
  if (authContainer) {
    authContainer.insertBefore(messageDiv, authContainer.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

// Check authentication status on page load
async function checkAuthStatus() {
  const token = TokenManager.getToken();
  
  if (token) {
    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        UserManager.setCurrentUser(data.user);
      } else {
        // Token is invalid, clear it
        TokenManager.removeToken();
        UserManager.removeCurrentUser();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      TokenManager.removeToken();
      UserManager.removeCurrentUser();
    }
  }
  
  updateAuthUI();
}

// Initialize auth on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    
    // Attach form handlers
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    
    if (loginForm) {
      loginForm.addEventListener('submit', login);
    }
    
    if (registerForm) {
      registerForm.addEventListener('submit', register);
    }
  });
} else {
  checkAuthStatus();
  
  // Attach form handlers
  const loginForm = document.getElementById('loginFormElement');
  const registerForm = document.getElementById('registerFormElement');
  
  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', register);
  }
}

// Open Account Dashboard
function openAccountDashboard() {
  const currentUser = UserManager.getCurrentUser();
  
  if (!currentUser) {
    window.location.href = 'index.html#auth';
    return;
  }

  // Create or show dashboard modal
  let dashboard = document.getElementById('accountDashboard');
  
  if (!dashboard) {
    dashboard = createAccountDashboard();
    document.body.appendChild(dashboard);
  }
  
  dashboard.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Create Account Dashboard Modal
function createAccountDashboard() {
  const currentUser = UserManager.getCurrentUser();
  
  const dashboard = document.createElement('div');
  dashboard.id = 'accountDashboard';
  dashboard.className = 'account-dashboard-modal';
  
  dashboard.innerHTML = `
    <div class="dashboard-overlay" onclick="closeAccountDashboard()"></div>
    <div class="dashboard-content">
      <div class="dashboard-header">
        <h2>Account Dashboard</h2>
        <button class="dashboard-close" onclick="closeAccountDashboard()">&times;</button>
      </div>
      <div class="dashboard-body">
        <div class="dashboard-welcome">
          <p>Welcome, <strong>${currentUser.name}</strong></p>
          <p class="dashboard-email">${currentUser.email}</p>
        </div>
        <div class="dashboard-menu">
          <a href="account.html" class="dashboard-item" onclick="closeAccountDashboard(); return true;">
            <span class="dashboard-icon">👤</span>
            <div>
              <h3>View / Edit Profile</h3>
              <p>Manage your personal information</p>
            </div>
          </a>
          <a href="account.html" class="dashboard-item" onclick="closeAccountDashboard(); setTimeout(() => { const section = document.querySelector('.account-section:nth-of-type(2)'); if(section) section.scrollIntoView({behavior: 'smooth'}); }, 100); return true;">
            <span class="dashboard-icon">📍</span>
            <div>
              <h3>Change Shipping Address</h3>
              <p>Update your delivery addresses</p>
            </div>
          </a>
          <a href="account.html" class="dashboard-item" onclick="closeAccountDashboard(); setTimeout(() => { const section = document.getElementById('password'); if(section) section.scrollIntoView({behavior: 'smooth'}); }, 100); return true;">
            <span class="dashboard-icon">🔒</span>
            <div>
              <h3>Change Password</h3>
              <p>Update your account password</p>
            </div>
          </a>
          <a href="#" class="dashboard-item" onclick="event.preventDefault(); showOrderHistory(); closeAccountDashboard();">
            <span class="dashboard-icon">📦</span>
            <div>
              <h3>Order History</h3>
              <p>View your past orders</p>
            </div>
          </a>
          <div class="dashboard-divider"></div>
          <button class="dashboard-item dashboard-logout" onclick="logout(); closeAccountDashboard();">
            <span class="dashboard-icon">🚪</span>
            <div>
              <h3>Logout</h3>
              <p>Sign out of your account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
  
  return dashboard;
}

// Close Account Dashboard
function closeAccountDashboard() {
  const dashboard = document.getElementById('accountDashboard');
  if (dashboard) {
    dashboard.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Show Order History (placeholder)
function showOrderHistory() {
  alert('Order History feature coming soon!');
  // TODO: Implement order history page
}

// Export functions for global access
window.register = register;
window.login = login;
window.logout = logout;
window.openAccountDashboard = openAccountDashboard;
window.closeAccountDashboard = closeAccountDashboard;
window.showOrderHistory = showOrderHistory;
window.TokenManager = TokenManager;
window.UserManager = UserManager;

