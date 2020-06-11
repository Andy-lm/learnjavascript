function obj2str(obj) {
    obj.t = (Math.random() + '').replace('.', '');
    let arr = [];
    for (let key in obj) {
        arr.push(key + '=' + encodeURI(obj[key]));
    }
    let str = arr.join('&');
    return str;


}

function myJSONP(options) {
    // 1.先将url地址准备好
    options = options || {};
    let url = options.url;
    if (options.jsonp) {
        url += "?" + options.jsonp + "=";
    } else {
        url += "?callback=";
    }


    let callbackName = ("jQuery" + Math.random()).replace('.', '');
    if (options.jsonpCallback) {
        callbackName = options.jsonpCallback;
        url += options.jsonpCallback;
    } else {

        url += callbackName;

    }
    if (options.data) {
        let str = obj2str(options.data);
        url += '&' + str;
    }
    // 2.通过script标签获取后端的数据
    let oScript = document.createElement('script');
    oScript.src = url;
    document.body.appendChild(oScript);
    // 3.定义一个回调函数
    window[callbackName] = function (data) {
        // 4.删除获取到的标签
        document.body.removeChild(oScript);
        // 5.将数据返回给外界
        options.success(data);
    }
}