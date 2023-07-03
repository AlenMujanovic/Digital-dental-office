const cron = require('node-cron');
const https = require('https');

exports.handler = async (event, context) => {
  const url = 'https://digital-dental-office-server.onrender.com/api/v1';

  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res) {
        resolve({
          body: 'Server pinged successfully',
        });
      }
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await exports.handler();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
