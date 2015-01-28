var IDValidator = require('../../src/IDValidator');
var Validator = new IDValidator();
var testId = "371001198010082394";
var fakeId = "345955198706122245";
var fifteenId = "431389760616601";

//检测是否合法
console.log( '\nID:'+testId+'的合法性为:\n', Validator.isValid( testId ) );
console.log( '\n假ID:'+fakeId+'的合法性为:\n', Validator.isValid( fakeId ) );
//15位
console.log( '\n15位ID:'+fifteenId+'的合法性为:\n', Validator.isValid( fifteenId ) );

//输出分析信息
console.log( '\nID:'+testId+'的信息为:\n', Validator.getInfo( testId ) );
console.log( '\n15位ID:'+fifteenId+'的信息为:\n', Validator.getInfo( fifteenId ) );

//引入地址码数据
var GB2260 = require('../../src/GB2260');
var Validator2 = new IDValidator(GB2260);

//输出分析信息带地址
console.log( '\nID:'+testId+'的信息为(带详细地址):\n', Validator2.getInfo( testId ) );

//伪造一个ID
var makeID = Validator.makeID();
console.log( '\n制作的ID:'+makeID+'的信息为:\n',Validator2.getInfo( makeID ) );
//伪造一个15位ID
var makeID2 = Validator.makeID(false);
console.log( '\n制作的15位ID:'+makeID2+'的信息为:\n',Validator2.getInfo( makeID2 ) );

//使用随机地址码伪造一个ID
var makeID3 = Validator.makeID(false,GB2260);
console.log( '\n制作的ID:'+makeID3+'的信息为:\n',Validator2.getInfo( makeID3 ) );
