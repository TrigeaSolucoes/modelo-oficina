(function () {
  var prancheta = document.getElementById("checklist-sintomas");
  if (!prancheta) return;

  var zap = prancheta.getAttribute("data-zap") || "";
  var checks = prancheta.querySelectorAll('input[name="sintoma"]');
  var campoModelo = document.getElementById("modelo-carro");
  var textoPrevia = document.getElementById("texto-previa-zap");
  var btnEnviar = document.getElementById("btn-enviar-checklist");

  function montarUrlZap(numero, texto) {
    var digitos = "55" + String(numero || "").replace(/\D/g, "");
    return "https://wa.me/" + digitos + "?text=" + encodeURIComponent(texto);
  }

  function atualizarOrcamento() {
    var marcados = [];
    checks.forEach(function (chk) {
      var label = chk.closest(".item-sintoma");
      if (label) label.classList.toggle("item-sintoma-marcado", chk.checked);
      if (chk.checked) marcados.push(chk.value);
    });

    var modelo = campoModelo && campoModelo.value ? campoModelo.value.trim() : "";
    var listaStr = marcados.length > 0 ? marcados.join(", ") : "avaliação geral";
    var trechoCarro = modelo ? " (" + modelo + ")" : "";

    if (textoPrevia) {
      textoPrevia.textContent =
        "Pedindo orçamento" +
        trechoCarro +
        " para: " +
        listaStr +
        ". Posso mandar foto ou vídeo do problema.";
    }

    if (btnEnviar) {
      var msg =
        "Olá! Estou pedindo orçamento na Auto Mecânica Irmãos Paiva" +
        trechoCarro +
        ". Sintomas: " +
        listaStr +
        ". Posso mandar foto ou vídeo do problema?";
      btnEnviar.setAttribute("href", montarUrlZap(zap, msg));
    }
  }

  checks.forEach(function (chk) {
    chk.addEventListener("change", atualizarOrcamento);
  });

  if (campoModelo) {
    campoModelo.addEventListener("input", atualizarOrcamento);
  }

  atualizarOrcamento();
})();
