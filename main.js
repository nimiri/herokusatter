'use strict';

var rp = require('request-promise');
require('date-utils');
var fs = require('fs');
const sharp = require("sharp")

require('dotenv').config();

let PIXELA_USER = getEnvValue('PIXELA_USER');
let PIXELA_GRAPH_ID = getEnvValue('PIXELA_GRAPH_ID');
let PIXELA_X_USER_TOKEN = getEnvValue('PIXELA_X_USER_TOKEN');

// 0時に実行するので、前日の日付を取得
let targetDate = Date.yesterday().toFormat("YYYYMMDD");

// 草を生やした数を取得する
let get_pixela_quantity = rp({
    uri: 'https://pixe.la/v1/users/' + PIXELA_USER + '/graphs/' + PIXELA_GRAPH_ID + '/' + targetDate,
    timeout: 30 * 1000,
    headers: {
        'X-USER-TOKEN': PIXELA_X_USER_TOKEN
    },
    json: true // Automatically parses the JSON string in the response
  }).then(function (res){
    let desc = res.quantity >= 1 ? 
      `${PIXELA_GRAPH_ID}で${res.quantity}回、草を生やすことができました！` :
      `${PIXELA_GRAPH_ID}で草を生やすことができませんでした…`;

    return desc + ' https://pixe.la/v1/users/' + PIXELA_USER + '/graphs/' + PIXELA_GRAPH_ID + '.html'
  }).catch(function (res){
    // 404だったら、pixelがないとみなす。
    if (res.statusCode == '404') return `${PIXELA_GRAPH_ID}で草を生やすことができませんでした…`;
    else {
      console.log('[ERROR] ' + res.message);
      process.exit(1);
    }
  });

// 草を生やした数を取得する
let get_pixela_svg = rp({
    uri: 'https://pixe.la/v1/users/' + PIXELA_USER + '/graphs/' + PIXELA_GRAPH_ID + '?mode=short',
    timeout: 30 * 1000
  }).then(function (res){

    // SVGをPNGに変換して保存
    fs.writeFileSync('pixela.svg', res, 'binary');
    sharp('pixela.svg')
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(880)
      .png()
      .toFile("pixela.png")
  })


// Promise群を実行
Promise.all([
  // get_pixela_quantity
  get_pixela_svg
])
.then(function (res) {
    console.log(res)
})
.catch(function (err) {
    // API call failed...
    console.log(err)
});

// .envから読み込むための関数
function getEnvValue(key) {
    let value = process.env[key];
    if (typeof value === 'undefined') {
        console.log(`${key} is not defined`);
        process.exit(1);
    }

    return value;
}