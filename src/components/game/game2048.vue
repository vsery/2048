<!-- 组件 -->
<template>
    <div class="Game">
        <!-- <p>
            <label for="">难度选择</label>
            <input type="number" min="4" max="8" lass="input-text">
        </p> -->
        <h3> {{palyer.step}} steps, {{palyer.score}} points </h3>
        <!-- <h3>You walk {{palyer.step}} steps, you get {{palyer.score}} points </h3>
        <h4>it takes {{gameOver.minutes}} minutes and {{gameOver.seconds}} seconds.</h4> -->
        <p><a href="JavaScript:;" class="btn" @click="_setDefault()">new Game</a></p>
        <div class="GameBox">
            <template v-for="row, rIndex in dataList">
                <template v-for="item, cIndex in row">
                    <!-- <div :class="['chunk ']+['chunk-'+[rIndex+1]]+['-'+[cIndex+1]]+[' chunk-title-'+item]" v-if="item!=0"> -->
                    <div :class="['chunk '] + ['chunk-title-'+item]" ref="item">
                        <!-- <div :class="['chunk ']+[' chunk-title-'+item]" v-if="item!=0"> -->
                        <span>{{item}}</span>
                    </div>
                </template>
            </template>
        </div>
        <footer>
            <span>{{showTime}}</span>
        </footer>
        <div class="dailog" v-if="gameOver.visible">
            <h1>Game over!</h1>
            <h3>You walk {{palyer.step}} steps, you get {{palyer.score}} points </h3>
            <h4>it takes 
                <template v-if="gameOver.minutes > 0"> {{gameOver.minutes}} minutes </template>
                <template v-if="gameOver.minutes > 0 && gameOver.seconds > 0"> and </template>
                <template v-if="gameOver.seconds > 0"> {{gameOver.seconds}} seconds </template>.
            </h4>
            <template v-if='gameOver.contact'>
                <p>
                    <label>昵称</label>
                    <input type="text" name="" class="input-text" v-model="palyer.name">
                </p>
                <p>
                    <label>手机号</label>
                    <input type="text" name="" class="input-text" v-model="palyer.phone">
                </p>
                <p>
                    <label>Email</label>
                    <input type="text" name="" class="input-text" v-model="palyer.email">
                </p>
            </template>
            <p>
                <a href="JavaScript:;" class="btn" @click="_setDefault()">Try again</a>
                <a href="JavaScript:;" class="btn" @click="gameOver.contact == true">contact</a>
            </p>
        </div>
        <div class="dailogbg" v-if="gameOver.visible" @click="_closeGameOver"></div>
    </div>
