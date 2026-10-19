// Conteúdo aprofundado — Doença Renal Crônica (DRC)
//
// Contrato DiseaseDeepContent (ver anemiaFalciforme.ts): 3 audiências
// (medico/enfermeiro/usuario) × PT/ES, com heroImage e sources.
// Tema prioritário do MVP do Produto 2.2 (Relatório de Planejamento, item 4.2).
//
// Imagem: acervo já produzido (D15) — aferição de pressão arterial, porque a
// hipertensão é a principal causa evitável de DRC. Sem imagem nova.
//
// Não há dado local do DF para DRC na análise de dados 2015–2024; por isso não
// citamos números do DF aqui (evita dado inventado).

import type { LocaleId } from './locales.ts';
import type { DiseaseDeepContent } from './anemiaFalciforme.ts';
import { BRAND_IMAGES } from './brandImages.ts';

const heroImage_pt = {
  url: BRAND_IMAGES.pressao.url,
  alt: 'Aferição de pressão arterial com estetoscópio e esfigmomanômetro — controlar a pressão protege os rins',
  credit: 'Acervo Pulso Preto',
};

const heroImage_es = {
  url: BRAND_IMAGES.pressao.url,
  alt: 'Medición de la presión arterial con estetoscopio y esfigmomanómetro — controlar la presión protege los riñones',
  credit: 'Acervo Pulso Preto',
};

const doencaRenalCronicaContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,
  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Definição, estadiamento, rastreamento em grupos de risco, condutas que retardam a progressão e critérios de encaminhamento da doença renal crônica (DRC), com atenção às disparidades raciais e ao gene APOL1.',
      sections: [
        {
          heading: 'O que é — definição e estadiamento',
          body: [
            'A doença renal crônica (DRC) é definida por alteração da estrutura ou da função renal presente por mais de 3 meses, com implicações para a saúde. Os marcadores são a taxa de filtração glomerular (TFG) abaixo de 60 mL/min/1,73 m² e/ou sinais de lesão renal — principalmente albuminúria (relação albumina/creatinina urinária ≥ 30 mg/g), alterações do sedimento urinário, de imagem ou de biópsia.',
            'O estadiamento combina a TFG (G1 a G5) e a albuminúria (A1 a A3). Os dois eixos são prognósticos e independentes: uma pessoa com TFG preservada e albuminúria elevada já tem risco aumentado de progressão e de evento cardiovascular.',
            'As principais causas no Brasil são hipertensão arterial e diabetes mellitus. Na população negra somam-se a nefropatia associada às variantes de risco do gene APOL1 (G1/G2) e a nefropatia da doença falciforme.',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'A DRC é silenciosa até fases avançadas, e o diagnóstico tardio ainda é frequente: muitas pessoas descobrem a doença já precisando de diálise. O Brasil tem mais de 150 mil pessoas em diálise, a maioria financiada pelo Sistema Único de Saúde (SUS), segundo o Censo Brasileiro de Diálise da Sociedade Brasileira de Nefrologia.',
            'Pessoas negras chegam à doença renal terminal mais cedo e em maior proporção. Contribuem a maior prevalência e o pior controle de hipertensão e diabetes, as variantes de risco do APOL1 (mais frequentes em populações de ascendência africana ocidental) e barreiras de acesso a rastreamento, nefrologia e transplante.',
            'Atenção ao viés de cálculo: equações antigas de estimativa da TFG aplicavam um "fator raça" que superestimava a função renal de pessoas negras e podia atrasar diagnóstico, encaminhamento e inclusão na lista de transplante. A recomendação atual é usar a equação CKD-EPI 2021, sem coeficiente racial.',
          ],
        },
        {
          heading: 'Rastreamento e diagnóstico',
          body: [
            'Rastrear anualmente com creatinina sérica (TFG estimada) e relação albumina/creatinina em amostra isolada de urina nas pessoas com hipertensão, diabetes, doença cardiovascular, obesidade, idade acima de 60 anos, história familiar de DRC, doença falciforme ou uso prolongado de medicamentos nefrotóxicos.',
            'Confirmar alterações em nova coleta após 3 meses antes de rotular como crônica. Exame de urina tipo 1 e ultrassonografia de rins e vias urinárias completam a avaliação inicial na atenção primária.',
            'A testagem genética do APOL1 não é recomendada de rotina para rastreamento; o histórico familiar e a ancestralidade devem reforçar a vigilância clínica, nunca substituí-la.',
          ],
        },
        {
          heading: 'Tratamento — o que retarda a progressão',
          body: [
            'Controle pressórico individualizado, com inibidor da enzima conversora de angiotensina (IECA) ou bloqueador do receptor de angiotensina (BRA) quando houver albuminúria, titulados até a dose máxima tolerada, com monitoramento de potássio e creatinina.',
            'Inibidores do cotransportador sódio-glicose tipo 2 (iSGLT2) reduzem progressão e eventos cardiovasculares na DRC com e sem diabetes (diretriz KDIGO 2024), dentro dos limites de TFG indicados em bula. No diabetes, controle glicêmico com metas individualizadas.',
            'Estatina conforme risco cardiovascular, cessação do tabagismo, orientação nutricional (moderação de sal e de proteína nas fases avançadas), vacinação (incluindo hepatite B) e revisão de doses de medicamentos pela TFG.',
            'Evitar nefrotóxicos: anti-inflamatórios não esteroidais, contraste iodado sem preparo e combinações desnecessárias. Tratar anemia, distúrbio mineral-ósseo e acidose a partir dos estágios G3b–G4.',
          ],
        },
        {
          heading: 'Quando encaminhar à nefrologia',
          body: [
            'TFG abaixo de 30 mL/min/1,73 m² (G4–G5); albuminúria acentuada (≥ 300 mg/g, A3) ou hematúria de origem glomerular; queda rápida e sustentada da TFG; hipertensão resistente; suspeita de doença renal hereditária ou glomerular; distúrbios de potássio persistentes.',
            'Nas fases G4–G5, iniciar com antecedência a conversa sobre terapia renal substitutiva (hemodiálise, diálise peritoneal, transplante) e cuidado conservador — inclusive a avaliação para transplante preemptivo, que reduz a desigualdade no acesso.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Ministério da Saúde — Diretrizes Clínicas para o Cuidado ao Paciente com Doença Renal Crônica no SUS.',
            'KDIGO 2024 — Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.',
            'Força-tarefa NKF-ASN (2021) — recomendação de estimar a TFG sem coeficiente racial (CKD-EPI 2021).',
            'Genovese et al., Science 2010; Friedman & Pollak, JCI 2011; Parsa et al., NEJM 2013 — variantes de APOL1 e doença renal.',
          ],
        },
      ],
    },

    // ======================= ENFERMAGEM E EQUIPES =======================
    enfermeiro: {
      summary:
        'Como a equipe da atenção primária identifica quem precisa de exame, acompanha a pessoa com doença renal crônica e orienta o autocuidado para proteger os rins.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'A doença renal crônica é a perda lenta e progressiva da capacidade dos rins de filtrar o sangue. Na maior parte do tempo não dá sintomas — por isso a equipe é decisiva para descobrir cedo, com dois exames simples: creatinina no sangue e albumina na urina.',
          ],
        },
        {
          heading: 'Quem precisa de exame todo ano',
          body: [
            'Pessoas com hipertensão ou diabetes, com doença do coração, obesidade, mais de 60 anos, familiares de pessoas com doença renal ou em diálise, pessoas com doença falciforme e quem usa anti-inflamatório com frequência.',
            'Na população negra, a combinação de hipertensão mais precoce, diabetes e fatores genéticos aumenta o risco. Pergunte ativamente sobre casos de diálise na família e registre corretamente o quesito raça/cor.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'Inchaço nas pernas, nos pés ou ao redor dos olhos; urina com espuma; urinar muito à noite; pressão difícil de controlar; cansaço, falta de apetite, náusea, coceira e falta de ar aparecem nas fases avançadas.',
            'Sinais de alarme para atendimento no mesmo dia: falta de ar importante, redução forte da urina, confusão mental, dor no peito ou potássio muito alto em exame.',
          ],
        },
        {
          heading: 'Acompanhamento na unidade',
          body: [
            'Medir a pressão em todas as consultas e conferir a adesão aos remédios; acompanhar glicemia nas pessoas com diabetes; manter em dia os exames de creatinina, potássio e albumina na urina, na frequência indicada pelo estágio.',
            'Revisar a lista de medicamentos: orientar a evitar anti-inflamatórios e automedicação, e conferir doses ajustadas à função dos rins. Manter a vacinação em dia, incluindo hepatite B.',
            'Apoiar a organização do encaminhamento à nefrologia quando indicado e acompanhar a pessoa depois da consulta especializada — o vínculo com a unidade continua.',
          ],
        },
        {
          heading: 'Orientação ao paciente e à família',
          body: [
            'Explicar que a doença tem tratamento e que controlar pressão e açúcar no sangue protege os rins. Orientar alimentação com menos sal e menos alimentos ultraprocessados, atividade física possível, não fumar e beber água conforme orientação da equipe.',
            'Quando a doença avança, conversar com antecedência sobre diálise e transplante, que são oferecidos pelo SUS, para que a decisão seja informada e não tomada na urgência.',
          ],
        },
      ],
    },

    // ======================= POPULAÇÃO =======================
    usuario: {
      summary:
        'Os rins limpam o sangue em silêncio. Quando adoecem, quase não dão sinal — mas dois exames simples, feitos de graça no SUS, mostram se está tudo bem.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'Doença renal crônica é quando os rins vão perdendo, devagar, a força de filtrar o sangue e de tirar do corpo o que não serve. Pode levar anos sem dar nenhum sinal.',
          ],
        },
        {
          heading: 'Por que isso importa para a população negra',
          body: [
            'Pressão alta e diabetes são as principais causas de doença nos rins — e as duas aparecem mais cedo e com mais força entre pessoas negras. Algumas famílias negras também carregam uma herança genética que deixa os rins mais sensíveis.',
            'Por isso, descobrir cedo faz toda a diferença: com cuidado, dá para frear a doença e evitar a diálise.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Inchaço nas pernas, nos pés ou no rosto; urina com espuma; levantar muitas vezes à noite para urinar; pressão alta que não baixa; cansaço sem explicação.',
            'Muitas vezes não há sinal nenhum. Se você tem pressão alta, diabetes ou alguém da família faz diálise, peça os exames mesmo se sentindo bem.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Tome os remédios da pressão e do diabetes todos os dias, do jeito que foi combinado com a equipe de saúde.',
            'Evite remédio para dor e inflamação por conta própria (como ibuprofeno e diclofenaco): eles podem machucar os rins. Pergunte antes na farmácia ou na unidade de saúde.',
            'Use menos sal, prefira comida de verdade, mexa o corpo do jeito que der e não fume.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'Na Unidade Básica de Saúde (UBS) você pede os exames de sangue (creatinina) e de urina (albumina), sem custo. A equipe acompanha você e encaminha para o especialista em rins (nefrologista) quando precisar.',
            'Se a doença avançar, a diálise e o transplante de rim são oferecidos pelo SUS. Você tem direito a ser atendido(a) com respeito e sem discriminação — se isso não acontecer, procure a Ouvidoria.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Ministério da Saúde',
      detail: 'Diretrizes Clínicas para o Cuidado ao Paciente com Doença Renal Crônica no SUS.',
    },
    {
      label: 'KDIGO 2024',
      detail: 'Diretriz internacional de avaliação e manejo da doença renal crônica (estadiamento, iSGLT2, encaminhamento).',
    },
    {
      label: 'Sociedade Brasileira de Nefrologia (SBN)',
      detail: 'Censo Brasileiro de Diálise — número de pessoas em diálise no país e financiamento pelo SUS.',
    },
    {
      label: 'NKF-ASN 2021 / Science 2010 / NEJM 2013',
      detail: 'Estimativa da função renal sem coeficiente racial e evidência sobre as variantes do gene APOL1.',
    },
  ],
};

const doencaRenalCronicaContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,
  audiences: {
    medico: {
      summary:
        'Definición, estadificación, cribado en grupos de riesgo, conductas que retrasan la progresión y criterios de derivación de la enfermedad renal crónica (ERC), con atención a las disparidades raciales y al gen APOL1.',
      sections: [
        {
          heading: 'Qué es — definición y estadificación',
          body: [
            'La enfermedad renal crónica (ERC) se define por alteración de la estructura o de la función renal presente por más de 3 meses, con implicaciones para la salud. Los marcadores son la tasa de filtración glomerular (TFG) por debajo de 60 mL/min/1,73 m² y/o signos de daño renal — principalmente albuminuria (cociente albúmina/creatinina urinario ≥ 30 mg/g), alteraciones del sedimento urinario, de imagen o de biopsia.',
            'La estadificación combina la TFG (G1 a G5) y la albuminuria (A1 a A3). Ambos ejes son pronósticos e independientes: una persona con TFG preservada y albuminuria elevada ya tiene mayor riesgo de progresión y de evento cardiovascular.',
            'Las principales causas en Brasil son la hipertensión arterial y la diabetes mellitus. En la población negra se suman la nefropatía asociada a las variantes de riesgo del gen APOL1 (G1/G2) y la nefropatía de la enfermedad falciforme.',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'La ERC es silenciosa hasta fases avanzadas y el diagnóstico tardío aún es frecuente. Brasil tiene más de 150 mil personas en diálisis, la mayoría financiada por el Sistema Único de Salud (SUS), según el Censo Brasileño de Diálisis de la Sociedad Brasileña de Nefrología.',
            'Las personas negras llegan a la enfermedad renal terminal más temprano y en mayor proporción, por la mayor prevalencia y el peor control de la hipertensión y la diabetes, las variantes de riesgo del APOL1 y las barreras de acceso al cribado, a la nefrología y al trasplante.',
            'Atención al sesgo de cálculo: las ecuaciones antiguas de estimación de la TFG aplicaban un "factor raza" que sobrestimaba la función renal de las personas negras y podía retrasar diagnóstico, derivación e inclusión en la lista de trasplante. La recomendación actual es usar la ecuación CKD-EPI 2021, sin coeficiente racial.',
          ],
        },
        {
          heading: 'Cribado y diagnóstico',
          body: [
            'Cribar anualmente con creatinina sérica (TFG estimada) y cociente albúmina/creatinina en muestra aislada de orina en personas con hipertensión, diabetes, enfermedad cardiovascular, obesidad, edad mayor de 60 años, antecedentes familiares de ERC, enfermedad falciforme o uso prolongado de fármacos nefrotóxicos.',
            'Confirmar las alteraciones en una nueva muestra después de 3 meses. El examen general de orina y la ecografía renal completan la evaluación inicial en atención primaria.',
            'La prueba genética de APOL1 no se recomienda de rutina para cribado; los antecedentes familiares y la ascendencia deben reforzar la vigilancia clínica, nunca sustituirla.',
          ],
        },
        {
          heading: 'Tratamiento — lo que retrasa la progresión',
          body: [
            'Control individualizado de la presión, con inhibidor de la enzima convertidora de angiotensina (IECA) o antagonista del receptor de angiotensina (ARA II) cuando haya albuminuria, titulados hasta la dosis máxima tolerada, con monitoreo de potasio y creatinina.',
            'Los inhibidores del cotransportador sodio-glucosa tipo 2 (iSGLT2) reducen la progresión y los eventos cardiovasculares en la ERC con y sin diabetes (guía KDIGO 2024), dentro de los límites de TFG indicados en la ficha técnica.',
            'Estatina según el riesgo cardiovascular, abandono del tabaco, orientación nutricional, vacunación (incluida hepatitis B) y ajuste de dosis de fármacos según la TFG. Evitar antiinflamatorios no esteroideos y otros nefrotóxicos.',
          ],
        },
        {
          heading: 'Cuándo derivar a nefrología',
          body: [
            'TFG por debajo de 30 mL/min/1,73 m² (G4–G5); albuminuria marcada (≥ 300 mg/g, A3) o hematuria glomerular; descenso rápido y sostenido de la TFG; hipertensión resistente; sospecha de enfermedad renal hereditaria o glomerular; alteraciones persistentes del potasio.',
            'En G4–G5, iniciar con antelación la conversación sobre terapia renal sustitutiva (hemodiálisis, diálisis peritoneal, trasplante) y cuidado conservador, incluida la evaluación para trasplante anticipado.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Ministerio de Salud de Brasil — Directrices Clínicas para el Cuidado del Paciente con Enfermedad Renal Crónica en el SUS.',
            'KDIGO 2024 — Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.',
            'Grupo de trabajo NKF-ASN (2021) — estimar la TFG sin coeficiente racial (CKD-EPI 2021).',
            'Genovese et al., Science 2010; Friedman & Pollak, JCI 2011; Parsa et al., NEJM 2013 — variantes de APOL1 y enfermedad renal.',
          ],
        },
      ],
    },
    enfermeiro: {
      summary:
        'Cómo el equipo de atención primaria identifica a quién hacer pruebas, acompaña a la persona con enfermedad renal crónica y orienta el autocuidado para proteger los riñones.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La enfermedad renal crónica es la pérdida lenta y progresiva de la capacidad de los riñones de filtrar la sangre. Casi siempre no da síntomas — por eso el equipo es decisivo para detectarla temprano con dos pruebas simples: creatinina en sangre y albúmina en orina.',
          ],
        },
        {
          heading: 'Quién necesita pruebas cada año',
          body: [
            'Personas con hipertensión o diabetes, enfermedad del corazón, obesidad, más de 60 años, familiares de personas con enfermedad renal o en diálisis, personas con enfermedad falciforme y quien usa antiinflamatorios con frecuencia.',
            'En la población negra, la combinación de hipertensión más precoz, diabetes y factores genéticos aumenta el riesgo. Pregunte activamente por casos de diálisis en la familia y registre correctamente el dato de raza/color.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'Hinchazón en piernas, pies o alrededor de los ojos; orina con espuma; orinar mucho de noche; presión difícil de controlar; cansancio, falta de apetito, náuseas, picazón y falta de aire en fases avanzadas.',
            'Señales de alarma para atención el mismo día: falta de aire importante, gran reducción de la orina, confusión, dolor en el pecho o potasio muy alto.',
          ],
        },
        {
          heading: 'Seguimiento en la unidad',
          body: [
            'Medir la presión en todas las consultas y verificar la adherencia; seguir la glucemia en personas con diabetes; mantener al día creatinina, potasio y albúmina en orina según el estadio.',
            'Revisar los medicamentos: evitar antiinflamatorios y automedicación, y verificar dosis ajustadas a la función renal. Mantener la vacunación al día, incluida hepatitis B. Organizar la derivación a nefrología cuando corresponda y continuar el vínculo con la unidad.',
          ],
        },
        {
          heading: 'Orientación al paciente y a la familia',
          body: [
            'Explicar que la enfermedad tiene tratamiento y que controlar la presión y el azúcar en sangre protege los riñones. Orientar menos sal y menos ultraprocesados, actividad física posible y no fumar.',
            'Cuando la enfermedad avanza, conversar con antelación sobre diálisis y trasplante, ofrecidos por el SUS, para una decisión informada y no tomada en la urgencia.',
          ],
        },
      ],
    },
    usuario: {
      summary:
        'Los riñones limpian la sangre en silencio. Cuando enferman casi no dan señales — pero dos pruebas simples, gratuitas en el SUS, muestran si todo está bien.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La enfermedad renal crónica es cuando los riñones van perdiendo, poco a poco, la fuerza para filtrar la sangre y sacar del cuerpo lo que no sirve. Puede pasar años sin dar ninguna señal.',
          ],
        },
        {
          heading: 'Por qué importa para la población negra',
          body: [
            'La presión alta y la diabetes son las principales causas de enfermedad de los riñones — y las dos aparecen antes y con más fuerza en personas negras. Algunas familias negras también tienen una herencia genética que hace los riñones más sensibles.',
            'Por eso detectarla temprano lo cambia todo: con cuidado, se puede frenar la enfermedad y evitar la diálisis.',
          ],
        },
        {
          heading: 'Señales de alerta',
          body: [
            'Hinchazón en piernas, pies o cara; orina con espuma; levantarse muchas veces de noche para orinar; presión alta que no baja; cansancio sin explicación.',
            'Muchas veces no hay ninguna señal. Si tiene presión alta, diabetes o alguien de la familia hace diálisis, pida las pruebas aunque se sienta bien.',
          ],
        },
        {
          heading: 'Cuidados del día a día',
          body: [
            'Tome los remedios de la presión y de la diabetes todos los días, como acordó con el equipo de salud.',
            'Evite remedios para el dolor y la inflamación por su cuenta (como ibuprofeno y diclofenaco): pueden dañar los riñones. Pregunte antes en la farmacia o en la unidad de salud.',
            'Use menos sal, prefiera comida de verdad, mueva el cuerpo como pueda y no fume.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'En la Unidad Básica de Salud (UBS) usted pide las pruebas de sangre (creatinina) y de orina (albúmina), sin costo. El equipo le acompaña y le deriva al especialista en riñones (nefrólogo) cuando sea necesario.',
            'Si la enfermedad avanza, la diálisis y el trasplante de riñón los ofrece el SUS. Usted tiene derecho a ser atendido(a) con respeto y sin discriminación — si eso no ocurre, busque la Ouvidoria.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Ministerio de Salud de Brasil',
      detail: 'Directrices Clínicas para el Cuidado del Paciente con Enfermedad Renal Crónica en el SUS.',
    },
    {
      label: 'KDIGO 2024',
      detail: 'Guía internacional de evaluación y manejo de la enfermedad renal crónica.',
    },
    {
      label: 'Sociedad Brasileña de Nefrología (SBN)',
      detail: 'Censo Brasileño de Diálisis — personas en diálisis en el país y financiamiento por el SUS.',
    },
    {
      label: 'NKF-ASN 2021 / Science 2010 / NEJM 2013',
      detail: 'Estimación de la función renal sin coeficiente racial y evidencia sobre las variantes del gen APOL1.',
    },
  ],
};

export const doencaRenalCronicaContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: doencaRenalCronicaContent_pt,
  es: doencaRenalCronicaContent_es,
};
