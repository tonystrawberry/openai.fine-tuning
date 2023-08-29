import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {
  // Get the training file ID from output/2-fine-tune-model.txt
  const trainingFileId = fs.readFileSync('output/2-upload-file.txt', 'utf8');

  // Create a fine-tuning job
  const fineTuningJob = await openai.fineTuning.jobs.create({
    training_file: trainingFileId,
    model: 'gpt-3.5-turbo',
  })

  // Output the fine-tuning job information to output/3-fine-tune-model.json
  fs.writeFileSync('output/3-fine-tune-model.js', fineTuningJob, 'utf8');
}

main();
