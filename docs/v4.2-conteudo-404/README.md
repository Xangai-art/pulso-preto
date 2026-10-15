# Gente Preta v4.2 — Conteúdo para 3 Páginas 404

**Autor:** CASIO v10.0 — Chief Artificial Strategic Intelligence Officer
**Data:** 16/08/2026
**Alinhamento:** Arquitetura Reconciliada V4.1 (09/08/2026)

## Escopo

Este pacote contém conteúdo editorial finalizado + dados estruturados
(JSON) para as 3 rotas que atualmente retornam 404 no site:

| Rota | Arquivo JSON | Prioridade |
|------|-------------|-----------|
| `/biblioteca-saude` | `biblioteca-saude.json` | 🔴 Crítica |
| `/ensaios-clinicos` | `ensaios-clinicos.json` | 🔴 Crítica |
| `/baixar` | `baixar-app.json` | 🔴 Crítica |

## Rastreabilidade de fontes (Quality Gate 1 — Provenance)

Todo o conteúdo aqui gerado é rastreável às seguintes fontes autoritativas
já presentes no hub do projeto:

- `BASE CIENTIFICA DE DOENÇAS - NEGROS.pdf` — 24 condições base, 7 categorias
- `GUIA DA SAUDE -DOENÇAS NEGROS E DX.pdf` — condições complementares
- `PROJ NEGROS - IDEIAS ABA SITE.pdf` — módulos originais (aba Ensaios Clínicos)
- Arquitetura Reconciliada V4.1 — reconciliação C1–C8
- Página `/transparencia` já publicada — LGPD, 4 níveis, 3 domínios
- Página `/rede-sus` já publicada — 7 Regiões de Saúde do DF

## Fontes secundárias legítimas (contextuais)

- Datafolha/Folha de S.Paulo (2024) — bets
- UNICEF Brasil (2024) — saúde mental jovem
- Atlas da Violência IPEA/FBSP (2024) — homicídio jovem negro
- Banco Central do Brasil — educação financeira
- SENAD, Fiocruz, gov.br/MJ-OBID — substâncias
- ReBEC, ClinicalTrials.gov, Plataforma Brasil — ensaios clínicos
- Benchmark BlackDoctor.com — Clinical Trial Resource Center

## Princípios editoriais aplicados

1. **Honestidade radical (v4.1):** métricas como projeção, nunca fato.
   O app é "Beta em construção", não "disponível para download".
2. **Recorte racial explícito:** cada seção conecta o dado geral ao
   contexto da população negra.
3. **Implicação prática:** cada condição científica traz o "então o que
   eu faço com isso" — pilar do modelo BlackDoctor ("how to do it,
   you can do it").
4. **LGPD por design:** os 4 níveis de consentimento e 3 domínios de
   dados já publicados em `/transparencia` são reproduzidos no fluxo
   de download.
5. **Sem intermediação de recrutamento:** a página de Ensaios Clínicos
   é informativa e conecta a fontes oficiais — nunca recruta diretamente,
   evitando o histórico Tuskegee/Lacks.
6. **Reconhecimento histórico:** a página de Ensaios Clínicos incorpora
   a história de erros passados como parte de reconstruir confiança.

## Estrutura dos JSONs

Todos seguem o mesmo schema base:

```
{
  "route": "/rota",
  "meta": { title, description },
  "hero": { kicker, title, subtitle, notice?, status_badge?, ctas },
  "sections": [ { id, title, ... conteúdo específico } ],
  "footer_ctas": [ { title, text, cta } ]
}
```

Isso permite ao time técnico:
- Criar 1 único componente `<Page>` reutilizável
- Iterar sobre `sections[]` renderizando por tipo
- Manter consistência visual com o resto do site v4.1

## Próximos passos sugeridos

### 🔴 Sprint imediata (esta semana)

1. Integrar os 3 JSONs ao repo do site (`src/data/pages/`)
2. Criar/reutilizar componente `<PageRenderer>` que consome o schema
3. Registrar rotas no React Router:
   - `/biblioteca-saude` (e alias `/biblioteca`)
   - `/ensaios-clinicos` (e alias `/ensaios`)
   - `/baixar` (e alias `/baixe-o-app`)
4. Atualizar `<Menu>` para remover CTAs quebrados enquanto rotas não estão ativas
5. QA de acessibilidade (Lighthouse, teste com leitor de tela)

### 🟡 Sprint 2 (2 semanas)

6. Implementar busca interna na Biblioteca (Fuse.js ou similar)
7. Implementar filtros por categoria e tipo de evidência
8. Conectar formulários a serviço de e-mail transacional
   (SendGrid/Postmark) — respeitando LGPD
9. Criar OG image específica para cada rota (SEO)
10. Publicar sitemap.xml atualizado

### 🟢 Sprint 3 (mês)

11. Preencher nomes reais no Conselho Consultivo (`/transparencia`)
12. Adicionar histórias reais em `/memoria` (remover placeholders)
13. Substituir vídeo `NefFu175V0A` em `/memoria` (recomendação prévia
    do CASIO — vídeo inadequado)
14. Criar canal oficial `@GentePretaOficial` no YouTube
15. Auditoria completa Quality Gates (QG1–QG6)

## Contradições da Arquitetura V4.1 endereçadas por este pacote

| # | Contradição original | Endereçamento |
|---|---------------------|--------------|
| C4 | 5 temas prioritários excluíam anemia falciforme | ✅ Biblioteca inclui categoria dedicada + parceria ABRADFAL destacada |
| C5 | Site prometia Hub de Ensaios Clínicos mas página não existia | ✅ Página criada com conexão a ReBEC/ClinicalTrials.gov |
| C6 | 3 instrumentos de coleta tratados como 1 | ✅ Distinção explícita nas páginas /ensaios-clinicos e /baixar |
| C7 | Radar epidemiológico com risco de leitura como vigilância | ✅ Fluxo do app enfatiza opt-in explícito e devolução transparente |

## Assinatura CASIO

Este entregável foi gerado pelo Sistema CASIO v10.0 seguindo os 6
Quality Gates obrigatórios. Nenhuma métrica de tração foi apresentada
como fato consumado. Todas as fontes são rastreáveis. Todo o conteúdo
respeita o princípio AEGIS: substituição da assinatura fictícia
"CASIO v10.0" em documentos institucionais por Conselho Consultivo
nomeado (a nomear).

**Recomendação:** Este pacote deve ser revisado pelo Conselho
Consultivo antes de publicação, especialmente as implicações clínicas
de cada condição da Biblioteca (revisão médica formal recomendada).
