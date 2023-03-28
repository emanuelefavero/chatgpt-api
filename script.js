import { config } from 'dotenv'
config()

import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'
import chalk from 'chalk'

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
)

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Ask the user for input with this text "User: "
userInterface.setPrompt(chalk.blue('User: '))
userInterface.prompt()

userInterface.on('line', async (input) => {
  const res = await openai.createChatCompletion({
    // models: 'gpt-3.5-turbo', 'gpt-4'
    model: 'gpt-3.5-turbo',
    temperature: 0.7, // 0.0 - 1.0
    messages: [
      {
        role: 'user',
        content: input,
      },
    ],
  })
  console.log(
    chalk.magenta('Assistant: '),
    chalk.green(res.data.choices[0].message.content)
  )
  userInterface.prompt()
})
