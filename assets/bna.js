const dialog = document.getElementById('bnaDialog');

document.querySelectorAll('[data-open-funnel]').forEach((el) => {
  el.addEventListener('click', () => {
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
  });
});

const params = new URLSearchParams(window.location.search);
['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach((key) => {
  const value = params.get(key);
  if (value) window.localStorage.setItem('bna_' + key, value);
});

let deferredInstallPrompt = null;
const installButtons = document.querySelectorAll('[data-install-app]');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButtons.forEach((button) => { button.hidden = false; });
});

installButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    if (!deferredInstallPrompt) {
      alert('To save this to your phone, use your browser menu and choose Add to Home Screen.');
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installButtons.forEach((btn) => { btn.hidden = true; });
  });
});

document.querySelectorAll('[data-share-app]').forEach((button) => {
  button.addEventListener('click', async () => {
    const shareData = {
      title: 'Bronx Nourish Access',
      text: 'Check available food help options for Bronx households.',
      url: window.location.href.split('#')[0]
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {}
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copied. You can paste it into a text message, WhatsApp, or Facebook.');
    } catch (error) {
      prompt('Copy this link:', shareData.url);
    }
  });
});
