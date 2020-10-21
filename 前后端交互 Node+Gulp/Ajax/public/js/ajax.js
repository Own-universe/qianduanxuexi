 // 封装Ajax函数
 function ajax(options) {

     //ajax函数参数传递太多，定义默认对象
     var defaults = {
         type: 'get',
         url: '',
         // 传递参数选择对象格式
         data: {},
         header: {
             // 便于用户自定义请求格式
             'Content-Type': 'application/x-www-form-urlencoded',
         },
         success: function () {

         },
         error: function () {

         }
     }

     // 使用对象覆盖
     Object.assign(defaults, options);

     // 创建Ajax对象
     let xhr = new XMLHttpRequest();
     let params = '';
     // 接收请求参数，进行拼接
     for (var arr in defaults.data) {
         // params += arr + '=' + defaults.data[arr] + '&';
         params += `${arr}=${defaults.data[arr]}&`
     }
     // 截取字符串最后的&
     params = params.substr(0, params.length - 1);
     // console.log(params);
     // 请求地址和请求方式
     if (defaults.type == 'get') {
         defaults.url = `${defaults.url}?${params}`
         // console.log(defaults.url);
     }
     xhr.open(defaults.type, defaults.url);

     // 发送请求
     if (defaults.type == 'get') {
         xhr.send()
     } else {
         // 设置请求参数格式类型
         // 用户希望的向服务器端传递的请求参数类型
         var content = defaults.header['Content-Type'];
         xhr.setRequestHeader('Content-Type', content);
         // 判断传递对象的格式传递不同的请求参数
         if (content == 'application/json') {
             xhr.send(JSON.stringify(defaults.data))
         } else {
             xhr.send(params)
         }
     }
     // 获取服务器响应数据
     xhr.onload = function () {
         // console.log(xhr.responseText);
         // 获取响应头中的数据格式
         var resContent = xhr.getResponseHeader('Content-Type');
         // 获取相应数据
         var responseText = xhr.responseText;
         // 判断是否为JSON类型格式，如果是转换为对象格式
         if (resContent.includes('application/json')) {
             responseText = JSON.parse(responseText);
             // console.log(1);
         }
         // 对请求成功与否进行判断
         if (xhr.status == 200) {
             // 实现自己操作响应数据
             defaults.success(responseText, xhr);
         } else {
             defaults.error(responseText, xhr);
         }
     }
 }
 // 实参值可以是一个对象，理解容易
 // 封装函数中定义有默认值，所以只需要传需要的值
 