</template>
<script>
export default {
    name: '', // 结构名称
    data() {
        return {
            grade: 4,
            dataList: [], // 游戏数据
            axis: [2, 4, 8, 16, 32, 64, 1024, 2048], // 数轴
            newTime: new Date(), // 当前时间
            showTime: null,
            palyer: null,
            gameOver: {
                edit: false,
                visible: false,
                contact: false,
                minutes: null,
                seconds: null
            }
        }
    },
    created() {
        this._setDefault(); // 游戏数据
        this.palyer = { // 玩家信息
            name: null, // 昵称
            phone: null, // 手机号
            email: null, // Email
            step: 0, // 步数
            score: 0, // 分数
            howlong: null // 在线时间
        };
    },
    mounted() {
        window.app = this;
        this._clock();
        this._setTable();
        var _that = this;
        document.onkeydown = function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            _that._bodyListener(e);
        };
        // setTimeout(function() {
        //     _that.gameOver.visible = true;
        //     _that._gameOver();
        // }, 3000);
    },
    methods: {
        _setTable() {
            // console.log(this.$refs.item);
            for (var i = 0; i < this.dataList.length; i++) {
                for (var j = 0; j < this.dataList[i].length; j++) {
                    this.$refs.item[i * this.grade + j].style = 'left:' + (j * 90 + 2.5) + 'px; top:' + (i * 90 + 2.5) + 'px;';
                }
            }
        },
        _showPalyer() {
            // console.log(this.palyer);
        },
        // 绑定键盘事件
        _bodyListener(e) {
            // var _code = e.code;
            // this._move(_code);
            switch (e.keyCode) {
                case 37:
                    this._moveLeft();
                    // console.log('// 左键[←]');
                    break;
                case 38:
                    // console.log('// 上键[↑]');
                    break;
                case 39:
                    // console.log('// 右键[→]');
                    this._moveRight();
                    break;
                case 40:
                    // console.log('// 下键[↓]');
                    break;
            }
            this.palyer.step++;
            // this.palyer.score += 5;
        },
        _moveLeft() {
            for (var i = 0; i < this.grade; i++) {
                var _row = this.dataList[i];
                this._animate(_row);
            }
        },
        _moveRight() {
            for (var i = this.grade -1; i >= 0; i--) {
                var _row = this.dataList[i];
                console.log(i, _row );
                _row.reverse()
                console.log(i, _row );
                this._animate(_row.reverse());
            }
        },
        _animate(_row) {
            console.log(_row);
            _row.forEach(function(val, index) {
                var tag = true;
                for (var i = _row.length - 1; i >= 0; i--) {
                    if (_row[i] > 0 && _row[i - 1] == 0) {
                        _row[i - 1] = _row[i];
                        _row[i] = 0;
                    }
                    if (_row[i] == _row[i - 1] && tag) {
                        _row[i - 1] = _row[i] + _row[i - 1];
                        _row[i] = 0;
                        tag = false;
                    }
                }
            });
        },
        /*_move(_directed) {
            var _type;
            switch (_directed) {
                case 'ArrowUp':
                    // console.log('ArrowUp: 上');
                    _type = 'up';
                    break;
                case 'ArrowRight':
                    // console.log('ArrowRight: 右');
                    _type = 'right';
                    break;
                case 'ArrowDown':
                    // console.log('ArrowDown: 下');
                    _type = 'down';
                    break;
                case 'ArrowLeft':
                    // console.log('ArrowLeft: 左');
                    _type = 'left';
                    break;
            }
            this.gameOver.edit = this.gameOver.edit ? false : true
            this._changeDataList(_type);
        },
        _changeDataList(_type) {
            var arr = this.dataList;
            for (var i = 0; i < arr.length; i++) { // 每行
                var r = arr[i];
                for (var j = 0; j < r.length; j++) { // 每列
                    j = this._calcGrid(i, j, _type);
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // console.log('第 %c' + (i + 1) + ' %c行 第 %c' + (j + 1) + '%c 列 值 %c' + _arr[i][j], 'color: #48ffff', 'color: white', 'color: #bada55', 'color: white', 'color: #da55ba'); //
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                }
            }
            if (this.gameOver.edit) {
                this._addRandom();
            }
        },
        _calcGrid(i, j, _type) {
            // console.log(_type);
            var _arr = this.dataList, // demo;
                _max = _arr[i].length, // 最大值
                _index = j; // 小标
            if (_arr[i][j] > 0) {
                switch (_type) {
                    case 'right':
                        for (var k = j + 1; k < _max; k++) {
                            if (_arr[i][k] == 0) {
                                _arr[i][k] = _arr[i][j];
                                _arr[i][j] = 0;
                            } else if (_arr[i][j] == _arr[i][k]) {
                                _arr[i][k] = _arr[i][j] + _arr[i][k];
                                _arr[i][j] = 0;
                                _index = k;
                                // break;
                            } else {
                                break;
                            }
                        }
                        break;
                    case 'down':
                        for (var k = i + 1; k < _max; k++) {
                            if (_arr[k][j] == 0) {
                                _arr[k][j] = _arr[i][j];
                                _arr[i][j] = 0;
                            } else if (_arr[i][j] == _arr[k][j]) {
                                _arr[k][j] = _arr[i][j] + _arr[k][j];
                                _arr[i][j] = 0;
                                // _index = k;
                                // break;
                            } else {
                                break;
                            }
                        }
                        break;
                    case 'left':
                        for (var k = j - 1; k >= 0; k--) {
                            if (_arr[i][k] == 0) { continue; }
                            if (_arr[i][k] == _arr[i][j]) {
                                _arr[i][k] = _arr[i][j] + _arr[i][k];
                                _arr[i][j] = 0;
                                _index = j + 1;
                                break;
                            } else {
                                break;
                            }
                        }
                        break;
                    case 'up':
                        for (var k = i - 1; k >= 0; k--) {
                            if (_arr[k][j] == 0) { continue; }
                            if (_arr[k][j] == _arr[i][j]) {
                                _arr[k][j] = _arr[i][j] + _arr[k][j];
                                _arr[i][j] = 0;
                                _index = j + 1;
                                break;
                            } else {
                                break;
                            }
                        }
                        break;
                }
            } else {
                _index = j;
            }
            return _index;
        },*/

        // 游戏技术 触发
        _gameOver() {
            this.gameOver.visible = true;
            this.palyer.howlong = new Date - this.newTime; // 当前游戏时间
            this.gameOver.minutes = parseInt(this.palyer.howlong / 1000 / 60); // 获取分钟
            this.gameOver.seconds = parseInt(this.palyer.howlong / 1000) - this.gameOver.minutes * 60; // 获取秒钟
        },

        // 关闭游戏结束弹框
        _closeGameOver() {
            this.gameOver.visible = false;
            this.newTime = new Date();
        },

        // 添加随机数
        _addRandom() {
            var _temp = []; // 零时数组, 统计可用格子
            for (var i = 0; i < this.dataList.length; i++) {
                var _row = this.dataList[i];
                for (var j = 0; j < _row.length; j++) {
                    var _cell = this.dataList[i][j];
                    if (_cell == 0) { _temp.push({ row: i, cell: j }) } // 记录格子行,列
                }
            }
            // 没有格子时.结束游戏
            if (_temp.length == 0) {
                this._gameOver();
            }
            // 添加 1/2次 随机数
            for (var i = 0; i < (_temp.length < 2 ? _temp.length : 2); i++) {
                var _index = parseInt(Math.random() * 2);
                var _ran = parseInt(Math.random() * _temp.length); // 随机小标
                this.dataList[_temp[_ran].row][_temp[_ran].cell] = this.axis[_index];
            }
        },

        // 设置 游戏默认值
        _setDefault(grade) {
            if (this.gameOver.visible) { this._closeGameOver() } // 关闭游戏结束弹框
            this.dataList = [];
            if (!grade) { grade = this.grade } else { this.grade = grade } // 重置难度
            for (var i = 0; i < grade; i++) { // 绘制表格
                var _arr = [];
                for (var j = 0; j < grade; j++) {
                    _arr.push(0);
                }
                this.dataList.push(_arr);
            }
            this._addRandom();
        },

        // 时间控件
        _clock() {
            var _that = this;
            setInterval(function() {
                _that.showTime =
                    // new Date().getFullYear() + '/' +
                    // (new Date().getMonth() + 1) + '/' +
                    // new Date().getDate() + ' ' +
                    _that._checkTime(new Date().getHours()) + ':' +
                    _that._checkTime(new Date().getMinutes()) + ':' +
                    _that._checkTime(new Date().getSeconds());
            }, 1000);
        },

        // 处理数字 返回2位数
        _checkTime(i) {
            if (i < 10) { i = "0" + i }
            return i
        }
    }

}

</script>
<style>
@import url(main.css);
body {
    margin: 0 !important;
}

</style>
<style scoped>


</style>
