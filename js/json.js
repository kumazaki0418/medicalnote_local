$(function () {
    var keyupStack = [];
    $('#searchDoctor').on('keyup', function () {

        keyupStack.push(1); //配列の後ろに追加

        // 指定時間後に処理を実行させる
        setTimeout(function () {

            keyupStack.pop(); //配列の中身排出

            // 最後にkeyupされてから次の入力がなかった場合
            if (keyupStack.length === 0) {

                $.ajax({
                    type: "GET",
                    url: "sample_data/suggest_diseases.json",
                    data: {keyword : $('#searchDoctor').val()} , // キーワードを送信してデータを検索してにいく
                }).done(function(data) {

                    // 取得したデータを処理する（ここではjsonを受け取る想定）
                    var test_len = Object.keys(data["test"]).length;
                    for(var i = 0; i < test_len; i++){
                        $("#serchword ul").append('<li><a href="aaaa">' + data["test"][i]["name"] + '<span class="num">' + data["test"][i]["doctors_count"] +  "</a></li>");
                    }

                }).fail(function(data) {
                    alert('failed!');
                });

            }
        }.bind(this), 500); // 0.5秒設定

    });

});
