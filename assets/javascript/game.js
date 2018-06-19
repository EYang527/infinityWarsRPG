// global variables

        var defenderHP;
        var guardianHP;
        var damageHP;
        var counterDefender;


$(document).ready(function(){

   init();

})

function init(){
    window.gameObj= {
        win:false,
        champion:false,
        gameOver:false,
        arrayGuardian:[],
        arrayDefender:[],
        characterSelected:false,
        enemySelected:false,
        counter:1,

        characterArray:[{
        name: 'Dr Bruce Banner',
        visual: './assets/images/bruceBanner.jpg',
        healthP:5,
        attackP:13,
        counterA:15,
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
        },
       
        ]

        }; 
    
    
    render(".selectionChar",gameObj.characterArray,"character");} 

function render(renderArea,arrayCharacter,classChar) {
 
    for (var c in arrayCharacter) {

        console.log(arrayCharacter[c].name);
        var charDiv=$("<div class="+classChar+" "+"data-char="+c+">");
        var newP=$("<p>");
        newP.text(arrayCharacter[c].name);
        var image=$("<img>");
        image.attr('src',arrayCharacter[c].visual);
        var HP=$("<p>");
        HP.text(arrayCharacter[c].healthP);
        charDiv.append(newP).append(image).append(HP);
        $(renderArea).append(charDiv);
    }   
}


$(document).on('click','.character',function(){
   
    if (!gameObj.characterSelected){
    //alert("ok click success");
    var yourGuardian=$(this).data("char"); 
    gameObj.characterSelected=true; 
    $(".cheating").hide();  
    
    console.log(yourGuardian);  

    $(".selectionChar").empty();  // clear selection characters list
    gameObj.arrayGuardian=gameObj.characterArray.splice(yourGuardian,1);
    console.log("defender ",gameObj.arrayGuardian);
    render(".selectionChar",gameObj.arrayGuardian,"hero");

     //move remaining to enemies to attack.
    console.log("enemies ",gameObj.characterArray);
    render(".ennemyTable",gameObj.characterArray,"character");
    }

    else
    {
        var yourDefender=$(this).data("char"); 
        gameObj.enemySelected=true;                 // set enemy selected.
      // $(".ennemyTable").hide();  // clear selection Ennemy list
        gameObj.arrayDefender=gameObj.characterArray.splice(yourDefender,1);
        $(".ennemyTable").empty(); 
        $(".pclassEnemy").hide(); 
        
        render(".ennemyTable",gameObj.characterArray,"character");
        render(".defenderPosition",gameObj.arrayDefender,"defender");
        $(".ennemyTable").hide(); 
        
    }

});

$(document).on('click','.attack',function(){

    //alert(gameObj.characterSelected);

    if(gameObj.win=true){
        $(".printMessage").html("<h1> you must select an enemy </h1>");
    }
    
    if (gameObj.characterSelected==false)
    {
        $(".printMessage").html("<h1> You first need to pick your character</h1>");
    }
    else if (gameObj.enemySelected==false){
        $(".printMessage").html("<h1> No enemy in the area </h1>");
    }
    else if (gameObj.characterSelected==true && gameObj.enemySelected==true ){
    $(".printMessage").html("<h1> Battle Starts ...</h1>");
    //alert("battle starts");
    launchBattle();
    }
    
    
    else {alert("something wrong occured ...");}

});
 
function launchBattle(){

    console.log(gameObj.arrayDefender);
    console.log(gameObj.arrayGuardian);

    defenderHP=gameObj.arrayDefender[0].healthP;
    guardianHP=gameObj.arrayGuardian[0].healthP;
    damageHP=gameObj.arrayGuardian[0].attackP;
    counterDefender=gameObj.arrayDefender[0].counterA;

    if (guardianHP>1 && defenderHP>1) {
        defenderHP-=damageHP*gameObj.counter;
        console.log("guard HP = "+guardianHP);
        console.log("def HP = "+defenderHP);
        guardianHP-=counterDefender;

        gameObj.arrayGuardian[0].healthP=guardianHP;
        gameObj.arrayDefender[0].healthP=defenderHP;

        $(".printMessage").html("<h1> you made "+damageHP*gameObj.counter+ " damage and receive "+counterDefender+ " HP loss</h1>");
        gameObj.counter++;

        $(".defenderPosition").empty();
        render(".defenderPosition",gameObj.arrayDefender,"defender");
        $(".selectionChar").empty();
        render(".selectionChar",gameObj.arrayGuardian,"character");


    }
    else if ((guardianHP<=0) && (defenderHP>1))
    {
        //alert("you lose");       
       // $(".selectionChar").empty();  
        gameObj.gameOver=true;
        $(".printMessage").html("<h1> Game over , click on Reset to try again ... </h1>");
    }
    else if ((defenderHP<=0) && guardianHP>1)
    {
        gameObj.win=true;
        //alert("defender defeated...");
        $(".printMessage").html("<h1> you defeat "+gameObj.arrayDefender[0].name+" </h1>");
        //remove character from defender position
        $(".defenderPosition").empty();
        // show enemy table again
        $(".ennemyTable").show();
        $(".pclassEnemy").show(); 
        //}
        if ((gameObj.characterArray.length)<=0)
        {
        gameObj.champion=true;
        gameObj.gameOver=true;
        alert("you beat everybody ....");

        $(".printMessage").html("<h1> You're the Champion !!! </h1>");

        }
    }
    
}

$(document).on('click','.reset',function(){
    $(".printMessage").html("");
    $(".ennemyTable").empty();
    $(".selectionChar").empty();
    $(".ennemyTable").empty();
    $(".ennemyTable").show();
    $(".defenderPosition").empty();
    $(".cheating").show();

    init();
});

$(document).on('click','.cheating',function(){
    //if(gameObj.characterSelected=="false"){
    
    $(".selectionChar").empty();
    gameObj.characterArray[0].name="Hulk";
    gameObj.characterArray[0].healthP=500;
    gameObj.characterArray[0].visual="./assets/images/hulkSD.jpg";
    render(".selectionChar",gameObj.characterArray,"character");
});   
  

 


