#IDValidator.js

中国个人身份证号码验证器（JS版）

Chinese Personal ID Card Validation

支持15位与18位身份证号

支持 AMD/CommonJS, 或浏览器直接使用


##API
`isValid()` 验证号码是否合法，合法返回true，不合法返回false

`getInfo()` 号码合法时返回分析信息（地区、出生日期、性别、校验位），不合法返回false

`makeID()` 伪造一个符合校验的ID


##Getting Start

###浏览器端直接使用
```html
<script charset="utf-8" src="path/to/IDValidator/IDValidator.min.js" type="text/javascript" ></script>
<script charset="utf-8" src="path/to/IDValidator/GB2260.min.js" type="text/javascript" ></script>
<script type="text/javascript">

    //新建普通实例
    var Validator = new IDValidator();

    //使用地址码实例,需要引入GB2260
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

});

```

###CommonJS / Node
```javascript
var IDValidator = require('path/to/IDValidator');
var GB2260 = require('path/to/GB2260');

var Validator = new IDValidator();

```

提示：直接引入IDValidator就可以使用。

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
var id = "123456789012345678";
Validator.isValid( id );
//合法号码return true, 不合法return false
```
注:由于15位身份证号不含校验码，只能依据地址与日期是否存在进行判断

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
```

伪造一个ID
```js
//制造一个18位ID
var ID = Validator.makeID();

//制造一个15位ID
var ID = Validator.makeID( true );
```
详见 `[examples](https://github.com/mc-zone/IDValidator/tree/master/examples/)` .

##参考资料
GB 11643-1999 公民身份证号码

GB 2260-1995 中华人民共和国行政区划代码

## License
MIT


