const { dotenv } = require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply(`Welcome ${ctx.from.first_name}`);
});

bot.help((ctx) => {
  ctx.reply(
    `Hola ${ctx.from.first_name} este es el primer Bot de Telegram realizado por Joneikel, esta creado para practicar y aprender los conceptos basicos del desarrollo de bots.
    
    **Comandos permitido**
    /start
    /test
    /help
    `
  );
});

bot.settings((ctx) => {
  ctx.reply("Settings");
});

bot.command(["mycommand", "MyCommand", "test", "Test"], (ctx) => {
  console.log(ctx.from);
  console.log(ctx.chat);
  console.log(ctx.message);
  console.log(ctx.updateSubTypes);

  ctx.reply("My command champion");
});

bot.hears("computer", (ctx) => {
  ctx.reply("Sí, estoy vendiendo una computadora");
});

/** Escucha todo el texto que se escribe en el chat */
/* bot.on('text', ctx=>ctx.reply('Estas testiando')) */

bot.launch();
