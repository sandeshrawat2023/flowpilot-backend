const express = require('express');
const cors = require('cors');
const { listFiles, getFileText } = require('./driveService');

const app = express();
app.use(cors());

app.get('/api/drive/files', async (req, res) => {
  try {
    const query = req.query.query || '';
    const files = await listFiles(query);
    res.json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

app.get('/api/drive/summary/:fileId', async (req, res) => {
  try {
    const text = await getFileText(req.params.fileId);
    res.json({ summary: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch file content' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`FlowPilot backend listening on port ${PORT}`));
