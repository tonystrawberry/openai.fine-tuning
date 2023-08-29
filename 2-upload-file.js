import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {
  const trainingFile = await openai.files.create({ file: fs.createReadStream('output/1-prepare-dataset.jsonl'), purpose: 'fine-tune' });

  console.log("trainingFile", trainingFile)

  const trainingFileId = trainingFile.id

  // Output the training file ID to a file
  fs.writeFileSync('output/2-upload-file.txt', trainingFileId, 'utf8');
}

main();
