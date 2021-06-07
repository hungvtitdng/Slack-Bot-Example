require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.BOT_TOKEN,
});

/* Add functionality here */

// Listens to incoming messages that contain "hello"
app.message('hey', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Mày kêu tao ah <@${message.user}>!`);
  await say({
    "text": "Would you like to play a game?",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "game",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "game",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "game",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
  });
});

// Listens to incoming messages that contain "hello"
app.message('quest approve', async ({ message, say }) => {
  await say({
    "response_type": "in_channel",
    "attachments": [
        {
            "text": "Chọn thằng Approve nào.",
            "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "callback_id": "game_selection",
            "actions": [
                {
                    "name": "games_list",
                    "text": "Chọn nhanh kẻo lỡ...",
                    "type": "select",
                    "options": [
                        {
                            "text": "Quest 1",
                            "value": "hearts"
                        },
                        {
                          "text": "Quest 2",
                          "value": "bridge"
                        },
                    ]
                }
            ]
        }
    ]
  });
});

// Listens to incoming messages that contain "hello"
app.message('select', async ({ message, say }) => {
  await say({
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Test block with users select"
        },
        "accessory": {
          "type": "users_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select a user",
            "emoji": true
          },
          "action_id": "users_select-action"
        }
      }
    ]
  });
});

// Listens to incoming messages that contain "hello"
app.message('quest inform', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    "attachments": [
        {
            "text": "thằng Hùng muốn mày approve Quest A của nó.",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                  "name": "Disapprove",
                  "text": "Disapprove",
                  "style": "danger",
                  "type": "button",
                  "value": "disapprove",
                  "confirm": {
                      "title": "Are you sure?",
                      "text": "Mày ko muốn approve ah?",
                      "ok_text": "Yes",
                      "dismiss_text": "No"
                  }
                },
                {
                    "name": "Approve",
                    "text": "Approve",
                    "type": "button",
                    "value": "approve",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Mày có chắc là muốn approve ko đó?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
  });
});

// Listens to incoming messages that contain "hello"
app.message('docs:', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say('Mày muốn lấy docs gì hả thằng kia');
});

app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

(async () => {
  // Start the app
  await app.start(3000);

  console.log('⚡️ Bolt app is running!');
})();
