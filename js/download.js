/** 
 * Porzione di codice copiata da internet che si occupa di scaricare un file contenente tutti i link
*/
function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */

    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function () {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */

    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function () {
        D.body.removeChild(f);
    }, 333);
    return true;
}
/** 
 * -------------------------FINE Porzione di codice copiata da internet
*/

var elemento;
var allLinks = "";
var auxT, auxL = "";

//ritorna array JSON di tutti gli <a> contenenti link 'href' dei video...
var elems = document.body.getElementsByClassName("c-hyperlink draft-poster-link");
var title = document.title.toLowerCase();

for (elemento in elems) //Itero tutti gli <a>, estraggo da ciascuno l'href e li salvo in una variabile
    allLinks += (elems[elemento]["href"] + '\n');

//------Elimina ultimi 3 elementi (sono info inutili) e inserisce titolo
auxL = allLinks.indexOf("undefined");
auxT = title.indexOf("video") - 3;

if (auxL != -1)
    allLinks = allLinks.substring(0, auxL);

if (auxT != -1)
    title = title.substring(0, auxT);
//------------

allLinks += '\n' + title;
console.log(allLinks);
download(allLinks, title + '.txt', 'text/plain');
alert("Done, check your tab browser console if you want some log");
