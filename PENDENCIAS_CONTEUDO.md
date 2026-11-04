# Pendências de conteúdo — aba Saúde

Registro da refatoração de apresentação S0–S4, em 04/11/2026. **Não representa aprovação clínica nem aceite final.** O acervo canônico em `shared/data/` foi preservado, sem edição. Documentos do Hub não foram usados como prova de validação clínica nesta implementação.

## Bloqueios para liberação clínica

Na falta de validação documentada, a interface usa literalmente:

```text
[CONTEÚDO PENDENTE DE VALIDAÇÃO PELA EQUIPE DA SAÚDE]
```

| Condição / ID | Definição cidadã (2–3 frases, até 55 palavras) | Três sinais percebidos | Três ações executáveis hoje |
|---|---|---|---|
| Anemia falciforme / `anemia-falciforme` | Pendente | Pendente | Pendente |
| Pressão alta / `hipertensao` | Pendente | Pendente | Pendente |
| Diabetes tipo 2 / `diabetes` | Pendente | Pendente | Pendente |
| Mioma uterino / `miomas-uterinos` | Pendente | Pendente | Pendente |
| Lúpus / `lupus` | Pendente | Pendente | Pendente |
| Doença renal crônica / `doenca-renal-cronica` | Pendente | Pendente | Pendente |

A equipe da saúde deve fornecer texto aprovado, responsável, versão/data e fonte para cada célula. Não converter automaticamente o acervo técnico em orientação individual ou prescrição. Após a substituição, repetir limites de palavras, snapshots, leitura e testes de compreensão: as métricas atuais incluem marcadores, não conteúdo clínico final. O mesmo marcador é usado nos detalhes de condições fora do MVP, sem alegar cobertura clínica completa.

## Revisão editorial e científica

- Revisar a linguagem cidadã de todo o catálogo, inclusive nomes populares que hoje repetem o termo técnico; validar aliases, especialmente doenças raras e genéticas.
- Auditar todas as siglas na experiência inteira, incluindo acervo N3, textos alternativos, nomes acessíveis, rede de serviços e módulos não alterados. O adaptador expande uma tabela de siglas; não é uma auditoria global concluída.
- Validar as explicações de equidade racial, diagnóstico e perguntas frequentes por condição. Os atalhos atuais abrem aprofundamento/acervo existente, não novas respostas clínicas aprovadas para cada pergunta.
- Confirmar URLs/DOIs e correspondência de cada estudo, periódico, ano e achado. `Ver fonte` atualmente leva ao registro bibliográfico interno, não necessariamente à publicação original.
- Revisar selos e critérios de risco por condição. Foram usados somente os selos editoriais existentes (tema prioritário/dado local); não foram inventadas afirmações como maior prevalência ou diagnóstico tardio.
- Os filtros de risco/acesso usam subtítulos de categoria existentes, não estimativa de risco individual nem classificação clínica revisada por doença.
- Validar o agrupamento em nove sistemas: coração, circulação e pulmões foram unidos para resolver o conflito entre dez nomes de sistemas e o limite de nove. Temas sem classificação anatômica, como acidentes/violência, exigem decisão editorial; aparecem com aviso de classificação pendente, sem serem excluídos.
- Fornecer vocabulário clínico validado de sintomas e sua associação com condições. A busca atual cobre nomes/aliases e entrada para serviços, não triagem por sintomas.
- Traduzir e revisar a nova interface em espanhol. O acervo bilíngue existente é mantido, mas os novos controles estão em português.

## Rede de atendimento (S4)

- Validar associação **condição → serviço**. A query `condicao` é preservada, porém a lista é geral e avisa isso explicitamente; não há encaminhamento clínico específico.
- Completar coordenadas, telefones e horários ausentes de unidades básicas, pronto atendimento e outros serviços. A interface não inventa esses campos.
- Confirmar atualização de endereços, telefones e serviços hospitalares 24h já cadastrados. O campo de horário de hospital descreve o serviço 24h existente, não garante horário de todos os setores.
- Proximidade só é calculada com coordenadas conhecidas e autorização de localização existente. Sem coordenadas, distância indisponível e ordem alfabética. Teste automatizado de proximidade cobre hospitais, não a rede inteira.
- Validar editorialmente o lembrete “Antes de ir”. Ele reproduz os três itens da especificação: documento com foto, cartão do Sistema Único de Saúde e lista de remédios em uso.

## Dependências funcionais e de validação

- **Minhas anotações:** módulo indisponível; botão informa a limitação. Implementar requer escopo próprio de dados/privacidade; não foi improvisado armazenamento.
- **Offline:** Cache API guarda catálogo e marcadores locais de IDs de condições abertas; estes marcadores revelam histórico de leitura no dispositivo e merecem revisão de governança/retenção. Não há envio novo ao servidor nem armazenamento novo de localização. Não existe garantia de abertura a frio offline, Service Worker ou instalação PWA nesta entrega.
- **Acessibilidade:** faltam VoiceOver/TalkBack reais, auditoria completa de foco, alvos, espaçamentos, contraste e escala 200% em todas as telas. Testes de DOM e árvore acessível não substituem leitores de tela.
- **Compreensão:** executar teste com cinco usuários; meta de 90% ainda não aferida.
- **Desempenho:** medir abertura abaixo de dois segundos em 4G real/simulado; timeout do skeleton não prova essa meta.
- **Build instalável:** repositório atual fornece aplicativo web React; não há cadeia nativa iOS/Android para gerar instalador sem projeto adicional.

## Próximo passo de homologação

Receber aprovação clínica por condição, completar dados dos serviços e executar os testes humanos antes de aceite. Ver `docs/RELATORIO_SAUDE_CA.md` para critérios, evidências e limites. Commit/push da estrutura não significa aprovação clínica ou publicação verificada.
