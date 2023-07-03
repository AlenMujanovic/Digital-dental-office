const cron = require('node-cron');
const http = require('http');

cron.schedule('*/14 * * * *', () => {
  console.log('Sending a self-ping to the server');
  http.get('https://digital-dental-office-server.onrender.com');
});
