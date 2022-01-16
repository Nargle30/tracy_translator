console.log('Hello world!')
// run npm run start:dev to start dev
// more info: https://khalilstemmler.com/blogs/typescript/node-starter-project/

// const Reverso = require('reverso-api')

import dotenv from 'dotenv'
import {App} from '@slack/bolt'

dotenv.config()
const env = process.env
// const reverso = new Reverso()

const app = new App({
  token: env.TOKEN,
  signingSecret: env.SIGNING_SECRET,
  socketMode: true,
  appToken: env.APP_TOKEN,
});

app.start(3000).then(() => {
  console.log('⚡️ Bolt app is running!')
})


app.message('Hi', async ({message, say}) => {

  await say(`_Hello, I am Tracy_`);
});

app.event('app_home_opened', async ({event, say}) => {
  await say('Oh hello there!')
})
