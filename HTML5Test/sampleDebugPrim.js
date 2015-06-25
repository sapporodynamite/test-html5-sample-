/**
* サンプルコード
*
*
*/

// コメント
// 単一行は // を使用してください。
// 複数行のコメントは /** ..*/ を使用してください。

// グローバル変数の宣言
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 360;
var FRAME_RATE_ARRAY_LIST = SCREEN_HEIGHT - 100;
var canvas;
var context;
var sysDebugFont;
var sysDebugPrim;
var sysTimer;
var frameRateArray;

/**
 * window.onload
 *
 *
 * ページがロードされた際に実行される関数。
 * すべての処理はページがロードされてから行うため、 window.onload の中で実行する。  
*/
window.onload = function () {
    canvas = document.getElementById('scene1');
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.width = SCREEN_WIDTH + 'px';
    canvas.style.height = SCREEN_HEIGHT + 'px';
    context = canvas.getContext('2d');
    context.fillStyle = 'rgb(211, 85, 149)';
    sysDebugFont = new DebugFont(context);
    sysDebugPrim = new DebugPrim(context);
    sysTimer = new Timer();
    frameRateArray = new Array();
    update();
};


/**
 * 更新関数
*/
function update() {

    // 必ずフレームの先頭
    sysTimer.start();

    // リスト以上の場合は 配列から要素を取り除く
    if (frameRateArray.length > FRAME_RATE_ARRAY_LIST) {
        frameRateArray.shift();
    }
    frameRateArray.push(sysTimer.getDeltaRate());

    // デバッグライン
    sysDebugPrim.drawLine(Vec2(0, 25), Vec2(200, 25), Color(255, 0, 0, 0));
    sysDebugPrim.drawLine(Vec2(50, 50), Vec2(100, 50), Color(255, 255, 255, 0));

    // フレームレートデバッグ
    {
        sysDebugPrim.drawLine(Vec2(50, 310), Vec2(50, 340), Color(255, 255, 255, 0));
        sysDebugPrim.drawLine(Vec2(SCREEN_WIDTH - 50, 310), Vec2(SCREEN_WIDTH - 50, 340), Color(255, 255, 255, 0));

        if (frameRateArray.length > 2) {
            for (var i = 0; i < frameRateArray.length - 1; i++) {
                var x0 = (i / FRAME_RATE_ARRAY_LIST) * (SCREEN_WIDTH-100);
                var y0 = (frameRateArray[(frameRateArray.length-1)-i] * 30.0) - 30.0;
                var x1 = ((i + 1) / FRAME_RATE_ARRAY_LIST) * (SCREEN_WIDTH - 100);
                var y1 = (frameRateArray[(frameRateArray.length-1)-(i+1)] * 30.0) - 30.0;
                sysDebugPrim.drawLine(Vec2(50 + x0, 325 + y0), Vec2(50 + x1, 325 + y1), Color(255, 255, 255, 0));
            }
        }
    }

    // デバッグレクト
    sysDebugPrim.drawRect(Rect(25, 200, 100, 100), Color(50, 50, 50, 0));
    sysDebugPrim.drawRect(Rect(200, 200, 100, 100), Color(0, 50, 50, 0));

    // デバッグプリミティブ描画更新
    sysDebugPrim.update();

    // タイマーシステム更新
    //sysTimer.update();

    // 描画処理
    draw();

    // 必ずフレームの最後
    sysTimer.stop();

    // ミリ秒後に再帰処理をしてループする
    setTimeout(update, 1000 / 60);
};

/**
 * 描画関数
*/
function draw() {
    // キャンバスの描画処理

    // 画面クリア
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.beginPath();
    context.fillStyle = "rgb(100, 100, 100)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.closePath();

    // デバッグフォント描画処理
    sysDebugFont.update();
    // デバッグプリミティブ描画処理
    sysDebugPrim.draw();
};