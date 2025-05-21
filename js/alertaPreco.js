async function configurar() {
  //buscar as informacoes do usuario no localstorage
  let usuario = JSON.parse(localStorage.getItem('usuarioAutenticado'));

  try {
    let resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${usuario.chave}/usuario`);
    let produtos = await resposta.json();

    let selectProdutos = $("#produtos");

    produtos.forEach(produto => {
      console.log(produto.descricao)

      selectProdutos.append($(`<option value="${produto.id}">${produto.descricao}</option>`))

    });

  }
  catch (error) {
    alert("Erro ao consultar os produtos.");
  }

  exibirTabela();

  setInterval(() => {
    console.log("monitorando.....")
    let alertas = JSON.parse(localStorage.getItem('alertas')) || [];
    alertas.forEach(alerta => {
      verificarAlerta(alerta)
    });

  }, 10000);

}

function adicionar() {

  let alertas = JSON.parse(localStorage.getItem('alertas') || '[]');

  let alerta = new Object();

  alerta.idProduto = $("#produtos").val();
  alerta.descricao = $("#produtos option:selected").text();
  alerta.valor = $("#valor").val();
  alerta.acao = $("#acao").val();

  let teste = alertas.find(objeto => objeto.idProduto == alerta.idProduto);

  if (teste) {
    alert('Já existe um alerta para esse produto');
  } else {
    alertas.push(alerta);
    localStorage.setItem('alertas', JSON.stringify(alertas));
    exibirTabela();
    alert('Cadastro realizado com sucesso');
  }
}

function exibirTabela() {
  let alertas = JSON.parse(localStorage.getItem('alertas')) || [];
  const $corpoTabela = $("#tabela tbody");

  // Limpa o conteúdo do corpo da tabela 
  $corpoTabela.empty();

  alertas.forEach(alerta => {
    // Cria a linha da tabela
    const $linha = $("<tr></tr>");

    // Cria as células para Produto, Valor Desejado e Ação
    const $tdDescricao = $("<td></td>").text(alerta.descricao);
    const $tdValor = $("<td></td>").text(alerta.valor);
    const $tdAcao = $("<td></td>").text(alerta.acao);

    // Adiciona as células à linha
    $linha.append($tdDescricao, $tdValor, $tdAcao);

    // Adiciona a linha à tabela
    $corpoTabela.append($linha);
  });
}

async function verificarAlerta(alerta) {
  try {
    let resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${alerta.idProduto}`);
    let produto = await resposta.json();

    if (produto.valor <= alerta.valor) {

      if (alerta.acao == "Notificar") {
        alert("O produto " + alerta.descricao + " foi notificado no valor desejado de " + alerta.valor);
      } else {
        let compras = JSON.parse(localStorage.getItem('compras') || '[]');
        compras.push(produto);
        localStorage.setItem('compras', JSON.stringify(compras));
      }

      //exclui o alerta
      let alertas = JSON.parse(localStorage.getItem('alertas')) || [];
      let tempAlertas = alertas.filter(a => a.idProduto !== alerta.idProduto);
      localStorage.setItem('alertas', JSON.stringify(tempAlertas));

      exibirTabela();
    }
  }
  catch (error) {
    alert("Erro ao consultar o produto.");
  }
}

