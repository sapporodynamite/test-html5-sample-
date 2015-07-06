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
    this.context.font = "14px 'ＭＳ ゴシック'";
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
    this.context.beginPath();
    this.context.fillStyle = "rgb(255, 255, 255)";
    for (var i = 0; i < this.textList.length; i++) {
        this.context.fillText(this.textList[i].text, this.textList[i].x, this.textList[i].y);
    }
    this.context.closePath();
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

// タイマークラス

function Timer() {
    var self = this;
    self.startTime = 0;
    self.endTime = 0;
    self.elapsedTime = 0;
    self.deltaTime = 0;
    self.deltaRate = 0;
    self.fps = 0;
    self.frameCount = 0;
};

// タイマー関数 

/**
 * タイマー計測開始
 *
 */ 
Timer.prototype.start = function () {
    this.startTime = this.endTime;
    this.endTime = performance.now();
    // CPU時間の経過時間の測定
    this.elapsedTime = this.endTime - this.startTime;
    // デルタ時間の計測
    this.deltaTime = this.elapsedTime / 1000.0;
    // デルタレートの計測
    this.deltaRate = this.deltaTime / (1.0 / 60.0);
    // FPSの計測
    this.fps = (1.0 / this.deltaRate ) * 60.0;
};

/**
 * タイマー計測終了
 *
 */
Timer.prototype.stop = function () {
    this.frameCount++;
};

/**
 * 更新関数
 *
 * システムの更新関数から毎フレーム実行される関数
 * FPS計測,ゲーム時間の計測などゲームのタイマー回りの更新を行う
 *
 */
Timer.prototype.update = function () {
    // CPU時間の経過時間の測定
    //this.elapsedTime = this.startTime - this.endTime;
};

/**
 * タイマー計測結果を返す
 * 得られる単位はミリ秒です。(分解能はマイクロ秒）
 * 1000ms = 1秒
 *   16ms = 約1/60秒
 */
Timer.prototype.getElapsedTime = function () {
    return this.elapsedTime;
};


/**
 * デルタ時間の結果を返す
 *
 */
Timer.prototype.getDeltaTime = function () {
    return this.deltaTime;
};

/**
 * デルタレートの結果を返す
 *
 */
Timer.prototype.getDeltaRate = function () {
    return this.deltaRate;
};

/**
 * FPSの結果を返す
 *
 */
Timer.prototype.getFPS = function () {
    return this.fps;
};

/**
 * 起動時からの経過フレーム数を返す
 */
Timer.prototype.getFrameCount = function () {
    return this.frameCount;
};

// ベクトル 2 クラス
function Vec2(x, y) {
    if (!(this instanceof Vec2)) {
        return new Vec2(x, y);
    };
    this.x = x;
    this.y = y;
};

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// カラークラス
function Color(r, g, b, a) {
    if (!(this instanceof Color)) {
        return new Color(r, g, b, a);
    }

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16))
    ].join("");
};

/**
 * 文字列型の色を返す
 *
 */
Color.prototype.toHexString = function () {
    return '#' + this.hex; 
};

