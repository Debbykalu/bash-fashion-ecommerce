/* ==========================================================================
   BIODUN STYLE GRID (BSG) - SIMULATED AUTHENTICATION SCRIPT
   Prototype authentication using localStorage for demonstration
   ========================================================================== */

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('bsg_user')) || null;
  } catch (e) {
    return null;
  }
}

function registerUser(firstName, lastName, email, phone, password) {
  const users = JSON.parse(localStorage.getItem('bsg_users_db')) || [];
  
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    phone,
    password, // prototype only
    createdAt: new Date().toLocaleDateString('en-NG')
  };

  users.push(newUser);
  localStorage.setItem('bsg_users_db', JSON.stringify(users));
  localStorage.setItem('bsg_user', JSON.stringify(newUser));

  return { success: true, user: newUser };
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('bsg_users_db')) || [];
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  localStorage.setItem('bsg_user', JSON.stringify(user));
  return { success: true, user: user };
}

function logoutUser() {
  localStorage.removeItem('bsg_user');
  window.location.href = 'index.html';
}

function updateNavAuthUI() {
  const user = getCurrentUser();
  const accountNav = document.querySelectorAll('.nav-account-link');

  accountNav.forEach(link => {
    if (user) {
      link.href = 'account.html';
      link.innerHTML = `<i class="bi bi-person-fill text-bsg-burgundy me-1"></i> ${user.firstName}`;
    } else {
      link.href = 'login.html';
      link.innerHTML = `<i class="bi bi-person me-1"></i> Account`;
    }
  });
}

document.addEventListener('DOMContentLoaded', updateNavAuthUI);
