# hubot-azure-alert-notifier
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

A Hubot plugin for displaying webhook alerts from Microsoft Azure in your chat.

See https://azure.microsoft.com/en-us/documentation/articles/insights-webhooks-alerts/ for more details about the Microsoft Azure alert webhooks.

## Basic setup

- `npm install hubot-azure-alert-notifier --save`
- Add the script to your Hubot using **external-scripts.json**.
- Set the `HUBOT_AZURE_ALERTS_TOKEN` environment variable to a secret key. Choose something secure!
- Setup Microsoft Azure alerts webhooks in the following format: `http://example.com/hubot/azure-alert/general?token=YOUR_HUBOT_AZURE_ALERTS_TOKEN_VALUE` (where `general` is the room to notify).

## Contributing

Have an idea? Let's talk about it in an issue!

Find a bug? Open an issue or submit a pull request. For code contributions, please submit a test or tests if possible. Tests are ran with `npm test`.

## Releasing

Update the version in [package.json](https://github.com/ritterim/hubot-azure-alert-notifier/blob/master/package.json) and create a matching release on GitHub *(please follow the tag pattern as the other releases)*. The new release is published automatically to npm as [hubot-azure-alert-notifier][npm-url] by Travis CI by using tags.

## License

MIT © Ritter Insurance Marketing

[npm-image]: https://badge.fury.io/js/hubot-azure-alert-notifier.svg
[npm-url]: https://npmjs.org/package/hubot-azure-alert-notifier
[travis-image]: https://travis-ci.org/ritterim/hubot-azure-alert-notifier.svg?branch=master
[travis-url]: https://travis-ci.org/ritterim/hubot-azure-alert-notifier
[daviddm-image]: https://david-dm.org/ritterim/hubot-azure-alert-notifier.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ritterim/hubot-azure-alert-notifier
