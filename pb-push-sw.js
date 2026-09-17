/* PB notification service worker — intentionally no Firebase reads or read receipts. */
self.addEventListener('push',event=>{
  let message={};
  try{message=event.data?.json()||{}}catch{}
  event.waitUntil(self.registration.showNotification('お知らせ',{
    body:message.body==='通知テストです'?'通知テストです':'新しいお知らせがあります',
    tag:'pb-generic-notice',renotify:false,
    data:{url:'/pb/index.html'}
  }));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(clients.openWindow('https://atoz0731.github.io/pb/index.html'));
});
