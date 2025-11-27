function showDeleteConfirm() {
    return new Promise((resolve) => {
        const overlay = document.getElementById("deleteConfirm");
        const okBtn = document.getElementById("deleteOk");
        const cancelBtn = document.getElementById("deleteCancel");

        overlay.style.display = "flex";

        okBtn.onclick = () => {
            overlay.style.display = "none";
            resolve(true);
        };

        cancelBtn.onclick = () => {
            overlay.style.display = "none";
            resolve(false);
        };
    });
}

function showDeleteSuccess() {
    return new Promise((resolve) => {
        const overlay = document.getElementById("deleteSuccess");
        const okBtn = document.getElementById("deleteSuccessOk");

        overlay.style.display = "flex";

        okBtn.onclick = () => {
            overlay.style.display = "none";
            resolve(); // Continua o fluxo
        };
    });
}

async function deleteCardapio(id) {

    const confirmar = await showDeleteConfirm();
    if (!confirmar) return;

    // Realiza o DELETE no backend
    await fetch(`http://localhost/Crock_Cookies/backend/api.php?resource=cardapio&id=${id}`, {
        method: "DELETE"
    });

    // Mostra o modal de sucesso
    await showDeleteSuccess();

    // Agora remove o card da tela (ou recarrega a página)
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (card) {
        card.style.transition = "0.4s";
        card.style.opacity = "0";
        card.style.transform = "scale(0.9)";

        setTimeout(() => {
            card.remove();
        }, 400);
    }
}
