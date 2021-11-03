PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff()
    PennController.AddHost("https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/");; // loads pictures from external server (pre-test 3 only)
        
        var progressBarText = "Verbleibend"; //Changes the text of the progress bar

const replacePreloadingMessage = ()=>{   //Changes the Preloading Message
    const preloadingMessage = $(".PennController-PennController > div");
if (preloadingMessage.length > 0 && preloadingMessage[0].innerHTML.match(/^<p>Please wait while the resources are preloading/))
    preloadingMessage.html("<p>Bitte warten Sie einen Moment, w&auml;hrend die Medien laden. Dies kann bis zu 1 Minute dauern.</p>");
window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );

/* To run this script, you need...
1. to have Subsequence.js in your js_includes and global_z.css in your css_includes
2. the right list .csv file in PennController.Template
3. the right yes key (F or J) in place of X in: newVar("yes_key", "X") and the right Instructions as to which key means 'Yes' and 'No' in:
-PC 2. 2. Intro/instructions
-newText("intro_instructions3
-PC 4. instructions_example_name2
-.test.pressed("X")
-instructions_example_year2
-instructions_example_fact2
-PC 5. Instructions before experiment
-intro_experiment2
-newKey("continue_Ja", "X")
-Pc 6. Experimental trials
-.test.pressed("X")
-PC  7. Break
-newKey("continue_Ja2", "X")
-PC 8.  8. Comprehension test explanation screen
newText("comp1_3" 
4. the letter 'F' to 'J' after 'variable.name' in the "final" text for the validation code
*/

// Start typing your code here

// Establish sequence, with randomised items
// shuffle(randomize("real"), randomize("filler"))

// Full run:
PennController.Sequence( "demographics","instructions1","preloadPractice", "preloadCritical", "preloadPost_task", "practice_trials", "instructions2", subsequence(repeat(randomize("critical_trials"), 40) , "break"), "post_task_intro", randomize("post_task"),"end", "send" , "final" ); // Subsequence.js is needed to run this line// Subsequence.js is needed to run this line

// test run:
// PennController.Sequence("final");
//PennController.Sequence( subsequence(repeat("critical_trials", 40) , "break"),"post_task_intro", randomize("post_task"),"end", subsequence(repeat("critical_trials", 40) , "break"),"send" , "final");
//====================================================================================================================================================================================================================

// 1. Welcome page/demographics
PennController("demographics",
               // ENTER Clickworker ID
               newText("welcometext", "<p><b>Herzlich willkommen zu unserem Experiment!</b><p>")
               .settings.css("font-size", "30px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add("center at 50%", 0, getText("welcometext") )
               .print()
               ,
               newTextInput("cwID", "")
               .before(newText("cwID", "Bevor wir beginnen, geben Sie bitte Ihre Clickworker-ID ein: ") 
                       .settings.css("font-size", "20px"))
               .size(100, 20)
               .settings.center()
               .print()
               ,
               newText("blank","<p>")
               .print()
               ,
               newButton("start", "Weiter")
               .settings.center() 
               .print() 
               .wait(getTextInput("cwID")
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror","<p><br>Bitte tragen Sie bitte Ihre Clickworker-ID ein.<p>")
                         .settings.color("red")
                         .settings.center()
                         .print()
                     ))
               ,  
               getCanvas("welcomecanvas")
               .remove()
               ,
               getTextInput("cwID")
               .remove()
               ,
               getButton("start")
               .remove()
               ,
               getText("IDerror")
               .remove()
               
               // ENTER DEMOGRAPHICS
               ,
               newText("welcometext2", "<p>Um an unserem Experiment teilnehmen zu k&ouml;nnen, ben&ouml;tigen wir Angaben zu Ihrer Person. Diese werden anonym ausgewertet. Genauere Informationen entnehmen Sie bitte dem Informationsblatt f&uuml;r Proband*innen.<p>")              
               .settings.css("font-size", "20px")
               ,
               newCanvas("welcomecanvas2", 1000, 125)
               .settings.add(0, 0, getText("welcometext2") )
               .print()
               ,
               newDropDown("age", "")
               .settings.add( "17 oder junger" , "18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31" , "32 oder &auml;lter" )
               ,
               newText("agetext", "Alter:")
               .settings.css("font-size", "20px")
               .settings.bold()
               //.settings.after( getDropDown("age") )    
               ,
               newCanvas("agecanvas", 1000, 45)
               .settings.add(0, 10, getText("agetext") )
               .settings.add(100, 8, getDropDown("age") )
               .print()    
               ,
               newText("Geschlecht", "Geschlecht:")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newDropDown("sex", "" )
               .settings.add( "&nbsp;weiblich&nbsp;", "&nbsp;m&auml;nnlich&nbsp;", "&nbsp;divers&nbsp;")
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("Geschlecht") )
               .settings.add(120, 3, getDropDown("sex") )
               .print()
               ,
               newText("SpracheTest", "Haben Sie bis zum 5. Lebensjahr au&szlig;er Deutsch eine weitere Sprache gelernt?")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newTextInput("und zwar", "")
               .settings.hidden()
               ,
               newText("label input", "")
               .settings.after( getTextInput("und zwar") )
               ,
               newDropDown("language", "")
               .settings.log()
               .settings.add(  "nein", "ja, und zwar:")    
               .settings.after(  getText("label input") )
               .settings.callback(                                             //whenever an option is selected, do this:
                   getDropDown("language")
                   .test.selected("ja, und zwar:")                             //reveal the input box
                   .success( getTextInput("und zwar").settings.visible() )     //hide the input box
                   .failure( getTextInput("und zwar").settings.hidden()  )   
               )        
               ,
               newCanvas("languagecanvas", 1000, 25)
               .settings.add(0, 0, getText("SpracheTest") )
               .settings.add(690, 2, getDropDown("language") )
               .print()
               ,
               newText("<p> ")
               .print()
               ,
               newText("information", "<p>Bevor das Experiment beginnen kann, sollten Sie das <a href='https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/documentation/probanden_info_ONLINE_LifeFact.pdf' target='_blank' >Probandeninformationsblatt</a> sowie die <a href='https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/documentation/einversta%CC%88ndnis_ONLINE_LifeFact.pdf' target='_blank' >Einwilligungserkl&auml;rung</a> lesen.<p>")    
               .settings.css("font-size", "20px")
               ,
               newText("browser_info", "<p>Bitte beachten Sie, dass dieses Experiment nur mit den Browsern <b>Mozilla Firefox</b> und <b>Google Chrome</b> getestet wurde und nicht auf mobilen Ger&auml;ten funktioniert.<p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvastwo", 1000, 180)
               .settings.add(0, 0, getText("browser_info") )
               .settings.add(0, 90, getText("information") )
               .print()
               ,
               newButton("okay", "Ich habe das Probandeninformationsblatt sowie die Einwilligungserkl&auml;rung gelesen und erkl&auml;re mich mit diesen einverstanden.")
               .settings.css("font-size", "15px")        
               .print()
               .wait()  
               ,
               newText("<p> ")
               .print()
               ,
               newButton("start2", "Experiment beginnen")
               .settings.center()  
               ,
               getDropDown("age")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte geben Sie Ihr Alter an.")
                   .settings.color("red")
                   .print())   
               ,
               getDropDown("sex")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte geben Sie Ihr Geschlecht an.")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("language")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte beantworten Sie die Frage zum Spracherwerb.")                   
                   .settings.color("red")
                   .print())      
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getButton("start2")
               .print()
               .wait()
               ,
               newVar("IDage")
               .settings.global()
               .set( getDropDown("age") )
               ,
               newVar("IDsex")
               .settings.global()
               .set( getDropDown("sex") )
               ,
               newVar("IDling")
               .settings.global()
               .set( getDropDown("language") )
               ,
               newVar("IDund zwar")
               .settings.global()
               .set( getTextInput("und zwar") )
               ,
               newVar("cwID")
               .settings.global()
               .set( getTextInput("cwID") )
               ,
               newVar("yes_key")
               .settings.global()
               // F-Version: 
               .set( newText("yes_F"))
               // J-Version: 
               //.set( newText("yes_J"))
              )
    
    .log("clickworkerID", getVar("cwID"))
    .log( "age", getVar("IDage"))
    .log( "sex", getVar("IDsex"))
    .log( "L2", getVar("IDling"))
    .log( "whichL2", getVar("IDund zwar"))
    .log( "yes_key" , getVar("yes_key")) 
    .log( "item" , "demo" )
    .log( "type" , "demo" )              
    .log( "version" , "demo")
    .log( "letter" , "demo")
    .log( "sentence" , "demo")
    .log( "name" , "demo")
    .log( "real_name" , "demo")
    .log( "wrong_name" , "demo")
    .log( "name_match" , "demo")  
    .log( "year" , "demo")
    .log( "fact" , "demo")
    .log( "photo" , "demo")
    .log( "full_sentence" , "demo")
    .log( "condition" , "demo")
    .log( "life_mismatch" , "demo")
    .log( "fact_mismatch" , "demo")
    .log( "year_time" , "demo")
    .log( "fact_time" , "demo")
    .log( "year_fact" , "demo")
    .log( "list" , "demo")
    .log( "life_status" , "demo")
    .log( "occupation" , "demo")
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was 
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);        //end of welcome screen

