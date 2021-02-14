/* Keep all scripts here
Author: Ravi Saripalli
Date:   31st Dec. 2019
*/
// Yukky Globals
var rag1="aabhogi", rag2="aarabhi" , count=-1;

function capFirst(str) {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
} // capFirst

function showRagaKritis (name) { 
   // Given a Raga Name Query Data and get details and display
   // all kriitis in that Ragam
     let raga = findRaga(name);
     let buf = [] ;
     raga.kritis.forEach (function (elm) {
                  buf.push ("<li>" + elm + "</li>");
                   });
     document.getElementById("klist").innerHTML = buf.join("");
     document.getElementById("ragam").innerHTML = capFirst(raga.name) ;

     let txt = "<ul><li>Aarohanam: " 
              + raga.notes.aarohana + "</li>"
              + "<li>Avarohanam: " + raga.notes.avarohana
              + "</li></ul>";
     document.getElementById("notes").innerHTML = txt ;
} // end show All Kritis in Raga

function selRaga (sel) { //Process Raga Drop Down List
     // Storing last two raga selections
     let ragam = sel.innerHTML ;
     count = count + 1 ;
     if (count > 1) count = 0 ;
     if (count == 0) rag1 = ragam ;
     else rag2 = ragam ;
     showRagaKritis(ragam)  ;
  } // end selRaga

   function findRaga (name) {// pick a raga object
    let raga = {};
    for (let i=0 ; i < obj.ragas.length ; i++) {
       if ( obj.ragas[i].name === name){
          raga = obj.ragas[i] ; 
	  break ;
       }
    }
     return (raga);
   } // end findRaga 

   function getRagas() { // Collate all raga names I know of and sort
     ragams = [] ;
     obj.ragas.forEach ( function (ragam) { ragams.push(ragam.name) ; } );
     return (ragams.sort());
   } // end getRagas

    function dropListRagas() { // adds Ragas to drodownlist
      let buf = [] ;
      let ragas = getRagas() ;

      for (let k=0; k < ragas.length ; k++) {
	  let name = ragas[k] ;
	  buf.push ("<a class='dropdown-item' onclick='" 
	           +  "selRaga(this);" + "'>" + name + "</a>");
	  }
      document.getElementById("menuRaga").innerHTML = buf.join("") ;
      // console.log(document.getElementById("menuRaga").innerHTML);

    } // end dropListRagas

    function showStats() { // of interest to me
      let buf = [] ;
      let ragas = getRagas() ;
      let nk = 0 ;
      obj.ragas.forEach ( function (ragam) { 
	                   nk = nk + ragam.kritis.length ; } );

      document.getElementById("nragas").innerHTML = "Ragas: " + ragas.length ;
      document.getElementById("nkritis").innerHTML = "Kritis: " + nk ;
    } // end showStats

    function listKritis() { // show matched Kritis
      let buf = [] ;
      let astr = document.getElementById('ss').value;
      if(astr.trim()==="" || astr === null || astr === undefined) {
	return ;
      }
      
     buf.push("<div class='col'> <ul>");
      astr = astr.toUpperCase();
      for (let k=0; k < obj.ragas.length ; k++) {
	let raga = obj.ragas[k].name ;
	for (let j=0; j < obj.ragas[k].kritis.length ; j++) {
	  let kriti = obj.ragas[k].kritis[j];
	  if (kriti.toUpperCase().search(astr) != -1) { // if match
	    buf.push ("<li>" + kriti + " -> " + "<a href='#' onclick='" 
	      +  "selRaga(this);" + "'>" + raga + "</a></li>");
	  }
	}
      }
     buf.push("</ul></div>");
      document.getElementById("output").innerHTML = buf.join("") ;
      document.getElementById("outputTitle").innerHTML = "Kirtana Search Result" ;

    } // end listKirtanas

    function compRagas() {
      let i1, i2 ;
      let buf = [] ;
      let ragas = getRagas() ;
        for (let i=0 ; i < ragas.length ; i++) {
	    if (obj.ragas[i].name == rag1)
	       i1 = i;
	    else if (obj.ragas[i].name == rag2)
	       i2 = i;
	}
      buf.push("<table class='table table-striped table-condensed'><tbody>")
      buf.push("<tr>"); buf.push("<td>Ragam</td>");
      buf.push("<td>Aarohana</td>");
      buf.push("<td>Avarohana</td>");
      buf.push("<tr>");
      buf.push("<tr>"); buf.push("<td>"); 
      let cmd = "\"showRagaKritis('" + rag1 + "');\"" ;
      buf.push ("<a href='#' onclick=" +  cmd + '\>' + rag1 + "</a>");
      buf.push("</td>");
      buf.push("<td>" + obj.ragas[i1].notes.aarohana + "</td>");
      buf.push("<td>" + obj.ragas[i1].notes.avarohana + "</td>");
      buf.push("<tr>");
      buf.push("<tr>"); buf.push("<td>"); 
      cmd = "\"showRagaKritis('" + rag2 + "');\"" ;
      buf.push ("<a href='#' onclick=" +  cmd + '\>' + rag2 + "</a>");
      buf.push("</td>");
      buf.push("<td>" + obj.ragas[i2].notes.aarohana + "</td>");
      buf.push("<td>" + obj.ragas[i2].notes.avarohana + "</td>");
      buf.push("<tr>");
      buf.push("</tbody></table>");
      document.getElementById("output").innerHTML = buf.join("") ;
      document.getElementById("outputTitle").innerHTML = "Comparison" ;
    }

     $(document).ready (function (){dropListRagas(); 
                                    showStats();}) ;
