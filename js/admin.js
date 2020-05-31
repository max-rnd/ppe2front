$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/allexpo',
        dataType: 'json',
        success: function (expos) {
            // Création des méthode / fonction
            selectExpo = document.getElementById('selectExpo');
            for (i = 0; i < expos.length; i++) {
                selectExpo.options[selectExpo.options.length] = new Option(expos[i]['titre'], i);
            } // Chargement de la liste des expositions
            function selectedExpo() {
                return expos[$("#selectExpo").children("option:selected").val()];
            } // Fonction qui retourne l'exposition sélectionné
            function setCacheExpo() {
                var expo = new Object();
                expo['titre'] = selectedExpo()['titre'];
                expo['dateDebut'] = selectedExpo()['dateDebut'];
                expo['dateFin'] = selectedExpo()['dateFin'];
                expo['noteComm'] = selectedExpo()['noteComm'];
                return expo;
            } // Mise en "cache" des élément de l'expo sélectionné
            function seeElemExpo(expo) {
                dd = new Date(expo['dateDebut']);
                if (dd >= Date.now())
                    $("#expoStatus").html("Status : A venir");
                else
                    $("#expoStatus").html("Status : En cours");
                $("#titreExpo").attr("value", expo['titre']);
                $("#dateDebut").attr("value", expo['dateDebut']);
                $("#dateFin").attr("value", expo['dateFin']);
                CKEDITOR.instances.textNoteComm.setData(expo['noteComm']);
            } // Fonction d'affichage des élément del'expo
            function getEditExpo() {
                var expo = new Object();
                expo['titre'] = $("#titreExpo").val();
                expo['dateDebut'] = $("#dateDebut").val();
                expo['dateFin'] = $("#dateFin").val();
                expo['noteComm'] = CKEDITOR.instance.textNoteComm.getData();
                return expo;
            }  // Fonction de récupération des éléments saisie (ou modifié) par l'utilisateur

            // Début
            CKEDITOR.replace('textNoteComm'); // Inicialisation CKEditor (remplace le textarea #textNoteComm)
            seeElemExpo(setCacheExpo());
            $("#noteComm").hide(); // De base la note du commissaire est masqué
            $("#selectExpo").change(function () {
                seeElemExpo(setCacheExpo());
            }); // Quand l'utilisateur change l'exposition sélectionné
            $("#showNoteComm").click(function () {
                if ($("#showNoteComm").attr("value") == 0) {
                    $("#showNoteComm").attr("value", 1);
                    $("#showNoteComm").html("Masquer la note du commissaire");
                    $("#noteComm").show();
                } else {
                    $("#showNoteComm").attr("value", 0);
                    $("#showNoteComm").html("Afficher la note du commissaire");
                    $("#noteComm").hide();
                }
            }); // Quand on click sur "Afficher / Masquer la note du commissaire"
            $("#expoUpdate").click(function () {
                expo = getEditExpo();
                if ( // Véfication pour voir si des champs son vide (a par la note du commissair)
                    expo['titre'].trim() == "" ||
                    expo['dateDebut'] == "" ||
                    expo['dateFin'] == ""
                ) {
                    if (expo['titre'].trim() == "")
                        $("#titreExpo").addClass("is-invalid");
                    if (expo['dateDebut'] == "")
                        $("#dateDebut").addClass("is-invalid");
                    if (expo['dateFin'] == "")
                        $("#dateFin").addClass("is-invalid");
                } else {
                    if ( // Vérification pour voir si les valeurs ont changées
                        newVal['titre'] == val[idExpo - 1]['titre'] &&
                        newVal['dateDebut'] == val[idExpo - 1]['dateDebut'] &&
                        newVal['dateFin'] == val[idExpo - 1]['dateFin'] &&
                        newVal['noteComm'] == val[idExpo - 1]['noteComm']
                    ) {
                        generAlert('warning', "L'exposition n'a pas été mis à jour, rien n'a été changé");
                    } else {
                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:8080/expo/' + idExpo + '/edit',
                            data: expo,
                            success: function (expoRe) {
                                if (expoRe['id'] == null)
                                    generAlert('danger', "L'exposition n'a pas pu être mis à jour");
                                else
                                    generAlert('success', "L'exposition a bien été mis à jour");
                            }
                        });
                    }
                }
            }); // Quand on click sur "Mettre à jour" (l'expo)

            updateVerif($("#titreExpo"));
            updateVerif($("#dateDebut"));
            updateVerif($("#dateFin"));

            // Début partie ARTISTE
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/allartiste',
                dataType: 'json',
                success: function (val) {
                    selectArtiste = document.getElementById('selectArtiste');
                    for (i = 0; i < val.length; i++) {
                        selectArtiste.options[selectArtiste.options.length] = new Option(val[i]['nom'], val[i]['id']);
                    }
                }
            });
        },
        error: function () {
            alert("Erreur de chargement");
        }
    });
    // Fonctions globale
    function generAlert(type, msg) {
        $("body").prepend(
            "<div class=\"alert alert-" + type + " m-4 col-md-4 mx-auto fixed\" id=\"alert\">" + msg + "</div>"
        );
        setTimeout(function () {
            $("#alert").fadeOut();
        }, 2000);
    } // Génère une alèrte
    function updateVerif(champs) {
        champs.change(function () {
            champs.removeClass("is-invalid");
        });

    } // Enlève la class "is-invalid" quand l'utilisateur remplie le champ

    /*function setElemExpo() {
        dd = new Date(val['dateDebut']);
        if (dd >= Date.now())
            $("#expoStatus").html("Status : A venir");
        else
            $("#expoStatus").html("Status : En cours");

        $("#titreExpo").attr("value", val['titre']);
        $("#dateDebut").attr("value", val['dateDebut']);
        $("#dateFin").attr("value", val['dateFin']);
    }*/
});