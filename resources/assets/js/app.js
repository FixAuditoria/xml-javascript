window.$ = window.jQuery = require("jquery");
import { parseString } from "xml2js";
import Clipboard from "clipboard";
import * as func from "./functions";

let form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let file = document.querySelector("#file");

  $("#fornecedor")
    .parent()
    .removeClass("d-none");

  $("#fornecedor > tbody, #accordionProdutos").html("");

  if (file.files.length) {
    var reader = new FileReader();

    reader.onload = function(e) {
      let resultado = e.target.result;

      parseString(resultado, function(err, result) {
        let qtd_total = result.nfeProc.NFe[0].infNFe[0].det.length;
        let fornecedor = result.nfeProc.NFe[0].infNFe[0].emit[0];
        let html_fornecedor = func.tbodyFornecedor(fornecedor);

        $("#total_registro").html(qtd_total);
        $("#fornecedor > tbody").append(html_fornecedor);

        for (let ind = 0; ind < qtd_total; ind++) {
          let produto = result.nfeProc.NFe[0].infNFe[0].det[ind];
          let show = ind === 0;
          let html_produto = func.cardProdutos(produto, show);
          $("#accordionProdutos").append(html_produto);
        }
      });
    };

    reader.readAsBinaryString(file.files[0]);
  }
});

var clipboard = new Clipboard(".btn");

clipboard.on("success", function(e) {
  e.clearSelection();
});

clipboard.on("error", function(e) {
  console.error("Action:", e.action);
  console.error("Trigger:", e.trigger);
});

$(document).ready(function(){
  
  $(document).on('click', '[data-clipboard-action]', e => {
    $("[data-clipboard-action]").attr('aria-label', 'Copiado!')
    let _this = $(e.currentTarget)
    _this.addClass("tooltipped tooltipped-n");

    _this.mouseover(f => {
      _this.removeClass("tooltipped tooltipped-n");
    })

    if(_this.hasClass('tooltipped')){
      setTimeout(() => {
        _this.removeClass("tooltipped tooltipped-n");
      }, 2000)
    }
  });
})