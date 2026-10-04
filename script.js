/* =========================================================
   DADOS DA LOJA — troque aqui pelos dados reais da cliente
   ========================================================= */
const LOJA = {
  whatsapp: "5511999999999", // DDI + DDD + número, só dígitos
  mensagemWhats: "Olá, Gleice! Vim pelo seu link e quero saber mais sobre as peças 💍",
  instagram: "https://instagram.com/gleiceacessorios",
  tiktok: "https://www.tiktok.com/@gleiceacessorios",
  email: "gleiceacessorios@gmail.com",
};

/* Vitrine: até 6 peças. "tipo" escolhe o desenho (anel, colar, brinco, pulseira, conjunto, relogio).
   Se tiver foto, coloque em assets/ e preencha "foto": "assets/nome.jpg". */
const PRODUTOS = [
  { nome: "Anel Solitário Dourado", preco: "R$ 39,90", tipo: "anel" },
  { nome: "Colar Ponto de Luz", preco: "R$ 49,90", tipo: "colar" },
  { nome: "Brinco Argola Cravejada", preco: "R$ 34,90", tipo: "brinco" },
  { nome: "Pulseira Riviera", preco: "R$ 59,90", tipo: "pulseira" },
  { nome: "Conjunto Gota Esmeralda", preco: "R$ 79,90", tipo: "conjunto" },
  { nome: "Choker Pérolas", preco: "R$ 44,90", tipo: "colar2" },
];

/* ========================================================= */

const linkWhats = (texto) =>
  `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;

const LINKS = {
  whatsapp: linkWhats(LOJA.mensagemWhats),
  catalogo: linkWhats("Olá, Gleice! Pode me enviar o catálogo completo? ✨"),
  instagram: LOJA.instagram,
  tiktok: LOJA.tiktok,
  email: `mailto:${LOJA.email}?subject=${encodeURIComponent("Pedido pelo site")}`,
};

document.querySelectorAll("[data-link]").forEach((el) => {
  const url = LINKS[el.dataset.link];
  if (url) el.href = url;
});

/* Desenhos das peças (traço dourado sobre fundo claro) */
const DESENHOS = {
  anel: `<circle cx="50" cy="60" r="20" fill="none" stroke="url(#ouro)" stroke-width="6"/>
         <path d="M40 38 50 24 60 38 50 46z" fill="#3fbf8f" stroke="#fff" stroke-width="1.5"/>`,
  colar: `<path d="M20 22 Q50 78 80 22" fill="none" stroke="url(#ouro)" stroke-width="3"/>
          <circle cx="50" cy="56" r="7" fill="#fff" stroke="url(#ouro)" stroke-width="3"/>`,
  brinco: `<circle cx="34" cy="55" r="16" fill="none" stroke="url(#ouro)" stroke-width="5"/>
           <circle cx="66" cy="55" r="16" fill="none" stroke="url(#ouro)" stroke-width="5"/>
           <circle cx="34" cy="39" r="3" fill="#fff"/><circle cx="66" cy="39" r="3" fill="#fff"/>`,
  pulseira: `<ellipse cx="50" cy="52" rx="32" ry="16" fill="none" stroke="url(#ouro)" stroke-width="6"/>
             <g fill="#fff">${[22, 36, 50, 64, 78].map((x) => `<circle cx="${x}" cy="${x === 50 ? 68 : x === 36 || x === 64 ? 65 : 58}" r="3"/>`).join("")}</g>`,
  conjunto: `<path d="M24 20 Q50 64 76 20" fill="none" stroke="url(#ouro)" stroke-width="3"/>
             <path d="M50 44 58 56 50 68 42 56z" fill="#3fbf8f" stroke="url(#ouro)" stroke-width="2"/>
             <path d="M20 66 24 74 20 82 16 74z" fill="#3fbf8f"/><path d="M80 66 84 74 80 82 76 74z" fill="#3fbf8f"/>`,
  colar2: `<path d="M18 30 Q50 62 82 30" fill="none" stroke="url(#ouro)" stroke-width="2"/>
           <g fill="#fff" stroke="#e8d9c0">${[22, 30, 38, 46, 54, 62, 70, 78].map((x) => {
             const y = 30 + 32 * (1 - Math.pow((x - 50) / 32, 2)) * 0.5;
             return `<circle cx="${x}" cy="${y.toFixed(1)}" r="4"/>`;
           }).join("")}</g>`,
};

const svgPeca = (tipo) => `
  <svg viewBox="0 0 100 90" aria-hidden="true">
    <defs><linearGradient id="ouro" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffd27a"/><stop offset=".5" stop-color="#f27e2b"/><stop offset="1" stop-color="#c9621c"/>
    </linearGradient></defs>
    ${DESENHOS[tipo] || DESENHOS.anel}
  </svg>`;

const grade = document.getElementById("vitrine-grade");
grade.innerHTML = PRODUTOS.slice(0, 6)
  .map(
    (p) => `
    <a class="peca" href="${linkWhats(`Olá, Gleice! Quero o ${p.nome} (${p.preco}) 💍`)}" target="_blank" rel="noopener">
      <div class="peca__img">${p.foto ? `<img src="${p.foto}" alt="${p.nome}" loading="lazy">` : svgPeca(p.tipo)}</div>
      <div class="peca__info">
        <span class="peca__nome">${p.nome}</span>
        <span class="peca__preco">${p.preco}</span>
      </div>
      <span class="peca__pedir">Quero esse</span>
    </a>`
  )
  .join("");

/* Animação de entrada em cascata */
document.querySelectorAll(".anima").forEach((el, i) => {
  el.style.animationDelay = `${i * 70}ms`;
});

/* Compartilhar */
const aviso = document.getElementById("aviso");
document.getElementById("compartilhar").addEventListener("click", async () => {
  const dados = { title: document.title, url: location.href };
  if (navigator.share) {
    try { await navigator.share(dados); } catch (e) { /* cancelado */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(location.href);
  } catch (e) { /* sem permissão */ }
  aviso.hidden = false;
  setTimeout(() => (aviso.hidden = true), 2200);
});

document.getElementById("ano").textContent = new Date().getFullYear();
