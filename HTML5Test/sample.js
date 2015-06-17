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
    update(); 
};


/**
 * 更新関数
*/
function update() {
    // 更新処理
    draw();
    // ミリ秒後に再帰処理をしてループする
    setTimeout(update, 16.666);
};

/**
 * 描画関数
*/
function draw() {
    // キャンバスの描画処理
    context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);

    context.font = 'italic 16px Arial';
    context.fillStyle = "white";
    context.fillText("hello javascript", 0, 16, 12);
};