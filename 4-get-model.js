/* eslint-disable no-promise-executor-return */
/* eslint-disable no-constant-condition */
import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sleep function to wait for the fine-tuning job to complete
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
4-get-model.js
This script will take the output/3-fine-tune-model.json file
and check the status of the fine-tuning job
*/
async function main() {
  console.log('Start checking the fine-tuning job status 🏃🏻');
  const fineTuningJob = JSON.parse(fs.readFileSync('output/3-fine-tune-model.json', 'utf8'));

  while (true) {
    const currentFineTuningJob = await openai.fineTuning.jobs.retrieve(fineTuningJob.id);

    if (currentFineTuningJob.status === 'succeeded') {
      // Output the fine-tuning job information to output/4-get-model.json
      fs.writeFileSync('output/4-get-model.json', JSON.stringify(currentFineTuningJob, null, 2), 'utf8');
      console.log(`
        Fine-tuning job completed ✅
        Check output/4-get-model.json and run 5-generate.js next to start using the fine-tuned model 👨🏻‍💻
      `);
      break;
    } else {
      console.log(`
        Fine-tuning job not completed yet 😅
        Checking again in 5 seconds. 🕔
      `);
      await sleep(5000);
    }
  }
}

main();
