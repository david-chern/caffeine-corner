// Account Page JavaScript

const API_BASE = '/api/auth';

let currentUser = null;
let isEditingInfo = false;
let originalUserData = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndLoadAccount();
    setupEventListeners();
});

// Check authentication and load account data
async function checkAuthAndLoadAccount() {
    const token = TokenManager.getToken();
    
    if (!token) {
        // Not logged in, redirect to login
        window.location.href = 'index.html#auth';
        return;
    }

    await loadAccountData();
    updateAuthUI();
}

// Load account data from server
async function loadAccountData() {
    const token = TokenManager.getToken();
    
    if (!token) {
        showError('Please log in to view your account.');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${API_BASE}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                TokenManager.removeToken();
                UserManager.removeCurrentUser();
                window.location.href = 'index.html#auth';
                return;
            }
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            originalUserData = JSON.parse(JSON.stringify(data.user));
            displayAccountData(data.user);
            hideLoading();
        } else {
            throw new Error(data.message || 'Failed to load account data');
        }
    } catch (error) {
        console.error('Load account error:', error);
        hideLoading();
        showError(`Error loading account: ${error.message}`);
    }
}

// Display account data
function displayAccountData(user) {
    // Display account info
    document.getElementById('accountName').value = user.name || '';
    document.getElementById('accountEmail').value = user.email || '';

    // Display addresses
    displayAddresses(user.addresses || []);

    // Show account content
    document.getElementById('accountContent').style.display = 'block';
}

// Display addresses
function displayAddresses(addresses) {
    const addressesList = document.getElementById('addressesList');
    
    if (!addresses || addresses.length === 0) {
        addressesList.innerHTML = '<p class="no-addresses">No shipping addresses saved. Click "Add Address" to add one.</p>';
        return;
    }

    addressesList.innerHTML = addresses.map((address, index) => `
        <div class="address-card">
            <div class="address-content">
                <p><strong>${address.street || ''}</strong></p>
                <p>${address.city || ''}, ${address.state || ''} ${address.zipCode || ''}</p>
                <p>${address.country || 'USA'}</p>
            </div>
            <div class="address-actions">
                <button class="btn btn-small" onclick="editAddress(${index})">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteAddress(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Edit info button
    document.getElementById('editInfoBtn').addEventListener('click', () => {
        enableEditMode('info');
    });

    // Add address button
    document.getElementById('addAddressBtn').addEventListener('click', () => {
        showAddressForm();
    });

    // Account info form
    document.getElementById('accountInfoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveAccountInfo();
    });

    // Address form
    document.getElementById('addressForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveAddress();
    });

    // Password form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await changePassword();
        });
    }

    // Handle hash navigation (for dashboard links)
    if (window.location.hash === '#addresses') {
        setTimeout(() => {
            const addressesSection = document.querySelector('.account-section:nth-of-type(2)');
            if (addressesSection) {
                addressesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
    } else if (window.location.hash === '#password') {
        setTimeout(() => {
            const passwordSection = document.getElementById('password');
            if (passwordSection) {
                passwordSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
    }
}

// Enable edit mode for account info
function enableEditMode(section) {
    if (section === 'info') {
        isEditingInfo = true;
        document.getElementById('accountName').removeAttribute('readonly');
        document.getElementById('accountEmail').removeAttribute('readonly');
        document.getElementById('infoFormActions').style.display = 'flex';
        document.getElementById('editInfoBtn').style.display = 'none';
    }
}

// Cancel edit
function cancelEdit(section) {
    if (section === 'info') {
        isEditingInfo = false;
        // Restore original values
        if (originalUserData) {
            document.getElementById('accountName').value = originalUserData.name || '';
            document.getElementById('accountEmail').value = originalUserData.email || '';
        }
        document.getElementById('accountName').setAttribute('readonly', 'readonly');
        document.getElementById('accountEmail').setAttribute('readonly', 'readonly');
        document.getElementById('infoFormActions').style.display = 'none';
        document.getElementById('editInfoBtn').style.display = 'block';
    }
}

// Save account info
async function saveAccountInfo() {
    const token = TokenManager.getToken();
    const name = document.getElementById('accountName').value.trim();
    const email = document.getElementById('accountEmail').value.trim();

    if (!name || !email) {
        showError('Name and email are required.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/me`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update account');
        }

        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            originalUserData = JSON.parse(JSON.stringify(data.user));
            UserManager.setCurrentUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            });
            
            showSuccess('Account information updated successfully!');
            cancelEdit('info');
            updateAuthUI();
        }
    } catch (error) {
        console.error('Save account error:', error);
        showError(`Error updating account: ${error.message}`);
    }
}

