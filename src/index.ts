import dotenv from 'dotenv'
import {App, BotMessageEvent, InteractiveMessage} from '@slack/bolt'
import {parseTranslateRequest, IParsedRequest} from './helpers'
import dialogs from './dialogs.json'
const Reverso = require('reverso-api');

const reverso = new Reverso();


interface IArgs {
  message: InteractiveMessage,
  say: () => void
}

enum TActionType {
  'Translate',
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
    res.phrase && reverso.getContext(res.phrase, res.fromLanguage || 'English', res.intoLanguage || "German", (response: any) => {
      console.log('response = ', response);

      say(`*Here is what i have found:*\n${response.translation.map((i: string) => {
        return `${i}\n`
      }).join('')}`)
    }).catch((err: any) => {
      console.error(err);
    });
  }
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

