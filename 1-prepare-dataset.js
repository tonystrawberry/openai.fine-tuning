import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*
1-prepare-dataset.js
This script will take the input/fine_tuning_input.txt file and
generate 10 different datasets in the form of a JSONL file
for fine-tuning the model.
https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset
*/
async function main() {
  const data = fs.readFileSync('input/fine_tuning_input.txt', 'utf8');
  let datasets = '';

  console.log('Start preparing the 10 datasets 🏃🏻');

  let i = 1;

  while (i <= 10) {
    // eslint-disable-next-line no-await-in-loop
    const completion = await openai.chat.completions.create({
      messages: [{
        role: 'user',
        content: `
    Only include the JSON data in your response (otherwise, there will be an error in my program). No introductory or ending messages. Just the JSON data with no syntax errors.
    The chat data should alternate "role": "user" and "role": "assistant".
    Write me a JSON file in conversational chat format for fine tuning (gpt-3.5-turbo) based on the following data? Integrality of the data should be considered.

    ${data}
    `,
      }],
      model: 'gpt-3.5-turbo',
    });

    console.log(`Dataset ${i} prepared ✅`);

    try {
      datasets += `${JSON.stringify({ messages: JSON.parse(completion.choices[0].message.content) })}\n`;
      i += 1;
    } catch (e) {
      console.log(`
      Error parsing JSON data 😭 "
      ${completion.choices[0].message.content}

      `);

      console.log('Try again 💪');
    }
  }

  fs.writeFileSync('output/1-prepare-dataset.jsonl', datasets, 'utf8');

  console.log(`
    All datasets prepared 🎉
    Check output/1-prepare-dataset.jsonl and run 2-upload-file.js next 👨🏻‍💻
  `);
}

main();
