document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-sac");

  if (!form) return;

  const campoEmail = document.getElementById("email");
  let campoCPF = document.getElementById("cpf");

  // Adiciona campo de CPF se não existir
  if (!campoCPF) {
    const labelCPF = document.createElement("label");
    labelCPF.setAttribute("for", "cpf");
    labelCPF.textContent = "CPF:";
    campoCPF = document.createElement("input");
    campoCPF.type = "text";
    campoCPF.id = "cpf";
    campoCPF.placeholder = "999.999.999-99";
    campoCPF.required = true;
    campoEmail.insertAdjacentElement("afterend", campoCPF);
    campoCPF.insertAdjacentElement("beforebegin", labelCPF);
  }

  // Reaproveita seu alerta existente
  let alerta = document.getElementById("alertaPersonalizado");
  if (!alerta) {
    alerta = document.createElement("div");
    alerta.id = "alertaPersonalizado";
    document.body.appendChild(alerta);
  }

  // Função para mostrar o alerta
  const mostrarAlerta = (mensagem) => {
    alerta.textContent = mensagem;
    alerta.style.display = "block";
    setTimeout(() => {
      alerta.style.display = "none";
    }, 3000);
  };

  // Validação ao enviar o formulário
  form.addEventListener("submit", (event) => {
    const email = campoEmail.value.trim();
    const cpf = campoCPF.value.trim();

    const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const cpfValido = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf);

    if (!emailValido || !cpfValido) {
      event.preventDefault();

      if (!emailValido) {
        mostrarAlerta("⚠️ E-mail inválido! Use o formato: nome@dominio.com");
      } else if (!cpfValido) {
        mostrarAlerta("⚠️ CPF inválido! Use o formato: 999.999.999-99");
      }
    }
  });
});
