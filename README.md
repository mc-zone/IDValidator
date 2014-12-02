#IDValidator.js

中国个人身份证号码验证器（JS版）

Chinese Personal ID Card Validation

15位与18位身份证号均支持


##API
`isValid()` 验证号码是否合法，合法返回true，不合法返回false

`getInfo()` 号码合法时返回分析信息（地区、出生日期、性别、校验位），不合法返回false


##使用方法
引入文件
```html
<script charset="utf-8" type="text/javascript" src="path/to/IDValidator/IDValidator.min.js"></script>
```


新建实例
```js
var Validator = new IDValidator();
```

查询身份证号是否合法
```js
var id = "123456789012345678";
Validator.isValid(id);
//合法号码return true, 不合法return false
```
注:由于15位身份证号不含校验码，只能依据地址与日期是否存在进行判断

获取身份证号信息
```js
Validator.getInfo(id);
/* 
 * 号码有效时返回内容示例:
 * {
 * 'addr':'北京市东城区', //地址
 * 'birth':'1988-01-20', //出生年月日
 * 'sex':1, //性别，0为女，1为男
 * 'checkBit':'X', //校验位，仅当18位时存在
 * 'length':18 //身份证类型，15位或18位
 * }
 */
```

##参考资料
GB 11643-1999 公民身份证号码

GB 2260-1995 中华人民共和国行政区划代码

## License
MIT