// Show address form
function showAddressForm(index = null) {
    const formContainer = document.getElementById('addressFormContainer');
    const form = document.getElementById('addressForm');
    
    if (index !== null && currentUser.addresses[index]) {
        // Edit mode
        const address = currentUser.addresses[index];
        document.getElementById('addressIndex').value = index;
        document.getElementById('addressStreet').value = address.street || '';
        document.getElementById('addressCity').value = address.city || '';
        document.getElementById('addressState').value = address.state || '';
        document.getElementById('addressZip').value = address.zipCode || '';
        document.getElementById('addressCountry').value = address.country || 'USA';
    } else {
        // Add mode
        document.getElementById('addressIndex').value = '';
        form.reset();
        document.getElementById('addressCountry').value = 'USA';
    }
    
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Cancel address form
function cancelAddressForm() {
    document.getElementById('addressFormContainer').style.display = 'none';
    document.getElementById('addressForm').reset();
}

// Edit address
function editAddress(index) {
    showAddressForm(index);
}

// Delete address
async function deleteAddress(index) {
    if (!confirm('Are you sure you want to delete this address?')) {
        return;
    }

    const addresses = [...currentUser.addresses];
    addresses.splice(index, 1);

    await saveAddresses(addresses);
}

// Save address
async function saveAddress() {
    const token = TokenManager.getToken();
    const index = document.getElementById('addressIndex').value;
    const addresses = [...(currentUser.addresses || [])];

    const newAddress = {
        street: document.getElementById('addressStreet').value.trim(),
        city: document.getElementById('addressCity').value.trim(),
        state: document.getElementById('addressState').value.trim(),
        zipCode: document.getElementById('addressZip').value.trim(),
        country: document.getElementById('addressCountry').value.trim() || 'USA'
    };

    if (index === '' || index === null) {
        // Add new address
        addresses.push(newAddress);
    } else {
        // Update existing address
        addresses[parseInt(index)] = newAddress;
    }

    await saveAddresses(addresses);
}

// Save addresses to server
async function saveAddresses(addresses) {
    const token = TokenManager.getToken();

    try {
        const response = await fetch(`${API_BASE}/me`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                addresses
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update addresses');
        }

        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            originalUserData = JSON.parse(JSON.stringify(data.user));
            displayAddresses(data.user.addresses);
            cancelAddressForm();
            showSuccess('Address saved successfully!');
        }
    } catch (error) {
        console.error('Save addresses error:', error);
        showError(`Error saving address: ${error.message}`);
    }
}

// Update auth UI (from auth.js)
function updateAuthUI() {
    const authLink = document.querySelector('.auth-link');
    const logoutItem = document.getElementById('logout-item');
    const currentUser = UserManager.getCurrentUser();
    
    if (currentUser && authLink) {
        authLink.textContent = currentUser.name;
        authLink.href = '#';
        authLink.onclick = (e) => {
            e.preventDefault();
            if (typeof openAccountDashboard === 'function') {
                openAccountDashboard();
            } else {
                window.location.href = 'account.html';
            }
        };
        authLink.classList.add('user-name-link');
        if (logoutItem) logoutItem.style.display = 'block';
    } else {
        if (authLink) {
            authLink.textContent = 'Login / Register';
            authLink.href = 'index.html#auth';
            authLink.onclick = null;
            authLink.classList.remove('user-name-link');
        }
        if (logoutItem) logoutItem.style.display = 'none';
    }
}

// Show/hide loading state
function showLoading() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('accountContent').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

// Change password
async function changePassword() {
    const token = TokenManager.getToken();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    // Validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        showError('Please fill in all password fields.');
        return;
    }

    if (newPassword.length < 6) {
        showError('New password must be at least 6 characters long.');
        return;
    }

    if (newPassword !== confirmNewPassword) {
        showError('New passwords do not match.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to change password');
        }

        const data = await response.json();
        
        if (data.success) {
            showSuccess('Password changed successfully!');
            document.getElementById('passwordForm').reset();
        }
    } catch (error) {
        console.error('Change password error:', error);
        showError(`Error changing password: ${error.message}`);
    }
}

// Export functions for inline onclick handlers
window.editAddress = editAddress;
window.deleteAddress = deleteAddress;
window.cancelEdit = cancelEdit;
window.cancelAddressForm = cancelAddressForm;

