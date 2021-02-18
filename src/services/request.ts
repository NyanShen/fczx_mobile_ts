import $ from 'jquery'
/*公共请求处理文件*/
let app: any = {}

app.getHostCity = function () {
    const host = window.location.host.split('.')
    return 'xiangyang'
}

const agreement: string = 'https://'
const topDomain: string = '.fczx.com'
app.domain = app.agreement + app.getHostCity() + app.topDomain
app.apiDomain = app.agreement + 'api' + app.topDomain
app.wwwDomain = app.agreement + 'www' + app.topDomain
app.areaApiDomain = app.agreement + app.getHostCity() + '.api' + app.topDomain

app.getUrlParam = function (str: string) {
    const reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)")
    const d = window.location.href.split('?')
    if (d.length > 1) {
        let r = d[1].match(reg)
        if (r) {
            return decodeURI(r[2])
        }
    }
    return null
}

app.apiUrl = (uri: string) => {
    // return `${agreement}api${topDomain}${uri}`
    
    return `http://www.loubei.com/api${uri}`
}

app.areaApiUrl = (uri: string) => {
    // return `${agreement}areaapi${topDomain}${uri}`
    
    return `http://www.loubei.com/areaapi${uri}`
}

app.testApiUrl = (uri: string) => {
    return `http://www.loubei.com${uri}`
}

app.setToken = function (token: string) {
    window.localStorage.setItem('token', token)
}

app.getToken = function () {
    let arr, reg = new RegExp("(^| )_x_token=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
    } else {
        return undefined
    }
}

/**
 *  url, data, type, done, pagination
 *  isFile 是否上传文件
 */
app.request = function (params: any = { type: 'GET', dataType: 'json' }) {
    const city = { 'X-City': 'xiangyang' }
    const token = { 'X-Token': app.getToken() }
    params.headers = { ...params.header, ...token, ...city }

    if (typeof params.data.page != "undefined" && typeof params.data.limit != "undefined") {
        params.headers['X-Page'] = params.data.page
        params.headers['X-Page-Size'] = params.data.limit
        delete params.data.page
        delete params.data.limit
    }
    $.each(params.data, function (i: number, e: any) {
        if (typeof e == 'number' && isNaN(e)) {
            params.data[i] = null
        }
        if (typeof e == "undefined") {
            params.data[i] = null
        }
    })
    let ajaxOptions = {
        url: params.url,
        data: params.data,
        type: params.type,
        dataType: params.dataType,
        crossDomain: true,
        headers: params.headers,
        success: function (msg: any, textStatus: any, jqXHR: any) {
            if (msg.code == 1 && msg.message == 'ok') {
                msg['_page_count'] = jqXHR.getResponseHeader('X-Total')
                params.success.call(this, msg)
            } else {
                // $.MsgModal.Alert('提示', msg.message)
            }
        },
        error: function (response: any) {
            if (response.status == 404) {
                alert('接口不存在')
            } else if (response.status == 302) {
                // window.location.href = response.responseJSON.message
            } else if (response.status == 401) {
                // const backUrl = encodeURIComponent(location.href)
                // window.location.href = app.wwwDomain + '/user/login?backUrl=' + backUrl
            } else {
                if (typeof response.responseJSON != 'undefined') {
                    // $.MsgModal.Alert('提示', response.responseJSON.message)
                } else {
                    alert('系统正在开小差，请稍后再试')
                }
            }
        }
    }
    if (params.isFile) {
        $.extend(true, ajaxOptions, { processData: false, contentType: false })
    }
    $.ajax(ajaxOptions)
}

//根据长度生成随机码
app.randCode = function (len: number) {
    const charset = 'abcdefghkmnprstuvwxyzABCDEFGHKMNPRSTUVWXYZ0123456789'
    const charsetLen: number = charset.length - 1
    const indexStr: string = (charsetLen * Math.random()).toString()
    let code: string = ''
    for (let i = 0; i < len; i++) {
        code += charset[parseInt(indexStr)]
    }
    return code
}

//@fmt 'yy-MM-dd hh:mm:ss'
app.date = function (timestamp: number, fmt: any = 'yy-MM-dd hh:mm:ss') {
    const date: any = new Date(timestamp * 1000)
    const o: any = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ""))
    }

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }

    return fmt
}

//文件限制常数
app.FILE_LIMIT = {
    IMAGE_ACCEPT: ["bmp", "jpg", "png", "jpeg"],
    SIZE_10: 1024 * 1024 * 10 //10M
}
export default app