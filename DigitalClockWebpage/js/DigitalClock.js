/**
 *   Coded by Rickiarty @ GitHub 
 */

var _ON_ = false;

var hours_textarea = null;
var minutes_textarea = null;
var seconds_textarea = null;

function onBtnClick() {
    this._ON_ = !this._ON_;
    if(this._ON_) {
        document.getElementById("switch").innerText = "&nbspON&nbsp";
        document.getElementById("switch").style.backgroundColor = "#FF0000";
    } else {
        document.getElementById("switch").innerText = "&nbspOFF";
        document.getElementById("switch").style.backgroundColor = "#808080";
    }
}

function onBtnHDClick() {
    if (!this._ON_) {
        var num = parseInt(this.hours_textarea.value);
        num = (num + 23) % 24;
        this.hours_textarea.innerText = this.padding_left(num.toString(), 2, "0");
    }
}

function onBtnHUClick() {
    if (!this._ON_) {
        var num = parseInt(this.hours_textarea.value);
        num = (num + 1) % 24;
        this.hours_textarea.innerText = this.padding_left(num.toString(), 2, "0");
    }
}

function onBtnMDClick() {
    if (!this._ON_) {
        var num = parseInt(this.minutes_textarea.value);
        num = (num + 59) % 60;
        this.minutes_textarea.innerText = this.padding_left(num.toString(), 2, "0");
    }
}

function onBtnMUClick() {
    if (!this._ON_) {
        var num = parseInt(this.minutes_textarea.value);
        num = (num + 1) % 60;
        this.minutes_textarea.innerText = this.padding_left(num.toString(), 2, "0");
    }
}

function onBtnSDClick() {
    if (!this._ON_) {
        var num = parseInt(this.seconds_textarea.value);
        num = (num + 59) % 60;
        this.seconds_textarea.innerText = this.padding_left(num.toString(), 2, "0");
    }
}

function onBtnSUClick() {
    if (!this._ON_) {
        var num = parseInt(this.seconds_textarea.value);
        num = (num + 1) % 60;
        this.seconds_textarea.innerText = this.padding_left(num.toString(), 2, "0");
    }
}

function timeIncreasedByOneSecond() {
    var sec = parseInt(this.seconds_textarea.value);
    sec = (sec + 1) % 60;
    this.seconds_textarea.innerText = this.padding_left(sec.toString(), 2, "0");
    if (sec == 0) {
        var min = parseInt(this.minutes_textarea.value);
        min = (min + 1) % 60;
        this.minutes_textarea.innerText = this.padding_left(min.toString(), 2, "0");
        if (min == 0) {
            var hour = parseInt(this.hours_textarea.value);
            hour = (hour + 1) % 24;
            this.hours_textarea.innerText = this.padding_left(hour.toString(), 2, "0");
        }
    }
}

function setCurrTime() {
    var d = new Date();
    var t = d.getTime();
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    t %= day;
    var h = Math.round(t / hour + 24 - d.getTimezoneOffset() / 60) % 24;
    var m = Math.round((t % hour) / minute) % 60;
    var s = Math.round((t % minute) / second) % 60;
    this.hours_textarea.innerText = this.padding_left(h.toString(), 2, "0");
    this.minutes_textarea.innerText = this.padding_left(m.toString(), 2, "0");
    this.seconds_textarea.innerText = this.padding_left(s.toString(), 2, "0");
}

function padding_left(strNum, len, place_holder) {
    var result = strNum;
    var times = (len - strNum.length) / place_holder.length;
    var rest = (len - strNum.length) % place_holder.length;
    for(var i = 0; i < times; i += 1) {
        result = place_holder + result;
    }
    for(var i = 0; i < rest; i += 1) {
        result = place_holder[place_holder.length - i - 1] + result;
    }
    return result;
}

function padding_right(strNum, len, place_holder) {
    var result = strNum;
    var times = (len - strNum.length) / place_holder.length;
    var rest = (len - strNum.length) % place_holder.length;
    for(var i = 0; i < times; i += 1) {
        result = result + place_holder;
    }
    for(var i = 0; i < rest; i += 1) {
        result = result + place_holder[i];
    }
    return result;
}

function sleep(ms) {
    // 1000 milli-seconds = 1 second 
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log('[ Digital Clock ] is running ... \n');
    while(true) {
        if(this._ON_) {
            this.timeIncreasedByOneSecond();
        }
        //await this.sleep(1000); // 1000 milli-seconds = 1 second 
        await this.sleep(990);
    }
}

function initialize() {
    this._ON_ = true;
    document.getElementById("switch").innerText = "&nbspON&nbsp";
    document.getElementById("switch").style.backgroundColor = "#FF0000";
    //this._ON_ = false;
    //document.getElementById("switch").innerText = "&nbspOFF";
    //document.getElementById("switch").style.backgroundColor = "#808080";
    this.hours_textarea = document.getElementById('hours');
    this.minutes_textarea = document.getElementById('minutes');
    this.seconds_textarea = document.getElementById('seconds');
    this.setCurrTime();
}

this.initialize();
this.run();
