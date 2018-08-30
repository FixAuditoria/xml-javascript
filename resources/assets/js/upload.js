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
