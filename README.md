<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/800px-ChatGPT_logo.svg.png" width="60" />
</p>
<h1 align="center">
  Fine-tuning OpenAI's GPT-3.5 model
</h1>

[![CI](https://github.com/tonystrawberry/openai.fine-tuning/actions/workflows/eslint.yml/badge.svg)](https://github.com/tonystrawberry/openai.fine-tuning/actions/workflows/eslint.yml)

OpenAI has introduced an exciting new feature - fine-tuning for the GPT-3.5 model. With this feature, developers can now fine-tune the GPT-3.5 model to suit specific tasks and applications. This README provides a step-by-step guide on how to fine-tune the model using JavaScript and the official OpenAI SDK for Node.js, enabling you to harness the power of GPT-3.5 for your custom use cases.

## 🚀 Quick start

1. Install the dependencies.
```
npm install
```

2. Create a `.env` file in the root directory and add the following environment variables.
```
OPENAI_API_KEY=<your-openai-api-key>
```

3. Run the following scripts in order. You will see the logs explaining what each script does.
```
node 1-prepare-dataset.js
node 2-upload-file.json
node 3-fine-tune-model.json
node 4-get-model.json
node 5-use-model.js
```
