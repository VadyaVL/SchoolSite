var ajax = {

    makeAjax(url, data, success) {
        $.post({
            url: url,
            type: "GET",
            dataType: "html",
            format: "json",
            traditional: true,
            data: data,
            success: success
        });
    }

}