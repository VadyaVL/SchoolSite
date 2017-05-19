var ajax = {

    callAjax(url, data, success) {//call
        $.post({
            url: url,
            type: "POST",
            dataType: "html",
            format: "json",
            traditional: true,
            data: data,
            success: success
        });
    }

}