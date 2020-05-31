$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/allexpo',
        dataType: 'json',
        success: function (val) {
            selectExpo = document.getElementById('selectExpo');
            for (i = 0; i < val.length; i++) {
                selectExpo.options[selectExpo.options.length] = new Option(val[i]['titre'], val[i]['id']);
            }
            expoUpdate();
            var newVal = new Object();
            newVal['noteComm'] = val[idExpo-1]['noteComm'];
            $("#showNoteComm").click(function () {
                idExpo = $("#selectExpo").children("option:selected").val();
                if ($("#showNoteComm").attr("value") == 0) {
                    $("#showNoteComm").attr("value", 1);
                    $("#showNoteComm").html("Masquer la note du commissaire");
                    $("#noteComm").append(
                        "<label id=\"label-noteComm\" for=\"content-noteComm\">Note du commissaire</label>" +
                        "<textarea id=\"textNoteComm\" class=\"form-control\">" +
                        newVal['noteComm'] +
                        "</textarea>"
                    );
                    CKEDITOR.replace('textNoteComm');
                }
                else {
                    $("#showNoteComm").attr("value", 0);
                    $("#showNoteComm").html("Afficher la note du commissaire");
                    newVal['noteComm'] = CKEDITOR.instances.textNoteComm.getData();
                    $("#label-noteComm").remove();
                    $("#textNoteComm").remove();
                    $("#cke_textNoteComm").remove();
                }
            });
            $("#expoUpdate").click(function () {
                idExpo = $("#selectExpo").children("option:selected").val();

                if (
                    $("#titreExpo").val().trim() == "" ||
                    $("#dateDebut").val() == "" ||
                    $("#dateFin").val() == ""
                ) {
                    if ($("#titreExpo").val().trim() == "")
                        $("#titreExpo").addClass("is-invalid");
                    if ($("#dateDebut").val() == "")
                        $("#dateDebut").addClass("is-invalid");
                    if ($("#dateFin").val() == "")
                        $("#dateFin").addClass("is-invalid");
                } else {
                    newVal['artiste'] = val[idExpo-1]['artiste'];
                    newVal['titre'] = $("#titreExpo").val().trim();
                    newVal['dateDebut'] = $("#dateDebut").val();
                    newVal['dateFin'] = $("#dateFin").val();
                    if ($("#showNoteComm").attr("value") == 1)
                        newVal['noteComm'] = CKEDITOR.instances.textNoteComm.getData();
                    if (
                        newVal['titre'] == val[idExpo-1]['titre'] &&
                        newVal['dateDebut'] == val[idExpo-1]['dateDebut'] &&
                        newVal['dateFin'] == val[idExpo-1]['dateFin'] &&
                        newVal['noteComm'] == val[idExpo-1]['noteComm']
                    ) {
                        generAlert('warning', "L'exposition n'a pas été mis à jour, rien n'a été changé");
                    } else {
                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:8080/expo/' + idExpo + '/edit',
                            data: newVal,
                            success: function (val) {
                                if (val['id'] == null)
                                    generAlert('danger', "L'exposition n'a pas pu être mis à jour");
                                else
                                    generAlert('success', "L'exposition a bien été mis à jour");
                            }
                        });
                    }
                }
            });
            updateVerif($("#titreExpo"));
            updateVerif($("#dateDebut"));
            updateVerif($("#dateFin"));
        },
        error: function () {
            alert("Erreur de chargement");
        }
    });
    $("#selectExpo").change(function () {
        expoUpdate();
    });
    function expoUpdate() {
        idExpo = $("#selectExpo").children("option:selected").val();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/expo/' + idExpo,
            dataType: 'json',
            success: function (val) {
                dd = new Date(val['dateDebut']);
                if (dd >= Date.now()) {
                    $("#expoStatus").html("Status : A venir");
                } else {
                    $("#expoStatus").html("Status : En cours");
                }
                $("#dateDebut").attr("value", val['dateDebut']);
                $("#dateFin").attr("value", val['dateFin']);
                $("#titreExpo").attr("value", val['titre']);
            }
        });
    }
    function updateVerif(champs) {
        champs.change(function () {
            champs.removeClass("is-invalid");
        });
    }
    function generAlert(type, msg) {
        $("body").prepend(
            "<div class=\"alert alert-" + type + " m-4 col-md-4 mx-auto fixed\" id=\"alert\">" + msg +"</div>"
        );
        setTimeout(function () {
            $("#alert").fadeOut();
        }, 2000);
    }
});