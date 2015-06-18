/**
 *
 * system.js
 *
 * ゲームシステム置き場
 *
 *
*/

// デバックテキストクラス
function Text(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
};

// デバッグフォントクラス
function DebugFont(context) {
    // プロパティー
    this.context = context;
    // Array オブジェクトを作成する
    this.textList = new Array();
    // 
    this.context.font = 'italic 16px Arial';
    this.context.fillStyle = "white";
};

// デバックフォント関数

/**
 * 更新関数
 *
 * システムの更新関数から毎フレーム実行される関数
 * 
*/
DebugFont.prototype.update = function () {
    // 更新関数
    for (var i = 0; i < this.textList.length; i++) {
        this.context.fillText(this.textList[i].text, this.textList[i].x, this.textList[i].y);
    }
    // リスト削除
    if (this.textList.length > 0) {
        this.textList.splice(0, this.textList.length);
    }
}

/**
 * テキスト描画発行関数
 *
 *
 *
*/
DebugFont.prototype.drawText = function (x, y, text) {
    var t = new Text(x, y + 16, text);
    this.textList.push(t);
}
