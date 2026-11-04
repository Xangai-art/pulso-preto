# Pendências de conteúdo — aba Saúde

Atualizado em 04/11/2026 com base em `conteudo-saude.v1.json.txt` e `ESPECIFICACAO_CONTEUDO_SAUDE_v1.0.md`. Este registro substitui o checklist anterior, que descrevia fichas com marcadores vazios. Implementação técnica não representa aprovação clínica ou aceite final.

## Resolvido na implementação

- Seis fichas propostas integradas: anemia falciforme, hipertensão, diabetes tipo 2, miomas uterinos, lúpus e doença renal crônica. Cada uma tem definição, três sinais, alerta antes das três ações, equidade e fontes oficiais diretas.
- Selo de revisão clínica obrigatório; aprovação só é exibida quando status e campos de assinatura estão completos. Nenhuma das seis fichas fornecidas está aprovada.
- Busca por aliases permitidos, exclusão de termos clinicamente distintos e vocabulário de 42 sintomas para navegação, sem diagnóstico ou triagem.
- Filtros editoriais por condição, aviso de que não representam risco individual, nove sistemas anatômicos, eixo de violências/acidentes e grupo sem classificação.
- Interface Saúde PT/ES; originais clínicos portugueses identificados como tais. O acervo científico canônico foi preservado.
- Rede geral de serviços independentemente de `?condicao=`; schema normalizado, campos ausentes explícitos, fontes e status dos dados. Nenhum telefone, horário, endereço ou coordenada foi inventado.
- Anotações desabilitadas. Cache público sem IDs de condições lidas e exclusão ativa do cache legado com histórico.
- Divisão de código por rotas, verificações pré-build e regressão automatizada. Ver relatório de critérios para limites da cobertura.

## Bloqueios clínicos e editoriais

1. **Assinatura clínica das seis fichas:** fornecer revisor, conselho profissional, data e versão; revisar conteúdo e correspondência das fontes antes de alterar o status. JSON original está em `shared/data/condicoes.saude.v1.json`.
2. **Equidade:** validar cada alegação e sua fonte. Narrativas estruturais não devem ser apresentadas como estatísticas de prevalência.
3. **Perguntas frequentes:** os seis arrays fornecidos estão vazios. A interface informa ausência de respostas; não há respostas inventadas. Renderização de futuros arrays preenchidos requer implementação/reteste.
4. **Tradução clínica:** fornecer versão espanhola revisada das novas fichas. A tradução dos controles não constitui tradução ou aprovação dos textos clínicos.
5. **Siglas:** concluir auditoria integral do acervo e nomes acessíveis. O glossário cobre as fichas fornecidas; a expansão da primeira ocorrência ainda requer revisão em rerenders independentes de componentes/StrictMode.
6. **Sintomas:** associações conservadoras derivadas dos sinais fornecidos, não um mapeamento clínico assinado. Termos sem associação e termos amplos não recebem diagnósticos arbitrários.
7. **Classificação em revisão:** `cancer-mama`, `cancer-prostata`, `cancer-colorretal`, `cancer-figado`, `cancer-rim`, `melanoma`, `hiv`. Aparecem sem perda no grupo de classificação pendente.
8. **Fontes:** nove URLs únicas responderam HTTP 200 na checagem técnica. Isso não valida conteúdo, ano ou correspondência da alegação; não há monitoramento dinâmico de indisponibilidade.

## Rede de atendimento

- Confirmar endereços, telefones, horários, coordenadas, precisão, responsável e data de coleta. Registros atuais continuam pendentes de validação; campos desconhecidos ficam nulos.
- Hospital 24h refere-se ao serviço/setor indicado, não a todos os setores. Não inferir horários de UPA só pela categoria.
- Ordenação por distância depende de consentimento e coordenadas conhecidas. Unidades sem coordenadas permanecem disponíveis, com distância indisponível e ordenação alfabética.
- A lista é geral: não implementar encaminhamento ou filtro clínico por `condicao` sem novo escopo aprovado.
- Estado vazio oferece link para lista com até três serviços; não incorpora três serviços geolocalizados dentro da própria tela vazia.
- `servicos.v1.json` é snapshot do adaptador `healthServices.ts`; alterações devem atualizar ambos. O teste detecta divergência, mas não regenera automaticamente o snapshot.

## Homologação e limites funcionais

- VoiceOver e TalkBack reais; auditoria completa de foco, siglas, alvos e escala de texto em todas as telas. Axe automatizado não certifica WCAG.
- Teste com cinco usuários: meta de pelo menos 36/40 tarefas compreendidas (90%), ainda não medida.
- Medição formal em 4G, incluindo três execuções Lighthouse. Abertura abaixo de dois segundos não foi comprovada. Tamanho do chunk de entrada não equivale ao total da rota inicial.
- Anotações v2 exigem escopo de privacidade/DPO/RIPD próprio; permanecem fora da v1.
- Offline cobre conteúdo público com app já aberto; sem Service Worker, instalação PWA/nativa ou garantia de abertura a frio.
- Vulnerabilidades reportadas pela instalação existente (uma moderada e duas altas) requerem análise de dependências separada; não foram corrigidas neste escopo.

## Publicação

Build e testes locais aprovados; sem push e sem deploy nesta entrega. Um push em `main` pode disparar Workers Builds. Revisar os bloqueios acima antes de publicar ou declarar aprovação clínica. Evidências atuais: `docs/RELATORIO_SAUDE_CA.md`.
