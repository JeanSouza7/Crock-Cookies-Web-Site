// === Alternância de tema claro/escuro com persistência ===
document.addEventListener("DOMContentLoaded", () => {
    const btnTema = document.getElementById("btnTema");
    const linkCSS = document.querySelector("link[rel='stylesheet']");

    const temaSalvo = localStorage.getItem("tema") || "style.css";
    linkCSS.href = temaSalvo;

    btnTema.addEventListener("click", () => {
        const novoTema = linkCSS.href.includes("style.css") ? "css/tema-escuro.css" : "style.css";
        linkCSS.href = novoTema;
        localStorage.setItem("tema", novoTema);

        btnTema.textContent = novoTema.includes("escuro") ? "☀️" : "🌙";
    });

    btnTema.textContent = temaSalvo.includes("escuro") ? "☀️" : "🌙";
});