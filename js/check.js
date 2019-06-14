"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Controller = require('./controller');
var checkA = require('koa');
var checkApp = new checkA();
var checkRouter = require('koa-router')();
module.exports = function () {
    checkApp.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let result = ctx.url.split("");
        let num = 0;
        for (const key in result) {
            if (result[key] === '/') {
                num++;
            }
        }
        switch (num) {
            case 1:
                console.log('你走着');
                break;
            case 2:
                checkApp.use(Controller());
                break;
            default:
                console.log(`invalid URL:`);
                break;
        }
        console.log(`${ctx.method} ${ctx.url}`);
        yield next();
    }));
    return checkApp.use(Controller());
};
