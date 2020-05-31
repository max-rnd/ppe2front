$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/expo',
        dataType: 'json',
        success: function (val) {
            var idArtiste = val['artiste'];
            var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
            var dateDebut = new Date(val['dateDebut']);
            var dateFin = new Date(val['dateFin']);
            var dd = dateDebut.getDate() + "";
            if (dateDebut.getMonth() != dateFin.getMonth())
                dd = dd + " " + mois[dateDebut.getMonth()];
            var df = dateFin.getDate() + " " + mois[dateFin.getMonth()];
            $("#titreExpo").html(val['titre']);
            $("#dateExpo").html("Du " + dd + " au " + df);
            $("#noteComm").html(val['noteComm']);
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/artiste/' + idArtiste,
                dataType: 'json',
                success: function (val) {
                    $("#nomArtiste").html(val['nom']);
                    $("#portrait").attr("src","image/portraits/" + val['portrait']);
                    $("#bioResu").html(val['resuBio']);
                    $("#bioDetaille").html(val['bio']);
                }
            });
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/oeuvres/' + idArtiste,
                dataType: 'json',
                success: function (val) {
                    $.each(val, function (i) {
                        var d = new Date(val[i]['date']);
                        $("#galerie").append(
                            "<div class=\"box color1\"><div><img src=\"image/oeuvres/" +
                            val[i]['image'] +
                            "\"></div><p id=\"txt1\">" +
                            val[i]['nom'] + "<br/>" + d.getFullYear() +
                            "</p></div>"
                        );
                    });
                }
            });
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/films/' + idArtiste,
                dataType: 'json',
                success: function (val) {
                    $.each(val, function (i) {
                        var d = new Date(val[i]['date']);
                        $("#films").append(
                            "<div class=\"box color2\"><div><img src=\"image/films/" +
                            val[i]['image'] +
                            "\" id=\"imgFilm1\"></div><div>" +
                            val[i]['description'] +
                            "</div></div>"
                        );
                    });
                }
            });
        },
        error: function () {
            alert("Erreur de chargement");
        }
    });
});