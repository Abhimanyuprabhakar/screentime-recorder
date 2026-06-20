document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const domain = urlParams.get('domain');
  const until = urlParams.get('until');

  if (domain) {
    document.getElementById('domain-name').textContent = domain;
  }

  if (until) {
    const untilDate = new Date(until);
    document.getElementById('block-time').textContent = untilDate.toLocaleString();
  }

  const dashboardBtn = document.getElementById('dashboard-btn');
  dashboardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: EXTENSION_CONFIG.FRONTEND_URL });
  });
});
