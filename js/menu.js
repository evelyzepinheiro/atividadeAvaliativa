function configurar() {
  //buscar as informacoes do usuario no localstorage
  let usuario = JSON.parse(localStorage.getItem('usuarioAutenticado'));

  //pegr o elemento da pagina html
  // //alterar o texto do elemento com os dados busquei no ls
  $("#usuarioAutenticado").text(usuario.nome)
}