//====================================================================================================================================================================================================================
// 2. Intro/instructions

PennController( "instructions1" ,
                newText("intro_instructions", "<p><b>Vielen Dank, dass Sie an diesem Experiment teilnehmen!</b><p> <p>In diesem Experiment werden Sie die Fotos verschiedener ber&uuml;hmter Pers&ouml;nlichkeiten sehen und Fragen zu diesen beantworten.<p> ")
                .settings.css("font-size", "20px")
                ,
                newText("intro_instructions2", "<p>Legen Sie Ihren <b>linken Zeigefinger</b> auf die Taste '<b>F</b>' und Ihren <b>rechten Zeigefinger</b> auf die Taste '<b>J</b>'.<p>")
                .settings.css("font-size", "20px")
                .settings.color("red")
                ,
                // F-Version:
                newText("intro_instructions3", "<p>Sobald ein Foto erscheint, dr&uuml;cken Sie <b>mit dem linken Zeigefinger = 'Ja'</b>, falls Sie diese Person kennen, und <b>mit dem rechten Zeigefinger = 'Nein'</b>, falls Sie diese Person nicht kennen.<p> <p>Als N&auml;chstes tragen Sie den Namen der Person auf dem Foto in die Texteingabezeile ein und dr&uuml;cken Sie <b>'Enter'</b>.<p> <p>Werden Sie 'Am Leben?' gefragt, antworten Sie, ob Sie glauben, dass diese Person noch am Leben ist: <b>linker Zeigefinger = 'Ja' / rechter Zeigefinger = 'Nein'</b>.<p> <p>Danach werden Sie eine Jahreszahl sehen. Antworten Sie, ob Sie glauben, dass diese Person im genannten Jahr am Leben war: <b> linker Zeigefinger = 'Ja'/ rechter Zeigefinger = 'Nein'</b>.<p> <p>Im Anschluss wird Ihnen ein Gegenstand gezeigt und Sie werden gefragt, ob Sie die Person mit diesem Gegenstand assoziieren k&ouml;nnen. Dr&uuml;cken Sie auch hier: <b> linker Zeigefinger = 'Ja' / rechter Zeigefinger = 'Nein'</b>.<p> <p>Zuletzt werden Sie einen Name sehen. Antworten Sie, ob der Name dem Foto entspricht: <b>linker Zeigefinger = 'Ja'/ rechter Zeigefinger = 'Nein'</b>.<p>")
                // J-Version:
                // newText("intro_instructions3", "<p>Sobald ein Foto erscheint, dr&uuml;cken Sie <b>mit dem linken Zeigefinger = 'Nein'</b>, falls Sie diese Person nicht kennen, und <b>mit dem rechten Zeigefinger = 'Ja'</b>, falls Sie diese Person kennen.<p> <p>Als N&auml;chstes tragen Sie den Namen der Person auf dem Foto in die Texteingabezeile ein und dr&uuml;cken Sie <b>'Enter'</b>.<p><p>Werden Sie 'Am Leben?' gefragt, antworten Sie, ob Sie glauben, dass diese Person noch am Leben ist: <b>linker Zeigefinger = 'Nein' / rechter Zeigefinger = 'Ja'</b>.<p> <p>Danach werden Sie eine Jahreszahl sehen. Antworten Sie, ob Sie glauben, dass diese Person im genannten Jahr am Leben war: <b> linker Zeigefinger = 'Nein'/ rechter Zeigefinger = 'Ja'</b>.<p> <p>Im Anschluss wird Ihnen ein Gegenstand gezeigt und Sie werden gefragt, ob Sie die Person mit diesem Gegenstand assoziieren k&ouml;nnen. Dr&uuml;cken Sie auch hier: <b> linker Zeigefinger = 'Nein' / rechter Zeigefinger = 'Ja'</b>.<p> <p>Zuletzt werden Sie einen Name sehen. Antworten Sie, ob der Name dem Foto entspricht: <b>linker Zeigefinger = 'Nein' / rechter Zeigefinger = 'Ja'</b>.<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas",900, 590)
                .settings.add(0,0, getText("intro_instructions"))
                .settings.add(0,110, getText("intro_instructions2"))
                .settings.add(0,150, getText("intro_instructions3"))
                .print()
                ,
                newButton("weiter", "Weiter")
                .settings.center()
                .print()
                .wait()
                ,
                getCanvas("introcanvas")
                .remove()
                ,
                getButton("weiter")
                .remove()
                ,
                newText("intro_instructions4", "<p>Wenn Sie die anschlie&szlig;enden Fragen zur Jahreszahl oder der Person nicht beantworten k&ouml;nnen, <b>dr&uuml;cken Sie keine Tasten!</b> Das Experiment geht nach 5 Sekunden automatisch weiter.<p> <p>Wenn Sie den Namen der Person auf dem Foto nicht kennen, tragen Sie stattdessen deren Besch&auml;ftigung oder etwaige andere Assoziationen ein, die Sie zu dieser Person haben, und dr&uuml;cken Sie <b>'Enter'</b>.<p>")
                .settings.css("font-size", "20px")
                .settings.color("red")
                ,
                newText("intro_instructions5", "<p>Um Ihnen den Einstieg zu erleichtern, blenden wir Ihnen die Anweisungen w&auml;hrend der Beispielrunde in <b>Rot</b> ein. F&uuml;r das tats&auml;chliche Experiment bekommen Sie aber nur die Gegenst&auml;nde, Jahre und Personen gezeigt.<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas2", 900, 240)
                .settings.add(0,0, getText("intro_instructions4"))
                .settings.add(0,150, getText("intro_instructions5"))
                .print()
                ,
                newButton("beispiel_beginnen", "Beispiele beginnen")
                .settings.center()
                .print()
                .wait()
               )
    .log("clickworkerID", getVar("cwID"))
    .log( "age", getVar("IDage"))
    .log( "sex", getVar("IDsex"))
    .log( "L2", getVar("IDling"))
    .log( "whichL2", getVar("IDund zwar"))
    .log( "yes_key" , getVar("yes_key")) 
    .log( "item" , "instructions" )
    .log( "type" , "instructions" )              
    .log( "version" , "instructions")
    .log( "letter" , "instructions")
    .log( "sentence" , "instructions")
    .log( "name" , "instructions")
    .log( "real_name" , "instructions")
    .log( "wrong_name" , "instructions")
    .log( "name_match" , "instructions")  
    .log( "year" , "instructions")
    .log( "fact" , "instructions")
    .log( "photo" , "instructions")
    .log( "full_sentence" , "instructions")
    .log( "condition" , "instructions")
    .log( "life_mismatch" , "instructions")
    .log( "fact_mismatch" , "instructions")
    .log( "year_time" , "instructions")
    .log( "fact_time" , "instructions")
    .log( "year_fact" , "instructions")
    .log( "list" , "instructions")
    .log( "life_status" , "instructions")
    .log( "occupation" , "instructions")
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was 
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 3. Preloading

