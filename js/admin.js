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
            $("#showNoteComm").click(function () {
                idExpo = $("#selectExpo").children("option:selected").val();
                if ($("#showNoteComm").attr("value") == 0) {
                    $("#showNoteComm").attr("value", 1);
                    $("#showNoteComm").html("Masquer la note du commissaire");
                    $("#noteComm").append(
                        "<label id=\"label-noteComm\" for=\"content-noteComm\">Note du commissaire</label>" +
                        "<textarea id=\"textNoteComm\" class=\"form-control\">" +
                            val[idExpo-1]['noteComm'] +
                        "</textarea>"
                    );
                    CKEDITOR.replace('textNoteComm');
                }
                else {
                    $("#showNoteComm").attr("value", 0);
                    $("#showNoteComm").html("Afficher la note du commissaire");
                    val[idExpo-1]['noteComm'] = CKEDITOR.instances.textNoteComm.getData();
                    $("#label-noteComm").remove();
                    $("#textNoteComm").remove();
                    $("#cke_textNoteComm").remove();
                }
            });
            $("#expoUpdate").click(function () {
                idExpo = $("#selectExpo").children("option:selected").val();
                if ($("#showNoteComm").attr("value") == 1)
                    val[idExpo-1]['noteComm'] = CKEDITOR.instances.textNoteComm.getData();

                checkValididy($("#dateDebut"), $("#formDateDebut"), val[idExpo]-1, 'dateDebut');
                checkValididy($("#dateFin"), $("#formDateFin"), val[idExpo]-1, 'dateFin');
                checkValididy($("#titreExpo"), $("#formTitre"), val[idExpo]-1, 'titre');

                if (
                    checkValididy($("#dateDebut"), $("#formDateDebut"), val[idExpo]-1, 'dateDebut') &&
                    checkValididy($("#dateFin"), $("#formDateFin"), val[idExpo]-1, 'dateFin') &&
                    checkValididy($("#titreExpo"), $("#formTitre"), val[idExpo]-1, 'titre')
                ) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/expo/' + idExpo + '/edit',
                        data: val[idExpo],
                        success: function (val) {
                            if (val['id'] == null)
                                $("body").prepend(
                                    "<div class=\"alert alert-danger\" role=\"alert\">L'exposition n'a pas pu être mis à jour</div>"
                                );
                            else
                                $("body").prepend(
                                    "<div class=\"alert alert-success\" role=\"alert\">L'exposition a bien été mis à jour</div>"
                                );
                        }
                    });
                }
            });
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
    function checkValididy(c, f, val, name) {
        var v = true;
        if (c.html() != "")
            val[name] = c.html();
        else {
            c.addClass("is-invalid");
            f.append(
                "<div class=\"invalid-feedback\">Ce champs est obligatoire</div>"
            );
            v = false;
        }
        return v;
    }
});