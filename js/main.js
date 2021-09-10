save_cmnt_btn = $("#save_cmnt");

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
    } else if (cmnt_text == "") {
        $("#show_error").text("Введите комментарий");
        return false;
    };
    $("#show_error").text("");

    $.ajax({
        url: 'addcomment.php',
        type: 'POST',
        cache: false,
        data: { 'name': name, 'email': email, 'cmnt_text': cmnt_text },
        dataType: 'text',
        beforeSend: function() {
            save_cmnt_btn.prop("disabled", true);
        },
        success: function(data) {
            alert(data);
            save_cmnt_btn.prop("disabled", false);
        }

    });
});