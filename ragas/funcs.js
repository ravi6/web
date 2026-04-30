/* Keep all scripts here
Author: Ravi Saripalli
Date:   31st Dec. 2019
*/
// Yukky Globals
 count=-1;

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
      let astr = document.getElementById('ss').value.trim();
      if (!astr) return ;
      
     buf.push("<div class='col'> <ul>");
      astr = astr.toUpperCase();
      for (let k=0; k < obj.ragas.length ; k++) {
	let raga = obj.ragas[k].name ;
	for (let j=0; j < obj.ragas[k].kritis.length ; j++) {
	  let kriti = obj.ragas[k].kritis[j];
	  if (kriti.includes(astr)) { // if match
	    buf.push ("<li>" + kriti + " -> " + "<a href='#' onclick='" 
	      +  "selRaga(this);" + "'>" + raga + "</a></li>");
	  }
	}
      }
     buf.push("</ul></div>");
      document.getElementById("output").innerHTML = buf.join("") ;
      document.getElementById("outputTitle").innerHTML = "Kirtana Search Result" ;

    } // end listKirtanas


function toggleComp() {
    const p = document.getElementById('compPanel');
    p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

function doComp() {
    // 1. Get the names directly from the input boxes
    const n1 = document.getElementById('r1').value.trim();
    const n2 = document.getElementById('r2').value.trim();
    
    if (n1 && n2) {
        // 2. Pass the names to the function
        compRagas(n1, n2); 
    }
}

function compRagas(name1, name2) {
    // 3. Use your existing findRaga helper to get the objects
    const r1 = findRaga(name1);
    const r2 = findRaga(name2);

    // If for some reason raga isn't found, stop
    if (!r1.name || !r2.name) return;

    let buf = ["<table class='table'><tr><th>Ragam</th><th>Aarohana</th><th>Avarohana</th></tr>"];

    // Use Template Literals for clean, readable HTML strings
    [r1, r2].forEach(r => {
        buf.push(`<tr>
            <td><a onclick="showRagaKritis('${r.name}')">${r.name}</a></td>
            <td>${r.notes.aarohana}</td>
            <td>${r.notes.avarohana}</td>
        </tr>`);
    });

    buf.push("</table>");

    // 4. CRITICAL: Show the box and set the text
    const out = document.getElementById("output");
    out.style.display = "block"; // Make it visible
    out.innerHTML = buf.join("");
    document.getElementById("outputTitle").innerHTML = "Comparison";
    
    // Scroll to the result on iPhone
    out.scrollIntoView({ behavior: 'smooth' });
}

function filterRagas(input, menuId) {
    const val = input.value.toLowerCase();
    const menu = document.getElementById(menuId);
    
    // Clear and show menu if typing
    menu.innerHTML = '';
    if (val.length === 0) {
        menu.classList.remove('open');
        return;
    }

    const matches = getRagas().filter(r => r.toLowerCase().startsWith(val));
    
    if (matches.length > 0) {
        menu.classList.add('open');
        matches.forEach(name => {
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.textContent = name;
            a.onclick = () => {
                input.value = name;
                menu.classList.remove('open');
            };
            menu.appendChild(a);
        });
    } else {
        menu.classList.remove('open');
    }
}

function showSims() {
    let buf = ["<table><thead><tr><th>Target</th><th>Similar</th><th>Details</th></tr></thead><tbody>"];
    
    simData.forEach(row => {
        buf.push(`<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`);
    });
    
    buf.push("</tbody></table>");
    
    let out = document.getElementById("output");
    out.style.display = "block";
    out.innerHTML = buf.join("");
    document.getElementById("outputTitle").innerHTML = "Raga Similarities";
    
    // Smooth scroll to results
    out.scrollIntoView({ behavior: 'smooth' });
}


function init() {
    // 1. Load the Data
    if (typeof dropListRagas === 'function') dropListRagas();
    if (typeof showStats === 'function') showStats();
    
    // 2. Select the first Raga by default
    let allRagas = getRagas();
    if (allRagas.length > 0) showRagaKritis(allRagas[0]);

    // 3. Setup UI elements
    const btn = document.getElementById('btn');
    const menu = document.getElementById('menuRaga');

    if (!btn || !menu) return; // Safety check

    // 4. Open/Close Logic
    btn.onclick = (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
    };

    // 5. Jump to Match Logic (Keyboard)
    document.onkeydown = (e) => {
        if (!menu.classList.contains('open') || e.key.length !== 1) return;
        
        const char = e.key.toLowerCase();
        const items = menu.querySelectorAll('.dropdown-item');
        const match = Array.from(items).find(el => 
            el.textContent.trim().toLowerCase().startsWith(char)
        );

        if (match) {
            e.preventDefault();
            match.focus();
            const menu = match.parentElement;
            menu.scrollTop = match.offsetTop - menu.offsetTop;
        }
    };

    // 6. Global Click Closers
    menu.addEventListener('click', () => menu.classList.remove('open'));
    window.addEventListener('click', () => menu.classList.remove('open'));
}

window.onload = init;
