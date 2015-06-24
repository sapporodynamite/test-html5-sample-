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

// タイマークラス

function Timer() {
    var self = this;
    self.startTime = null;
    self.endTime = null;
    self.elapsedTime = null;
    self.deltaTime = null;
    self.deltaRate = null;
    self.fps = null;
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
    //this.endTime = performance.now();
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

