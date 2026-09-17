/* PB notification service worker — intentionally no Firebase reads or read receipts. */
self.addEventListener('push', event => {
  let message = {};
  try { message = event.data?.json() || {}; } catch {}

  const body = typeof message.body === 'string' && message.body
    ? message.body
    : '新しいお知らせがあります';

  event.waitUntil(self.registration.showNotification('お知らせ', {
    body,
    tag: 'pb-generic-notice',
    renotify: false,
    data: { url: '/pb/index.html' }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://atoz0731.github.io/pb/index.html'));
});
