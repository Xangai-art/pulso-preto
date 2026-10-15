// Conteúdo enriquecido — Diabetes Mellitus (Tipo 1 e Tipo 2)
//
// Segue exatamente o contrato de conteúdo aprofundado definido em
// shared/data/anemiaFalciforme.ts (DiseaseDeepContent): 3 audiências
// (medico/enfermeiro/usuario), cada uma com summary + sections[], heroImage e
// sources — bilíngue PT/ES (Record<LocaleId, DiseaseDeepContent>).
//
// Estrutura editorial alinhada ao framework de 10 seções canônicas da
// Apresentação Institucional ("Modelo de Conteúdo"): O que é / Por que importa
// / Sinais / Quem fica atento / Prevenir / Diagnóstico / Tratamento / Quando ir
// / Onde no SUS / Fontes — adaptadas ao nível de profundidade de cada público.
//
// Recorte racial obrigatório (chamadas anti-racismo) e dado local do DF
// (Estudo Técnico-Científico "Condições de Vida e Saúde da População Negra do
// DF 2015–2024" — AECID/APRECIA/FIOCRUZ/UnB/FEPECS).
//
// Consumido via getDeepContent(diseaseId, localeId) — ver
// site|app/src/data/deepContentRegistry.ts.

import type { LocaleId } from './locales';
import type { DiseaseDeepContent } from './anemiaFalciforme';

const heroImage_pt = {
  url: 'https://sspark.genspark.ai/i/fhNaPFo6WtBOQSHf?width=2560',
  alt: 'Pessoa medindo a glicemia capilar com glicosímetro e fita reagente no dedo',
  credit: 'Imagem placeholder (CC/PD) — substituir por material próprio se necessário',
  isPlaceholder: true as const,
};

const heroImage_es = {
  url: 'https://sspark.genspark.ai/i/fhNaPFo6WtBOQSHf?width=2560',
  alt: 'Persona midiendo la glucemia capilar con glucómetro y tira reactiva en el dedo',
  credit: 'Imagen de relleno (CC/PD) — sustituir por material propio si es necesario',
  isPlaceholder: true as const,
};

const diabetesContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,
  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Fisiopatologia do diabetes tipo 1 e tipo 2, critérios diagnósticos, racional terapêutico e evidência sobre disparidades raciais em prevalência, complicações e controle glicêmico.',
      sections: [
        {
          heading: 'O que é — fisiopatologia',
          body: [
            'O diabetes mellitus é um grupo de doenças metabólicas caracterizado por hiperglicemia crônica decorrente de defeitos na secreção de insulina, na ação da insulina ou em ambas. O diabetes tipo 1 (DM1) resulta de destruição autoimune das células beta pancreáticas, levando à deficiência absoluta de insulina; o tipo 2 (DM2) resulta de resistência à insulina associada a progressiva falência secretória das células beta.',
            'Mecanismos relevantes na população negra incluem maior resistência à insulina, maior adiposidade visceral para o mesmo IMC, menor capacidade de compensação da célula beta, padrões alimentares influenciados por insegurança alimentar e ambiente obesogênico, além de determinantes sociais (estresse crônico, sono, acesso a alimentos frescos) que aceleram a progressão.',
            'Complicações microvasculares (retinopatia, nefropatia, neuropatia) e macrovasculares (infarto, AVC, doença arterial periférica) são o que confere gravidade à doença — e o controle glicêmico precoce e sustentado é o principal modulador de risco. A coexistência com hipertensão e doença renal (frequentemente associada a variantes do gene APOL1) agrava o prognóstico.',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'A prevalência do diabetes tipo 2 é substancialmente maior em pessoas negras, que também apresentam diagnóstico mais precoce, pior controle glicêmico e maior taxa de complicações (nefropatia terminal, amputações e cegueira por retinopatia) em comparação à população branca, mesmo com acesso equivalente ao cuidado.',
            'Essas disparidades refletem a combinação de biologia, determinantes sociais e viés institucional no manejo. O racismo estrutural atua como expositor crônico (allostatic load), e o subdiagnóstico/triagem tardia amplia o tempo de exposição à hiperglicemia.',
            'No Distrito Federal, o diabetes caiu do 3º lugar (2014) para o 8º lugar (2024) entre as causas de morte — o que pode indicar melhora no controle (acesso a insulina e antidiabéticos pelo SUS) ou subnotificação como causa associada. O dado ainda não está estratificado por raça/cor no boletim agregado, o que limita a leitura de equidade e deve orientar a priorização da estratificação racial nos registros.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'Critérios diagnósticos (Ministério da Saúde / SBD / ADA): glicemia de jejum ≥ 126 mg/dL; glicemia de 2h no teste oral de tolerância à glicose ≥ 200 mg/dL; hemoglobina glicada (HbA1c) ≥ 6,5%; ou glicemia ao acaso ≥ 200 mg/dL com sintomas clássicos (poliúria, polidipsia, perda de peso). Na ausência de hiperglicemia inequívoca, confirmar com segunda dosagem.',
            'Pré-diabetes (glicemia de jejum 100–125 mg/dL, TOTG 140–199 mg/dL ou HbA1c 5,7–6,4%) deve motivar intervenção em estilo de vida e seguimento — é a janela de maior potencial preventivo.',
            'DM1 deve ser suspeitado em quadro de hiperglicemia com cetose, início agudo, em crianças/adolescentes ou adultos jovens, e confirmado com autoanticorpos (anti-GAD, anti-IA2, anti-ZnT8, anti-insulina) e peptídeo C quando disponível. O rastreio de DM2 deve ser mais precoce e repetido com maior frequência na população negra e em grupos com sobrepeso/obesidade, histórico familiar e hipertensão.',
          ],
        },
        {
          heading: 'Tratamento e condutas',
          body: [
            'Metas individualizadas de HbA1c (usualmente < 7% para a maioria dos adultos, mais flexíveis em idosos/frágeis e mais estritas em jovens sem comorbidade). O manejo combina mudança de estilo de vida, terapia farmacológica escalonada e controle rigoroso de pressão arterial e lipídios.',
            'No DM2, a escolha do antidiabético deve ser guiada por comorbidades: iSGLT2 e agonistas de GLP-1 têm benefício cardio-renal comprovado (especialmente relevantes diante do maior risco de nefropatia na população negra); metformina permanece primeira linha na maioria dos casos. A insulina é indicada conforme a falência progressiva da célula beta.',
            'No DM1, a terapia é insulina em esquema basal-bolus (ou bomba) com monitorização glicêmica; o acesso a análogos de insulina, monitores de glicose (CGM) e sistemas de infusão é direito e impacta diretamente o desfecho — barreiras de acesso a essa tecnologia aprofundam a disparidade racial.',
            'Ponto crítico de equidade: não atribuir controle inadequado à "não adesão" presumida sem investigar acesso a medicamentos, insumos de monitorização, insegurança alimentar, transporte e carga psicossocial. Esses fatores são frequentes e modificáveis, e a falha em reconhecê-los reproduz racismo institucional na prática clínica.',
          ],
        },
        {
          heading: 'Quando referenciar / sinais de alarme clínico',
          body: [
            'Emergências metabólicas — cetoacidose diabética (DM1/DM2) e estado hiperglicêmico hiperosmolar (DM2) — exigem atendimento hospitalar imediato com hidratação, insulina e correção de distúrbios eletrolíticos.',
            'Hipoglicemia grave (rebaixamento de consciência, convulsão) é emergência; revisar esquema, técnica de aplicação e acesso a monitorização.',
            'Encaminhar a especialista conforme necessidade: oftalmologia (rastreio anual de retinopatia), nefrologia (TFG reduzida/albuminúria), cardiologia (doença cardiovascular), vascular (pé diabético/doença arterial periférica), endocrinologia (controle complexo ou DM1), nutrição e equipe multiprofissional. Úlceras, infecções e deformidades nos pés exigem avaliação vascular e de enfermagem especializada.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Diretrizes da Sociedade Brasileira de Diabetes (SBD) — referência nacional para diagnóstico e tratamento.',
            'Protocolo Clínico e Diretrizes Terapêuticas (PCDT) de Diabetes Mellitus — Ministério da Saúde.',
            'American Diabetes Association (ADA) — Standards of Care, referência internacional baseada em evidência.',
            'Estudo Técnico-Científico "Condições de Vida e Saúde da População Negra do DF (2015–2024)" — AECID/APRECIA/FIOCRUZ/UnB/FEPECS.',
          ],
        },
      ],
    },

    // ======================= ENFERMEIROS E TÉCNICOS =======================
    enfermeiro: {
      summary:
        'Triagem e rastreio, orientação de autocuidado, prevenção do pé diabético e cuidado continuado de pessoas com diabetes na Atenção Básica e na urgência.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'O diabetes é uma doença crônica em que o corpo não produz insulina suficiente ou não consegue usá-la bem, fazendo o açúcar (glicose) do sangue ficar alto. Sem controle, ao longo do tempo, o excesso de açúcar machuca vasos e nervos de todo o corpo.',
            'É uma das condições mais frequentes na Atenção Básica e uma das que mais se beneficiam de acompanhamento contínuo, educação em saúde e vínculo de confiança entre equipe e usuário.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'Sintomas clássicos de hiperglicemia: muita sede, urinar muito (inclusive à noite), perda de peso sem explicação, cansaço, visão embaçada, feridas que não cicatrizam e infecções de repetição (candidíase, pele, urina).',
            'Sinais de alarme que exigem avaliação médica imediata: respiração rápida e profunda, hálito com cheiro de fruta, vômitos, dor abdominal, sonolência/confusão e desidratação — podem indicar cetoacidose ou estado hiperosmolar.',
            'Sinais de hipoglicemia: suor frio, tremor, palidez, fome súbita, taquicardia, confusão e, em casos graves, perda de consciência — oriente o usuário a reconhecer e a agir (regra dos 15 g de carboidrato rápido).',
          ],
        },
        {
          heading: 'Rastreio e acompanhamento na Atenção Básica',
          body: [
            'Priorize o rastreio de glicemia em pessoas negras, com sobrepeso/obesidade, hipertensão, histórico familiar de diabetes, história de diabetes gestacional e maiores de 35 anos — a população negra tende a desenvolver a doença mais cedo e com mais complicações.',
            'No acompanhamento, verifique a cada visita: glicemia de jejum/HbA1c conforme protocolo, pressão arterial, peso, perímetro abdominal, exame dos pés (inspeção, sensibilidade com monofilamento, pulsos) e revisão do uso correto dos medicamentos.',
            'Garanta a organização do cuidado: busca ativa de faltosos, agendamento do rastreio de retinopatia (fundoscopia) e da avaliação de função renal (creatinina/TFG e relação albumina/creatinina), vacinação e articulação com a equipe multiprofissional (nutrição, psicologia, educação física, odontologia).',
          ],
        },
        {
          heading: 'Quem fica atento — grupos de risco',
          body: [
            'Grupos que exigem atenção redobrada: pessoas negras, com sobrepeso/obesidade, hipertensão, dislipidemia, histórico familiar de diabetes, diabetes gestacional prévia, síndrome dos ovários policísticos, uso de medicamentos hiperglicemiantes (corticoide) e pessoas em insegurança alimentar.',
            'Gestantes: rastrear diabetes gestacional no pré-natal (TOTG entre 24 e 28 semanas, ou antes em alto risco) — o cuidado adequado reduz desfechos maternos e neonatais. Gestantes negras merecem vigilância reforçada, dado o maior risco de desfechos adversos.',
            'Pessoas com diabetes e sinais de sofrimento psíquico: a depressão e o "burnout do diabetes" são comuns e prejudicam o autocuidado — acolha e articule com saúde mental.',
          ],
        },
        {
          heading: 'Cuidado continuado e orientação ao paciente/família',
          body: [
            'Explique, em linguagem simples, que o diabetes tem controle — mas não tem cura — e que o tratamento é contínuo, mesmo quando a pessoa se sente bem. Ensine o manejo básico: alimentação, atividade física, medicação e monitorização glicêmica.',
            'Oriente o cuidado com os pés (exame diário, hidratação, calçado adequado, nunca andar descalço), o reconhecimento de hipoglicemia e o que fazer em situações de risco. Reforce a importância de comparecer às consultas e de retirar os medicamentos regularmente na farmácia.',
            'Chamada anti-racista: quando o controle glicêmico de uma pessoa negra não melhora, não presuma "falta de adesão" — investigue acesso a medicamentos e insumos, insegurança alimentar, custo do transporte, efeitos adversos e carga psicossocial. Historicamente, pacientes negros têm o autocuidado julgado com mais rigor e recebem menos tecnologia (análogos de insulina, monitores). É um viés a ser combatido ativamente na prática clínica.',
          ],
        },
      ],
    },

    // ============================== USUÁRIOS ===============================
    usuario: {
      summary:
        'O que é diabetes, por que é tão importante para a população negra, sinais de alerta, cuidados do dia a dia e onde buscar ajuda no SUS.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'Diabetes é uma doença em que o açúcar do sangue (glicose) fica alto demais. Isso acontece porque o corpo não produz insulina suficiente ou não consegue usá-la direito. A insulina é o "porteiro" que coloca o açúcar para dentro das células e dá energia ao corpo.',
            'Quando esse açúcar sobra no sangue por muito tempo, ele vai machucando, aos poucos, o coração, os olhos, os rins, os nervos e os pés. É uma doença crônica: a pessoa vive com ela, mas pode controlá-la muito bem.',
          ],
        },
        {
          heading: 'Por que isso importa',
          body: [
            'A população negra tem mais chance de ter diabetes tipo 2, costuma adoecer mais cedo e desenvolver mais complicações. Isso não é "sorte" nem culpa: tem a ver com genética, com alimentação, com o estresse do racismo no dia a dia e com acesso desigual a médico, remédio e exames.',
            'A boa notícia: dá para controlar. Com diagnóstico precoce, acompanhamento na UBS, alimentação adequada, atividade física e uso correto dos remédios, é possível viver bem e evitar as complicações mais graves.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Procure a UBS se você tiver: muita sede, vontade de urinar muito (inclusive à noite), perda de peso sem explicação, cansaço, visão embaçada ou feridas que demoram a cicatrizar. Esses podem ser sinais de diabetes.',
            'Vá imediatamente à UPA/pronto-socorro se houver: respiração rápida e profunda, hálito com cheiro de fruta, vômitos, dor na barriga, sonolência ou confusão. Isso pode ser uma emergência do diabetes.',
            'Aprenda a reconhecer a hipoglicemia (açúcar baixo): suor frio, tremor, palidez, fome de repente, tontura. Nesses casos, tome rápido um pouco de açúcar (um copo de suco, uma colher de mel) e avise alguém.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Tome os remédios (ou a insulina) todos os dias, no horário certo, mesmo se sentir bem. Nunca pare por conta própria — se algum remédio não estiver disponível na farmácia, avise a equipe da UBS.',
            'Cuide da alimentação: reduza açúcar, refrigerantes e ultraprocessados; prefira comida de verdade — feijão, arroz, verduras, legumes, frutas e carnes com pouca gordura. Não precisa ser perfeito: pequenas mudanças constantes já ajudam muito.',
            'Mexa-se: caminhar, dançar, subir escadas. Qualquer atividade regular ajuda a controlar o açúcar no sangue.',
            'Cuide dos pés todos os dias: observe feridas, bolhas ou vermelhidão, hidrate (sem passar entre os dedos) e use calçado fechado e confortável. Nunca ande descalço. Uma ferida no pé do diabético precisa de atenção rápida.',
            'Vá às consultas e faça os exames de rotina (glicemia, hemoglobina glicada, olhos e rins). O exame de fundo de olho e o de urina são importantes para pegar problemas cedo, antes de virarem graves.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'A Unidade Básica de Saúde (UBS) é o lugar certo para acompanhar o diabetes, pegar os medicamentos (inclusive insulina) e receber orientação com a equipe. O tratamento do diabetes é gratuito no SUS.',
            'Se houver sinais graves (respiração alterada, vômitos, confusão, hipoglicemia grave), procure a UPA ou o pronto-socorro imediatamente ou ligue 192 (SAMU).',
            'Use a página "Rede SUS" desta plataforma para encontrar as unidades de saúde mais próximas de você no Distrito Federal. Grupos de apoio e educação em diabetes na UBS ajudam muito no autocuidado.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Sociedade Brasileira de Diabetes (SBD)',
      detail: 'Diretrizes da SBD — referência nacional para diagnóstico e tratamento do diabetes.',
    },
    {
      label: 'Ministério da Saúde — PCDT Diabetes Mellitus',
      detail: 'Protocolo Clínico e Diretrizes Terapêuticas vigente, referência normativa para a conduta no SUS.',
    },
    {
      label: 'Estudo Pop. Negra DF 2015–2024',
      detail: 'AECID/APRECIA/FIOCRUZ/UnB/FEPECS — Indicador 14 (diabetes como causa de morte: 3º lugar em 2014 → 8º em 2024; estratificação racial pendente).',
    },
    {
      label: 'American Diabetes Association (ADA)',
      detail: 'Standards of Care in Diabetes — referência internacional baseada em evidência, usada de forma complementar.',
    },
  ],
};

const diabetesContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,
  audiences: {
    // ==================== MÉDICOS Y PERSONAL INVESTIGADOR ===================
    medico: {
      summary:
        'Fisiopatología de la diabetes tipo 1 y tipo 2, criterios diagnósticos, fundamento terapéutico y evidencia sobre disparidades raciales en prevalencia, complicaciones y control glucémico.',
      sections: [
        {
          heading: 'Qué es — fisiopatología',
          body: [
            'La diabetes mellitus es un grupo de enfermedades metabólicas caracterizado por hiperglucemia crónica derivada de defectos en la secreción de insulina, en la acción de la insulina o en ambas. La diabetes tipo 1 (DM1) resulta de la destrucción autoinmune de las células beta pancreáticas, lo que lleva a la deficiencia absoluta de insulina; el tipo 2 (DM2) resulta de resistencia a la insulina asociada a una progresiva falla secretora de las células beta.',
            'Los mecanismos relevantes en la población negra incluyen mayor resistencia a la insulina, mayor adiposidad visceral para el mismo IMC, menor capacidad de compensación de la célula beta, patrones alimentarios influidos por la inseguridad alimentaria y un entorno obesogénico, además de determinantes sociales (estrés crónico, sueño, acceso a alimentos frescos) que aceleran la progresión.',
            'Las complicaciones microvasculares (retinopatía, nefropatía, neuropatía) y macrovasculares (infarto, ictus, enfermedad arterial periférica) son lo que confiere gravedad a la enfermedad — y el control glucémico precoz y sostenido es el principal modulador del riesgo. La coexistencia con hipertensión y enfermedad renal (frecuentemente asociada a variantes del gen APOL1) agrava el pronóstico.',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'La prevalencia de la diabetes tipo 2 es sustancialmente mayor en personas negras, que también presentan diagnóstico más precoz, peor control glucémico y mayor tasa de complicaciones (nefropatía terminal, amputaciones y ceguera por retinopatía) en comparación con la población blanca, incluso con acceso equivalente al cuidado.',
            'Estas disparidades reflejan la combinación de biología, determinantes sociales y sesgo institucional en el manejo. El racismo estructural actúa como expositor crónico (carga alostática), y el subdiagnóstico/cribado tardío amplía el tiempo de exposición a la hiperglucemia.',
            'En el Distrito Federal, la diabetes pasó del 3.º lugar (2014) al 8.º lugar (2024) entre las causas de muerte — lo que puede indicar mejor control (acceso a insulina y antidiabéticos por el SUS) o subnotificación como causa asociada. El dato aún no está estratificado por raza/color en el boletín agregado, lo que limita la lectura de equidad y debe orientar la priorización de la estratificación racial en los registros.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'Criterios diagnósticos (Ministerio de Salud / SBD / ADA): glucemia en ayunas ≥ 126 mg/dL; glucemia a las 2 h en la prueba oral de tolerancia a la glucosa ≥ 200 mg/dL; hemoglobina glucosilada (HbA1c) ≥ 6,5%; o glucemia al azar ≥ 200 mg/dL con síntomas clásicos (poliuria, polidipsia, pérdida de peso). En ausencia de hiperglucemia inequívoca, confirmar con una segunda medición.',
            'Prediabetes (glucemia en ayunas 100–125 mg/dL, PTOG 140–199 mg/dL o HbA1c 5,7–6,4%) debe motivar intervención en el estilo de vida y seguimiento — es la ventana de mayor potencial preventivo.',
            'La DM1 debe sospecharse ante un cuadro de hiperglucemia con cetosis, inicio agudo, en niños/adolescentes o adultos jóvenes, y confirmarse con autoanticuerpos (anti-GAD, anti-IA2, anti-ZnT8, antiinsulina) y péptido C cuando esté disponible. El cribado de DM2 debe ser más precoz y repetirse con mayor frecuencia en la población negra y en grupos con sobrepeso/obesidad, antecedente familiar e hipertensión.',
          ],
        },
        {
          heading: 'Tratamiento y conductas',
          body: [
            'Metas individualizadas de HbA1c (habitualmente < 7% para la mayoría de los adultos, más flexibles en ancianos/frágiles y más estrictas en jóvenes sin comorbilidad). El manejo combina cambio de estilo de vida, terapia farmacológica escalonada y control riguroso de la presión arterial y los lípidos.',
            'En la DM2, la elección del antidiabético debe guiarse por las comorbilidades: iSGLT2 y agonistas de GLP-1 tienen beneficio cardiorrenal comprobado (especialmente relevantes ante el mayor riesgo de nefropatía en la población negra); la metformina sigue siendo primera línea en la mayoría de los casos. La insulina está indicada conforme a la falla progresiva de la célula beta.',
            'En la DM1, la terapia es insulina en esquema basal-bolus (o bomba) con monitorización glucémica; el acceso a análogos de insulina, monitores de glucosa (CGM) y sistemas de infusión es un derecho e impacta directamente el desenlace — las barreras de acceso a esa tecnología profundizan la disparidad racial.',
            'Punto crítico de equidad: no atribuir el control inadecuado a la "falta de adherencia" presunta sin investigar el acceso a medicamentos, los insumos de monitorización, la inseguridad alimentaria, el transporte y la carga psicosocial. Estos factores son frecuentes y modificables, y la falla en reconocerlos reproduce racismo institucional en la práctica clínica.',
          ],
        },
        {
          heading: 'Cuándo derivar / señales de alarma clínica',
          body: [
            'Urgencias metabólicas — cetoacidosis diabética (DM1/DM2) y estado hiperglucémico hiperosmolar (DM2) — exigen atención hospitalaria inmediata con hidratación, insulina y corrección de los trastornos electrolíticos.',
            'La hipoglucemia grave (deterioro de la conciencia, convulsión) es una urgencia; revisar el esquema, la técnica de aplicación y el acceso a la monitorización.',
            'Derivar a especialista según necesidad: oftalmología (cribado anual de retinopatía), nefrología (TFG reducida/albuminuria), cardiología (enfermedad cardiovascular), vascular (pie diabético/enfermedad arterial periférica), endocrinología (control complejo o DM1), nutrición y equipo multiprofesional. Las úlceras, infecciones y deformidades en los pies exigen evaluación vascular y de enfermería especializada.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Directrices de la Sociedad Brasileña de Diabetes (SBD) — referencia nacional para diagnóstico y tratamiento.',
            'Protocolo Clínico y Directrices Terapéuticas (PCDT) de Diabetes Mellitus — Ministerio de Salud.',
            'American Diabetes Association (ADA) — Standards of Care, referencia internacional basada en evidencia.',
            'Estudio Técnico-Científico "Condiciones de Vida y Salud de la Población Negra del DF (2015–2024)" — AECID/APRECIA/FIOCRUZ/UnB/FEPECS.',
          ],
        },
      ],
    },

    // ====================== ENFERMEROS Y TÉCNICOS ==========================
    enfermeiro: {
      summary:
        'Cribado y seguimiento, orientación del autocuidado, prevención del pie diabético y cuidado continuo de personas con diabetes en la Atención Primaria y en urgencias.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La diabetes es una enfermedad crónica en la que el cuerpo no produce insulina suficiente o no logra usarla bien, haciendo que el azúcar (glucosa) de la sangre se mantenga alta. Sin control, con el tiempo, el exceso de azúcar daña los vasos y los nervios de todo el cuerpo.',
            'Es una de las condiciones más frecuentes en la Atención Primaria y una de las que más se benefician del seguimiento continuo, de la educación en salud y del vínculo de confianza entre el equipo y el usuario.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'Síntomas clásicos de hiperglucemia: mucha sed, orinar mucho (incluso de noche), pérdida de peso sin explicación, cansancio, visión borrosa, heridas que no cicatrizan e infecciones repetidas (candidiasis, piel, orina).',
            'Señales de alarma que exigen evaluación médica inmediata: respiración rápida y profunda, aliento con olor a fruta, vómitos, dolor abdominal, somnolencia/confusión y deshidratación — pueden indicar cetoacidosis o estado hiperosmolar.',
            'Señales de hipoglucemia: sudor frío, temblor, palidez, hambre súbita, taquicardia, confusión y, en casos graves, pérdida de conciencia — oriente al usuario a reconocerlas y actuar (regla de los 15 g de carbohidrato rápido).',
          ],
        },
        {
          heading: 'Cribado y seguimiento en la Atención Primaria',
          body: [
            'Priorice el cribado de glucemia en personas negras, con sobrepeso/obesidad, hipertensión, antecedente familiar de diabetes, antecedente de diabetes gestacional y mayores de 35 años — la población negra tiende a desarrollar la enfermedad más temprano y con más complicaciones.',
            'En el seguimiento, verifique en cada visita: glucemia en ayunas/HbA1c según protocolo, presión arterial, peso, perímetro abdominal, examen de los pies (inspección, sensibilidad con monofilamento, pulsos) y revisión del uso correcto de los medicamentos.',
            'Garantice la organización del cuidado: búsqueda activa de ausentes, programación del cribado de retinopatía (fondo de ojo) y de la evaluación de la función renal (creatinina/TFG y relación albúmina/creatinina), vacunación y articulación con el equipo multiprofesional (nutrición, psicología, educación física, odontología).',
          ],
        },
        {
          heading: 'Quién debe estar atento — grupos de riesgo',
          body: [
            'Grupos que exigen atención redoblada: personas negras, con sobrepeso/obesidad, hipertensión, dislipidemia, antecedente familiar de diabetes, diabetes gestacional previa, síndrome de ovario poliquístico, uso de medicamentos hiperglucemiantes (corticoide) y personas en inseguridad alimentaria.',
            'Gestantes: cribar la diabetes gestacional en el prenatal (PTOG entre las 24 y 28 semanas, o antes en alto riesgo) — el cuidado adecuado reduce los desenlaces maternos y neonatales. Las gestantes negras merecen vigilancia reforzada, dado el mayor riesgo de desenlaces adversos.',
            'Personas con diabetes y señales de sufrimiento psíquico: la depresión y el "burnout de la diabetes" son frecuentes y perjudican el autocuidado — acoja y articule con salud mental.',
          ],
        },
        {
          heading: 'Cuidado continuo y orientación al paciente/familia',
          body: [
            'Explique, en lenguaje sencillo, que la diabetes tiene control — pero no cura — y que el tratamiento es continuo, incluso cuando la persona se siente bien. Enseñe el manejo básico: alimentación, actividad física, medicación y monitorización glucémica.',
            'Oriente el cuidado de los pies (examen diario, hidratación, calzado adecuado, nunca andar descalzo), el reconocimiento de la hipoglucemia y qué hacer en situaciones de riesgo. Refuerce la importancia de asistir a las consultas y de retirar los medicamentos regularmente en la farmacia.',
            'Llamado antirracista: cuando el control glucémico de una persona negra no mejora, no presuma "falta de adherencia" — investigue el acceso a medicamentos e insumos, la inseguridad alimentaria, el costo del transporte, los efectos adversos y la carga psicosocial. Históricamente, a los pacientes negros se les juzga el autocuidado con más rigor y reciben menos tecnología (análogos de insulina, monitores). Es un sesgo que debe combatirse activamente en la práctica clínica.',
          ],
        },
      ],
    },

    // ============================== USUARIOS ===============================
    usuario: {
      summary:
        'Qué es la diabetes, por qué es tan importante para la población negra, señales de alerta, cuidados diarios y dónde buscar ayuda en el SUS.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La diabetes es una enfermedad en la que el azúcar de la sangre (glucosa) se mantiene demasiado alta. Esto ocurre porque el cuerpo no produce insulina suficiente o no logra usarla bien. La insulina es el "portero" que introduce el azúcar en las células y da energía al cuerpo.',
            'Cuando ese azúcar sobra en la sangre durante mucho tiempo, va dañando, poco a poco, el corazón, los ojos, los riñones, los nervios y los pies. Es una enfermedad crónica: la persona vive con ella, pero puede controlarla muy bien.',
          ],
        },
        {
          heading: 'Por qué importa',
          body: [
            'La población negra tiene más probabilidad de tener diabetes tipo 2, suele enfermar más temprano y desarrollar más complicaciones. Esto no es "suerte" ni culpa: tiene que ver con la genética, con la alimentación, con el estrés del racismo en el día a día y con el acceso desigual a médico, medicamentos y exámenes.',
            'La buena noticia: se puede controlar. Con diagnóstico precoz, seguimiento en la UBS, alimentación adecuada, actividad física y uso correcto de los medicamentos, es posible vivir bien y evitar las complicaciones más graves.',
          ],
        },
        {
          heading: 'Señales de alerta — mantente atento(a)',
          body: [
            'Acude a la UBS si tienes: mucha sed, ganas de orinar mucho (incluso de noche), pérdida de peso sin explicación, cansancio, visión borrosa o heridas que tardan en cicatrizar. Estas pueden ser señales de diabetes.',
            'Acude de inmediato a urgencias si hay: respiración rápida y profunda, aliento con olor a fruta, vómitos, dolor de barriga, somnolencia o confusión. Esto puede ser una urgencia de la diabetes.',
            'Aprende a reconocer la hipoglucemia (azúcar bajo): sudor frío, temblor, palidez, hambre repentina, mareo. En esos casos, toma rápido un poco de azúcar (un vaso de jugo, una cucharada de miel) y avisa a alguien.',
          ],
        },
        {
          heading: 'Cuidados diarios',
          body: [
            'Toma los medicamentos (o la insulina) todos los días, en el horario correcto, aunque te sientas bien. Nunca los suspendas por tu cuenta — si algún medicamento no está disponible en la farmacia, avisa al equipo de la UBS.',
            'Cuida la alimentación: reduce el azúcar, los refrescos y los ultraprocesados; prefiere comida de verdad — fríjol, arroz, verduras, legumbres, frutas y carnes con poca grasa. No tiene que ser perfecto: los pequeños cambios constantes ya ayudan mucho.',
            'Muévete: caminar, bailar, subir escaleras. Cualquier actividad regular ayuda a controlar el azúcar en la sangre.',
            'Cuida los pies todos los días: observa heridas, ampollas o enrojecimiento, hidrata (sin aplicar entre los dedos) y usa calzado cerrado y cómodo. Nunca andes descalzo. Una herida en el pie del diabético necesita atención rápida.',
            'Acude a las consultas y haz los exámenes de rutina (glucemia, hemoglobina glucosilada, ojos y riñones). El examen de fondo de ojo y el de orina son importantes para detectar problemas a tiempo, antes de que se vuelvan graves.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'La Unidad Básica de Salud (UBS) es el lugar correcto para hacer el seguimiento de la diabetes, retirar los medicamentos (incluida la insulina) y recibir orientación con el equipo. El tratamiento de la diabetes es gratuito en el SUS.',
            'Si hay señales graves (respiración alterada, vómitos, confusión, hipoglucemia grave), acude de inmediato a urgencias o llama al 192 (SAMU).',
            'Usa la página "Red SUS" de esta plataforma para encontrar las unidades de salud más cercanas a ti en el Distrito Federal. Los grupos de apoyo y de educación en diabetes en la UBS ayudan mucho en el autocuidado.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Sociedad Brasileña de Diabetes (SBD)',
      detail: 'Directrices de la SBD — referencia nacional para diagnóstico y tratamiento de la diabetes.',
    },
    {
      label: 'Ministerio de Salud de Brasil — PCDT Diabetes Mellitus',
      detail: 'Protocolo Clínico y Directrices Terapéuticas vigente, referencia normativa para la conducta en el SUS.',
    },
    {
      label: 'Estudio Población Negra DF 2015–2024',
      detail: 'AECID/APRECIA/FIOCRUZ/UnB/FEPECS — Indicador 14 (diabetes como causa de muerte: 3.º lugar en 2014 → 8.º en 2024; estratificación racial pendiente).',
    },
    {
      label: 'American Diabetes Association (ADA)',
      detail: 'Standards of Care in Diabetes — referencia internacional basada en evidencia, usada de forma complementaria.',
    },
  ],
};

export const diabetesContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: diabetesContent_pt,
  es: diabetesContent_es,
};
