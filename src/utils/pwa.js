"use client";

// PWA Installation and Management Utilities
export class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isStandalone = false;
    
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    // Check if app is running in standalone mode
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone ||
                       document.referrer.includes('android-app://');

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallButton();
      this.showInstallSuccess();
    });

    // Register service worker
    this.registerServiceWorker();

    // Setup push notifications
    this.setupPushNotifications();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateAvailable();
            }
          });
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  async setupPushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Push notifications enabled');
      }
    }
  }

  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
    }
  }

  showInstallButton() {
    // Show install button in UI
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'block';
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('pwa-installable'));
  }

  hideInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  showInstallSuccess() {
    // Show success message
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  }

  showUpdateAvailable() {
    // Show update available notification
    window.dispatchEvent(new CustomEvent('pwa-update-available'));
  }

  async sendPushNotification(title, options = {}) {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      
      const defaultOptions = {
        body: 'Tournament update available',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {
            action: 'explore',
            title: 'View Details',
            icon: '/icons/checkmark.png'
          },
          {
            action: 'close',
            title: 'Close',
            icon: '/icons/xmark.png'
          }
        ]
      };

      const notificationOptions = { ...defaultOptions, ...options };
      
      registration.showNotification(title, notificationOptions);
    }
  }

  // Device capabilities detection
  getDeviceCapabilities() {
    return {
      isOnline: navigator.onLine,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
      isAndroid: /Android/.test(navigator.userAgent),
      hasCamera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      hasGeolocation: 'geolocation' in navigator,
      hasVibration: 'vibrate' in navigator,
      hasNotifications: 'Notification' in window,
      hasPushManager: 'PushManager' in window,
      hasServiceWorker: 'serviceWorker' in navigator,
      isStandalone: this.isStandalone,
      screenSize: {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  // Network status monitoring
  setupNetworkMonitoring() {
    window.addEventListener('online', () => {
      window.dispatchEvent(new CustomEvent('network-online'));
    });

    window.addEventListener('offline', () => {
      window.dispatchEvent(new CustomEvent('network-offline'));
    });
  }

  // App shortcuts management
  async updateShortcuts(shortcuts) {
    if ('navigator' in window && 'setAppBadge' in navigator) {
      try {
        await navigator.setAppBadge(shortcuts.length);
      } catch (error) {
        console.error('Failed to set app badge:', error);
      }
    }
  }

  // Share API
  async shareContent(shareData) {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (error) {
        console.error('Error sharing:', error);
        return false;
      }
    } else {
      // Fallback to clipboard
      if (navigator.clipboard && shareData.url) {
        await navigator.clipboard.writeText(shareData.url);
        return true;
      }
      return false;
    }
  }

  // Wake lock for keeping screen on during tournaments
  async requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        const wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake lock acquired');
        return wakeLock;
      } catch (error) {
        console.error('Failed to acquire wake lock:', error);
        return null;
      }
    }
    return null;
  }
}

// Create singleton instance
export const pwaManager = new PWAManager();

// React hook for PWA functionality
export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleInstallable = () => setIsInstallable(true);
    const handleInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleUpdateAvailable = () => setUpdateAvailable(true);

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('network-online', handleOnline);
    window.addEventListener('network-offline', handleOffline);
    window.addEventListener('pwa-update-available', handleUpdateAvailable);

    // Initial state
    setIsOnline(navigator.onLine);
    setIsInstalled(pwaManager.isStandalone);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('network-online', handleOnline);
      window.removeEventListener('network-offline', handleOffline);
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
    };
  }, []);

  return {
    isInstallable,
    isInstalled,
    isOnline,
    updateAvailable,
    installApp: () => pwaManager.installApp(),
    shareContent: (data) => pwaManager.shareContent(data),
    sendNotification: (title, options) => pwaManager.sendPushNotification(title, options),
    deviceCapabilities: pwaManager.getDeviceCapabilities()
  };
}