CheckPreloaded( "practice_trials",10000)
    .label( "preloadPractice" );

CheckPreloaded( "critical_trials", 20000)
    .label( "preloadCritical" );

CheckPreloaded( "post_task", 10000)
    .label( "preloadPost_task" )
    
     .log("clickworkerID", getVar("cwID"))
    .log( "age", getVar("IDage"))
    .log( "sex", getVar("IDsex"))
    .log( "L2", getVar("IDling"))
    .log( "whichL2", getVar("IDund zwar"))
    .log( "yes_key" , getVar("yes_key")) 
    .log( "item" , "preload" )
    .log( "type" , "preload" )              
    .log( "version" , "preload")
    .log( "letter" , "preload")
    .log( "sentence" , "preload")
    .log( "name" , "preload")
    .log( "real_name" , "preload")
    .log( "wrong_name" , "preload")
    .log( "name_match" , "preload")  
    .log( "year" , "preload")
    .log( "fact" , "preload")
    .log( "photo" , "preload")
    .log( "full_sentence" , "preload")
    .log( "condition" , "preload")
    .log( "life_mismatch" , "preload")
    .log( "fact_mismatch" , "preload")
    .log( "year_time" , "preload")
    .log( "fact_time" , "preload")
    .log( "year_fact" , "preload")
    .log( "list" , "preload")
    .log( "life_status" , "preload")
    .log( "occupation" , "preload")
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was 
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 4. Practice round

