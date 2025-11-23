document.addEventListener("DOMContentLoaded", () => {
  console.log("cardapio.js carregado");
  console.log("window.CARDAPIO_ACTION =", window.CARDAPIO_ACTION, "window.CARDAPIO_ID =", window.CARDAPIO_ID);

  const action = String(window.CARDAPIO_ACTION || "").trim();
  const itemId = String(window.CARDAPIO_ID || "").trim();

  function showSimpleModal(text) {
    const modal = document.getElementById("modalSucesso");
    const texto = document.getElementById("textoModal");
    if (texto) texto.innerText = text;
    if (modal) modal.style.display = "flex";
  }

  if (action === "editar" && itemId) {
    const url = `http://localhost/Crock_Cookies/backend/api.php?resource=cardapio&id=${encodeURIComponent(itemId)}`;
    console.log("Buscando dados para editar em:", url);

    fetch(url)
      .then(res => {
        console.log("Resposta fetch status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Dados recebidos do backend:", data);

        let item = data;
        if (Array.isArray(data) && data.length) item = data[0];
        if (data && typeof data === "object" && data.items && Array.isArray(data.items)) {
          item = data.items[0] || data;
        }

        if (!item || (typeof item === "object" && Object.keys(item).length === 0)) {
          console.warn("Item vazio recebido:", item);
          return;
        }

        const getEl = id => document.getElementById(id);
        const nomeEl = getEl("nome");
        const descEl = getEl("descricao");
        const precoEl = getEl("preco");
        const categoriaEl = getEl("categoria");
        const imagemEl = getEl("imagem");

        if (nomeEl) nomeEl.value = item.nome ?? "";
        if (descEl) descEl.value = item.descricao ?? "";
        if (precoEl) precoEl.value = item.preco ?? "";

        if (categoriaEl && categoriaEl.tagName.toLowerCase() === "select") {
          const target = String(item.categoria ?? "").trim();
          let found = false;
          Array.from(categoriaEl.options).forEach(opt => {
            if (String(opt.value ?? "").trim() === target) {
              opt.selected = true;
              found = true;
            }
          });
          if (!found && target) {

            const opt = document.createElement("option");
            opt.value = target;
            opt.textContent = target;
            opt.selected = true;
            categoriaEl.appendChild(opt);
            console.warn("Categoria não encontrada nas options — criada opção temporária:", target);
          }
        }

        if (imagemEl) {

          if (imagemEl.tagName.toLowerCase() === "input" && imagemEl.type !== "file") {
            imagemEl.value = item.imagem ?? "";
          } else {

            const preview = getEl("previewImagem");
            if (preview && item.imagem) {
              preview.src = item.imagem;
            }

            const hidden = getEl("imagem_atual");
            if (hidden) hidden.value = item.imagem ?? "";
          }
        }

        console.log("Form preenchido com sucesso.");
      })
      .catch(err => {
        console.error("Erro ao buscar item para editar:", err);

        showSimpleModal("Erro ao carregar item para edição. Veja console.");
      });
  } else {
    console.log("Não é edição ou id ausente:", action, itemId);
  }

  const form = document.getElementById("form_cardapio");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Form submit acionado.");
      const payload = {
        nome: (document.getElementById("nome")?.value ?? "").trim(),
        descricao: (document.getElementById("descricao")?.value ?? "").trim(),
        preco: (document.getElementById("preco")?.value ?? "").trim(),
        categoria: (document.getElementById("categoria")?.value ?? "").trim(),
        imagem: (document.getElementById("imagem")?.value ?? "").trim()
      };

      let url = "http://localhost/Crock_Cookies/backend/api.php?resource=cardapio";
      let method = "POST";
      if (action === "editar" && itemId) {
        method = "PUT";
        url += `&id=${encodeURIComponent(itemId)}`;
      }

      console.log("Enviando payload", method, url, payload);

      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        console.log("Resposta do save status:", response.status);
        let respText = await response.text();
        try {
          const jsonResp = JSON.parse(respText);
          console.log("Resposta JSON do backend:", jsonResp);
        } catch (err) {
          console.log("Resposta não-JSON do backend:", respText);
        }

        const texto = action === "editar"
          ? "Item editado com sucesso!"
          : "Item cadastrado com sucesso!";

        const textoModal = document.getElementById("textoModal");
        if (textoModal) textoModal.innerText = texto;
        const modal = document.getElementById("modalSucesso");
        if (modal) modal.style.display = "flex";

      } catch (error) {
        console.error("Erro ao salvar item:", error);
        const textoModal = document.getElementById("textoModal");
        if (textoModal) textoModal.innerText = "Erro ao salvar o item. Tente novamente.";
        const modal = document.getElementById("modalSucesso");
        if (modal) modal.style.display = "flex";
      }
    });
  } else {
    console.warn("Form #form_cardapio não encontrado no DOM.");
  }

  const btnOK = document.getElementById("btnModalOK");
  if (btnOK) {
    btnOK.addEventListener("click", () => {
      window.location.href = "cardapio.php";
    });
  } else {
    console.warn("#btnModalOK não encontrado.");
  }
});
