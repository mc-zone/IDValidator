#IDValidator.js [![Build Status](https://travis-ci.org/mc-zone/IDValidator.svg?branch=master)](https://travis-ci.org/mc-zone/IDValidator/) [![npm version](https://badge.fury.io/js/id-validator.svg)](http://badge.fury.io/js/id-validator)

中国大陆个人身份证号码验证器（JS版）

Chinese Personal ID Card Validation

支持15位与18位身份证号

支持 AMD/CMD/CommonJS, 或浏览器直接使用


##API
`isValid()` 验证号码是否合法，合法返回true，不合法返回false

`getInfo()` 号码合法时返回分析信息（地区、出生日期、性别、校验位），不合法返回false

`makeID()` 伪造一个符合校验的ID


##Getting Start

###浏览器端直接使用
```html
<script type="text/javascript" src="path/to/IDValidator/IDValidator.min.js" charset="utf-8" ></script>
<script type="text/javascript" src="path/to/IDValidator/GB2260.min.js" charset="utf-8" ></script>
<script type="text/javascript">

    //新建普通实例
    var Validator = new IDValidator();

    //或使用带地址码实例,需要引入GB2260
    var Validator = new IDValidator( GB2260 );

</script>
```

###AMD / RequireJS
```javascript
requirejs.config({
    paths: {
        IDValidator:'path/to/IDValidator',
        GB2260:'path/to/GB2260'
    }
});
require(["IDValidator","GB2260"], function(IDValidator,GB2260) {

    var Validator = new IDValidator();

    //或使用地址库
    var Validator2 = new IDValidator( GB2260 );

});

```

###CMD / SeaJS
```javascript
define(function(require, exports, module) {
    var IDValidator = require('path/to/IDValidator');
    var Validator = new IDValidator();

    //或使用地址库
    var GB2260 = require('path/to/GB2260');
    var Validator2 = new IDValidator( GB2260 );
});
```

###CommonJS / Node
Install via npm:
```bash
npm i id-validator --save
```

```javascript
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');

var Validator = new IDValidator( GB2260 );

```

提示：所有API引入IDValidator.js就可以使用。

GB2260.js为GB 2260地址码数据，用于分析地址信息，在实例化时传入，可以不使用。

压缩后:

IDValidator.min.js 3K 

GB2260.min.js 140K 

##使用方法:

实例化查询器:
```js
var Validator = new IDValidator();
```
实例化时可传入GB2260，信息处理中将加入地址信息
```js
var Validator = new IDValidator( GB2260 );
```

查询身份证号是否合法
```js
//JS中长数字有精度丢失问题, 请使用字符串传值
var id = "123456789012345678";

Validator.isValid( id );
//合法号码return true, 不合法return false

Validator.isValid( id, 18 );
//强制要求18位ID
```
注:

1. JS中长数字有精度丢失问题, 长数字请使用字符串传值

2. 由于15位身份证号不含校验码，只能依据地址与日期是否存在进行判断

获取身份证号信息
```js
Validator.getInfo( id );
/* 
 * 号码有效时返回内容示例:
 * {
 *   'addrCode': 100101, //地址码信息,
 *   'addr':     '北京市东城区', //地址信息, 只在实例化时传入了GB2260时返回
 *   'birth':    '1988-01-20', //出生年月日
 *   'sex':      1, //性别，0为女，1为男
 *   'checkBit': 'X', //校验位，仅当18位时存在
 *   'length':   18 //身份证类型，15位或18位
 * }
 */


Validator.getInfo( id,18 );
//强制要求18位ID
```

伪造一个ID
```js
//制造一个18位ID
var ID = Validator.makeID();

//制造一个15位ID
var ID = Validator.makeID( true );
```
详见 [`examples`](https://github.com/mc-zone/IDValidator/tree/master/examples/) .

##参考资料
GB 11643-1999 公民身份证号码

GB 2260-1995 中华人民共和国行政区划代码

## License
MIT


