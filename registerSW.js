if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/tom_and_jerry/sw.js', { scope: '/tom_and_jerry/' })})}