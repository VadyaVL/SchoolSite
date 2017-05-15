var ajax = {

    makeAjax(url, data, success) {
        $.post({
            url: url,
            type: "GET",
            dataType: "html",
            format: "json",
            data: data,
            success: success
        });
    }

}