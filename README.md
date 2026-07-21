# Jefferson Filipim — Landing Page

Landing page de fisioterapia domiciliar, construída em **Next.js 15** (App Router, TypeScript) com animações em **GSAP**.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # serve o build
```

## Stack

- **Next.js 15 / React 19** — App Router, componentes client onde há interação.
- **GSAP 3 + @gsap/react** — `ScrollTrigger` (revelações no scroll, parallax, barra de progresso, scroll-spy do menu) e `SplitText` (títulos que se montam palavra a palavra saindo de uma máscara).
- **next/font** — Poppins (display) e Cinzel (identidade) auto-hospedadas; nenhuma requisição sai da origem.
- **CSS Modules + tokens** — todo o design system (cores, tipografia, espaçamento, sombras, motion) vive em `src/styles/tokens.css` como CSS custom properties.
- **lucide-react** — ícones de interface (conforme o padrão de ícones do projeto).

## Estrutura

```
src/
  app/            layout (fontes, SEO), page (composição), globals.css
  components/
    sections/     as 11 seções da página, cada uma com seu .module.css
    ui/           design system: Button, Badge, Input/Textarea, SectionHeading
    MotionProvider, BookingModal
  lib/
    site.ts       TODA a copy da página (fonte única de verdade)
    motion.ts     vocabulário de animação compartilhado (reveal, revealHeading…)
    icons.ts      registro nome→componente Lucide
  styles/tokens.css
public/images/    logo, hero, about, decline (otimizadas)
```

## Filosofia de animação

O motion segue os tokens da marca: "calmo, sem bounce". Distâncias curtas (16–48px),
easing de cauda longa, staggers que leem como um só gesto. Cada elemento animado
carrega `data-anim` e começa oculto — mas apenas depois que o JS assume (classe
`.jf-anim-ready`), então sem JS ou com `prefers-reduced-motion` a página aparece
inteira e estática. Ver comentários em `src/lib/motion.ts`.

## Pontos que exigem configuração

- **WhatsApp** — o formulário de agendamento abre o WhatsApp com a mensagem pronta.
  Troque o número em `src/lib/site.ts` → `WHATSAPP_NUMBER` (formato internacional,
  só dígitos, ex.: `5511987654321`).
- **Depoimentos** — são ilustrativos (ver `note` em `site.ts`). Substituir por
  avaliações reais autorizadas.
- **Fotos** — as imagens vieram do design. Substituir por fotos reais em
  `public/images/` mantendo os mesmos nomes.
