const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const MessageModel = require('./models/message');

// Base uploads folder
const baseUploadDir = path.join(__dirname, 'uploads');

cron.schedule('0 0 * * *', async () => {
  console.log('Running file cleanup job...');

  try {
    // Get all filepaths from DB (like 'uploads/msg/xxxx.jpg')
    const messages = await MessageModel.find({}, 'filepath').lean();
    const filepathsInDB = messages.map(msg => msg.filepath);

    // Walk through 'uploads/msg' folder
    const msgFolder = path.join(baseUploadDir, 'msg');
    const filesInMsgFolder = fs.readdirSync(msgFolder);

    for (const file of filesInMsgFolder) {
      const relativeFilePath = `uploads/msg/${file}`;

      // If not found in DB, delete it
      if (!filepathsInDB.includes(relativeFilePath)) {
        const fileToDelete = path.join(__dirname, relativeFilePath);
        fs.unlinkSync(fileToDelete);
        console.log(`Deleted unused file: ${relativeFilePath}`);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
});
