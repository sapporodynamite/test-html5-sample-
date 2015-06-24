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
var canvas;
var context;
var sysDebugFont;
var frameCount;
var o = new FuncCallObserver;
var s = new Profiler;
var p = new ProfilerNano;
o.addListener(s);
var o2 = new FuncCallFook;
o2.addListener(p);
var sysTimer;
var cpuTime;
var sysDebugPrim;

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
    frameCount = 0;
    cpuTime = 0;

    var c = Color(0,0,0,0);
    update();  
};


/**
 * 更新関数
*/
function update() {

    // 必ずフレームの先頭
    sysTimer.start();

    frameCount++;

    // デバッグ表示
    sysDebugFont.drawText(0, 0, "hello javascript!!");
    sysDebugFont.drawText(0, 16, "sysDebugFont Test!! 日本語です//123456789");
    sysDebugFont.drawText(0, 32, "frame count: " + sysTimer.getFrameCount());
    sysDebugFont.drawText(0, 48, "elapsed Time: " + sysTimer.getElapsedTime());
    sysDebugFont.drawText(0, 64, "delta Time: " + sysTimer.getDeltaTime());
    sysDebugFont.drawText(0, 80, "delta Rate: " + sysTimer.getDeltaRate());
    sysDebugFont.drawText(0, 96, "FPS: " + sysTimer.getFPS());

    // デバッグライン
    sysDebugPrim.drawLine(Vec2(0, 0), Vec2(200, 200), Color(255, 0, 0, 0));
    sysDebugPrim.drawLine(Vec2(50, 0), Vec2(200, 200), Color(255, 0, 0, 0));
    sysDebugPrim.drawLine(Vec2(0, 0), Vec2(50, 200), Color(255, 255, 255, 0));

    // デバッグプリミティブ描画更新
    sysDebugPrim.update();

    // タイマーシステム更新
    //sysTimer.update();

    // 描画処理
    draw();

    // 必ずフレームの最後
    sysTimer.stop();

    // ミリ秒後に再帰処理をしてループする
    setTimeout(update, 1000/60);
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