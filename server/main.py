import asyncio
import logging
import sys
from os import getenv

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message 
from aiogram.types.web_app_info import WebAppInfo
from aiogram.types.inline_keyboard_markup import InlineKeyboardMarkup
from aiogram.types.inline_keyboard_button import InlineKeyboardButton

# Bot token can be obtained via https://t.me/BotFather
TOKEN = '7256363548:AAEeh4tzyuAw-A-glei4q9HT4hWQU-Ly334'

# All handlers should be attached to the Router (or Dispatcher)

dp = Dispatcher()


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"Hello, {html.bold(message.from_user.full_name)}!")

@dp.message(Command('open_site'))
async def command_site_handler(message: Message) -> None:
    markup = InlineKeyboardMarkup(
        inline_keyboard=[[

            InlineKeyboardButton(
                text="Open",
                web_app=WebAppInfo(url=f'https://www.google.ru/?hl=ru'),
            )
        ]]
    )
    await message.answer(text="Click to open site", reply_markup=markup)

async def main() -> None:
    # Initialize Bot instance with default bot properties which will be passed to all API calls
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    # And the run events dispatching
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())