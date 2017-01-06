'use strict';
const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
     constructor(){
     	console.log('class created success');
     }

    pingHandler($) {
        $.sendMessage('pong')
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}