# Gleice Acessórios — mini site (link na bio)

Página única no estilo Linktree, feita em HTML, CSS e JavaScript puros, pronta para publicar na Vercel sem configuração.

## Publicar
Na Vercel, clique em **Add New > Project**, importe este repositório e clique em **Deploy**. Não mude o Root Directory nem outra configuração. Cada novo envio para a branch `main` atualiza o site.

## O que trocar (dados de exemplo)
Tudo fica no topo do `script.js`:
- `LOJA.whatsapp`: número com DDI e DDD, só dígitos (ex.: `5511987654321`).
- `LOJA.instagram`, `LOJA.tiktok`, `LOJA.email`: perfis e e-mail reais.
- `PRODUTOS`: nome, preço e tipo de cada peça da vitrine (até 6). Para usar foto, coloque a imagem em `assets/` e preencha `foto: "assets/arquivo.jpg"`.

No `index.html`: a frase da bio e a linha de atendimento (cidade e horário).

## Arquivos
- `index.html`: estrutura e textos
- `styles.css`: cores (variáveis em `:root`) e layout
- `script.js`: links, vitrine e botão de compartilhar
- `assets/`: logo e favicon
