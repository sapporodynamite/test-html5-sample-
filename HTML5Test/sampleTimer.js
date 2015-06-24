/**
* サンプルコード
*
*
*/

// コメント
// 単一行は // を使用してください。
// 複数行のコメントは /** ..*/ を使用してください。

// グローバル変数の宣言
var SCREEN_SIZE = 640;
var canvas;
var context;
var sysDebugFont;
var sysTimer;

/**
 * window.onload
 *
 *
 * ページがロードされた際に実行される関数。
 * すべての処理はページがロードされてから行うため、 window.onload の中で実行する。  
*/
window.onload = function () {
    canvas = document.getElementById('scene1');
    canvas.width = canvas.height = SCREEN_SIZE;
    canvas.style.width = canvas.style.height = SCREEN_SIZE + 'px';
    context = canvas.getContext('2d');
    context.fillStyle = 'rgb(211, 85, 149)';
    sysDebugFont = new DebugFont(context);
    sysTimer = new Timer();
    update();
};


/**
 * 更新関数
*/
function update() {

    // 必ずフレームの先頭
    sysTimer.start();

    // デバッグ表示
    sysDebugFont.drawText(0, 16, "frame count: " + sysTimer.getFrameCount());
    sysDebugFont.drawText(0, 32, "elapsed Time: " + sysTimer.getElapsedTime());
    sysDebugFont.drawText(0, 48, "delta Time: " + sysTimer.getDeltaTime());
    sysDebugFont.drawText(0, 64, "delta Rate: " + sysTimer.getDeltaRate());
    sysDebugFont.drawText(0, 80, "FPS: " + sysTimer.getFPS());

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
    context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);
    // デバッグフォント描画処理
    sysDebugFont.update();
};