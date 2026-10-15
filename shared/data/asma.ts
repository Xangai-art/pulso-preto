// Conteúdo enriquecido — Asma
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
// Recorte racial obrigatório (chamadas anti-racismo) — foco em exposição
// ambiental desproporcional (moradia, poluição, violência urbana) e acesso a
// tratamento contínuo. Parceria institucional prevista: SBPT (Sociedade
// Brasileira de Pneumologia e Tisiologia). Consumido via
// getDeepContent(diseaseId, localeId) — ver site|app/src/data/deepContentRegistry.ts.

import type { LocaleId } from './locales';
import type { DiseaseDeepContent } from './anemiaFalciforme';

const heroImage_pt = {
  url: 'https://sspark.genspark.ai/i/Xg1kmnIK4FSMzzip?width=2560',
  alt: 'Pessoa utilizando inalador (bombinha) para controle da asma, com via aérea ilustrada ao fundo',
  credit: 'Imagem placeholder (CC/PD) — substituir por material próprio se necessário',
  isPlaceholder: true as const,
};

const heroImage_es = {
  url: 'https://sspark.genspark.ai/i/Xg1kmnIK4FSMzzip?width=2560',
  alt: 'Persona utilizando un inhalador para el control del asma, con la vía aérea ilustrada al fondo',
  credit: 'Imagen de relleno (CC/PD) — sustituir por material propio si es necesario',
  isPlaceholder: true as const,
};

const asmaContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,
  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Fisiopatologia da asma, classificação de controle e gravidade, diagnóstico funcional, tratamento por etapas e evidência sobre disparidades raciais em mortalidade e acesso ao cuidado contínuo.',
      sections: [
        {
          heading: 'O que é — fisiopatologia',
          body: [
            'A asma é uma doença inflamatória crônica das vias aéreas, caracterizada por hiperresponsividade brônquica, obstrução variável ao fluxo aéreo e sintomas recorrentes (sibilância, dispneia, aperto torácico e tosse), que variam ao longo do tempo e em intensidade.',
            'A inflamação envolve predominantemente eosinófilos e linfócitos Th2 (asma alérgica), com subtipos não-Th2 (neutrofílica, mista) em parte dos pacientes. Remodelamento das vias aéreas, exposição a alérgenos, infecções virais, poluição do ar, tabagismo e fatores ocupacionais atuam como gatilhos e moduladores.',
            'Determinantes sociais são centrais: exposição desproporcional a poluição, moradia insalubre (mofo, umidade, pragas), violência urbana e estresse crônico contribuem tanto para a maior prevalência quanto para a maior gravidade. O racismo estrutural, ao concentrar esses fatores em territórios negros e periféricos, atua como determinante ambiental mensurável.',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'Crianças negras apresentam taxa de mortalidade por asma cerca de 7 vezes maior que crianças brancas, associada a maior exposição ambiental, subdiagnóstico e menor acesso a tratamento contínuo (corticoide inalatório de manutenção).',
            'A asma na população negra tende a ser mais grave, com mais exacerbações, mais idas à emergência e mais hospitalizações evitáveis — um marcador de falha no cuidado primário continuado, e não apenas de biologia. A mortalidade por asma é, em grande parte, evitável com o tratamento adequado.',
            'A disparidade combina exposição ambiental desproporcional (poluição, moradia, território), acesso desigual a especialistas e a medicamentos de controle, e menor educação em saúde sobre o uso correto dos dispositivos inalatórios.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'O diagnóstico é clínico, apoiado por demonstração de variabilidade do fluxo aéreo: espirometria com prova broncodilatadora (aumento do VEF1 ≥ 12% e ≥ 200 mL), variabilidade do PFE, ou testes de broncoprovocação quando a espirometria é normal e a suspeita persiste.',
            'Avaliar controle (GINA) e gravidade, além de fatores de risco para exacerbações: uso excessivo de SABA (broncodilatador de resgate), exacerbação prévia grave, má adesão, técnica inalatória inadequada, exposição a tabaco e comorbidades (rinite alérgica, obesidade, refluxo).',
            'Diagnóstico diferencial: DPOC (especialmente em fumantes), bronquiolite, disfunção de cordas vocais, insuficiência cardíaca e tosse por outras causas. A atopia e a história familiar são frequentes, mas não obrigatórias.',
          ],
        },
        {
          heading: 'Tratamento e condutas',
          body: [
            'O pilar do tratamento é o corticoide inalatório (CI) de manutenção — mesmo em asma leve — para controlar a inflamação e prevenir exacerbações, combinado com broncodilatador de resgate conforme necessidade. O esquema segue a abordagem por etapas do GINA, escalonando ou reduzindo conforme o controle.',
            'Educação em saúde, verificação da técnica inalatória (essencial e frequentemente negligenciada), plano de ação escrito para crises, controle de gatilhos e tratamento de comorbidades são parte indissociável do manejo. A via de resgate com corticoide inalatório (MART/SMART) reduz exacerbações em pacientes elegíveis.',
            'Ponto crítico de equidade: o subtratamento com CI de manutenção e o uso excessivo de SABA (alívio) refletem acesso desigual e educação insuficiente, não "asma leve". Garantir CI gratuito, dispositivos adequados e plano de ação escrito para crianças negras é medida de equidade e de prevenção de mortes evitáveis.',
          ],
        },
        {
          heading: 'Quando referenciar / sinais de alarme clínico',
          body: [
            'Encaminhamento urgente/emergência: crise grave com incapacidade de falar frases completas, uso de musculatura acessória, cianose, sonolência/confusão, saturação baixa, PFE < 50% do previsto — atendimento hospitalar imediato com oxigênio, broncodilatador e corticoide sistêmico.',
            'Encaminhamento à pneumologia: asma não controlada apesar de tratamento otimizado, exacerbações recorrentes, dúvida diagnóstica, necessidade de investigação de comorbidades ou de fenotipagem, e uso de doses elevadas de CI.',
            'Sinais de alarme para a família/profissional: histórico de internação em UTI, exacerbação grave prévia, uso de múltiplos frascos de resgate por mês e despertares noturnos frequentes — todos indicam risco elevado e exigem revisão do tratamento.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) — diretrizes brasileiras para o manejo da asma.',
            'Global Initiative for Asthma (GINA) — estratégia global baseada em evidência para diagnóstico e manejo.',
            'Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas de Asma e componentes do cuidado na Atenção Básica.',
            'Literatura sobre disparidades raciais em asma (CDC, NIH) — evidência de maior mortalidade e exposição ambiental em crianças negras.',
          ],
        },
      ],
    },

    // ======================= ENFERMEIROS E TÉCNICOS =======================
    enfermeiro: {
      summary:
        'Reconhecimento da crise asmática e da classificação de risco, orientação sobre o uso correto dos inaladores, educação para o autocontrole e acompanhamento contínuo na Atenção Básica.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'A asma é uma doença crônica das vias aéreas (os "caninhos" do pulmão). Elas ficam inflamadas e sensíveis, e, quando algo irrita, estreitam e dificultam a passagem do ar. Isso causa chiado, falta de ar, aperto no peito e tosse.',
            'A asma não tem cura, mas tem controle muito bom: com a medicação de manutenção e o uso correto dos inaladores, a pessoa pode viver sem crises e sem limitações.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'Sinais de crise: chiado no peito, tosse (às vezes seca, pior à noite), falta de ar, aperto no peito, dificuldade para dormir e cansaço aos esforços. Crises noturnas e uso frequente da "bombinha" de resgate indicam asma não controlada.',
            'Sinais de crise grave (emergência): não conseguir falar frases completas, usar a musculatura entre as costelas para respirar, lábios/pontas dos dedos arroxeados, sonolência, confusão ou agitação — atendimento imediato.',
            'Prestar atenção à frequência do uso do broncodilatador de alívio: se a pessoa usa muitas vezes por semana ou acorda à noite por causa da asma, o controle está inadequado e o tratamento de manutenção precisa ser revisto.',
          ],
        },
        {
          heading: 'Classificação de risco e manejo na unidade',
          body: [
            'Na crise, classifique a gravidade: nível de consciência, capacidade de falar, uso de musculatura acessória, frequência respiratória, saturação de oxigênio e pico de fluxo expiratório (PFE). Crises leves/moderadas podem ser manejadas com broncodilatador e reavaliação; crises graves exigem acionamento imediato e encaminhamento.',
            'Técnica inalatória é decisiva: a maioria das "falhas de tratamento" é, na verdade, técnica incorreta. Demonstre e observe o uso do inalador dosimetrado (com espaçador, quando indicado) a cada consulta — não presuma que a pessoa sabe usar.',
            'Verifique e registre: adesão ao corticoide inalatório, disponibilidade do medicamento na farmácia, técnica inalatória, plano de ação escrito, controle dos gatilhos (poeira, mofo, fumaça, animais) e vacinação (influenza e COVID-19).',
          ],
        },
        {
          heading: 'Quem fica atento — grupos de risco',
          body: [
            'Grupos que exigem atenção redobrada: crianças negras (maior mortalidade e exposição ambiental), crianças e adolescentes, pessoas com rinite alérgica, obesidade ou refluxo, fumantes e ex-fumantes, gestantes e pessoas que vivem em áreas com maior poluição ou moradia insalubre.',
            'Pessoas com histórico de exacerbação grave, internação prévia ou uso excessivo de resgate precisam de acompanhamento mais próximo e revisão do tratamento.',
            'Atenção ao ambiente: condições de moradia (mofo, umidade, pragas, aglomeração) e poluição do território são determinantes de gravidade — perguntar sobre elas faz parte da avaliação.',
          ],
        },
        {
          heading: 'Cuidado continuado e orientação ao paciente/família',
          body: [
            'Explique a diferença entre a "bombinha" de alívio (resgate) e a de manutenção (corticoide inalatório): a de manutenção precisa ser usada todos os dias, mesmo sem sintomas, para prevenir crises. Esse é o ponto que mais muda o desfecho.',
            'Ensine e pratique a técnica inalatória, entregue/revise um plano de ação escrito (o que fazer quando piora), oriente sobre como reconhecer os sinais de alerta e quando procurar atendimento imediato. Oriente a manter a vacinação em dia e a reduzir gatilhos em casa.',
            'Chamada anti-racista: crianças negras morrem de asma em proporção muito maior, muitas vezes por falta de acesso ao corticoide inalatório de manutenção e por subvalorização dos sintomas. Não minimize a queixa respiratória de uma criança negra ("é só uma tosse") nem presuma falta de adesão sem verificar acesso ao medicamento, técnica inalatória e condições de moradia. É um viés a ser combatido ativamente na prática clínica.',
          ],
        },
      ],
    },

    // ============================== USUÁRIOS ===============================
    usuario: {
      summary:
        'O que é asma, por que é mais grave em crianças negras, sinais de alerta, cuidados do dia a dia e onde buscar ajuda gratuita no SUS.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'Asma é uma doença dos "caninhos" do pulmão (as vias aéreas). Eles ficam inflamados e sensíveis e, quando algo irrita, estreitam e deixam o ar passar com dificuldade. Isso provoca chiado, falta de ar, aperto no peito e tosse.',
            'A asma não tem cura, mas tem controle. Com o remédio de manutenção todos os dias e o uso correto da "bombinha", é possível viver sem crises e sem limitações.',
          ],
        },
        {
          heading: 'Por que isso importa',
          body: [
            'Crianças negras têm muito mais risco de morrer de asma do que crianças brancas. Isso não acontece por acaso: tem relação com morar em lugares mais poluídos, com casas com mofo e umidade, e com menos acesso ao remédio de manutenção e a um acompanhamento de qualidade.',
            'A boa notícia: as mortes por asma são, em grande parte, evitáveis. Com tratamento contínuo, educação sobre a doença e uso correto dos inaladores, dá para controlar muito bem.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Procure a UBS se você ou sua criança tiverem, com frequência: chiado no peito, tosse (principalmente à noite), falta de ar, aperto no peito ou acordar de madrugada por causa da respiração.',
            'Atenção ao uso da "bombinha de alívio": se ela é usada muitas vezes por semana ou à noite, a asma não está controlada — procure a equipe para ajustar o tratamento.',
            'Vá imediatamente à UPA/pronto-socorro se houver: não conseguir falar frases completas, esforço muito grande para respirar (afundando as costelas), lábios ou dedos arroxeados, sonolência ou confusão. Isso é uma crise grave.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Use o remédio de manutenção (a bombinha de corticoide) todos os dias, mesmo quando estiver se sentindo bem — ele é o que evita as crises. A bombinha de alívio é só para quando os sintomas aparecem.',
            'Aprenda a usar o inalador do jeito certo — com espaçador, quando indicado — e confirme a técnica na UBS. Usar a bombinha de forma errada é uma das principais causas de a asma ficar descontrolada.',
            'Reduza os gatilhos em casa: evite mofo e umidade, areje os ambientes, troque roupas de cama com frequência, evite fumaça (cigarro, incenso, vela) e mantenha a casa livre de poeira e pragas.',
            'Mantenha as vacinas em dia (gripe e COVID-19), que reduzem crises, e tenha sempre um plano de ação por escrito: saiba o que fazer e quando procurar ajuda quando a asma piorar.',
            'Não aceite "asma é assim mesmo". Com o tratamento certo, a maioria das pessoas pode dormir bem, brincar, estudar e fazer atividade física sem crises.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'A Unidade Básica de Saúde (UBS) é o lugar certo para acompanhar a asma e retirar os medicamentos (inclusive o corticoide inalatório de manutenção), que são gratuitos no SUS.',
            'Em crise grave (não consegue falar, muito esforço para respirar, lábios arroxeados, sonolência), procure a UPA ou o pronto-socorro imediatamente ou ligue 192 (SAMU).',
            'Use a página "Rede SUS" desta plataforma para encontrar as unidades de saúde mais próximas de você no Distrito Federal.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'SBPT',
      detail: 'Sociedade Brasileira de Pneumologia e Tisiologia — diretrizes brasileiras para o manejo da asma.',
    },
    {
      label: 'Global Initiative for Asthma (GINA)',
      detail: 'Estratégia global baseada em evidência para diagnóstico, classificação e tratamento por etapas da asma.',
    },
    {
      label: 'Ministério da Saúde — PCDT Asma',
      detail: 'Protocolo Clínico e Diretrizes Terapêuticas vigente e organização do cuidado na Atenção Básica.',
    },
    {
      label: 'CDC / NIH — disparidades raciais',
      detail: 'Evidência de mortalidade desproporcional por asma em crianças negras e de maior exposição ambiental.',
    },
  ],
};

const asmaContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,
  audiences: {
    // ==================== MÉDICOS Y PERSONAL INVESTIGADOR ===================
    medico: {
      summary:
        'Fisiopatología del asma, clasificación de control y gravedad, diagnóstico funcional, tratamiento por etapas y evidencia sobre disparidades raciales en mortalidad y acceso al cuidado continuo.',
      sections: [
        {
          heading: 'Qué es — fisiopatología',
          body: [
            'El asma es una enfermedad inflamatoria crónica de las vías respiratorias, caracterizada por hiperreactividad bronquial, obstrucción variable al flujo aéreo y síntomas recurrentes (sibilancias, disnea, opresión torácica y tos), que varían a lo largo del tiempo y en intensidad.',
            'La inflamación involucra predominantemente eosinófilos y linfocitos Th2 (asma alérgica), con subtipos no-Th2 (neutrofílica, mixta) en parte de los pacientes. El remodelado de las vías respiratorias, la exposición a alérgenos, las infecciones virales, la contaminación del aire, el tabaquismo y los factores ocupacionales actúan como desencadenantes y moduladores.',
            'Los determinantes sociales son centrales: la exposición desproporcionada a la contaminación, la vivienda insalubre (moho, humedad, plagas), la violencia urbana y el estrés crónico contribuyen tanto a la mayor prevalencia como a la mayor gravedad. El racismo estructural, al concentrar estos factores en territorios negros y periféricos, actúa como un determinante ambiental mensurable.',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'Los niños negros presentan una tasa de mortalidad por asma cerca de 7 veces mayor que los niños blancos, asociada a mayor exposición ambiental, subdiagnóstico y menor acceso al tratamiento continuo (corticoide inhalado de mantenimiento).',
            'El asma en la población negra tiende a ser más grave, con más exacerbaciones, más visitas a urgencias y más hospitalizaciones evitables — un marcador de falla en el cuidado primario continuo, y no solo de biología. La mortalidad por asma es, en gran parte, evitable con el tratamiento adecuado.',
            'La disparidad combina exposición ambiental desproporcionada (contaminación, vivienda, territorio), acceso desigual a especialistas y a medicamentos de control, y menor educación en salud sobre el uso correcto de los dispositivos inhaladores.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'El diagnóstico es clínico, apoyado en la demostración de variabilidad del flujo aéreo: espirometría con prueba broncodilatadora (aumento del VEF1 ≥ 12% y ≥ 200 mL), variabilidad del PEF, o pruebas de broncoprovocación cuando la espirometría es normal y la sospecha persiste.',
            'Evaluar control (GINA) y gravedad, además de factores de riesgo de exacerbaciones: uso excesivo de SABA (broncodilatador de rescate), exacerbación previa grave, mala adherencia, técnica inhalatoria inadecuada, exposición al tabaco y comorbilidades (rinitis alérgica, obesidad, reflujo).',
            'Diagnóstico diferencial: EPOC (especialmente en fumadores), bronquiolitis, disfunción de cuerdas vocales, insuficiencia cardíaca y tos por otras causas. La atopia y el antecedente familiar son frecuentes, pero no obligatorios.',
          ],
        },
        {
          heading: 'Tratamiento y conductas',
          body: [
            'El pilar del tratamiento es el corticoide inhalado (CI) de mantenimiento — incluso en asma leve — para controlar la inflamación y prevenir exacerbaciones, combinado con broncodilatador de rescate según necesidad. El esquema sigue el abordaje por etapas del GINA, escalonando o reduciendo según el control.',
            'La educación en salud, la verificación de la técnica inhalatoria (esencial y frecuentemente descuidada), el plan de acción escrito para crisis, el control de desencadenantes y el tratamiento de comorbilidades son parte indisociable del manejo. La vía de rescate con corticoide inhalado (MART/SMART) reduce exacerbaciones en pacientes elegibles.',
            'Punto crítico de equidad: el subtratamiento con CI de mantenimiento y el uso excesivo de SABA (alivio) reflejan acceso desigual y educación insuficiente, no "asma leve". Garantizar CI gratuito, dispositivos adecuados y plan de acción escrito para niños negros es una medida de equidad y de prevención de muertes evitables.',
          ],
        },
        {
          heading: 'Cuándo derivar / señales de alarma clínica',
          body: [
            'Derivación urgente/emergencia: crisis grave con incapacidad de hablar frases completas, uso de musculatura accesoria, cianosis, somnolencia/confusión, saturación baja, PEF < 50% del previsto — atención hospitalaria inmediata con oxígeno, broncodilatador y corticoide sistémico.',
            'Derivación a neumología: asma no controlada a pesar de tratamiento optimizado, exacerbaciones recurrentes, duda diagnóstica, necesidad de investigación de comorbilidades o de fenotipificación, y uso de dosis elevadas de CI.',
            'Señales de alarma para la familia/profesional: antecedente de internación en UCI, exacerbación grave previa, uso de múltiples frascos de rescate por mes y despertares nocturnos frecuentes — todos indican riesgo elevado y exigen revisión del tratamiento.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Sociedad Brasileña de Neumología y Tisiología (SBPT) — directrices brasileñas para el manejo del asma.',
            'Global Initiative for Asthma (GINA) — estrategia global basada en evidencia para diagnóstico y manejo.',
            'Ministerio de Salud de Brasil — Protocolo Clínico y Directrices Terapéuticas de Asma y componentes del cuidado en la Atención Primaria.',
            'Literatura sobre disparidades raciales en asma (CDC, NIH) — evidencia de mayor mortalidad y exposición ambiental en niños negros.',
          ],
        },
      ],
    },

    // ====================== ENFERMEROS Y TÉCNICOS ==========================
    enfermeiro: {
      summary:
        'Reconocimiento de la crisis asmática y de la clasificación de riesgo, orientación sobre el uso correcto de los inhaladores, educación para el autocontrol y seguimiento continuo en la Atención Primaria.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'El asma es una enfermedad crónica de las vías respiratorias (los "tubitos" del pulmón). Se inflaman y se vuelven sensibles y, cuando algo los irrita, se estrechan y dificultan el paso del aire. Esto causa sibilancias (silbido), falta de aire, opresión en el pecho y tos.',
            'El asma no tiene cura, pero tiene muy buen control: con la medicación de mantenimiento y el uso correcto de los inhaladores, la persona puede vivir sin crisis y sin limitaciones.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'Señales de crisis: silbido en el pecho, tos (a veces seca, peor de noche), falta de aire, opresión en el pecho, dificultad para dormir y cansancio a los esfuerzos. Las crisis nocturnas y el uso frecuente del inhalador de rescate indican asma no controlada.',
            'Señales de crisis grave (emergencia): no lograr hablar frases completas, usar la musculatura entre las costillas para respirar, labios/puntas de los dedos amoratados, somnolencia, confusión o agitación — atención inmediata.',
            'Prestar atención a la frecuencia de uso del broncodilatador de alivio: si la persona lo usa muchas veces por semana o se despierta de noche por el asma, el control es inadecuado y el tratamiento de mantenimiento debe revisarse.',
          ],
        },
        {
          heading: 'Clasificación de riesgo y manejo en la unidad',
          body: [
            'En la crisis, clasifique la gravedad: nivel de conciencia, capacidad de hablar, uso de musculatura accesoria, frecuencia respiratoria, saturación de oxígeno y flujo espiratorio máximo (PEF). Las crisis leves/moderadas pueden manejarse con broncodilatador y reevaluación; las crisis graves exigen activación inmediata y derivación.',
            'La técnica inhalatoria es decisiva: la mayoría de las "fallas de tratamiento" son, en realidad, técnica incorrecta. Demuestre y observe el uso del inhalador dosificador (con espaciador, cuando esté indicado) en cada consulta — no presuma que la persona sabe usarlo.',
            'Verifique y registre: adherencia al corticoide inhalado, disponibilidad del medicamento en la farmacia, técnica inhalatoria, plan de acción escrito, control de los desencadenantes (polvo, moho, humo, animales) y vacunación (influenza y COVID-19).',
          ],
        },
        {
          heading: 'Quién debe estar atento — grupos de riesgo',
          body: [
            'Grupos que exigen atención redoblada: niños negros (mayor mortalidad y exposición ambiental), niños y adolescentes, personas con rinitis alérgica, obesidad o reflujo, fumadores y exfumadores, gestantes y personas que viven en áreas con mayor contaminación o vivienda insalubre.',
            'Las personas con antecedente de exacerbación grave, internación previa o uso excesivo de rescate necesitan un seguimiento más cercano y revisión del tratamiento.',
            'Atención al ambiente: las condiciones de vivienda (moho, humedad, plagas, hacinamiento) y la contaminación del territorio son determinantes de gravedad — preguntar sobre ellas forma parte de la evaluación.',
          ],
        },
        {
          heading: 'Cuidado continuo y orientación al paciente/familia',
          body: [
            'Explique la diferencia entre el inhalador de alivio (rescate) y el de mantenimiento (corticoide inhalado): el de mantenimiento debe usarse todos los días, incluso sin síntomas, para prevenir crisis. Este es el punto que más cambia el desenlace.',
            'Enseñe y practique la técnica inhalatoria, entregue/revise un plan de acción escrito (qué hacer cuando empeora), oriente sobre cómo reconocer las señales de alerta y cuándo buscar atención inmediata. Oriente a mantener la vacunación al día y a reducir los desencadenantes en casa.',
            'Llamado antirracista: los niños negros mueren de asma en una proporción mucho mayor, muchas veces por falta de acceso al corticoide inhalado de mantenimiento y por la subvaloración de los síntomas. No minimice la queja respiratoria de un niño negro ("es solo una tos") ni presuma falta de adherencia sin verificar el acceso al medicamento, la técnica inhalatoria y las condiciones de vivienda. Es un sesgo que debe combatirse activamente en la práctica clínica.',
          ],
        },
      ],
    },

    // ============================== USUARIOS ===============================
    usuario: {
      summary:
        'Qué es el asma, por qué es más grave en los niños negros, señales de alerta, cuidados diarios y dónde buscar ayuda gratuita en el SUS.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'El asma es una enfermedad de los "tubitos" del pulmón (las vías respiratorias). Se inflaman y se vuelven sensibles y, cuando algo los irrita, se estrechan y dejan pasar el aire con dificultad. Esto provoca silbido, falta de aire, opresión en el pecho y tos.',
            'El asma no tiene cura, pero tiene control. Con el medicamento de mantenimiento todos los días y el uso correcto del inhalador, es posible vivir sin crisis y sin limitaciones.',
          ],
        },
        {
          heading: 'Por qué importa',
          body: [
            'Los niños negros tienen mucho más riesgo de morir de asma que los niños blancos. Esto no ocurre por casualidad: tiene relación con vivir en lugares más contaminados, con casas con moho y humedad, y con menos acceso al medicamento de mantenimiento y a un seguimiento de calidad.',
            'La buena noticia: las muertes por asma son, en gran parte, evitables. Con tratamiento continuo, educación sobre la enfermedad y uso correcto de los inhaladores, se puede controlar muy bien.',
          ],
        },
        {
          heading: 'Señales de alerta — mantente atento(a)',
          body: [
            'Acude a la UBS si tú o tu niño tienen, con frecuencia: silbido en el pecho, tos (sobre todo de noche), falta de aire, opresión en el pecho o despertarse de madrugada por la respiración.',
            'Atención al uso del inhalador de alivio: si se usa muchas veces por semana o de noche, el asma no está controlada — acude al equipo para ajustar el tratamiento.',
            'Acude de inmediato a urgencias si hay: no lograr hablar frases completas, esfuerzo muy grande para respirar (hundiendo las costillas), labios o dedos amoratados, somnolencia o confusión. Esto es una crisis grave.',
          ],
        },
        {
          heading: 'Cuidados diarios',
          body: [
            'Usa el medicamento de mantenimiento (el inhalador con corticoide) todos los días, aunque te sientas bien — es lo que evita las crisis. El inhalador de alivio es solo para cuando aparecen los síntomas.',
            'Aprende a usar el inhalador de la manera correcta — con espaciador, cuando esté indicado — y confirma la técnica en la UBS. Usar el inhalador de forma incorrecta es una de las principales causas de que el asma se descontrole.',
            'Reduce los desencadenantes en casa: evita moho y humedad, ventila los ambientes, cambia la ropa de cama con frecuencia, evita el humo (cigarrillo, incienso, vela) y mantén la casa libre de polvo y plagas.',
            'Mantén las vacunas al día (gripe y COVID-19), que reducen las crisis, y ten siempre un plan de acción escrito: sabe qué hacer y cuándo buscar ayuda cuando el asma empeore.',
            'No aceptes "el asma es así". Con el tratamiento correcto, la mayoría de las personas puede dormir bien, jugar, estudiar y hacer actividad física sin crisis.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'La Unidad Básica de Salud (UBS) es el lugar correcto para el seguimiento del asma y para retirar los medicamentos (incluido el corticoide inhalado de mantenimiento), que son gratuitos en el SUS.',
            'En crisis grave (no logra hablar, mucho esfuerzo para respirar, labios amoratados, somnolencia), acude de inmediato a urgencias o llama al 192 (SAMU).',
            'Usa la página "Red SUS" de esta plataforma para encontrar las unidades de salud más cercanas a ti en el Distrito Federal.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'SBPT',
      detail: 'Sociedad Brasileña de Neumología y Tisiología — directrices brasileñas para el manejo del asma.',
    },
    {
      label: 'Global Initiative for Asthma (GINA)',
      detail: 'Estrategia global basada en evidencia para diagnóstico, clasificación y tratamiento por etapas del asma.',
    },
    {
      label: 'Ministerio de Salud de Brasil — PCDT Asma',
      detail: 'Protocolo Clínico y Directrices Terapéuticas vigente y organización del cuidado en la Atención Primaria.',
    },
    {
      label: 'CDC / NIH — disparidades raciales',
      detail: 'Evidencia de mortalidad desproporcionada por asma en niños negros y de mayor exposición ambiental.',
    },
  ],
};

export const asmaContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: asmaContent_pt,
  es: asmaContent_es,
};
