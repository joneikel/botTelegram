const { dotenv } = require("dotenv").config();
const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.TOKEN);

setInterval(() => {
  console.log("test");
}, 3600000);

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
    /dolar
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

const getAll = async (url, ctx) => {
  try {
    let resp = await axios.get(url),
      dolartoday = await resp.data.USD.transferencia,
      BCV = await resp.data.USD.sicad2;
    ctx.reply(`
    @DolarToday = ${dolartoday} bs.
    @BCV = ${BCV} bs.`);
  } catch (error) {
    let message = error.statusText || "Ocurrio un error";
    ctx.reply(message);
  }
};

bot.command("dolar", (ctx) => {
  getAll("https://s3.amazonaws.com/dolartoday/data.json", ctx);
  console.log(ctx.message.text);
});

/** Escucha todo el texto que se escribe en el chat */
/* bot.on('text', ctx=>ctx.reply('Estas testiando')) */

bot.launch();
