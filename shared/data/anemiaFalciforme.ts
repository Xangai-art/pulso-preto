// Conteúdo enriquecido — Anemia Falciforme (Doença Falciforme)
//
// Estrutura alinhada ao template institucional "Saúde Negra de A a Z" (ver
// Apresentação Institucional PPTX, slide "Modelo de Conteúdo"): O que é / Por
// que importa / Sinais / Quem fica atento / Prevenir / Diagnóstico /
// Tratamento / Quando ir / Onde no SUS / Fontes — mas segmentado em 3 níveis
// de profundidade/linguagem, por audiência profissional, conforme solicitado:
//   - medico:      conteúdo técnico-científico (fisiopatologia, diagnóstico
//                   diferencial, condutas, evidência, referências PCDT/MS)
//   - enfermeiro:   conteúdo clínico intermediário (triagem, manejo de crise,
//                   cuidado continuado, orientação ao paciente)
//   - usuario:      linguagem acessível (o que é, sinais de alerta, cuidado
//                   do dia a dia, onde buscar ajuda no SUS)
//
// Parceria técnica: ABRADFAL (Associação Brasiliense das Pessoas com Doença
// Falciforme) — ver site/src/data/project.ts. Tema prioritário do App Sentinela.
//
// FASE 3.2 — Conteúdo bilíngue (PT/ES): a estrutura foi promovida de um único
// objeto `anemiaFalciformeContent` para um dicionário por idioma
// `anemiaFalciformeContent: Record<LocaleId, DiseaseDeepContent>`, espelhando
// o padrão já usado em shared/data/variantContent.ts (VARIANT_CONTENT +
// getVariantContent). A tradução em espanhol foi revisada para manter a
// terminologia clínica correta (ex.: "drepanocito" em vez de tradução literal
// de "hemácia em foice", "rasgo falciforme" para o traço heterozigoto HbAS)
// e preserva a mesma estrutura de seções/parágrafos do conteúdo em português,
// garantindo que nenhuma informação clínica seja perdida na tradução.
// Consumido via getDeepContent(diseaseId, localeId) — ver
// site|app/src/data/deepContentRegistry.ts.

import type { LocaleId } from './locales';

export interface AudienceSection {
  heading: string;
  body: string[]; // parágrafos (cada item = 1 parágrafo renderizado)
}

export interface AudienceContent {
  summary: string; // 1-2 frases de abertura, exibidas no topo da aba
  sections: AudienceSection[];
}

export interface DiseaseHeroImage {
  url: string;
  alt: string;
  credit: string;
  isPlaceholder: true;
}

export interface DiseaseSource {
  label: string;
  detail: string;
}

export interface DiseaseDeepContent {
  heroImage: DiseaseHeroImage;
  audiences: {
    medico: AudienceContent;
    enfermeiro: AudienceContent;
    usuario: AudienceContent;
  };
  sources: DiseaseSource[];
}

// Imagem científica (micrografia) — mesma em ambos os idiomas, apenas o
// texto alternativo (alt) é traduzido para acessibilidade correta em cada
// idioma; credit/licença permanece igual (atribuição de fonte, não é texto
// de interface).
const heroImage_pt: DiseaseHeroImage = {
  url: 'https://sspark.genspark.ai/i/U0fgB9sbw0tFlBV7?width=2560',
  alt: 'Micrografia eletrônica colorizada comparando hemácias normais em forma de disco biconcavo com uma hemácia em formato de foice (drepanócito), característica da doença falciforme',
  credit: 'Pixnio — domínio público / CC0 (placeholder científico, substituir por material próprio se necessário)',
  isPlaceholder: true,
};

const heroImage_es: DiseaseHeroImage = {
  url: 'https://sspark.genspark.ai/i/U0fgB9sbw0tFlBV7?width=2560',
  alt: 'Micrografía electrónica coloreada que compara glóbulos rojos normales con forma de disco bicóncavo con un glóbulo rojo en forma de hoz (drepanocito), característico de la enfermedad falciforme',
  credit: 'Pixnio — dominio público / CC0 (placeholder científico, sustituir por material propio si es necesario)',
  isPlaceholder: true,
};

const anemiaFalciformeContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,

  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Fisiopatologia, diagnóstico diferencial, condutas clínicas e evidência atualizada para a prática médica e a pesquisa em doença falciforme (DF).',
      sections: [
        {
          heading: 'O que é — fisiopatologia',
          body: [
            'A doença falciforme (DF) é uma hemoglobinopatia hereditária autossômica recessiva causada por uma mutação pontual no gene da beta-globina (HBB), no cromossomo 11 (substituição de ácido glutâmico por valina na posição 6 da cadeia beta — GAG→GTG), resultando na hemoglobina S (HbS).',
            'Em condições de baixa tensão de oxigênio, acidose ou desidratação, a HbS polimeriza, deformando a hemácia em formato de foice (drepanócito). Essas células rígidas e pouco deformáveis causam vaso-oclusão microvascular, hemólise extravascular e intravascular crônica, inflamação endotelial sustentada e um estado de hipercoagulabilidade — a tríade fisiopatológica central (vaso-oclusão, hemólise, inflamação) que explica a maior parte das manifestações clínicas.',
            'Genótipos clinicamente relevantes: HbSS (forma mais grave, "anemia falciforme" em sentido estrito), HbSC, HbS/beta-talassemia (S-beta-zero e S-beta-mais) e o traço falciforme heterozigoto HbAS (portador assintomático na maioria dos casos, mas não isento de risco em situações extremas de hipóxia/exercício intenso — rabdomiólise, morte súbita em esforço extremo são descritas, ainda que raras).',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'A DF é a doença monogênica mais prevalente no Brasil, com incidência estimada em 1:1.000 a 1:1.400 nascidos vivos, e prevalência do traço falciforme (HbAS) de cerca de 2% na população geral — chegando a 6-10% em populações afrodescendentes de algumas regiões, refletindo a origem da mutação como provável vantagem seletiva histórica contra a malária (heterozigoto protegido) na África Subsaariana.',
            'Por sua distribuição genética ligada à ancestralidade africana, a DF é um marcador direto de como o racismo estrutural se traduz em inequidade em saúde: subdiagnóstico, atraso no início do tratamento, descrédito da dor relatada por pacientes negros (viés documentado na literatura internacional de manejo de dor) e menor investimento histórico em pesquisa comparado a condições de prevalência similar em populações majoritariamente brancas.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'Triagem neonatal universal (Programa Nacional de Triagem Neonatal / "teste do pezinho", Portaria MS) por eletroforese em pH alcalino ou HPLC — padrão-ouro para confirmação diagnóstica, complementado por estudo familiar quando indicado.',
            'Diagnóstico diferencial inclui outras hemoglobinopatias (HbC, HbD-Punjab, talassemias), anemias hemolíticas de outras etiologias e, na crise aguda, abdome agudo cirúrgico, osteomielite e artrite séptica (importante em criança com dor óssea e febre).',
            'Acompanhamento laboratorial de rotina: hemograma completo com reticulócitos, LDH, bilirrubina indireta, função renal (a nefropatia falciforme é subdiagnosticada), ultrassom transcraniano com Doppler em crianças (triagem de risco de AVC isquêmico) e avaliação cardiopulmonar periódica (ecocardiograma para hipertensão pulmonar, função respiratória).',
          ],
        },
        {
          heading: 'Tratamento e condutas',
          body: [
            'Hidroxiureia é a terapia modificadora de doença de primeira linha, disponível no SUS — aumenta HbF (hemoglobina fetal), reduzindo frequência de crises vaso-oclusivas e síndrome torácica aguda; requer monitoramento hematológico (risco de mielossupressão) e ajuste de dose individualizado.',
            'Profilaxia com penicilina oral até os 5 anos (risco aumentado de sepse por S. pneumoniae por asplenia funcional) e esquema vacinal ampliado (pneumocócica conjugada e polissacarídica, meningocócica, Haemophilus influenzae tipo b) são condutas-padrão em crianças com HbSS/S-beta-zero.',
            'Manejo da crise vaso-oclusiva: hidratação, analgesia multimodal e escalonada (incluindo opioides quando indicado — vigilância ativa contra subtratamento da dor por viés racial), oxigenoterapia se hipoxemia, e investigação de gatilhos/complicações associadas.',
            'Transfusão crônica (programa de hipertransfusão ou exsanguineotransfusão parcial) indicada em prevenção secundária de AVC, síndrome torácica aguda grave e outras complicações graves recorrentes; requer vigilância de sobrecarga de ferro (quelação) e aloimunização.',
            'Terapias emergentes: voxelotor (inibidor de polimerização da HbS), crizanlizumabe (anti-P-selectina, redução de crises vaso-oclusivas), L-glutamina oral, e terapia genética (edição de genes — exa-cel/Casgevy, lovotibeglogene autotemcel) já aprovadas em outras jurisdições, com discussão de incorporação no SUS em curso — acompanhar PCDT vigente do Ministério da Saúde.',
            'Transplante de células-tronco hematopoiéticas (TCTH) alogênico permanece a única modalidade curativa estabelecida, reservado a casos graves com doador compatível, dado o risco de morbimortalidade do procedimento.',
          ],
        },
        {
          heading: 'Quando referenciar / sinais de alarme clínico',
          body: [
            'Febre ≥38°C em paciente com DF é emergência até prova em contrário (risco de sepse por asplenia funcional) — hemocultura e antibioticoterapia empírica precoce.',
            'Síndrome torácica aguda (novo infiltrado radiológico + febre/dor torácica/hipoxemia) é a principal causa de morte em adultos com DF — manejo hospitalar agressivo, suporte respiratório e considerar exsanguineotransfusão.',
            'Déficit neurológico focal agudo (mesmo transitório) exige investigação imediata de AVC — maior risco em crianças com HbSS, rastreio por Doppler transcraniano permite prevenção primária com transfusão crônica.',
            'Priapismo >4h, sequestro esplênico agudo (criança pequena, esplenomegalia súbita + queda de Hb) e crise aplásica (geralmente por parvovírus B19) são emergências que exigem intervenção imediata.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Protocolo Clínico e Diretrizes Terapêuticas (PCDT) da Doença Falciforme, Ministério da Saúde — referência normativa para conduta no SUS.',
            'Parceria técnica ABRADFAL (Associação Brasiliense das Pessoas com Doença Falciforme) fundamenta a curadoria e revisão deste conteúdo junto ao App Sentinela.',
            'Literatura internacional consolidada (NHLBI Evidence-Based Management of Sickle Cell Disease; American Society of Hematology guidelines) orienta as condutas descritas acima — sempre cotejar com protocolo institucional local.',
          ],
        },
      ],
    },

    // ======================= ENFERMEIROS E TÉCNICOS =======================
    enfermeiro: {
      summary:
        'Triagem, manejo de crises, cuidado continuado e orientação ao paciente/família — conteúdo clínico de nível intermediário para a rotina de enfermagem na Atenção Básica e na urgência/emergência.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'A doença falciforme é uma condição genética hereditária (não é contagiosa, não é "contaminação") em que as hemácias, em vez de manterem o formato arredondado normal, podem assumir formato de foice sob certas condições (falta de oxigênio, desidratação, frio, esforço físico intenso, infecção).',
            'Essas hemácias em foice são mais rígidas e "entopem" vasos sanguíneos pequenos, causando dor (crise) e, ao longo do tempo, dano a órgãos como baço, rins, pulmões e ossos. A pessoa com DF também tem anemia crônica, porque essas hemácias se rompem (hemolisam) mais rápido que o normal.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'Dor aguda e intensa, geralmente em ossos longos, peito, abdômen ou articulações — é o motivo mais comum de busca por atendimento, chamada de "crise de dor" ou "crise vaso-oclusiva". A intensidade relatada pelo paciente deve ser sempre levada a sério: pessoas negras historicamente têm sua dor subestimada e subtratada no sistema de saúde — é um viés a ser ativamente combatido na triagem.',
            'Palidez, icterícia (olhos/pele amarelados), cansaço desproporcional e falta de ar podem indicar agravamento da anemia ou sequestro esplênico (em crianças pequenas).',
            'Febre em pessoa com DF NUNCA deve ser minimizada — classificar como prioridade alta/vermelha no acolhimento, pois pode ser sinal de infecção grave (o baço geralmente não funciona bem nessas pessoas, aumentando risco de infecções graves).',
            'Falta de ar associada a dor no peito e febre pode ser síndrome torácica aguda, uma complicação grave que precisa de avaliação médica imediata.',
            'Em homens, ereção dolorosa prolongada (priapismo, mais de 4 horas) é emergência urológica — orientar busca imediata de atendimento.',
          ],
        },
        {
          heading: 'Quem fica atento — grupos de risco e acompanhamento',
          body: [
            'Toda criança deve ter o resultado do "teste do pezinho" verificado — é nele que a DF costuma ser identificada no Brasil, ainda nos primeiros dias de vida. Crianças diagnosticadas precisam de acompanhamento regular, vacinação em dia (incluindo vacinas extras recomendadas) e, até os 5 anos, uso contínuo de penicilina para prevenir infecções graves — reforçar a adesão com a família em cada contato.',
            'Adultos com DF precisam de acompanhamento hematológico regular, mesmo em períodos sem crise — a doença continua "trabalhando" silenciosamente nos órgãos.',
            'Pessoas com traço falciforme (que têm o "gene", mas não a doença) geralmente não têm sintomas, mas devem saber informar isso em situações de exercício físico extremo, desidratação severa ou altitude elevada, e é informação relevante para planejamento familiar (risco de ter filho com a doença se o parceiro/parceira também tiver o traço).',
          ],
        },
        {
          heading: 'Manejo da crise de dor — o que fazer na unidade',
          body: [
            'Acolher rapidamente, classificar risco considerando a história de DF como fator automático de atenção prioritária, e iniciar hidratação (oral se tolerado, venosa se necessário) o quanto antes.',
            'Seguir o protocolo de analgesia escalonada da unidade sem demora — crises de dor falciforme exigem controle rápido e eficaz da dor; não é "drama" nem "procura por medicamento controlado", é manifestação direta da doença.',
            'Observar sinais vitais, saturação de oxigênio e temperatura com frequência — aplicar oxigênio se houver queda de saturação.',
            'Registrar e comunicar imediatamente à equipe médica qualquer sinal de alarme: febre, dificuldade respiratória, dor torácica, alteração neurológica (fala, força, visão), priapismo ou baço muito aumentado em criança.',
          ],
        },
        {
          heading: 'Cuidado continuado e orientação ao paciente/família',
          body: [
            'Reforçar hidratação adequada no dia a dia, evitar exposição a frio intenso e extremos de esforço físico sem preparo, e buscar atendimento precoce diante de febre — são as orientações de autocuidado mais efetivas para reduzir crises.',
            'Orientar sobre a importância de não interromper a hidroxiureia (quando prescrita) sem orientação médica, mesmo em períodos sem sintomas — é tratamento contínuo, não "de crise".',
            'Apoiar psicossocialmente: DF é doença crônica, dolorosa e muitas vezes invisibilizada; o acolhimento humanizado da equipe de enfermagem é determinante para a adesão ao tratamento e para a confiança no sistema de saúde.',
            'Encaminhar à Rede SUS local (ver página "Rede SUS" desta plataforma) para vínculo com hematologia de referência, serviço social e, quando pertinente, a ABRADFAL (associação de pacientes, parceira técnica deste projeto).',
          ],
        },
      ],
    },

    // ============================== USUÁRIOS ===============================
    usuario: {
      summary:
        'O que é a anemia falciforme, sinais de alerta, cuidados do dia a dia e onde buscar ajuda no SUS — em linguagem simples e direta.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'A anemia falciforme (também chamada de doença falciforme) é uma doença do sangue que a pessoa já nasce com ela — passada pelos pais, no "sangue" (genes). Não é uma doença contagiosa: não se "pega" de ninguém.',
            'Na anemia falciforme, os glóbulos vermelhos do sangue (que levam oxigênio para o corpo) podem mudar de formato: em vez de redondinhos, ficam parecidos com uma foice (lua crescente). Esses glóbulos em formato de foice entopem vasinhos de sangue pequenos, o que causa dores fortes e pode machucar órgãos do corpo com o tempo.',
            'É a doença genética mais comum no Brasil, e é bem mais frequente entre pessoas negras — por isso é um tema tão importante para a nossa comunidade.',
          ],
        },
        {
          heading: 'Por que isso importa',
          body: [
            'Quem tem anemia falciforme pode ter uma vida longa e de qualidade com acompanhamento médico regular, remédios certos e cuidados simples no dia a dia. O problema não é a doença "não ter solução" — é o atraso no diagnóstico, o preconceito, e a dor da pessoa não ser levada a sério nos atendimentos de saúde.',
            'Historicamente, a dor de pessoas negras é mais desacreditada nos hospitais. Isso é um tipo de racismo institucional que custa vidas — e é algo que esta plataforma existe para combater.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Dor forte e repentina em ossos, barriga, peito ou juntas — é a chamada "crise de dor" e é o sinal mais comum. Nunca minimize: procure atendimento.',
            'Febre é sempre um sinal de alerta em pessoa com anemia falciforme — mesmo que pareça "só uma febrezinha", procure a Unidade Básica de Saúde (UBS) ou emergência no mesmo dia.',
            'Cansaço fora do normal, falta de ar, olhos ou pele amarelados (icterícia) e palidez podem indicar que a anemia está mais forte — vale uma consulta.',
            'Criança pequena com a barriga inchando de repente (baço aumentado) precisa de atendimento urgente.',
            'Em homens, ereção dolorida que não passa (mais de 4 horas) é emergência — procure o hospital imediatamente, não espere.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Beba bastante água todos os dias — a desidratação é um dos principais gatilhos de crise de dor.',
            'Evite ficar muito tempo no frio intenso e evite esforço físico muito pesado sem preparo — ambos podem provocar crises.',
            'Se toma remédio contínuo (como hidroxiureia), não pare por conta própria, mesmo se estiver se sentindo bem — ele ajuda a prevenir crises mesmo quando você não sente nada.',
            'Mantenha as vacinas em dia — pessoas com anemia falciforme têm risco maior de infecções graves, então estar vacinado(a) é uma proteção extra importante.',
            'Se seu filho(a) tem anemia falciforme e tem menos de 5 anos, o uso diário de penicilina (conforme orientação médica) ajuda a prevenir infecções graves — é um cuidado simples, mas que salva vidas.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'Todo bebê faz o "teste do pezinho" nos primeiros dias de vida — é assim que a anemia falciforme costuma ser descoberta no Brasil. Se seu filho(a) tem o diagnóstico, procure a Unidade Básica de Saúde (UBS) da sua região para ser encaminhado(a) ao acompanhamento com hematologia.',
            'Para dor forte ou febre, vá à UBS mais próxima ou, se for fora do horário ou a dor for muito intensa, procure a UPA (Unidade de Pronto Atendimento) ou pronto-socorro.',
            'Use a página "Rede SUS" desta plataforma para encontrar as unidades de saúde mais próximas de você no Distrito Federal.',
            'A ABRADFAL (Associação Brasiliense das Pessoas com Doença Falciforme) é parceira deste projeto e pode oferecer apoio, informação e acolhimento entre pessoas que vivem a mesma realidade.',
          ],
        },
      ],
    },
  },

  sources: [
    {
      label: 'ABRADFAL',
      detail: 'Associação Brasiliense das Pessoas com Doença Falciforme — parceria técnica de conteúdo e curadoria clínica.',
    },
    {
      label: 'Ministério da Saúde — PCDT Doença Falciforme',
      detail: 'Protocolo Clínico e Diretrizes Terapêuticas vigente, referência normativa para a conduta no SUS.',
    },
    {
      label: 'Programa Nacional de Triagem Neonatal',
      detail: '"Teste do pezinho" — diagnóstico precoce padrão no Brasil, base da identificação neonatal da doença falciforme.',
    },
    {
      label: 'NHLBI / American Society of Hematology',
      detail: 'Diretrizes internacionais de manejo clínico baseado em evidência, usadas como referência complementar.',
    },
  ],
};

