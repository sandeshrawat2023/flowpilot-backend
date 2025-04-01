const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || './service-account.json',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

async function listFiles(query = '') {
  const res = await drive.files.list({
    q: `name contains '${query}' and trashed = false`,
    fields: 'files(id, name, mimeType, modifiedTime)',
  });
  return res.data.files;
}

async function getFileText(fileId) {
  const res = await drive.files.export({
    fileId,
    mimeType: 'text/plain',
  });
  return res.data;
}

module.exports = { listFiles, getFileText };
