import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*
2-upload-file.js
This script will take the output/1-prepare-dataset.jsonl file
and upload it to OpenAI
*/
async function main() {
  const trainingFile = await openai.files.create({ file: fs.createReadStream('output/1-prepare-dataset.jsonl'), purpose: 'fine-tune' });

  fs.writeFileSync('output/2-upload-file.json', JSON.stringify(trainingFile), 'utf8');

  console.log(`
    File uploaded to OpenAI ✅
    Check output/2-upload-file.json and run 3-fine-tune-model.js next 👨🏻‍💻
  `);
}

main();