PennController. Template( PennController.GetTable( "practice.csv"),
                          variable => PennController( "practice_trials",
                                                      newText("instructions_example_pic","Ihnen bekannt?<p>")
                                                      .settings.css("font-size", "20px")
                                                      .settings.center()
                                                      .settings.color("red")
                                                      .print()
                                                      ,
                                                      newImage("example_pic", variable.file_name)
                                                      .settings.size(400)                                                      
                                                      .center()
                                                      .print()
                                                      ,
                                                      // F-Version:  
                                                      newText ("instructions_example_pic2"," <p><b>links = 'Ja' / rechts = 'Nein'</b><p>")
                                                      //J-Version:
                                                      //newText ("instructions_example_pic2"," <p><b>links = 'Nein' / rechts = 'Ja'</b><p>")
                                                      .settings.css("font-size", "20px")
                                                      .settings.center()
                                                      .settings.color("red")
                                                      .print()
                                                      ,
                                                      newTimer("delay", 200)    //no button can be pressed before 200ms
                                                      .start()
                                                      .wait()
                                                      ,                           
                                                      newKey("q_example_pic", "FJ")
                                                      .settings.log()
                                                      .wait()                                   
                                                      ,
                                                      getImage("example_pic")
                                                      .remove()
                                                      ,
                                                      getText("instructions_example_pic")
                                                      .remove()
                                                      ,
                                                      getText ("instructions_example_pic2")
                                                      .remove()
                                                      ,
                                                      getKey("q_example_pic")
                                                      .remove()
                                                      ,
                                                      getKey("q_example_pic")
                                                      //F-Version:
                                                      .test.pressed("F")
                                                      //J-Version:
                                                      //.test.pressed("J")
                                                      .success
                                                      (      
                                                          
                                                          newTimer("warte", 100) //if absent the "F" pressed in the previous tasks is displayed in the Input Box
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newText("name_task", "<p><br>Wie hei&szlig;t die Person auf dem Foto?<br><p>")
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTextInput("name_practice", "")
                                                          .settings.css("font-size", "25px")
                                                          .log()
                                                          .print()
                                                          ,
                                                          newTimer("delay_name", 700)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newText("<p> ")
                                                          .print()  
                                                          ,
                                                          newText ("instr_contin", "<p><b>Enter</b> um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,  
                                                          newKey("next", "Enter")
                                                          .callback(getTextInput("name_practice")
                                                                    .disable())
                                                          .wait()
                                                          ,
                                                          getText("name_task")
                                                          .remove()
                                                          ,
                                                          getTextInput("name_practice")
                                                          .remove()
                                                          ,
                                                          getText ("instr_contin")
                                                          .remove()
                                                          ,
                                                          getKey("next")
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_alive", "Noch am Leben?<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_alive", "<br> Am Leben?" )
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()                                                          
                                                          .print()                                                    
                                                          ,
                                                          //F-Version:  
                                                          newText ("instructions_example_alive2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          //J-Version:
                                                          // newText ("instructions_example_alive2", "<br><p><b>links = 'Nein' / rechts = 'Ja'</b><p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,                                                           
                                                          newTimer("delay2", 200)     //no button can be pressed before 200ms
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newKey("q_example_alive", "FJ")
                                                          .callback( getTimer("time_out").stop() )
                                                          .log("all")  
                                                          ,
                                                          newTimer("time_out", 5000)
                                                          .start()
                                                          .log()
                                                          .wait()
                                                          ,
                                                          getText("example_alive")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_alive")
                                                          .remove()                                                         
                                                          ,
                                                          getText("instructions_example_alive2")
                                                          .remove()                                                         
                                                          ,  
                                                          getKey("q_example_alive")
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_year", "Im genannten Jahr am Leben?<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_year", "<br>"+ variable.year)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()  
                                                          ,
                                                          //F-Version:
                                                          newText ("instructions_example_year2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          //J-Version:
                                                          // newText ("instructions_example_year2", "<br><p><b>links = 'Nein' / rechts = 'Ja'</b><p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay3", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newKey("q_example_year", "FJ")
                                                          .callback( getTimer("time_out2").stop() )
                                                          .log("all")  
                                                          ,
                                                          newTimer("time_out2", 5000)
                                                          .start()
                                                          .log()
                                                          .wait()
                                                          ,
                                                          getText("example_year")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_year")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_year2")
                                                          .remove()
                                                          ,  
                                                          getKey("q_example_year")
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_fact", "Hat die Person damit zu tun?<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_fact", "<br>" + variable.fact)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()                                                    
                                                          ,
                                                          //F-Version:
                                                          newText ("instructions_example_fact2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          //J-Version:
                                                          //newText ("instructions_example_fact2", "<br><p><b>links = 'Nein' / rechts = 'Ja'</b><p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay4", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newKey("q_example_fact", "FJ")
                                                          .callback( getTimer("time_out3").stop() )
                                                          .log("all")  
                                                          ,
                                                          newTimer("time_out3", 5000)
                                                          .start()
                                                          .log()
                                                          .wait()
                                                          ,
                                                          getText("instructions_example_fact")
                                                          .remove()
                                                          ,
                                                          getText("example_fact")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_fact2")
                                                          .remove()
                                                          ,
                                                          getKey("q_example_fact")
                                                          .remove()                                                          
                                                          ,
                                                          newText ("instructions_example_name","Die Person auf dem Bild hei&szlig;t...<p>")
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_name","<br>"+  variable.name)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()
                                                          ,
                                                          //F-Version:
                                                          newText ("instructions_example_name2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          //J-Version:
                                                          //newText ("instructions_example_name2", "<br><p><b>links = 'Nein' / rechts = 'Ja'</b><p>")
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay5", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newKey("q_example_name", "FJ")
                                                          .callback( getTimer("time_out4").stop() )
                                                          .log("all")  
                                                          ,
                                                          newTimer("time_out4", 5000)
                                                          .start()
                                                          .log()
                                                          .wait()
                                                          ,
                                                          getText("example_name")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_name")
                                                          .remove()
                                                          ,
                                                          getText ("instructions_example_name2")
                                                          .remove()
                                                          ,
                                                          getKey("q_example_name")
                                                          .remove()
                                                          ,
                                                          newText ("instructions_continue", "<p>Dr&uuml;cken Sie bitte die <b>Leertaste</b>, um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")                                                        
                                                          .print()
                                                          ,
                                                          newKey("continue" ," ")
                                                          .print()
                                                          .wait()
                                                          ,
                                                          getText("instructions_continue")
                                                          .remove()
                                                          ,  
                                                          getKey("continue")
                                                          .remove()
                                                          
                                                      )
                                                      .failure
                                                      (
                                                          newText ("failure", "<p>Wenn Sie die Person nicht kennen, machen Sie mit der n&auml;chsten Person weiter.<p>")
                                                          .settings.css("font-size", "20px")
                                                          .settings.color("red")
                                                          .settings.center()  
                                                          .print()   
                                                          ,
                                                          newText ("instructions_continue2", "<p>Dr&uuml;cken Sie bitte die <b>Leertaste</b>, um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newKey("continue2" ," ")
                                                          .print()
                                                          .wait()
                                                          ,
                                                          getText("instructions_continue2")
                                                          .remove()
                                                          ,  
                                                          getKey("continue2")
                                                          .remove()  
                                                          
                                                      ))
                          .log("clickworkerID", getVar("cwID"))                          
                          .log( "age", getVar("IDage"))
                          .log( "sex", getVar("IDsex"))
                          .log( "L2", getVar("IDling"))
                          .log( "whichL2", getVar("IDund zwar"))
                          .log( "yes_key" , getVar("yes_key")) 
                          .log( "item" , variable.item )
                          .log( "type" , variable.type )              
                          .log( "version" , variable.version)
                          .log( "letter" , variable.letter)
                          .log( "sentence" , variable.sentence)
                          .log( "name" , variable.name)
                          .log( "real_name" , variable.real_name)
                          .log( "wrong_name" , variable.wrong_name)
                          .log( "name_match" , variable.name_match)  
                          .log( "year" , variable.year)
                          .log( "fact" , variable.fact)
                          .log( "photo" , variable.file_name) 
                          .log( "full_sentence" , variable.full_sentence)
                          .log( "condition" , variable.condition)
                          .log( "life_mismatch" , variable.life_mismatch)
                          .log( "fact_mismatch" , variable.fact_mismatch)
                          .log( "year_time" , variable.year_time)
                          .log( "fact_time" , variable.fact_time)
                          .log( "year_fact" , variable.year_fact)
                          .log( "list" , variable.list)
                          .log( "life_status" , variable.life_status)
                          .log( "occupation" , variable.occupation) 
                          .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was
                          
                          .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
                          .setOption("hideProgressBar", true)
                         );

//====================================================================================================================================================================================================================
// 5. Instructions before experiment
PennController( "instructions2" ,
                newText("intro_experiment", "<p>Jetzt wird das Experiment beginnen. Es wird ungef&auml;hr 15 Minuten dauern. Bitte versuchen Sie, das Experiment in einer angemessenen Zeit zu beenden. Sollten Sie l&auml;nger als 30 Minuten ben&ouml;tigen, sind Ihre Daten f&uuml;r uns nicht verwertbar.<p> <p>Ihnen wird immer zuerst ein Foto gezeigt und anschlie&szlig;end die Texteingabezeile, die Frage 'Am Leben?', ein Jahr, ein Gegenstand und der Name.<p> <p><br>Anworten Sie bitte: <p><b>1. ob Sie die Person kennen,<p> <p>2. wie die Person hei&szlig;t,<p> <p>3. ob die Person noch am Leben ist, <p> <p>4. ob die Person im genannten Jahr am Leben war,<p> <p>5. ob Sie die Person mit dem Gegenstand assoziieren k&ouml;nnen,</b> und zuletzt,<p> <p><b>6. ob der Name dem Foto entspricht.</b><p>")
                .settings.css("font-size", "18px")
                ,
                //F-Version:
                newText("intro_experiment2", "<p>Antworten Sie immer <b>mit dem linken Zeigefinger = 'Ja'</b> und <b>mit dem rechten Zeigefinger = 'Nein'</b>. Den Namen der Person tragen Sie in die Texteingabezeile ein und dr&uuml;cken Sie <b>'Enter'</b>.<p>")
                //J-Version:
                // newText("intro_experiment2", "<p>Antworten Sie immer <b>mit dem linken Zeigefinger = 'Nein'</b> und <b>mit dem rechten Zeigefinger = 'Ja'</b>. Den Namen der Person tragen Sie in die Texteingabezeile ein und dr&uuml;cken Sie <b>'Enter'</b>.<p>")
                .settings.css("font-size", "18px")
                .settings.color("red")
                ,
                newText("intro_experiment2_1","<p><p>Wenn Sie die anschlie&szlig;enden Fragen zur Person nicht beantworten k&ouml;nnen, <b>dr&uuml;cken Sie keine Tasten!</b> Das Experiment geht nach 5 Sekunden automatisch weiter.<p> <p>Wenn Sie den Namen der Person auf dem Foto nicht kennen, tragen Sie stattdessen deren Besch&auml;ftigung oder etwaige andere Assoziationen ein, die Sie zu dieser Person haben.<p>")
                .settings.css("font-size", "18px")
                ,
                newText("intro_experiment3", "<p>Nachdem Sie die H&auml;lfte der Fragen beantwortet haben, wird es eine kurze Pause von 20 Sekunden geben. Nutzen Sie diese, um sich kurz zu entspannen oder die Augen vom Bildschirm zu nehmen. Viel Spa&szlig;!</p>")
                .settings.css("font-size", "18px")        
                ,
                newCanvas("instructions_canvas", 900, 680)
                .settings.add(0, 0, getText("intro_experiment") )
                .settings.add(0, 420, getText("intro_experiment2") )
                .settings.add(0, 480, getText("intro_experiment2_1") )
                .settings.add(0, 595, getText("intro_experiment3") )
                .print()    
                ,
                newButton("start_experiment3" ,"Experiment beginnen")
                .settings.center()
                .print()
                .wait()
                ,
                getCanvas("instructions_canvas")
                .remove()
                ,
                getButton("start_experiment3")
                .remove()
                ,
                newText("instructions_key", "<br><b>Legen Sie Ihre Zeigefinger auf die Tasten und dr&uuml;cken Sie die 'Ja-Taste', um  das Experiment zu beginnen.</b></br>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                //F-Version:
                newKey("continue_Ja", "F")
                //J-Version:
                //newKey("continue_Ja", "J")
                .wait()
                ,  
                getText("instructions_key")
                .remove()
                ,
                newTimer(1000)
                .start()
                .wait()
               )                                //end of experiment instructions screen  
    .log("clickworkerID", getVar("cwID"))
    .log( "age", getVar("IDage"))
    .log( "sex", getVar("IDsex"))
    .log( "L2", getVar("IDling"))
    .log( "whichL2", getVar("IDund zwar"))
    .log( "yes_key" , getVar("yes_key")) 
    .log( "item" , "instructions" )
    .log( "type" , "instructions" )              
    .log( "version" , "instructions")
    .log( "letter" , "instructions")
    .log( "sentence" , "instructions")
    .log( "name" , "instructions")
    .log( "real_name" , "instructions")
    .log( "wrong_name" , "instructions")
    .log( "name_match" , "instructions")  
    .log( "year" , "instructions")
    .log( "fact" , "instructions")
    .log( "photo" , "instructions")
    .log( "full_sentence" , "instructions")
    .log( "condition" , "instructions")
    .log( "life_mismatch" , "instructions")
    .log( "fact_mismatch" , "instructions")
    .log( "year_time" , "instructions")
    .log( "fact_time" , "instructions")
    .log( "year_fact" , "instructions")
    .log( "list" , "instructions")
    .log( "life_status" , "instructions")
    .log( "occupation" , "instructions")
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was 
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);  

//====================================================================================================================================================================================================================
// 6. Experimental trials

PennController.Template( PennController.GetTable( "master_stimuli_pretest-3.csv")// change this line for the appropriate experimental list
                         .filter("type" , "critical")
                         ,  
                         variable => PennController( "critical_trials"
                                                     ,
                                                     newImage("picture", variable.file_name)
                                                     .settings.size(400)                                                      
                                                     .center()
                                                     .print()
                                                     ,
                                                     newTimer("delay6", 200)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     newKey("question_pic", "FJ")
                                                     .settings.log()
                                                     .wait()                                   
                                                     ,
                                                     getImage("picture")
                                                     .remove()
                                                     ,  
                                                     getKey("question_pic")
                                                     .remove()
                                                     ,   
                                                     getKey("question_pic")
                                                     //F-Version:
                                                     .test.pressed("F")
                                                     //J-Version:
                                                     //.test.pressed("J")
                                                     .success
                                                     (  
                                                         newTimer("warte2", 100) //if absent the "F" pressed in the previous tasks is displayed in the Input Box
                                                         .start()
                                                         .wait()
                                                         ,
                                                         newText("name_task2", "<p><br>Wie hei&szlig;t die Person auf dem Foto?<br><p>")
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()
                                                         ,
                                                         newTextInput("name", "")
                                                         .settings.css("font-size", "25px")
                                                         .log()
                                                         .print()
                                                         ,
                                                         newTimer("delay_name2", 700)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         newText("<p> ")
                                                         .print()  
                                                         ,
                                                         newKey("next2", "Enter")
                                                         .callback(getTextInput("name")
                                                                   .disable())
                                                         .wait()
                                                         ,                                                          
                                                         getText("name_task2")
                                                         .remove()
                                                         ,
                                                         getTextInput("name")
                                                         .remove()
                                                         ,
                                                         getKey("next2")
                                                         .disable()
                                                         ,
                                                         newText("question2","Am Leben?" )
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()                                                    
                                                         ,
                                                         newTimer("delay7", 200)
                                                         .start()
                                                         .wait()
                                                         ,  
                                                         newKey("question_alive", "FJ")
                                                         .callback( getTimer("time_out5")
                                                                    .stop() )
                                                         .log("all")  
                                                         ,
                                                         newTimer("time_out5", 5000)
                                                         .start()
                                                         .log()
                                                         .wait()
                                                         ,                                                         
                                                         getText("question2")
                                                         .remove()
                                                         ,  
                                                         getKey("question_alive")
                                                         .disable()
                                                         ,
                                                         newText("question3", variable.year)
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()  
                                                         ,                   
                                                         newTimer("delay8", 500)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         newKey("question_year", "FJ")
                                                         .callback( getTimer("time_out6").stop() )
                                                         .log("all")  
                                                         ,
                                                         newTimer("time_out6", 5000)
                                                         .start()
                                                         .log()
                                                         .wait()
                                                         ,
                                                         getText("question3")
                                                         .remove()
                                                         ,  
                                                         getKey("question_year")
                                                         .disable()
                                                         ,                         
                                                         newText("question4", variable.fact)
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()                                                    
                                                         ,                          
                                                         newTimer("delay9", 500)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         newKey("question_fact", "FJ")
                                                         .callback( getTimer("time_out7").stop() )
                                                         .log("all")  
                                                         ,
                                                         newTimer("time_out7", 5000)
                                                         .start()
                                                         .log()
                                                         .wait()
                                                         ,
                                                         getText("question4")
                                                         .remove()
                                                         ,  
                                                         getKey("question_fact")
                                                         .disable()
                                                         ,
                                                         newText("question5", variable.name)
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()                                                    
                                                         ,                          
                                                         newTimer("delay10", 500)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         newKey("question_name", "FJ")
                                                         .callback( getTimer("time_out8").stop() )
                                                         .log("all")  
                                                         ,
                                                         newTimer("time_out8", 5000)
                                                         .start()
                                                         .log()
                                                         .wait()
                                                         ,
                                                         getText("question5")
                                                         .remove()
                                                         ,  
                                                         getKey("question_name")
                                                         .disable()
                                                         ,
                                                         newText("pleasewait", "...")
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .settings.bold()
                                                         .print()
                                                         ,
                                                         newTimer("wait", 1000)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         getText("pleasewait")
                                                         .remove()
                                                         
                                                     )
                                                     .failure
                                                     (
                                                         
                                                         newText("pleasewait2", "...")
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .settings.bold()
                                                         .print()
                                                         ,
                                                         newTimer("wait2", 1000)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         getText("pleasewait2")
                                                         .remove()                                                          
                                                     ))
                         .log("clickworkerID", getVar("cwID"))                         
                         .log("age", getVar("IDage"))
                         .log("sex", getVar("IDsex"))
                         .log("L2", getVar("IDling"))
                         .log("whichL2", getVar("IDund zwar"))
                         .log( "yes_key" , getVar("yes_key")) 
                         .log( "item" , variable.item )
                         .log( "type" , variable.type )              
                         .log( "version" , variable.version)
                         .log( "letter" , variable.letter)
                         .log( "sentence" , variable.sentence)
                         .log( "name" , variable.name)
                         .log( "real_name" , variable.real_name)
                         .log( "wrong_name" , variable.wrong_name)
                         .log( "name_match" , variable.name_match)  
                         .log( "year" , variable.year)
                         .log( "fact" , variable.fact)
                         .log( "photo" , variable.file_name) 
                         .log( "full_sentence" , variable.full_sentence)
                         .log( "condition" , variable.condition)
                         .log( "life_mismatch" , variable.life_mismatch)
                         .log( "fact_mismatch" , variable.fact_mismatch)
                         .log( "year_time" , variable.year_time)
                         .log( "fact_time" , variable.fact_time)
                         .log( "year_fact" , variable.year_fact)
                         .log( "list" , variable.list)
                         .log( "life_status" , variable.life_status)
                         .log( "occupation" , variable.occupation)
                         .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was
                        );

//====================================================================================================================================================================================================================
// 7. Break

PennController( "break" ,
                newText("break_text", "<p><b>Zeit f&uuml;r eine kleine Pause!</b> <br><p>Dr&uuml;cken Sie die Leertaste, um fortzufahren, oder entspannen Sie sich und nehmen Sie kurz die Augen vom Bildschirm.<br><p><b>Das Experiment geht nach 20 Sekunden automatisch weiter.</br></b><p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                newTimer("break_timer", 20000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getKey("continue_exp")
                .remove()   
                ,
                newText("instructions_key2", "<br><b>Legen Sie Ihre Zeigefinger auf die Tasten und dr&uuml;cken Sie die 'Ja-Taste', um  das Experiment zu beginnen.</b></br>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                //F-Version:
                newKey("continue_Ja2", "F")
                //J-Version:
                //newKey("continue_Ja2", "J")
                .wait()
                ,  
                getText("instructions_key2")
                .remove()                  
                ,
                newTimer(1000)
                .start()
                .wait()             
               )
    .log("clickworkerID", getVar("cwID"))    
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("L2", getVar("IDling"))
    .log("whichL2", getVar("IDund zwar"))
    .log( "yes_key" , getVar("yes_key")) 
    .log( "item" , "break" )
    .log( "type" , "break" )              
    .log( "version" , "break")
    .log( "letter" , "break")
    .log( "sentence" , "break")
    .log( "name" , "break")
    .log( "real_name" , "break")
    .log( "wrong_name" , "break")
    .log( "name_match" , "break")  
    .log( "year" , "break")
    .log( "fact" , "break")
    .log( "photo" , "break")
    .log( "full_sentence" , "break")
    .log( "condition" , "break")
    .log( "life_mismatch" , "break")
    .log( "fact_mismatch" , "break")
    .log( "year_time" , "break")
    .log( "fact_time" , "break")
    .log( "year_fact" , "break")
    .log( "list" , "break")
    .log( "life_status" , "break")
    .log( "occupation" , "break")
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was 
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 8. Comprehension test explanation screen 

PennController( "post_task_intro",
                newText("comp1_1", "<p>Der haupts&auml;chliche Teil des Experiments ist nun abgeschlossen. <b>Bitte bleiben Sie aber unbedingt noch bis zum Ende!</b><p>")
                .settings.css("font-size", "20px")
                ,        
                newText("comp1_2", "<p>Es folgt nun noch ein kurzer Verst&auml;ndnistest, um sicherzustellen, dass Sie w&auml;hrend des Experiments aufmerksam und konzentriert waren bzw. Ihre Antworten bewusst getroffen haben.<p>")
                .settings.css("font-size", "20px")
                ,
                //F-Version:
                newText("comp1_3", "<p>Ihnen werden gleich mehrere Fotos einzeln nacheinander gezeigt. Bitte antworten Sie, ob diese im Experiment vorkamen: <b>linker Zeigefinger = 'Ja' / rechter Zeigefinger = 'Nein'</b>.<p>")
                //J-Version:
                //newText("comp1_3", "<p>Ihnen werden gleich mehrere Fotos einzeln nacheinander gezeigt. Bitte antworten Sie, ob diese im Experiment vorkamen: <b>linker Zeigefinger = 'Nein' / rechter Zeigefinger = 'Ja'</b>.<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("compCanv", 830, 300)
                .settings.add(0,0, getText("comp1_1"))
                .settings.add(0,100, getText("comp1_2")  )
                .settings.add(0,200, getText("comp1_3")  )
                .print()   
                ,
                newButton("compStart", "Verst&auml;ndnistest beginnen")
                .settings.center()
                .print()
                .wait()
               )
    .log("clickworkerID", getVar("cwID"))
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("L2", getVar("IDling"))
    .log("whichL2", getVar("IDund zwar"))
    .log( "yes_key" , getVar("yes_key")) 
    .log( "item" , "instructions" )
    .log( "type" , "instructions" )              
    .log( "version" , "instructions")
    .log( "letter" , "instructions")
    .log( "sentence" , "instructions")
    .log( "name" , "instructions")
    .log( "real_name" , "instructions")
    .log( "wrong_name" , "instructions")
    .log( "name_match" , "instructions")  
    .log( "year" , "instructions")
    .log( "fact" , "instructions")
    .log( "photo" , "instructions")
    .log( "full_sentence" , "instructions")
    .log( "condition" , "instructions")
    .log( "life_mismatch" , "instructions")
    .log( "fact_mismatch" , "instructions")
    .log( "year_time" , "instructions")
    .log( "fact_time" , "instructions")
    .log( "year_fact" , "instructions")
    .log( "list" , "instructions")
    .log( "life_status" , "instructions")
    .log( "occupation" , "instructions")
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 9. Comprehension test

PennController.Template( PennController.GetTable( "master_stimuli_pretest-3.csv")// change this line for the appropriate experimental list
                         .filter("type" , "post-task")
                         ,  
                         variable => PennController( "post_task",
                                                     newImage("picture_post_task", variable.file_name)
                                                     .settings.size(400)                                                      
                                                     .center()
                                                     .print()
                                                     ,
                                                     newTimer("delay11", 200)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     newKey("q_post_task", "FJ")
                                                     .settings.log()
                                                     .wait()                                   
                                                     ,
                                                     getImage("picture_post_task")
                                                     .remove()
                                                     ,  
                                                     getKey("q_post_task")
                                                     .remove()
                                                     ,
                                                     newText("pleasewait2", "...")
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("wait2", 1000)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     getText("pleasewait2")
                                                     .remove()
                                                     
                                                    )
                         .log("clickworkerID", getVar("cwID"))                         
                         .log("age", getVar("IDage"))
                         .log("sex", getVar("IDsex"))
                         .log("L2", getVar("IDling"))
                         .log("whichL2", getVar("IDund zwar"))
                         .log( "yes_key" , getVar("yes_key"))
                         .log( "item" , variable.item )
                         .log( "type" , variable.type )              
                         .log( "version" , variable.version)
                         .log( "letter" , variable.letter)
                         .log( "sentence" , variable.sentence)
                         .log( "name" , variable.name)
                         .log( "real_name" , variable.real_name)
                         .log( "wrong_name" , variable.wrong_name)
                         .log( "name_match" , variable.name_match)  
                         .log( "year" , variable.year)
                         .log( "fact" , variable.fact)
                         .log( "photo" , variable.file_name)
                         .log( "full_sentence" , variable.full_sentence)
                         .log( "condition" , variable.condition)
                         .log( "life_mismatch" , variable.life_mismatch)
                         .log( "fact_mismatch" , variable.fact_mismatch)
                         .log( "year_time" , variable.year_time)
                         .log( "fact_time" , variable.fact_time)
                         .log( "year_fact" , variable.year_fact)
                         .log( "list" , variable.list)
                         .log( "life_status" , variable.life_status)
                         .log( "occupation" , variable.occupation)
                         .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was
                         
                         .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
                         .setOption("hideProgressBar", true)
                        );   

//====================================================================================================================================================================================================================
// 10. End

PennController( "end",
                newText("<p><br>")
                .print()
                ,
                newButton("end_experiment" ,"Experiment beenden")
                .settings.center()
                .print()
                .wait()
                ,
                getButton("end_experiment")
                .remove()
               )
    
    .log("clickworkerID", getVar("cwID"))
    .log( "age", getVar("IDage"))
    .log( "sex", getVar("IDsex"))
    .log( "L2", getVar("IDling"))
    .log( "whichL2", getVar("IDund zwar"))
    .log( "yes_key" , getVar("yes_key")) 
    .log( "item" , "end" )
    .log( "type" , "end" )              
    .log( "version" , "end")
    .log( "letter" , "end")
    .log( "sentence" , "end")
    .log( "name" , "end")
    .log( "real_name" , "end")
    .log( "wrong_name" , "end")
    .log( "name_match" , "end")  
    .log( "year" , "end")
    .log( "fact" , "end")
    .log( "photo" , "end")
    .log( "full_sentence" , "end")
    .log( "condition" , "end")
    .log( "life_mismatch" , "end")
    .log( "fact_mismatch" , "end")
    .log( "year_time" , "end")
    .log( "fact_time" , "end")
    .log( "year_fact" , "end")
    .log( "list" , "end")
    .log( "life_status" , "end")
    .log( "occupation" , "end")
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was 
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//====================================================================================================================================================================================================================
// 11. Send results

PennController.SendResults( "send" )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 12. Good-bye

PennController.Template(PennController.GetTable( "validation-pretest3.csv"),// change this line for the appropriate experimental list  
                        variable => PennController( "final"
                                                    ,
                                                    newText("<p>Vielen Dank f&uuml;r Ihre Teilnahme an unserem Experiment!<p><br><b>Hier ist Ihr Validierungscode: "+variable.val_code+"F.</b><p><br>Bitte geben Sie diesen Code auf der Clickworker-Webseite ein, um Ihre Bezahlung zu erhalten.</p>")
                                                    .settings.css("font-size", "20px")
                                                    .settings.center()
                                                    .print()
                                                    ,
                                                    newButton("void")
                                                    .wait()
                                                   )
                        
                        .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
                        .setOption("hideProgressBar", true)
                       );

