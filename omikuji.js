'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        // 名前が空のときは処理を終了する
        return;
    }
    console.log(userName);
    
    // 診断結果表示エリアの作成
    resultDivided.innerText = '';
    
  // headerDivided の作成
  const headerDivided = document.createElement('div');
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '結果';

  // bodyDivided の作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  // resultDivided に Bootstrap のスタイルを適用する
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('style', 'max-width: 700px;')

  // headerDivided と bodyDivided を resultDivided に差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

    // ツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue ='https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('おみくじ結果') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #おみくじ結果';

    tweetDivided.appendChild(anchor);

    // widget.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
        // TODO ボタンのonclick()処理を呼び出す
        assessmentButton.onclick();
    }
}

const answers = ['大吉','中吉','小吉','凶','大凶'];
const color = ['赤','黄色','青']

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i)
    }

    // 文字のコード番号の合計の回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length
    const index2 = sumOfCharCode % color.length

    let result = '今日のあなたの運勢は' + answers[index] + '！ラッキーカラーは' + color[index2] + '！';

    result = result.replaceAll('{userName}', userName);

    if (index === 4){
        document.getElementById('ilust').createElement('omikuji_daikyou.png')
    }

    return result;
}

// テストコード
console.assert(
    assessment('太郎') === 
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)
