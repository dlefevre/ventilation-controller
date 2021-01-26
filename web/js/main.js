to_page = (page) => {
    $("#main-buttons").css("display",  (page == 1) ? "table" : "none" );
    $("#speed-buttons").css("display", (page == 2) ? "table" : "none" );
    $("#timer-buttons").css("display", (page == 3) ? "table" : "none" );
}

success = () => {
    $("#alert-generic-error").hide();
    $("#alert-generic-success").css("opacity",0.0).show().fadeTo(200, 0.8, () => {
        setTimeout(() => {
            $("#alert-generic-success").fadeTo(200, 0.0);
        }, 1500);
    });
}

error = () => {
    $("#alert-generic-success").hide();
    $("#alert-generic-error").css("opacity",0.0).show().fadeTo(200, 0.8, () => {
        setTimeout(() => {
            $("#alert-generic-error").fadeTo(200, 0.0);
        }, 2000);
    });
}

post_mode = (mode) => {
    $.post("/api/ventilation/mode", {'mode': mode})
        .fail(() => {
            error();
        })
        .done(() => {
            success();
        });
}

post_timer = (duration) => {
    $.post("/api/ventilation/timer", {'duration': duration})
        .fail(() => {
            error();
        })
        .done(() => {
            success();
        });
}

$().ready(() => {
    // Basic handlers
    $("button#to-speed").click(() => {to_page(2)});
    $("button#to-timer").click(() => {to_page(3)});
    $("button#cancel-speed").click(() => {to_page(1)});
    $("button#cancel-timer").click(() => {to_page(1)});

    // Toggle handlers
    $("button#toggle-auto").click(() => {post_mode("auto")});
    $("button#toggle-away").click(() => {post_mode("away")});
    $("button#toggle-speed-1").click(() => {
        post_mode("speed1");
        to_page(1);
    });
    $("button#toggle-speed-2").click(() => {
        post_mode("speed2");
        to_page(1);
    });
    $("button#toggle-speed-3").click(() => {
        post_mode("speed3");
        to_page(1);
    });
    $("button#toggle-timer-15").click(() => {
        post_timer("15");
        to_page(1);
    });
    $("button#toggle-timer-30").click(() => {
        post_timer("30");
        to_page(1);
    });
    $("button#toggle-timer-60").click(() => {
        post_timer("60");
        to_page(1);
    });
});