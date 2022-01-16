console.log('Hello world!');
// run npm run start:dev to start dev
// more info: https://khalilstemmler.com/blogs/typescript/node-starter-project/

// const Reverso = require('reverso-api')

import dotenv from 'dotenv'
import {App, BotMessageEvent, SlackActionMiddlewareArgs, InteractiveMessage, Middleware} from '@slack/bolt'

const Reverso = require('reverso-api');
import {parseTranslateRequest, IParsedRequest} from './helpers'
import dialogs from './dialogs.json'

const reverso = new Reverso();


interface IArgs {
  message: InteractiveMessage,
  say: () => void
}

dotenv.config();
const env = process.env;

const app = new App({
  token: env.TOKEN,
  signingSecret: env.SIGNING_SECRET,
  socketMode: true,
  appToken: env.APP_TOKEN,
});

app.start(3000).then(() => {
  console.log('⚡️ Bolt app is running!')
});


app.message(async ({message, say}) => {
  const botMessage = (message as BotMessageEvent);
  console.log('message = ', message);


  if (botMessage.text) {
    const res: IParsedRequest = parseTranslateRequest(botMessage.text)
    console.log('res = ', res)

  }
// phrase can be empty - add something funnu for this situation
  /* reverso.getContext('meet me half way', 'English', 'Russian', (response: any) => {
     console.log('response = ', response);
   }).catch((err: any) => {
     console.error(err);
   });
 */
});


app.message(/^(hi|Hi|hello|Hello|hey|Hey).*/, async ({context, say}) => {
  // RegExp matches are inside of context.matches
  const greeting = context.matches[0];

  await say(`${greeting}${dialogs.help}`);
});

app.event('app_home_opened', async ({event, say}) => {
  // send random word
  // await say('Oh hello there!')
});

