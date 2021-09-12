save_cmnt_btn = $("#save_cmnt");
show = $("#show");
comments_area = $("#comments_area");

show.on('click', function () {


    load_cmnts();

});

save_cmnt_btn.on('click', function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var cmnt_text = $("#cmnt_text").val();

    if (name == "") {
        $("#show_error").text("Введите ваше имя");
        return false;
    } else if (email == "") {
        $("#show_error").text("Введите email");
        return false;
    } else if (cmnt_text == "") {
        $("#show_error").text("Введите комментарий");
        return false;
    };
    $("#show_error").text("");

    $.ajax({
        url: 'cmts_handler.php',
        type: 'POST',
        cache: false,
        data: { 'name': name, 'email': email, 'cmnt_text': cmnt_text },
        dataType: 'text',
        beforeSend: function () {
            save_cmnt_btn.prop("disabled", true);
        },
        success: function (data) {
            //alert(data);
            save_cmnt_btn.prop("disabled", false);
            $("#cmnt_form").trigger("reset");
            $("#show_error").text("Комментарий принят!");

        }

    });
});

function load_cmnts() {

    $.ajax({
        url: 'cmts_handler.php',
        type: 'POST',
        cache: false,
        data: { 'getjson': 'getjson' },
        dataType: 'json',
        //beforeSend: function() {
        //   save_cmnt_btn.prop("disabled", true);
        //},
        success: function (data) {
            show_cmnts(data);

        }

    });

};

function show_cmnts(json_cmnts) {

    var theArray = JSON.parse(json_cmnts);

    $.each(theArray, function (key, value) {
        console.log(value.itemVal);
    });
    comments_area.text("111");

    cmnt = `<!--Комментарий-->

          <div class="col-xs-12 col-sm-6 col-xl-4 comment p-3">
            <h2 class="w-100 p-4 text-break">Вася</h2>
            <p class="w-100 pt-5 pb-2 mail text-break">vasya@mail.ru</p>
            <p class="w-100 p-5 text text-break">Сообщение от Васи</p>
          </div>
          <!--Конец комментария-->`;

    //alert(json_cmnts);
};