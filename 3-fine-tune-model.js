import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*
3-fine-tune-model.js
This script will take the output/2-upload-file.json file, parse it
and create a fine-tuning job for the model that will run asynchronously.
*/
async function main() {
  console.log('Start fine-tuning the model 🏃🏻');

  const trainingFile = fs.readFileSync('output/2-upload-file.json', 'utf8');
  const trainingFileId = JSON.parse(trainingFile).id;

  const fineTuningJob = await openai.fineTuning.jobs.create({
    training_file: trainingFileId,
    model: 'gpt-3.5-turbo',
  });

  fs.writeFileSync('output/3-fine-tune-model.json', JSON.stringify(fineTuningJob, null, 2), 'utf8');

  console.log(`
    Fine-tuning job created ✅
    Check output/3-fine-tune-model.json and run 4-get-model.js next 👨🏻‍💻
  `);
}

main();
