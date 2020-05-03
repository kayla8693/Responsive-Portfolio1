let submit = $("#submit");
let userName = $(".userName");
let userEmail = $(".userEmail");
let userMessage = $("#comment");

function sendEmail() {
    const newMessage = {
        from: userEmail.val().trim(),
        subject: userName.val().trim(),
        text: userMessage.val().trim()
    };
    $.post("/mail", newMessage)
        .then((data) => {
            console.log(data);
        });
};

function successMessage() {
    let success = $("<div>");
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!userName.val() || !userEmail.val() || !userMessage.val()) {

        success.css("color", "red");
        success.html("<p>Please fill out each field</p><br>");

        setTimeout(function () {
            $(success).fadeOut(1000)
        }, 2000);

        success.appendTo(".messageCol");
        
    } else if (!emailRegex.test(userEmail.val())) {

        success.css("color", "red");
        success.html("<p>Please enter a valid email address</p><br>");

        setTimeout(function () {
            $(success).fadeOut(1000)
        }, 2000);

        success.appendTo(".messageCol");

    } else {
        success.css("color", "#4BB543");
        success.html("<p>Your message has been sent!</p><br>");

        setTimeout(function () {
            $(success).fadeOut(1000)
        }, 2000);

        success.appendTo(".messageCol");

        sendEmail();

        userName.val("");
        userEmail.val("");
        userMessage.val("");
    };

};

submit.on("click", function () {
    event.preventDefault();

    successMessage();
});
