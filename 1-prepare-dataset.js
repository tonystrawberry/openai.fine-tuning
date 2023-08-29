import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {
  // Read data from input/fine_tuning_input.txt
  const data = fs.readFileSync('input/fine_tuning_input.txt', 'utf8');

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `
    Only include the JSON data in your response. No introductory or ending messages.
    The chat data should alternate "role": "user" and "role": "assistant".
    Write me a JSON file in conversational chat format for fine tuning (gpt-3.5-turbo) based on the following data? Integrality of the data should be considered.

    ${data}
    ` }],
    model: 'gpt-3.5-turbo',
  });

  console.log("completion", completion.choices[0].message.content);

  // Write data to output/fine_tuning_output.json on a one line format
  fs.writeFileSync('output/1-prepare-dataset.jsonl', JSON.stringify(JSON.parse(completion.choices[0].message.content)), 'utf8');
}

main();
