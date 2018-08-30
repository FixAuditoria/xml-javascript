// Funçoes de teste

function iniciaRequest(url) {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:

      imp = document.getElementById("saida");
      imp.innerHTML = "<ul>";
      resposta = xhttp.responseXML;
      //Reparem no tagName do xml.
      produtos = resposta.getElementsByTagName("produto");
      for (ix = 0; ix < produtos.length; ix++) {
        var valor = produtos[ix].textContent;
        if (!valor) {
          valor = produtos[ix].text;
        }
        imp.innerHTML = imp.innerHTML + "<li>" + valor + "</li>";
      }

      imp.innerHTML = imp.innerHTML + "</ul>";
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send(null);

  
}
