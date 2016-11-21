/*
 * IDValidator.js v1.2.0
 * 中国身份证号验证 Chinese Personal ID Card Validation
 * Author: mc@mc-zone.me
 * E-mail: mc@mc-zone.me
 * Released under the MIT license
 */

;(function(factory){

    var isWindow = ( typeof window !== 'undefined'?true:false );
    var global = ( isWindow ? window : this );

    var instance = function(){ return factory(isWindow,global); };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define('IDValidator', [], instance );
    }
    // CMD / Seajs 
    else if (typeof define === "function" && define.cmd) {
        define( function(require, exports, module) {
            module.exports = factory(isWindow,global);
        });
    }
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(isWindow,global);
    }
    else {
        global.IDValidator = factory(isWindow,global);
    }

})(function(isWindow,global){

     var param = {
        error:{
            longNumber:'长数字存在精度问题，请使用字符串传值！ Long number is not allowed, because the precision of the Number In JavaScript.'
        }
     };

     var util = {
        checkArg:function(id, forceType){              
             var argType = (typeof id);

             switch( argType ){
                 case 'number':
                     //long number not allowed
                     id = id.toString();    
                     if( id.length > 15 ){
                         this.error(param.error.longNumber);
                         return false;
                     }
                     break;    
                 case 'string':
                     break;
                 default:
                     return false;
             }

             id = id.toUpperCase();

             if(forceType && !isNaN(forceType)){
               forceType = parseInt(forceType);
               if(id.length !== forceType){
                 return false;
               }
             }

             var code = null;
             if( id.length === 18 ){
                 //18位
                 code = {
                     body : id.slice(0,17),
                     checkBit : id.slice(-1),
                     type : 18
                 };
             }else if( id.length === 15 ){
                 //15位
                 code = {
                     body : id,
                     type : 15
                 };
             }else{
                 return false;
             }

             return code;
        }
        //地址码检查
        ,checkAddr:function(addr,GB2260){
            var addrInfo = this.getAddrInfo(addr,GB2260);
            return ( addrInfo === false ? false : true );
        }
        //取得地址码信息
        ,getAddrInfo:function(addr,GB2260){
          GB2260 = GB2260 || null;
          //查询GB/T2260,没有引入GB2260时略过
          if( GB2260 === null ){
              return addr;
          }
          if( !GB2260.hasOwnProperty(addr) ){
              //考虑标准不全的情况，搜索不到时向上搜索
              var tmpAddr;
              tmpAddr = addr.slice(0,4) + '00';
              if( !GB2260.hasOwnProperty(tmpAddr) ){
                  tmpAddr = addr.slice(0,2) + '0000';
                  if( !GB2260.hasOwnProperty(tmpAddr) ){
                      return false;
                  }else{
                      return GB2260[tmpAddr] + '未知地区';
                  }
              }else{
                  return GB2260[tmpAddr] + '未知地区';
              }
          }else{
              return GB2260[addr];
          }
        }
        //生日码检查
        ,checkBirth:function(birth){
            var year, month, day;
          if( birth.length == 8 ){
              year  = parseInt( birth.slice(0,4),10 );
              month = parseInt( birth.slice(4,6),10 );
              day   = parseInt( birth.slice(-2),10 );
          }else if( birth.length == 6 ){
              year  = parseInt( '19' + birth.slice(0,2),10 );
              month = parseInt( birth.slice(2,4),10 );
              day   = parseInt( birth.slice(-2),10 );
          }else{
              return false;
          }
          // TODO 是否需要判断年份
          /*
          if( year<1800 ){
              return false;
          }
          */
          //TODO 按月份检测
          if( month > 12 || month === 0 || day > 31 || day === 0 ){
              return false;
          }

          return true;
        }
        //顺序码检查
        ,checkOrder:function(order){
          //暂无需检测

          return true;
        }
        //加权
        ,weight:function(t){
          return Math.pow(2,t-1)%11;
        }
        //随机整数
        ,rand:function(max,min){
            min = min || 1;
            return Math.round( Math.random() * (max-min) ) + min;
        }
        //数字补位
        ,str_pad:function(str,len,chr,right){
            str = str.toString();
            len = len || 2;
            chr = chr || '0';
            right = right || false;
            if( str.length >= len ){
                return str;
            }else{
                for( var i=0,j=len-str.length;i<j;i++ ){
                    if( right ){
                        str = str+chr;
                    }else{
                        str = chr+str;
                    }
                }
                return str;
            }
        }
        //抛错
        ,error:function(msg){
            var e = new Error();
            e.message = 'IDValidator: ' + msg;
            throw e;
        }
     };

     var _IDValidator = function(GB2260){
         if( typeof GB2260 !== "undefined" ){
             this.GB2260 = GB2260;
         }
         //建立cache
         this.cache = {};
     };

     _IDValidator.prototype = {

         isValid:function(id, forceType){
             var GB2260 = this.GB2260 || null;
             var code = util.checkArg(id, forceType);
             if( code === false ){
                 return false;              
             }
             //查询cache
             if( this.cache.hasOwnProperty(id) && typeof this.cache[id].valid !== 'undefined' ){
                 return this.cache[id].valid;
             }else{
                 if( !this.cache.hasOwnProperty(id) ){
                    this.cache[id] = {};
                 }
             }

             var addr = code.body.slice(0,6);
             var birth = ( code.type === 18 ? code.body.slice(6,14) : code.body.slice(6,12) );
             var order = code.body.slice(-3);

             if( !( util.checkAddr(addr,GB2260) && util.checkBirth(birth) && util.checkOrder(order) ) ) {
                 this.cache[id].valid = false;
                 return false;
             }

             //15位不含校验码，到此已结束
             if( code.type === 15 ){
                 this.cache[id].valid = true;
                 return true;
             }

             /* 校验位部分 */
             
             //位置加权
             var posWeight = [];
             for(var i=18;i>1;i--){
                 var wei = util.weight(i);
                 posWeight[i] = wei;
             }

             //累加body部分与位置加权的积
             var bodySum = 0;
             var bodyArr = code.body.split('');
             for(var j=0;j<bodyArr.length;j++){
                 bodySum += ( parseInt( bodyArr[j],10 ) * posWeight[18 - j] );
             }

             //得出校验码
             var checkBit = 12 - ( bodySum % 11 );
             if( checkBit == 10 ){
                 checkBit = 'X';
             }else if( checkBit>10 ){
                 checkBit = checkBit%11;
             }
             checkBit = ( typeof checkBit === 'number'?checkBit.toString():checkBit );

             //检查校验码
             if( checkBit !== code.checkBit ){
                 this.cache[id].valid = false;
                 return false;
             }else{
                 this.cache[id].valid = true;
                 return true;
             }

         }

         //分析详细信息
         ,getInfo:function(id, forceType){
             var GB2260 = this.GB2260 || null;
             //号码必须有效
             if( this.isValid(id, forceType) === false ){
                 return false;
             }
             var code = util.checkArg(id);

             //查询cache
             //到此时通过isValid已经有了cache记录
             if( typeof this.cache[id].info !== 'undefined' ){
                 return this.cache[id].info;
             }

             var addr = code.body.slice(0,6);
             var birth = ( code.type === 18 ? code.body.slice(6,14) : code.body.slice(6,12) );
             var order = code.body.slice(-3);

             var info = {};
             info.addrCode = addr;
             if( GB2260 !== null ){
                 info.addr = util.getAddrInfo(addr,GB2260);
             }
             info.birth = ( code.type === 18 ? (
                            ([birth.slice(0,4),birth.slice(4,6),birth.slice(-2)]).join('-') ) :
                            (['19'+birth.slice(0,2),birth.slice(2,4),birth.slice(-2)]).join('-') 
                          );
             info.sex = (order%2===0?0:1);
             info.length = code.type;
             if( code.type === 18 ){
                 info.checkBit = code.checkBit;
             }

             //记录cache
             this.cache[id].info = info;

             return info;
         }

         //仿造一个号
         ,makeID:function( isFifteen ){
             var GB2260 = this.GB2260 || null;

             //地址码
             var addr = null;
             if( GB2260 !== null ){
                 var loopCnt = 0;
                 while( addr === null ){
                     //防止死循环
                     if( loopCnt>10 ){
                         addr = 110101;
                         break;
                     }
                     var prov = util.str_pad( util.rand( 50 ), 2, '0' );
                     var city = util.str_pad( util.rand( 20 ), 2, '0' );
                     var area = util.str_pad( util.rand( 20 ), 2, '0' );
                     var addrTest = [prov,city,area].join('');
                     if( GB2260[addrTest] ){
                         addr = addrTest;
                         break;
                     }
                 }
             }else{
                 addr = 110101;
             }

             //出生年
             var yr = util.str_pad( util.rand( 99,50 ), 2, '0' );
             var mo = util.str_pad( util.rand( 12,1 ), 2, '0' );
             var da = util.str_pad( util.rand( 28,1 ), 2, '0' );
             if( isFifteen ){
                 return addr + yr + mo + da + util.str_pad( util.rand( 999,1 ),3,'1' );
             }

             yr = '19' + yr;
             var body = addr + yr + mo + da + util.str_pad( util.rand( 999,1 ),3,'1' );

             //位置加权
             var posWeight = [];
             for(var i=18;i>1;i--){
                 var wei = util.weight(i);
                 posWeight[i] = wei;
             }

             //累加body部分与位置加权的积
             var bodySum = 0;
             var bodyArr = body.split('');
             for(var j=0;j<bodyArr.length;j++){
                 bodySum += ( parseInt( bodyArr[j],10 ) * posWeight[18 - j] );
             }

             //得出校验码
             var checkBit = 12 - ( bodySum % 11 );
             if( checkBit == 10 ){
                 checkBit = 'X';
             }else if( checkBit>10 ){
                 checkBit = checkBit%11;
             }
             checkBit = ( typeof checkBit === 'number'?checkBit.toString():checkBit );

             return (body + checkBit);
         }

    };//_IDValidator

    return _IDValidator;

});




