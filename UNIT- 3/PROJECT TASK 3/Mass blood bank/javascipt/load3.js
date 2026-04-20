// loading.js
window.addEventListener('load', function() {
  setTimeout(function() {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    setTimeout(() => {
      if (overlay.parentNode) overlay.style.display = 'none';
    }, 500);
  }, 3000);
});