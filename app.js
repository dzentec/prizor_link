/**
 * Prizor Cam — NVR / DVR QR Code Landing Page Logic
 * Smart OS Detection, Auto Highlight & Floating Dock Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    const IOS_URL = 'https://apps.apple.com/in/app/prizor-cam/id6759190546';
    const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.PRIZORCAM.phone';

    const btnIos = document.getElementById('btnIos');
    const btnAndroid = document.getElementById('btnAndroid');
    const recBanner = document.getElementById('deviceRecommendation');
    const deviceName = document.getElementById('deviceName');
    const deviceIcon = document.getElementById('deviceIcon');
    const floatingDock = document.getElementById('floatingDock');
    const floatingDownloadBtn = document.getElementById('floatingDownloadBtn');
    const floatingDeviceLabel = document.getElementById('floatingDeviceLabel');

    // SVG Icons
    const appleSvg = `<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2.02.6-2.66 1.34-.56.64-1.06 1.71-.92 2.74 1.02.08 2.05-.46 2.66-1.21z"/>`;
    
    const androidSvg = `<path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.8533 8.081 12 8.081c-1.8534 0-3.5903.33-5.1368.8687L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3433-4.1021-2.689-7.5743-6.1185-9.4396"/>`;

    // Detect User Operating System
    function detectOS() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // iOS detection (iPhone, iPad, iPod)
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'ios';
        }
        // iPad on iOS 13+ detection
        if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
            return 'ios';
        }
        // Android detection
        if (/android/i.test(userAgent)) {
            return 'android';
        }
        return 'other';
    }

    const currentOS = detectOS();

    // Apply OS dynamic highlighting
    if (currentOS === 'ios') {
        btnIos.classList.add('highlighted');
        recBanner.classList.remove('hidden');
        deviceName.textContent = 'Apple iOS (iPhone / iPad)';
        deviceIcon.innerHTML = appleSvg;
        
        floatingDownloadBtn.href = IOS_URL;
        floatingDeviceLabel.textContent = 'Official App Store Release';
    } else if (currentOS === 'android') {
        btnAndroid.classList.add('highlighted');
        recBanner.classList.remove('hidden');
        deviceName.textContent = 'Android Device';
        deviceIcon.innerHTML = androidSvg;
        
        floatingDownloadBtn.href = ANDROID_URL;
        floatingDeviceLabel.textContent = 'Official Google Play Release';
    } else {
        // Desktop / Other: Default button targets
        floatingDownloadBtn.href = IOS_URL;
        floatingDeviceLabel.textContent = 'Choose your mobile platform';
    }

    // Floating Dock on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If main hero buttons are scrolled off screen, show floating quick dock
            if (!entry.isIntersecting) {
                floatingDock.classList.add('visible');
            } else {
                floatingDock.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const heroDownloadGrid = document.querySelector('.download-grid');
    if (heroDownloadGrid) {
        observer.observe(heroDownloadGrid);
    }
});
