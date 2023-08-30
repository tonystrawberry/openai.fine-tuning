import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*
5-use-model.js
This script will take the output/4-get-model.json file
and use the fine-tuned model to generate responses from ChatGPT
*/
async function main() {
  console.log('Start using the fine-tuned model 🏃🏻');

  const fineTuningJob = JSON.parse(fs.readFileSync('output/4-get-model.json', 'utf8'));
  const fineTunedModel = fineTuningJob.fine_tuned_model;

  // Get data from input/test_data.json
  // and generate responses from the fine-tuned model
  // for each message in the test data
  const testDatas = JSON.parse(fs.readFileSync('input/test_data.json', 'utf8'));
  const responses = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const testData of testDatas) {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are the assistant for providing medical checkups information for the company Monstarlab Inc. Following questions will be from employees of the Monstarlab company.' },
        { role: 'user', content: testData.message },
      ],
      model: fineTunedModel,
    });

    console.log(`
      🤵‍♂️: ${testData.message} ✅
      🤖: ${completion.choices[0].message.content}

      `);

    responses.push({
      message: testData.message,
      response: completion.choices[0].message.content,
    });
  }

  fs.writeFileSync('output/5-use-model.json', JSON.stringify(responses, null, 2), 'utf8');

  console.log(`
    Fine-tuned model used ✅
    Responses are stored in output/5-use-model.json 🎉
  `);
}

main();
