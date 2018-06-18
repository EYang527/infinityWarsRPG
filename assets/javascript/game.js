// declaration object

    window.gameObj= {
        win:0,
        champion:0,
        gameOver:0,

        characterArray:[{
        name: 'Dr Bruce Banner',
        visual: './assets/images/bruceBanner.jpg',
        healthP:20,
        attackP:5,
        counterA:5,
        },
        {
        name: 'Steve Rodgers',
        visual: './assets/images/captainAmerica.jpg',
        healthP:120,
        attackP:12,
        counterA:15,
        },
        {
        name: 'Iron-Man',
        visual:'./assets/images/ironManSD.jpg',
        healthP:100,
        attackP:20,
        counterA:10,
        },
        {
        name: 'Thor God of thunder',
        visual: './assets/images/thorSD.jpg',
        healthP:130,
        attackP:25,
        counterA:20,
        },
        {
        name: 'Thanos',
        visual: './assets/images/thanosSD.jpg',
        healthP:150,
        attackP:25,
        counterA:20,
        },]


        };
                   
                    
    


$(document).ready(function(){
init();


})


function init() {
 
    for (var c in gameObj.characterArray) {
        
        console.log(gameObj.characterArray[c].name);
        var charDiv=$("<div class='character' data-char="+c+">");
        
        var newP=$("<p>");
        newP.text(gameObj.characterArray[c].name);
        //charDiv.append(newP);

        var image=$("<img>");
        image.attr('src',gameObj.characterArray[c].visual);
        //charDiv.append(image);

        var HP=$("<p>");
        HP.text(gameObj.characterArray[c].healthP);
        //charDiv.append(HP);


        charDiv.append(newP).append(image).append(HP);
        $(".selectionChar").append(charDiv);
    }   
}


// $('.character').delegate("click",function(){
//     alert("ok");
// });

$(document).on('click','.character',function(){
    alert("ok click success");
    var yourPick=$(this).data("char");
    alert(yourPick);

})
// $('.header').click(function(){
//     alert("header");
// });



 

  

 


