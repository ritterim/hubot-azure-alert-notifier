'use strict';

process.env.EXPRESS_PORT = 13721;

let Helper = require('hubot-test-helper');
let helper = new Helper('../src/index.js');

let http = require('http');
let expect = require('chai').expect;

let activatedWithMetrics = JSON.stringify(require('./fixtures/activatedWithMetrics'));
let activatedWithoutMetrics = JSON.stringify(require('./fixtures/activatedWithoutMetrics'));

let resolvedWithMetrics = JSON.stringify(require('./fixtures/resolvedWithMetrics'));
let resolvedWithoutMetrics = JSON.stringify(require('./fixtures/resolvedWithoutMetrics'));

let unexpectedStatus = JSON.stringify(require('./fixtures/unexpectedStatus'));

let token = 'the-token';
let postOptions = {
    hostname: 'localhost',
    port: process.env.EXPRESS_PORT,
    path: `/hubot/azure-alert/general?token=${token}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};

describe('hubot', () => {
    let room;

    beforeEach(() => {
        process.env.HUBOT_AZURE_ALERTS_TOKEN = token;

        room = helper.createRoom();
    });

    afterEach(() => {
        room.destroy();
    });

    it('should return 500 when HUBOT_AZURE_ALERTS_TOKEN is not configured', (done) => {
        delete process.env.HUBOT_AZURE_ALERTS_TOKEN;

        let req = http.request(postOptions, (res) => {
            expect(res.statusCode).to.equal(500);
            done();
        });

        req.write(activatedWithMetrics);
        req.end();
    });

    it('should return 401 when HUBOT_AZURE_ALERTS_TOKEN does not match environment variable', (done) => {
        process.env.HUBOT_AZURE_ALERTS_TOKEN = 'different-token';

        let req = http.request(postOptions, (res) => {
            expect(res.statusCode).to.equal(401);
            done();
        });

        req.write(activatedWithMetrics);
        req.end();
    });

    it('should return 200 when HUBOT_AZURE_ALERTS_TOKEN matches environment variable', (done) => {
        let req = http.request(postOptions, (res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });

        req.write(activatedWithMetrics);
        req.end();
    });

    it('should display expected message in requested channel when non-metric alert is activated', (done) => {
        let req = http.request(postOptions, (res) => {
            expect(room.messages).to.eql([
                ['hubot', "Microsoft Azure alert: 'ruleName1' activated for mysite1 in centralus! https://portal.azure.com/#resource/subscriptions/s1/resourceGroups/useast/providers/microsoft.foo/sites/mysite1"]
            ]);
            done();
        });

        req.write(activatedWithoutMetrics);
        req.end();
    });

    it('should display expected message in requested channel when metric alert is activated', (done) => {
        let req = http.request(postOptions, (res) => {
            expect(room.messages).to.eql([
                ['hubot', "Microsoft Azure alert: 'ruleName1' activated for mysite1 in centralus! (Requests Count of 10 is GreaterThanOrEqual threshold of 10) https://portal.azure.com/#resource/subscriptions/s1/resourceGroups/useast/providers/microsoft.foo/sites/mysite1"]
            ]);
            done();
        });

        req.write(activatedWithMetrics);
        req.end();
    });

    it('should display expected message in requested channel when non-metric alert is resolved', (done) => {
        let req = http.request(postOptions, (res) => {
            expect(room.messages).to.eql([
                ['hubot', "Microsoft Azure alert: 'ruleName1' resolved for mysite1 in centralus!"]
            ]);
            done();
        });

        req.write(resolvedWithoutMetrics);
        req.end();
    });

    it('should display expected message in requested channel when metric alert is resolved', (done) => {
        let req = http.request(postOptions, (res) => {
            expect(room.messages).to.eql([
                ['hubot', "Microsoft Azure alert: 'ruleName1' resolved for mysite1 in centralus!"]
            ]);
            done();
        });

        req.write(resolvedWithMetrics);
        req.end();
    });

    it('should return 400 for unexpected status', (done) => {
        let req = http.request(postOptions, (res) => {
            expect(res.statusCode).to.equal(400);
            done();
        });

        req.write(unexpectedStatus);
        req.end();
    });
});
