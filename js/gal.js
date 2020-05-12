const img=[
    ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg"],
    ["07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg"]
];

const txt=[
    [
        "Corrida<br>1935",
        "Femme assise aux bras croisés<br>1937",
        "Femme assise dans un fauteuil<br>1910",
        "Femme au fauteuil rouge<br>1931",
        "Guitare \"J'aime Eva\" 1912",
        "Head 1911"
    ],
    [
        "La Suppliante 1927",
        "Le grand nu au fauteuil Rouge<br>1922",
        "Minotaure et jument morte devant une grotte<br>face à une jeune fille au foile<br>1936",
        "Olga au chapeau à plume 1920",
        "Olga Khokhlova à la mantille 1917",
        "Vue Boisgeloup sous la pluie, et arc-en-ciel 1932"
    ]
];

let alea0 = Math.floor(Math.random()*2);
let alea1 = Math.floor(Math.random()*2);
let alea2 = Math.floor(Math.random()*2);
let alea3 = Math.floor(Math.random()*2);
let alea4 = Math.floor(Math.random()*2);
let alea5 = Math.floor(Math.random()*2);

$("#img1").attr('src',"image/oeuvres/"+img[alea0][0]);
$("#img2").attr('src',"image/oeuvres/"+img[alea1][1]);
$("#img3").attr('src',"image/oeuvres/"+img[alea2][2]);
$("#img4").attr('src',"image/oeuvres/"+img[alea3][3]);
$("#img5").attr('src',"image/oeuvres/"+img[alea4][4]);
$("#img6").attr('src',"image/oeuvres/"+img[alea5][5]);

$("#txt1").html(txt[alea0][0]);
$("#txt2").html(txt[alea1][1]);
$("#txt3").html(txt[alea2][2]);
$("#txt4").html(txt[alea3][3]);
$("#txt5").html(txt[alea4][4]);
$("#txt6").html(txt[alea5][5]);