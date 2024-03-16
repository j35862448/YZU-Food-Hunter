function doPost(e) {
  // 取得輸入參數


 
  // 初始化試算表
  const spreadSheet = SpreadsheetApp.openById("1Pt_uCwV4Qd-actHE7uEGKYgR3KGVPB5XMwwk9DS3LDc");
  const SheetName = spreadSheet.getSheetByName('工作表1');
  var str = JSON.stringify(SheetName.getSheetValues(1,1,1,1))
  str =str.replace("[","")
  str =str.replace("[","")
  str =str.replace("]","")
  str =str.replace("]","")
  str =str.replace('"',"")
  str =str.replace('"',"")
  Logger.log(str);

  // 寫入試算表
  //Sheet.getRange(LastRow+1, 1).setValue(name);
  //Sheet.getRange(LastRow+1, 2).setValue(mail);
  //Sheet.getRange(LastRow+1, 1).getValue();

  //認證身份，重新輸入line@ channel_access_token
  var CHANNEL_ACCESS_TOKEN = '6sj1PHlCfUbQwNtc1xcEPyrmoptgjN434mMganV6PhqaRCDgj5ko9esR3HJ0b8YMzcujb3hmfg7fUgxThKZyVJQ57TZty1nHhraQCkbnYNoAuOpiEQmHUs2owQZZfZr8moc8UETGVOT1Tk3ZQ6IaMAdB04t89/1O/w1cDnyilFU=';
  
  var msg= JSON.parse(e.postData.contents);//msg相關的可以先註解掉，為了偵錯
  //除錯用
  Logger.log(msg);
  console.log(msg);
  //從接收到的訊息中取出 replyToken 和發送的訊息文字
  var replyToken = msg.events[0].replyToken;
  var userMessage = msg.events[0].message.text;

  if (typeof replyToken === 'undefined') {
    return;
  };
  //定義回傳訊息
  var rice=['龍巢飯麵館','大埔鐵板燒中壢環中東店','韓雞肌內壢店','幸福豬腳飯','添飯Woo-中壢咖喱推薦','王記煲仔飯','阿娘味飯麵館'];
  var riceImg=['https://i.imgur.com/TfjTKb2.jpg','https://i.imgur.com/CXIda6e.jpg','https://i.imgur.com/OwbVHEf.jpg','https://i.imgur.com/gseSo9v.png','https://i.imgur.com/TIEvkgp.png','https://i.imgur.com/AoqIR7j.jpg','https://i.imgur.com/E1MkZNN.png'];
  var noodle=['甘泉魚麵內壢店','貓寶涼麵','啊嗚麵食、炸物','林記麵食館','好滋味麵館','麵殿','牛老闆牛肉麵','河南李老爹麵飯館','眷村麵食館'];
  var noodleImg=['https://i.imgur.com/kNCfx2Q.jpg','https://i.imgur.com/ROBP1JG.jpg','https://i.imgur.com/WHtvqla.png','https://i.imgur.com/BOdO76y.png','https://i.imgur.com/fUlnjbD.png','https://i.imgur.com/TqUQbKr.png','https://i.imgur.com/m10Ku96.png','https://i.imgur.com/9dd79T1.png','https://i.imgur.com/CIDaivc.png'];
  var drink=['可不可熟成紅茶榮民店','茶湯會榮民店','清心福全中壢榮民店'];
  var drinkImg=['https://i.imgur.com/MhAKeED.jpg','https://i.imgur.com/kOdwVG5.jpg','https://i.imgur.com/CgxCbGi.jpg'];
  var western=['慕堤意廚','小洋蔥先生','穀墨坊','肯德基KFC-中壢環中東餐廳','麥當勞-內壢家樂福店'];
  var westernImg=['https://i.imgur.com/sNa9BrY.jpg','https://i.imgur.com/teGaJ7j.jpg','https://i.imgur.com/OBvuKE1.jpg','https://i.imgur.com/lT5hXdR.jpg','https://i.imgur.com/IPCIUzU.jpg'];
  var chinese=['大家來自助餐','八方雲集中壢莊敬店','辣妹子牛肉麵','龍巢飯麵館','眷村麵食館'];
  var chineseImg=['https://i.imgur.com/TvtQKFb.jpg','https://i.imgur.com/Rw0bZgu.jpg','https://i.imgur.com/8vimzSv.png','https://i.imgur.com/TfjTKb2.jpg','https://i.imgur.com/CIDaivc.png'];
  var japanese=['丸亀製麵內壢店','爭鮮内壢店','初牛內壢店'];
  var japaneseImg=['https://i.imgur.com/H4Kl78e.jpg','https://i.imgur.com/ibTYzNI.jpg','https://i.imgur.com/6au2I78.jpg'];
  var present;//最終食物
  var presentImg;//最終的圖片
  var takaMe=0;//帶我去
  if(userMessage.match("帶我去")){//導航功能
    var position = userMessage.replace("帶我去","");
    var mapResponse = Maps.newGeocoder().geocode(position);
    present=position;
    var takaMe=1;
  }
  else if(userMessage.match("飯"))
  { 
  
    present=rice
    presentImg=riceImg
  }
  else if(userMessage.match("麵"))
  {
    present=noodle
    presentImg=noodleImg
  }
  else if(userMessage.match("飲料"))
  {
    present=drink;
    presentImg=drinkImg
  }
  else if(userMessage.match("西式"))
  {
    present=western;
    presentImg=westernImg
  }
  else if(userMessage.match("中式"))
  {
    present=chinese
    presentImg=chineseImg
  }
  else if(userMessage.match("日式"))
  {
    present=japanese
    presentImg=japaneseImg
  }

  var returnmessage = [];
  if(takaMe===1)
  {
    returnmessage.push(
    {
     "type": "location",
     "title": present,
     "address": mapResponse.results[0].formatted_address,
     "latitude": mapResponse.results[0].geometry.location.lat,
     "longitude": mapResponse.results[0].geometry.location.lng
    }
    )
  }
  else {
  var i
  var act=[
          {   
            "type":"message",
            "label":"帶我去",
            "text":"帶我去"+present[0]
          },
          {
            "type":"message",
            "label":"喜歡",
            "text":"喜歡此餐廳"
          },
          {
            "type":"message",
            "label":"不喜歡",
            "text":"標記為不喜歡"
          }
        ]

  var col=[
        {
            "thumbnailImageUrl":presentImg[0],
            "imageBackgroundColor": "#FFFFFF",
            "title": present[0],
            "text": "根據系統推薦，您可以試試",
            "actions": act
        },
                {
            "thumbnailImageUrl":presentImg[1],
            "imageBackgroundColor": "#FFFFFF",
            "title": present[1],
            "text": "根據系統推薦，您可以試試",
            "actions": act
        },
        {
            "thumbnailImageUrl":presentImg[2],
            "imageBackgroundColor": "#FFFFFF",
            "title": present[2],
            "text": "根據系統推薦，您可以試試",
            "actions": act
        }
      ]

  returnmessage.push(
  {
  "type": "template",
  "altText": "您有新訊息",
  "template": {
      "type": "carousel",
      "columns":col,
      "imageAspectRatio": "rectangle",
      "imageSize": "cover"
    }
  }
  );
}
  // 回傳結果


  //回傳訊息給line 並傳送給使用者
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
        'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
     },
      'method': 'post',
      'payload': JSON.stringify({
         'replyToken': replyToken,
         'messages': returnmessage,
     }),
  });
}