// ============================================================================
// ESPANHOL — tradução integral e revisão terminológica clínica (Fase 3.2)
// ============================================================================
const anemiaFalciformeContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,

  audiences: {
    // ==================== MÉDICOS Y PERSONAL INVESTIGADOR ===================
    medico: {
      summary:
        'Fisiopatología, diagnóstico diferencial, conductas clínicas y evidencia actualizada para la práctica médica y la investigación en enfermedad falciforme (EF).',
      sections: [
        {
          heading: 'Qué es — fisiopatología',
          body: [
            'La enfermedad falciforme (EF) es una hemoglobinopatía hereditaria autosómica recesiva causada por una mutación puntual en el gen de la beta-globina (HBB), en el cromosoma 11 (sustitución de ácido glutámico por valina en la posición 6 de la cadena beta — GAG→GTG), que da lugar a la hemoglobina S (HbS).',
            'En condiciones de baja tensión de oxígeno, acidosis o deshidratación, la HbS polimeriza, deformando el glóbulo rojo en forma de hoz (drepanocito). Estas células rígidas y poco deformables provocan vasoclusión microvascular, hemólisis extravascular e intravascular crónica, inflamación endotelial sostenida y un estado de hipercoagulabilidad — la tríada fisiopatológica central (vasoclusión, hemólisis, inflamación) que explica la mayoría de las manifestaciones clínicas.',
            'Genotipos clínicamente relevantes: HbSS (forma más grave, "anemia de células falciformes" en sentido estricto), HbSC, HbS/beta-talasemia (S-beta-cero y S-beta-más) y el rasgo falciforme heterocigoto HbAS (portador asintomático en la mayoría de los casos, aunque no exento de riesgo en situaciones extremas de hipoxia/ejercicio intenso — se han descrito rabdomiólisis y muerte súbita por esfuerzo extremo, aunque son raras).',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'La EF es la enfermedad monogénica más prevalente en Brasil, con una incidencia estimada de 1:1.000 a 1:1.400 nacidos vivos, y una prevalencia del rasgo falciforme (HbAS) de alrededor del 2% en la población general — llegando al 6-10% en poblaciones afrodescendientes de algunas regiones, lo que refleja el origen de la mutación como una probable ventaja selectiva histórica contra la malaria (heterocigoto protegido) en el África subsahariana.',
            'Por su distribución genética vinculada a la ascendencia africana, la EF es un marcador directo de cómo el racismo estructural se traduce en inequidad en salud: subdiagnóstico, retraso en el inicio del tratamiento, descrédito del dolor relatado por pacientes negros (sesgo documentado en la literatura internacional de manejo del dolor) y menor inversión histórica en investigación comparada con condiciones de prevalencia similar en poblaciones mayoritariamente blancas.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'Cribado neonatal universal (Programa Nacional de Cribado Neonatal / "prueba del talón", normativa del Ministerio de Salud de Brasil) mediante electroforesis en pH alcalino o HPLC — estándar de referencia para la confirmación diagnóstica, complementado con estudio familiar cuando esté indicado.',
            'El diagnóstico diferencial incluye otras hemoglobinopatías (HbC, HbD-Punjab, talasemias), anemias hemolíticas de otras etiologías y, en la crisis aguda, abdomen agudo quirúrgico, osteomielitis y artritis séptica (importante en niños con dolor óseo y fiebre).',
            'Seguimiento de laboratorio de rutina: hemograma completo con reticulocitos, LDH, bilirrubina indirecta, función renal (la nefropatía falciforme está subdiagnosticada), ecografía transcraneal con Doppler en niños (cribado de riesgo de ictus isquémico) y evaluación cardiopulmonar periódica (ecocardiograma para hipertensión pulmonar, función respiratoria).',
          ],
        },
        {
          heading: 'Tratamiento y conductas',
          body: [
            'La hidroxiurea es la terapia modificadora de la enfermedad de primera línea, disponible en el SUS (sistema público de salud de Brasil) — aumenta la HbF (hemoglobina fetal), reduciendo la frecuencia de crisis vasoclusivas y del síndrome torácico agudo; requiere monitorización hematológica (riesgo de mielosupresión) y ajuste de dosis individualizado.',
            'La profilaxis con penicilina oral hasta los 5 años (riesgo aumentado de sepsis por S. pneumoniae debido a asplenia funcional) y un esquema de vacunación ampliado (neumocócica conjugada y polisacárida, meningocócica, Haemophilus influenzae tipo b) son conductas estándar en niños con HbSS/S-beta-cero.',
            'Manejo de la crisis vasoclusiva: hidratación, analgesia multimodal y escalonada (incluyendo opioides cuando esté indicado — vigilancia activa contra el subtratamiento del dolor por sesgo racial), oxigenoterapia si hay hipoxemia, e investigación de desencadenantes/complicaciones asociadas.',
            'La transfusión crónica (programa de hipertransfusión o exanguinotransfusión parcial) está indicada en la prevención secundaria de ictus, síndrome torácico agudo grave y otras complicaciones graves recurrentes; requiere vigilancia de la sobrecarga de hierro (quelación) y de la aloinmunización.',
            'Terapias emergentes: voxelotor (inhibidor de la polimerización de la HbS), crizanlizumab (anti-P-selectina, reducción de crisis vasoclusivas), L-glutamina oral, y terapia génica (edición genética — exa-cel/Casgevy, lovotibeglogene autotemcel) ya aprobadas en otras jurisdicciones, con discusión en curso sobre su incorporación al SUS — seguir el PCDT (Protocolo Clínico y Directrices Terapéuticas) vigente del Ministerio de Salud de Brasil.',
            'El trasplante alogénico de células progenitoras hematopoyéticas (TCPH) sigue siendo la única modalidad curativa establecida, reservada para casos graves con donante compatible, dado el riesgo de morbimortalidad del procedimiento.',
          ],
        },
        {
          heading: 'Cuándo referir / signos de alarma clínica',
          body: [
            'La fiebre ≥38°C en un paciente con EF es una urgencia hasta que se demuestre lo contrario (riesgo de sepsis por asplenia funcional) — hemocultivo y antibioticoterapia empírica precoz.',
            'El síndrome torácico agudo (nuevo infiltrado radiológico + fiebre/dolor torácico/hipoxemia) es la principal causa de muerte en adultos con EF — manejo hospitalario agresivo, soporte respiratorio y considerar exanguinotransfusión.',
            'Un déficit neurológico focal agudo (incluso transitorio) exige investigación inmediata de ictus — mayor riesgo en niños con HbSS; el cribado con Doppler transcraneal permite la prevención primaria mediante transfusión crónica.',
            'El priapismo de más de 4 horas, el secuestro esplénico agudo (niño pequeño, esplenomegalia súbita + caída de Hb) y la crisis aplásica (generalmente por parvovirus B19) son urgencias que exigen intervención inmediata.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Protocolo Clínico y Directrices Terapéuticas (PCDT) de la Enfermedad Falciforme, Ministerio de Salud de Brasil — referencia normativa para la conducta en el SUS.',
            'La colaboración técnica con ABRADFAL (Asociación Brasiliense de Personas con Enfermedad Falciforme) fundamenta la curaduría y revisión de este contenido junto con el App Sentinela.',
            'La literatura internacional consolidada (NHLBI Evidence-Based Management of Sickle Cell Disease; directrices de la American Society of Hematology) orienta las conductas descritas anteriormente — siempre cotejar con el protocolo institucional local.',
          ],
        },
      ],
    },

    // ================== ENFERMERÍA Y PERSONAL TÉCNICO =======================
    enfermeiro: {
      summary:
        'Cribado, manejo de crisis, cuidado continuo y orientación al paciente/familia — contenido clínico de nivel intermedio para la rutina de enfermería en Atención Primaria y en urgencias/emergencias.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La enfermedad falciforme es una condición genética hereditaria (no es contagiosa, no es "contaminación") en la que los glóbulos rojos, en lugar de mantener la forma redondeada normal, pueden adoptar forma de hoz bajo ciertas condiciones (falta de oxígeno, deshidratación, frío, esfuerzo físico intenso, infección).',
            'Estos glóbulos en forma de hoz son más rígidos y "obstruyen" vasos sanguíneos pequeños, causando dolor (crisis) y, con el tiempo, daño a órganos como el bazo, los riñones, los pulmones y los huesos. La persona con EF también tiene anemia crónica, porque estos glóbulos se rompen (se hemolizan) más rápido de lo normal.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'Dolor agudo e intenso, generalmente en huesos largos, pecho, abdomen o articulaciones — es el motivo más común de búsqueda de atención, llamado "crisis de dolor" o "crisis vasoclusiva". La intensidad relatada por el paciente siempre debe tomarse en serio: las personas negras históricamente han tenido su dolor subestimado y subtratado en el sistema de salud — es un sesgo que debe combatirse activamente en la clasificación de riesgo (triage).',
            'La palidez, la ictericia (ojos/piel amarillentos), el cansancio desproporcionado y la falta de aire pueden indicar un empeoramiento de la anemia o un secuestro esplénico (en niños pequeños).',
            'La fiebre en una persona con EF NUNCA debe minimizarse — clasificar como prioridad alta/roja en la recepción, ya que puede ser señal de una infección grave (el bazo generalmente no funciona bien en estas personas, lo que aumenta el riesgo de infecciones graves).',
            'La falta de aire asociada a dolor en el pecho y fiebre puede ser un síndrome torácico agudo, una complicación grave que necesita evaluación médica inmediata.',
            'En hombres, una erección dolorosa prolongada (priapismo, más de 4 horas) es una urgencia urológica — orientar la búsqueda inmediata de atención.',
          ],
        },
        {
          heading: 'Quién debe estar atento — grupos de riesgo y seguimiento',
          body: [
            'Todo niño debe tener verificado el resultado de la "prueba del talón" — es así como la EF suele identificarse en Brasil, en los primeros días de vida. Los niños diagnosticados necesitan seguimiento regular, vacunación al día (incluyendo vacunas adicionales recomendadas) y, hasta los 5 años, uso continuo de penicilina para prevenir infecciones graves — reforzar la adherencia con la familia en cada contacto.',
            'Los adultos con EF necesitan seguimiento hematológico regular, incluso en períodos sin crisis — la enfermedad sigue "trabajando" silenciosamente en los órganos.',
            'Las personas con rasgo falciforme (que tienen el "gen", pero no la enfermedad) generalmente no presentan síntomas, pero deben saber informarlo en situaciones de ejercicio físico extremo, deshidratación severa o altitud elevada, y es información relevante para la planificación familiar (riesgo de tener un hijo con la enfermedad si la pareja también tiene el rasgo).',
          ],
        },
        {
          heading: 'Manejo de la crisis de dolor — qué hacer en la unidad',
          body: [
            'Recibir rápidamente, clasificar el riesgo considerando el antecedente de EF como factor automático de atención prioritaria, e iniciar hidratación (oral si se tolera, intravenosa si es necesario) lo antes posible.',
            'Seguir el protocolo de analgesia escalonada de la unidad sin demora — las crisis de dolor falciforme exigen un control rápido y eficaz del dolor; no es "drama" ni "búsqueda de medicamento controlado", es una manifestación directa de la enfermedad.',
            'Observar los signos vitales, la saturación de oxígeno y la temperatura con frecuencia — aplicar oxígeno si hay caída de la saturación.',
            'Registrar y comunicar inmediatamente al equipo médico cualquier señal de alarma: fiebre, dificultad respiratoria, dolor torácico, alteración neurológica (habla, fuerza, visión), priapismo o bazo muy aumentado en un niño.',
          ],
        },
        {
          heading: 'Cuidado continuo y orientación al paciente/familia',
          body: [
            'Reforzar la hidratación adecuada en el día a día, evitar la exposición al frío intenso y a esfuerzos físicos extremos sin preparación, y buscar atención temprana ante fiebre — son las orientaciones de autocuidado más efectivas para reducir las crisis.',
            'Orientar sobre la importancia de no interrumpir la hidroxiurea (cuando esté prescrita) sin orientación médica, incluso en períodos sin síntomas — es un tratamiento continuo, no "de crisis".',
            'Apoyar psicosocialmente: la EF es una enfermedad crónica, dolorosa y muchas veces invisibilizada; la atención humanizada del equipo de enfermería es determinante para la adherencia al tratamiento y para la confianza en el sistema de salud.',
            'Derivar a la Red SUS local (ver la página "Red SUS" de esta plataforma) para vincular con hematología de referencia, servicio social y, cuando sea pertinente, con ABRADFAL (asociación de pacientes, socia técnica de este proyecto).',
          ],
        },
      ],
    },

    // =============================== USUARIOS ================================
    usuario: {
      summary:
        'Qué es la anemia falciforme, señales de alerta, cuidados del día a día y dónde buscar ayuda en el SUS — en lenguaje simple y directo.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La anemia falciforme (también llamada enfermedad falciforme) es una enfermedad de la sangre con la que la persona ya nace — transmitida por los padres, en la "sangre" (genes). No es una enfermedad contagiosa: no se "contagia" de nadie.',
            'En la anemia falciforme, los glóbulos rojos de la sangre (que llevan oxígeno al cuerpo) pueden cambiar de forma: en lugar de ser redonditos, se parecen a una hoz (luna creciente). Estos glóbulos en forma de hoz obstruyen vasos sanguíneos pequeños, lo que causa dolores fuertes y puede dañar órganos del cuerpo con el tiempo.',
            'Es la enfermedad genética más común en Brasil, y es mucho más frecuente entre personas negras — por eso es un tema tan importante para nuestra comunidad.',
          ],
        },
        {
          heading: 'Por qué esto importa',
          body: [
            'Quien tiene anemia falciforme puede tener una vida larga y de calidad con seguimiento médico regular, los medicamentos correctos y cuidados simples en el día a día. El problema no es que la enfermedad "no tenga solución" — es el retraso en el diagnóstico, el prejuicio, y que el dolor de la persona no sea tomado en serio en las atenciones de salud.',
            'Históricamente, el dolor de las personas negras es más desacreditado en los hospitales. Esto es un tipo de racismo institucional que cuesta vidas — y es algo que esta plataforma existe para combatir.',
          ],
        },
        {
          heading: 'Señales de alerta — esté atento(a)',
          body: [
            'Dolor fuerte y repentino en huesos, barriga, pecho o articulaciones — es la llamada "crisis de dolor" y es la señal más común. Nunca lo minimice: busque atención.',
            'La fiebre siempre es una señal de alerta en una persona con anemia falciforme — aunque parezca "solo una febrecita", busque la Unidad Básica de Salud (UBS) o emergencia el mismo día.',
            'Cansancio fuera de lo normal, falta de aire, ojos o piel amarillentos (ictericia) y palidez pueden indicar que la anemia está más fuerte — vale la pena una consulta.',
            'Un niño pequeño con la barriga hinchándose de repente (bazo aumentado) necesita atención urgente.',
            'En hombres, una erección dolorida que no pasa (más de 4 horas) es una emergencia — busque el hospital inmediatamente, no espere.',
          ],
        },
        {
          heading: 'Cuidados del día a día',
          body: [
            'Beba suficiente agua todos los días — la deshidratación es uno de los principales desencadenantes de la crisis de dolor.',
            'Evite estar mucho tiempo con frío intenso y evite el esfuerzo físico muy pesado sin preparación — ambos pueden provocar crisis.',
            'Si toma un medicamento continuo (como hidroxiurea), no lo suspenda por cuenta propia, aunque se sienta bien — ayuda a prevenir crisis incluso cuando usted no siente nada.',
            'Mantenga las vacunas al día — las personas con anemia falciforme tienen mayor riesgo de infecciones graves, por lo que estar vacunado(a) es una protección extra importante.',
            'Si su hijo(a) tiene anemia falciforme y tiene menos de 5 años, el uso diario de penicilina (según orientación médica) ayuda a prevenir infecciones graves — es un cuidado simple, pero que salva vidas.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'A todo bebé se le hace la "prueba del talón" en los primeros días de vida — así es como la anemia falciforme suele descubrirse en Brasil. Si su hijo(a) tiene el diagnóstico, busque la Unidad Básica de Salud (UBS) de su región para ser derivado(a) al seguimiento con hematología.',
            'Para dolor fuerte o fiebre, vaya a la UBS más cercana o, si es fuera de horario o el dolor es muy intenso, busque la UPA (Unidad de Atención Inmediata) o el servicio de urgencias.',
            'Use la página "Red SUS" de esta plataforma para encontrar las unidades de salud más cercanas a usted en el Distrito Federal.',
            'ABRADFAL (Asociación Brasiliense de Personas con Enfermedad Falciforme) es socia de este proyecto y puede ofrecer apoyo, información y acogida entre personas que viven la misma realidad.',
          ],
        },
      ],
    },
  },

  sources: [
    {
      label: 'ABRADFAL',
      detail: 'Asociación Brasiliense de Personas con Enfermedad Falciforme — colaboración técnica de contenido y curaduría clínica.',
    },
    {
      label: 'Ministerio de Salud de Brasil — PCDT Enfermedad Falciforme',
      detail: 'Protocolo Clínico y Directrices Terapéuticas vigente, referencia normativa para la conducta en el SUS.',
    },
    {
      label: 'Programa Nacional de Cribado Neonatal',
      detail: '"Prueba del talón" — diagnóstico precoz estándar en Brasil, base de la identificación neonatal de la enfermedad falciforme.',
    },
    {
      label: 'NHLBI / American Society of Hematology',
      detail: 'Directrices internacionales de manejo clínico basado en evidencia, usadas como referencia complementaria.',
    },
  ],
};

export const anemiaFalciformeContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: anemiaFalciformeContent_pt,
  es: anemiaFalciformeContent_es,
};
