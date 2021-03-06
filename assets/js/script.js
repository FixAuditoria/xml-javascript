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

// Funçoes de teste

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let fd = new FormData();
    
    // adicione ao fd as demais informações que você pretende enviar por POST
    // ao servidor, além do(s) arquivo(s)

    // agora é hora de adicionarmos o(s) arquivo(s)
    fd.append("file", file); // nome para referência ao arquivo no formulário
    xhr.open("post", "/"); // path da rota no servidor

    xhr.onerror = reject; // em caso de erro, rejeitamos a promise
    xhr.onload = event => {
      // o envio ocorreu com sucesso
      resolve(); // resolvemos nossa promise
    };

    

    if (xhr.upload) {
      // caso tenhamos acesso a esta informação
      xhr.upload.onprogress = progress => {
        console.log(Math.round((progress.loaded * 100) / progress.total) + "%");
      };
    } else {
      // tratamento em navegadores que não suportam xhr.upload
    }
    console.log(fd);
    //xhr.send(fd); // iniciando a requisição, enviando o FormData
  });
}

//# sourceMappingURL=script.js.map
