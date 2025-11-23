function showDeleteConfirm() {
    return new Promise((resolve) => {
        const overlay = document.getElementById("deleteConfirm");
        const okBtn = document.getElementById("deleteOk");
        const cancelBtn = document.getElementById("deleteCancel");

        overlay.classList.add("show");

        okBtn.onclick = () => {
            overlay.classList.remove("show");
            resolve(true);
        };

        cancelBtn.onclick = () => {
            overlay.classList.remove("show");
            resolve(false);
        };
    });
}

async function deleteCardapio(id) {

    const confirmar = await showDeleteConfirm();
    if (!confirmar) return;

    fetch(`http://localhost/Crock_Cookies/backend/api.php?resource=cardapio&id=${id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(data => {
        showAlert(data.message || "Item deletado com sucesso!", "success");

        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (card) {
            card.style.transition = "0.4s";
            card.style.opacity = "0";
            card.style.transform = "scale(0.9)";

            setTimeout(() => {
                card.remove();
            }, 400);
        }
    })
    .catch(err => {
        showAlert("Erro ao deletar item.", "error");
    });
}
