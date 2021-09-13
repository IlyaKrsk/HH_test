save_cmnt_btn = $("#save_cmnt");
show = $("#show");
comments_area = $("#comments_area");

load_cmnts();


save_cmnt_btn.on('click', function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var cmnt_text = $("#cmnt_text").val();

    if (name == "") {
        $("#show_error").text("Введите ваше имя");
        return false;
    } else if (email == "") {
        $("#show_error").text("Введите email");
        return false;
    } else if (!validateEmail(email)) {
        $("#show_error").text("Введите ккорректный e-mail");
        return false;
    } else if (cmnt_text == "") {
        $("#show_error").text("Введите комментарий");
        return false;
    };

    $("#show_error").text("");

    $.ajax({
        url: 'ajax/cmts_add.php',
        type: 'POST',
        cache: false,
        data: { 'name': name, 'email': email, 'cmnt_text': cmnt_text },
        dataType: 'text',
        beforeSend: function() {
            save_cmnt_btn.prop("disabled", true);
        },
        success: function(data) {
            //alert(data);
            save_cmnt_btn.prop("disabled", false);
            $("#cmnt_form").trigger("reset");
            $("#show_error").text("Комментарий принят!");
            load_cmnts();

        }

    });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
};

function load_cmnts() {

    $.ajax({
        url: 'ajax/show_cmnts.php',
        type: 'POST',
        cache: false,
        dataType: 'json',
        success: function(data) {

            show_cmnts(data);

        }

    });

};

function show_cmnts(json_cmnts) {

    out = "";

    var cmnts_array = JSON.parse(json_cmnts);
    for (i in cmnts_array) {
        let green = (i % 2) ? 'green' : '';
        //let n = (cmnts_array[i].email.length < 23) ? cmnts_array[i].email : cmnts_array[i].email.substr(0, 20) + '...';
        out += `<!--Комментарий-->

        <div class="col-xs-12 col-sm-6 col-xl-4 comment p-3 ${green}">
          <h2 class="w-100 p-4 text-break">${(cmnts_array[i].name.length < 23) ? cmnts_array[i].name : cmnts_array[i].name.substr(0, 20) + '...'}</h2>
          <p class="w-100 p-3 pt-5  mail text-break">${(cmnts_array[i].email.length < 23) ? cmnts_array[i].email : cmnts_array[i].email.substr(0, 20) + '...'}</p>
          <p class="w-100 p-5 text text-break">${(cmnts_array[i].cmnt_text.length < 92) ? cmnts_array[i].cmnt_text : cmnts_array[i].cmnt_text.substr(0, 89) + '...'}</p>
        </div>
        <!--Конец комментария-->`;
    }
    if (!out) out = "<center>Пока ни одного комментария!</center>";

    comments_area.html(out);

};