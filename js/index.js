async function autenticar() {
  
  if ($("#formulario").valid()) {
    let login = $("#login").val();
    let senha = $("#senha").val();
    try {
      let resposta = await fetch(`https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`);
      let usuario = await resposta.json();

      

      if (usuario.id > 0) {
        localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
        window.location.href = "menu.html";
      }
      else {
        alert("Usuario ou senha inválidos.");
      }
    }
    catch (error) {
      alert("Erro ao tentar autenticar.");
    }
  }
}

