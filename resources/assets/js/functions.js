import { log } from "util";

function retornoDoValor(valor) {
  let val = "";
  if (valor) {
    if (typeof valor === "object") {
      val = valor[0].toUpperCase();
    } else {
      val = valor;
    }
  }
  return val;
}

function retornoPis(valor) {
  if (valor.PIS !== undefined) {
    if (valor.PIS[0].PISAliq !== undefined) {
      if (valor.PIS[0].PISAliq[0].pPIS !== undefined) {
        return valor.PIS[0].PISAliq[0].pPIS[0];
      }
    }
  }
  if (valor.PIS !== undefined) {
    if (valor.PIS[0].PISOutr !== undefined) {
      if (valor.PIS[0].PISOutr[0].pPIS !== undefined) {
        return valor.PIS[0].PISOutr[0].pPIS[0];
      }
    }
  }
  return "";
}

function retornoCofins(valor) {
  if (valor.COFINS !== undefined) {
    if (valor.COFINS[0].COFINSAliq !== undefined) {
      if (valor.COFINS[0].COFINSAliq[0].pCOFINS !== undefined) {
        return valor.COFINS[0].COFINSAliq[0].pCOFINS[0];
      }
    }
  }

  if (valor.COFINS !== undefined) {
    if (valor.COFINS[0].COFINSOutr !== undefined) {
      if (valor.COFINS[0].COFINSOutr[0].pCOFINS !== undefined) {
        return valor.COFINS[0].COFINSOutr[0].pCOFINS[0];
      }
    }
  }
  return "";
}

function tbodyFornecedor(dados) {
  let endereco = dados.enderEmit[0];
  let id = 1;
  let html = `
    <tr>
        <td>
            <small>Fornecedor</small>
            <span id='forn-${id}'>${retornoDoValor(dados.xNome)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#forn-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
        <td>
            <small>Fantasia</small>
            <span id='fant-${id}'>${retornoDoValor(dados.xFant)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#fant-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
        <td>
            <small>CNPJ</small>
            <span id='cnpj-${id}'>${retornoDoValor(dados.CNPJ)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#cnpj-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
        <td>
            <small>IE</small>
            <span id='ie-${id}'>${retornoDoValor(dados.IE)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#ie-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
    </tr>
    <tr>
        <td>
            <small>Logradouro</small>
            <span id='log-${id}'>${retornoDoValor(endereco.xLgr)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#log-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
        <td>
            <small>Numero</small>
            <span>${retornoDoValor(endereco.nro)}</span>
        </td>
        <td>
            <small>Complemento</small>
            <span id='comp-${id}'>${retornoDoValor(endereco.xCpl)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#comp-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
        <td>
            <small>Bairro</small>
            <span id='bair-${id}'>${retornoDoValor(endereco.xBairro)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#bair-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
    </tr>

    <tr>
        <td>
            <small>Cidade</small>
            <span>${retornoDoValor(endereco.xMun)}</span>
        </td>
        <td>
            <small>Estado</small>
            <span>${retornoDoValor(endereco.UF)}</span>
        </td>
        <td>
            <small>CEP</small>
            <span id='cep-${id}'>${retornoDoValor(endereco.CEP)}</span>
            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#cep-${id}'>
                <i class='fa fa-clipboard' aria-hidden='true'></i>
            </button>
        </td>
        <td>
            <small>Fone</small>
            <span>${retornoDoValor(endereco.fone)}</span>
        </td>
    </tr>
    `;
  return html;
}

function cardProdutos(dados, show = false) {
  let itemId = dados.$.nItem;
  let produto = dados.prod[0];
  let imposto = dados.imposto[0];
  let valor = parseFloat(produto.vUnCom).toFixed(2);
  let margem = document.querySelector("#margem").value;
  let valor_venda =
    margem.length == 0 ? (valor * 2).toFixed(2) : (valor * margem).toFixed(2);
  return `
    <div class="card">
        <div class="card-header bg-secondary p-1" id="heading-${itemId}">
            <h5 class="mb-0">
                <button class="btn btn-link text-white" type="button" data-toggle="collapse" data-target="#collapse-${itemId}" aria-expanded="true">
                    <i class="fa fa-angle-right" aria-hidden="true"></i> ${itemId} - ${retornoDoValor(
    produto.xProd
  )}
                </button>
            </h5>
        </div>

        <div id="collapse-${itemId}" class="collapse ${
    show ? "show" : null
  } " aria-labelledby="heading-${itemId}" data-parent="#accordionProdutos">
            <div class="card-body">
                <div class='row'>
                    <div class='col-12'>
                        <p>
                            <b>Produto:</b>
                            <span id='prod-${itemId}' class='texto'>${retornoDoValor(
    produto.xProd
  )}</span>
                            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#prod-${itemId}'>Copiar</button>
                        </p>
                        <hr>
                    </div>
                    <div class='col-lg-6'>
                        <p>
                            <b>Código:</b>
                            <span id='cod-${itemId}' class='texto'>${retornoDoValor(
    produto.cProd
  )}</span>
                            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#cod-${itemId}'>Copiar</button>
                        </p>
                        <p>
                            <b>Quantidade:</b> ${retornoDoValor(
                              produto.qCom
                            )}</p>
                        <p>
                            <b>NCM:</b>
                            <span id='ncm-${itemId}'>${retornoDoValor(
    produto.NCM
  )}</span>
                            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#ncm-${itemId}'>Copiar</button>
                        </p>
                    </div>

                    <div class='col-lg-6'>
                        <p>
                            <b>Código de Barras:</b>
                            <span id='bar-${itemId}'>${retornoDoValor(
    produto.cEAN
  )}</span>
                            <button class='btn btn-primary btn-sm' data-clipboard-action='copy' data-clipboard-target='#bar-${itemId}'>Copiar</button>
                        </p>
                        <p>
                            <b>Valor unitário:</b> R$ ${retornoDoValor(
                              valor
                            )}</p>
                        <p>
                            <b>Preço sugerido:</b> R$ ${retornoDoValor(
                              valor_venda
                            )}</p>

                    </div>

                    <div class='col-lg-12'>
                        <hr>
                        <div class='row'>
                            <div class='col-lg-6'>
                                <p>
                                    <b>PIS: </b>${retornoPis(imposto)}</p>
                            </div>
                            <div class='col-lg-6'>
                                <p>
                                    <b>COFINS: </b>${retornoCofins(imposto)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

export { tbodyFornecedor, cardProdutos };