// 矩形クラス
function Rect(x, y, width, height) {
    if (!(this instanceof Rect)) {
        return new Rect(x,y,width,height);
    };
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

// デバッグプリミティブラインクラス
function DebugPrimLine(v0, v1, color) {
    this.v0 = v0;
    this.v1 = v1;
    this.color = color;
};

// デバッグプリミティブ矩形クラス
function DebugPrimRect(rect, color) {
    this.rect = rect;
    this.color = color;
};

// デバッグプリミティブクラス
function DebugPrim(context) {
    // プロパティー
    this.context = context;
    // Array オブジェクトを作成する
    this.lineList = new Array();
    this.rectList = new Array();
    // 描画オブジェクトを作成する
    this.drawLineList = null;
    this.drawRectList = null;
};

/**
 * 更新関数
 *
 *
 *
 */
DebugPrim.prototype.update = function () {
    if (this.lineList.length > 0) {
        // 描画リストの作成
        this.drawLineList = {};
        for (var l = 0; l < this.lineList.length; l++) {
            var name = this.lineList[l].color.toHexString();
            // 新カラーの場合はオブジェクトを生成する
            if (typeof this.drawLineList[name] == "undefined") {
                this.drawLineList[name] = new Object();
                this.drawLineList[name].list = new Array();
            }
            this.drawLineList[name].list.push(this.lineList[l]);
        }
    }
};

/**
 * 描画関数
 *
 *
 */
DebugPrim.prototype.draw = function () {
    if (this.lineList.length > 0) {
        for (var l in this.drawLineList) {
            // 色ごとに描画開始
            this.context.beginPath();
            for (var k = 0; k < this.drawLineList[l].list.length; k++) {
                this.context.moveTo(this.drawLineList[l].list[k].v0.x, this.drawLineList[l].list[k].v0.y);
                this.context.lineTo(this.drawLineList[l].list[k].v1.x, this.drawLineList[l].list[k].v1.y);
                this.context.strokeStyle = this.drawLineList[l].list[k].color.toHexString();
            }
            this.context.closePath();
            this.context.stroke();
        }
        // リスト中身を削除
        this.lineList.splice(0, this.lineList.length);
    }
    if (this.rectList.length > 0) {
        this.context.beginPath();
        for (var i = 0; i < this.rectList.length; i++) {
            this.context.fillStyle = this.rectList[i].color.toHexString();
            this.context.fillRect(this.rectList[i].rect.x, this.rectList[i].rect.y, this.rectList[i].rect.width, this.rectList[i].rect.height);
        }
        this.context.closePath();
        // リスト中身を削除
        this.rectList.splice(0, this.rectList.length);
    } 
}

/**
 * ライン描画関数
 *
 *
 */
DebugPrim.prototype.drawLine = function (v0, v1, color) {
    var line = new DebugPrimLine(v0, v1, color);
    this.lineList.push(line);
};

/**
 * 矩形描画関数
 *
 *
 *
 */
DebugPrim.prototype.drawRect = function (rect, color) {
    var r = new DebugPrimRect(rect, color);
    this.rectList.push(r);
}; 

var FuncCallFook = function () {
    var self = this;
    self.listeners = [];
    self.fook = function (object, name) {
        name = name || object.constructor;
        for (property in object) {
            if (typeof object[property] == "function") {
                if (name == property) {
                    object[property] = function (name_, property_, method_) {
                        return function () {
                            self.notifyBeforeCall(name_, property_);
                            var retval = method_.apply(this, arguments);
                            self.notifyAfterCall(name_, property_);
                            return retval;
                        };
                    }(name, property, object[property]);
                }
            }
        }
    }

    self.notifyBeforeCall = function (name, property) {
        self.observing = false;
        for (var i = 0; i < self.listeners.length; i++) {
            self.listeners[i].beforeCall(name, property);
        }
        self.observing = true;
    }
    self.notifyAfterCall = function (name, property) {
        self.observing = false;
        for (var i = 0; i < self.listeners.length; i++) {
            self.listeners[i].afterCall(name, property);
        }
        self.observing = true;
    }
    self.addListener = function (listener) {
        self.listeners.push(listener);
    }
    self.startObserve = function () {
        self.observing = true;
    }
    self.stopObserve = function () {
        self.observing = false;
    }
};

var FuncCallObserver = function () {
    var self = this;
    self.listeners = [];
    self.observing = false;
    self.observe = function (object, name) {
        name = name || object.constructor;
        for (property in object) {
            if (typeof object[property] == "function") {
                object[property] = function (name_, property_, method_) {
                    return function () {
                        if (self.observing) {
                            self.notifyBeforeCall(name_, property_);
                        }
                        var rv = method_.apply(this, arguments);
                        if (self.observing) {
                            self.notifyAfterCall(name_, property_);
                        }
                        return rv;
                    }
                }(name, property, object[property]);
            }
        }
    }
    self.notifyBeforeCall = function (name, property) {
        self.observing = false;
        for (var i = 0; i < self.listeners.length; i++) {
            self.listeners[i].beforeCall(name, property);
        }
        self.observing = true;
    }
    self.notifyAfterCall = function (name, property) {
        self.observing = false;
        for (var i = 0; i < self.listeners.length; i++) {
            self.listeners[i].afterCall(name, property);
        }
        self.observing = true;
    }
    self.addListener = function (listener) {
        self.listeners.push(listener);
    }
    self.startObserve = function () {
        self.observing = true;
    }
    self.stopObserve = function () {
        self.observing = false;
    }
};

var Profiler = function () {
    var self = this;
    self.records = {};
    self.start = null;
    self.beforeCall = function (name, property) {
        self.start = new Date;
    }
    self.afterCall = function (name, property) {
        var key = name + "::" + property;
        if (typeof self.records[key] == "undefined") {
            self.records[key] = [];
        }
        self.records[key].push((new Date) - self.start);
    }
}

var ProfilerNano = function () {
    var self = this;
    self.records = {};
    self.start = null;
    self.beforeCall = function (name, property) {
        self.start = performance.now();
    }
    self.afterCall = function (name, property) {
        var key = name + "::" + property;
        if (typeof self.records[key] == "undefined") {
            self.records[key] = [];
        }
        self.records[key].push(performance.now() - self.start);
    }
};

