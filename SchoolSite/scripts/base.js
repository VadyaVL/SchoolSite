var ajax = {

    callAjax(url, data, success, error) {
        $.post({
            url: url,
            type: "POST",
            dataType: "html",
            format: "json",
            traditional: true,
            data: data,
            success: success,
            error: error
        });
    }

}

var feed=  {
    DEFAULT_TAKE: 10,
    DEFAULT_REMOVE: -1,
}