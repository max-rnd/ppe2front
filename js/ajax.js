$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/expo',
        success: function (val) {
            var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
            var dateDebut = new Date(val['dateDebut']);
            var dateFin = new Date(val['dateFin']);
            var dd = dateDebut.getDate() + " " + mois[dateDebut.getMonth()];
            var df = dateFin.getDate() + " " + mois[dateFin.getMonth()];
            $("#titreExpo").html(val['titre']);
            $("#dateExpo").html("Du " + dd + " au " + df);
            $("#noteComm").html(val['noteComm']);
        },
        error: function () {
            alert("Ajax error : exposition");
        }
    });
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/expo',
        success: function (val) {
            var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
            var dateDebut = new Date(val['dateDebut']);
            var dateFin = new Date(val['dateFin']);
            var dd = dateDebut.getDate() + " " + mois[dateDebut.getMonth()];
            var df = dateFin.getDate() + " " + mois[dateFin.getMonth()];
            $("#titreExpo").html(val['titre']);
            $("#dateExpo").html("Du " + dd + " au " + df);
            $("#noteComm").html(val['noteComm']);
        },
        error: function () {
            alert("Ajax error : exposition");
        }
    });
})