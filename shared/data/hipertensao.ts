// Conteúdo enriquecido — Hipertensão Arterial Sistêmica (HAS)
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
  url: 'https://sspark.genspark.ai/i/DYbur7l9KsuZidYX?width=2560',
  alt: 'Medição da pressão arterial com esfigmomanômetro e manguito no braço de uma pessoa',
  credit: 'Imagem placeholder (CC/PD) — substituir por material próprio se necessário',
  isPlaceholder: true as const,
};

const heroImage_es = {
  url: 'https://sspark.genspark.ai/i/DYbur7l9KsuZidYX?width=2560',
  alt: 'Medición de la presión arterial con esfigmomanómetro y brazalete en el brazo de una persona',
  credit: 'Imagen de relleno (CC/PD) — sustituir por material propio si es necesario',
  isPlaceholder: true as const,
};

const hipertensaoContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,
  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Fisiopatologia, estratificação de risco, metas pressóricas, racional terapêutico e evidência sobre disparidades raciais no controle da hipertensão arterial sistêmica (HAS).',
      sections: [
        {
          heading: 'O que é — fisiopatologia',
          body: [
            'A hipertensão arterial sistêmica (HAS) é uma condição crônica multifatorial caracterizada pela elevação sustentada da pressão arterial (PA), decorrente da interação entre determinantes genéticos, neuro-hormonais (sistema renina-angiotensina-aldosterona, sistema nervoso simpático), metabólicos e ambientais. Não é apenas um "número elevado": é o principal fator de risco modificável para doença cardiovascular, AVC, doença renal crônica e morte prematura.',
            'Mecanismos relevantes na população negra incluem maior sensibilidade ao sódio, menor atividade de renina plasmática em parte dos indivíduos, maior rigidez arterial e maior prevalência de hipertrofia ventricular esquerda e de nefropatia — combinados a variantes genéticas (ex.: APOL1) que aceleram a perda de função renal. Esses fatores explicam por que a HAS na população negra tende a ser mais precoce, mais grave e mais resistente ao tratamento.',
            'O conceito de "weathering" (desgaste alostático) descreve como a exposição crônica ao estresse do racismo estrutural se traduz em carga cardiovascular cumulativa — um determinante social com efeito biológico mensurável.',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'Pessoas negras apresentam prevalência de HAS significativamente maior e iniciam a doença em idades mais jovens que a população branca, com pior controle pressórico mesmo em tratamento farmacológico equivalente — padrão atribuído à combinação de biologia, acesso desigual e viés institucional no manejo.',
            'No Distrito Federal, a mortalidade cardiovascular padronizada por idade é cerca de 50% maior em negros (180/100.000) do que em brancos (120/100.000) — razão 1,50. A hipertensão é o principal fator de risco modificável dessa disparidade.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'Diagnóstico de consultório: PA ≥ 140/90 mmHg em pelo menos duas ocasiões distintas. Valores ≥ 180/120 mmHg exigem reavaliação imediata e investigação de lesão aguda de órgão-alvo. Para confirmação e diagnóstico de hipertensão do avental branco e mascarada, utilizar MRPA (Monitorização Residencial da PA) ou MAPA (Monitorização Ambulatorial da PA).',
            'A investigação inicial deve incluir avaliação de risco cardiovascular global, pesquisa de lesão de órgão-alvo (eletrocardiograma/ecocardiograma, creatinina e taxa de filtração glomerular, relação albumina/creatinina urinária, fundoscopia) e rastreio de causas secundárias quando indicado (por exemplo, em hipertensão resistente ou de início precoce).',
            'Na população negra, a avaliação de função renal deve ocorrer precocemente e ser repetida com frequência, dada a maior prevalência de nefropatia hipertensiva e a contribuição de variantes do gene APOL1.',
          ],
        },
        {
          heading: 'Tratamento e condutas',
          body: [
            'As diretrizes brasileiras (SBC) recomendam iniciar a terapia anti-hipertensiva com combinação de duas classes em baixa dose na maioria dos pacientes, com meta pressórica individualizada (usualmente < 130/80 mmHg quando tolerada).',
            'Na população negra, o perfil de resposta favorece esquemas com bloqueador de canal de cálcio (BCC) e/ou diurético tiazídico; IECA/BRA são particularmente importantes quando há nefropatia, albuminúria ou diabetes associados. A escolha deve considerar comorbidades e não a raça isoladamente, evitando tanto o subtratamento quanto a estereotipagem.',
            'Medidas não farmacológicas (redução de sódio, padrão alimentar tipo DASH adaptado à cultura alimentar local, atividade física, redução de álcool, manejo do estresse) potencializam o controle e reduzem a carga medicamentosa.',
            'Ponto crítico de equidade: há evidência de que pacientes negros recebem intensificação terapêutica menos agressiva e têm menor probabilidade de atingir a meta pressórica. O racismo institucional — e não a "não adesão" presumida — deve ser considerado ativamente na explicação do controle inadequado.',
          ],
        },
        {
          heading: 'Quando referenciar / sinais de alarme clínico',
          body: [
            'Emergência hipertensiva (PA muito elevada com lesão aguda de órgão-alvo: encefalopatia, AVC, edema agudo de pulmão, síndrome coronariana aguda, dissecção de aorta, insuficiência renal aguda) exige redução pressórica controlada em ambiente hospitalar — não redução abrupta.',
            'Hipertensão resistente (PA acima da meta apesar de três fármacos, incluindo um diurético) deve motivar investigação de causas secundárias (apneia do sono, hiperaldosteronismo primário, doença renal parenquimatosa, estenose de artéria renal) e encaminhamento a especialista.',
            'Hipertensão de início precoce, hipocalemia espontânea, sopro abdominal ou deterioração rápida da função renal pedem investigação dirigida e referência.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Diretrizes Brasileiras de Hipertensão Arterial — Sociedade Brasileira de Cardiologia (SBC).',
            'Protocolo Clínico e Diretrizes Terapêuticas (PCDT) de Hipertensão Arterial Sistêmica — Ministério da Saúde.',
            'Estudo Técnico-Científico "Condições de Vida e Saúde da População Negra do DF (2015–2024)" — AECID/APRECIA/FIOCRUZ/UnB/FEPECS.',
            'Literatura internacional (NEJM, Lancet, AHA/ACC) sobre disparidades raciais em hipertensão e mortalidade cardiovascular.',
          ],
        },
      ],
    },

    // ======================= ENFERMEIROS E TÉCNICOS =======================
    enfermeiro: {
      summary:
        'Medição correta da pressão, triagem de risco, orientação de autocuidado e cuidado continuado de pessoas com hipertensão na Atenção Básica e na urgência.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'A hipertensão é uma doença crônica em que a pressão do sangue nas artérias fica alta de forma persistente. Ela costuma não dar sintomas — por isso é chamada de "assassina silenciosa" — mas, sem controle, sobrecarrega o coração, o cérebro e os rins.',
            'É uma das condições mais frequentes na Atenção Básica e uma das que mais se beneficiam de acompanhamento contínuo e de uma boa relação de confiança entre equipe e usuário.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'A maioria das pessoas hipertensas é assintomática — não espere sintomas para medir a pressão. Cefaleia, tontura, visão turva e dor no peito podem aparecer, mas não são confiáveis para diagnóstico.',
            'Sinais de alarme que exigem avaliação médica imediata: dor no peito, falta de ar, déficit súbito de força ou fala, visão turva intensa e súbita, confusão — podem indicar emergência hipertensiva (AVC, infarto, edema agudo de pulmão).',
            'Pressão muito elevada (por exemplo, ≥ 180/120 mmHg) sem sintomas é "urgência hipertensiva": reavalie após repouso, confirme com medida repetida e acione a equipe médica conforme protocolo.',
          ],
        },
        {
          heading: 'Medição correta da pressão — passo a passo na unidade',
          body: [
            'A técnica correta muda o resultado: pessoa sentada, costas apoiadas, pés no chão, braço apoiado na altura do coração, sem falar durante a medida, bexiga vazia e sem café/cigarro nos 30 minutos anteriores.',
            'Use manguito de tamanho adequado à circunferência do braço — manguito pequeno superestima a pressão. Faça ao menos duas medidas com intervalo de 1 minuto e registre a média.',
            'Registre os valores no prontuário e no cartão do usuário a cada visita — o histórico é o que revela a tendência real, que uma única medida isolada não mostra.',
          ],
        },
        {
          heading: 'Quem fica atento — grupos de risco e acompanhamento',
          body: [
            'Priorize acompanhamento de pessoas negras, que têm maior risco de hipertensão precoce e mais grave, além de maior chance de doença renal associada — a avaliação de função renal deve ser frequente.',
            'Grupos que exigem atenção redobrada: pessoas com diabetes, doença renal, obesidade, histórico familiar de hipertensão ou de AVC precoce, gestantes (risco de pré-eclâmpsia) e idosos.',
            'Gestantes negras merecem vigilância reforçada de pressão e sinais de pré-eclâmpsia — a mortalidade materna por causas hipertensivas é desproporcionalmente maior entre mulheres negras.',
          ],
        },
        {
          heading: 'Cuidado continuado e orientação ao paciente/família',
          body: [
            'Explique, em linguagem simples, que hipertensão não tem cura, mas tem controle — e que o tratamento é para a vida toda, mesmo quando a pessoa se sente bem.',
            'Oriente sobre uso correto e contínuo dos medicamentos, redução de sal, atividade física regular e retorno às consultas. A adesão depende muito do vínculo e do acolhimento da equipe.',
            'Chamada anti-racista: quando a pressão de uma pessoa negra não controla, não presuma "falta de adesão" — verifique acesso ao medicamento, dificuldades de transporte, efeitos adversos e se o esquema terapêutico foi de fato intensificado. Historicamente, pacientes negros são tratados com menos intensidade e têm menos chance de atingir a meta — é um viés a ser combatido ativamente na prática clínica.',
          ],
        },
      ],
    },

    // ============================== USUÁRIOS ===============================
    usuario: {
      summary:
        'O que é hipertensão, por que ela é tão importante para a população negra, sinais de alerta, cuidados do dia a dia e onde buscar ajuda no SUS.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'A hipertensão (pressão alta) é uma doença em que a pressão do sangue dentro das artérias fica alta quase o tempo todo. Ela é muito comum e quase sempre não dá sintomas — a pessoa pode se sentir bem e ainda assim ter pressão alta.',
            'Por isso é chamada de "assassina silenciosa": sem tratamento, ela vai, aos poucos, sobrecarregando o coração, o cérebro e os rins, e pode levar a infarto, AVC e doença renal.',
          ],
        },
        {
          heading: 'Por que isso importa',
          body: [
            'A população negra tem mais chance de ter pressão alta, costuma começar mais cedo e, muitas vezes, a pressão é mais difícil de controlar. No Distrito Federal, a morte por doenças do coração é cerca de 50% maior entre pessoas negras.',
            'A boa notícia: hipertensão tem controle. Com diagnóstico precoce, acompanhamento regular e uso correto dos remédios, dá para viver bem e reduzir muito o risco de complicações.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Procure atendimento imediatamente se tiver: dor no peito, falta de ar, dor de cabeça muito forte e súbita, fraqueza ou dificuldade para falar de um lado do corpo, visão turva de repente. Esses sinais podem indicar AVC ou infarto.',
            'Não espere sentir sintomas para medir a pressão: aproveite qualquer visita à Unidade Básica de Saúde (UBS) para verificar. Pressão alta sem sintoma continua machucando o corpo.',
            'Se a pressão estiver muito alta e você estiver com sintomas, vá à UPA ou pronto-socorro no mesmo dia.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Tome os remédios todos os dias, no horário certo, mesmo quando estiver se sentindo bem — a pressão só fica controlada com uso contínuo.',
            'Reduza o sal e os alimentos industrializados (embutidos, salgadinhos, temperos prontos); prefira comida fresca, feita em casa, e use temperos naturais como alho, cebola e ervas.',
            'Mexa-se: caminhar, dançar, subir escadas. Qualquer atividade física regular ajuda a baixar a pressão.',
            'Evite excesso de bebida alcoólica e não fume. Se tiver dificuldade para parar de fumar, peça apoio na UBS — o SUS oferece tratamento.',
            'Leve seu cartão de acompanhamento e o resultado das medidas em cada consulta; se um remédio não estiver disponível na farmácia, avise a equipe para buscar alternativa.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'A Unidade Básica de Saúde (UBS) é o lugar certo para medir a pressão, receber os remédios e acompanhar seu tratamento. O remédio para hipertensão é gratuito no SUS.',
            'Se estiver com sintomas graves (dor no peito, falta de ar, sinais de AVC), procure a UPA ou o pronto-socorro imediatamente ou ligue 192 (SAMU).',
            'Use a página "Rede SUS" desta plataforma para encontrar as unidades de saúde mais próximas de você no Distrito Federal.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Sociedade Brasileira de Cardiologia (SBC)',
      detail: 'Diretrizes Brasileiras de Hipertensão Arterial — referência nacional para diagnóstico e tratamento.',
    },
    {
      label: 'Ministério da Saúde — PCDT Hipertensão Arterial',
      detail: 'Protocolo Clínico e Diretrizes Terapêuticas vigente, referência normativa para a conduta no SUS.',
    },
    {
      label: 'Estudo Pop. Negra DF 2015–2024',
      detail: 'AECID/APRECIA/FIOCRUZ/UnB/FEPECS — Indicador 13 (mortalidade cardiovascular, razão negra/branca 1,50).',
    },
    {
      label: 'NEJM / AHA / Lancet',
      detail: 'Literatura internacional sobre disparidades raciais em prevalência, controle e desfechos da hipertensão.',
    },
  ],
};

const hipertensaoContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,
  audiences: {
    // ==================== MÉDICOS Y PERSONAL INVESTIGADOR ===================
    medico: {
      summary:
        'Fisiopatología, estratificación de riesgo, metas de presión, fundamento terapéutico y evidencia sobre las disparidades raciales en el control de la hipertensión arterial sistémica (HAS).',
      sections: [
        {
          heading: 'Qué es — fisiopatología',
          body: [
            'La hipertensión arterial sistémica (HAS) es una condición crónica multifactorial caracterizada por la elevación sostenida de la presión arterial (PA), resultante de la interacción entre determinantes genéticos, neurohormonales (sistema renina-angiotensina-aldosterona, sistema nervioso simpático), metabólicos y ambientales. No es solo un "número elevado": es el principal factor de riesgo modificable de enfermedad cardiovascular, ictus, enfermedad renal crónica y muerte prematura.',
            'Los mecanismos relevantes en la población negra incluyen mayor sensibilidad al sodio, menor actividad de renina plasmática en parte de los individuos, mayor rigidez arterial y mayor prevalencia de hipertrofia ventricular izquierda y de nefropatía — combinados con variantes genéticas (p. ej., APOL1) que aceleran la pérdida de función renal. Estos factores explican por qué la HAS en la población negra tiende a ser más precoz, más grave y más resistente al tratamiento.',
            'El concepto de "weathering" (desgaste alostático) describe cómo la exposición crónica al estrés del racismo estructural se traduce en una carga cardiovascular acumulativa — un determinante social con efecto biológico mensurable.',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'Las personas negras presentan una prevalencia de HAS significativamente mayor e inician la enfermedad a edades más tempranas que la población blanca, con peor control de la presión incluso con tratamiento farmacológico equivalente — patrón atribuido a la combinación de biología, acceso desigual y sesgo institucional en el manejo.',
            'En el Distrito Federal (Brasil), la mortalidad cardiovascular estandarizada por edad es cerca de un 50% mayor en negros (180/100.000) que en blancos (120/100.000) — razón 1,50. La hipertensión es el principal factor de riesgo modificable de esa disparidad.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'Diagnóstico en consulta: PA ≥ 140/90 mmHg en al menos dos ocasiones distintas. Los valores ≥ 180/120 mmHg exigen reevaluación inmediata e investigación de lesión aguda de órgano diana. Para confirmación y diagnóstico de hipertensión de bata blanca y enmascarada, utilizar MRPA (Monitorización Residencial de la PA) o MAPA (Monitorización Ambulatoria de la PA).',
            'La investigación inicial debe incluir evaluación del riesgo cardiovascular global, búsqueda de lesión de órgano diana (electrocardiograma/ecocardiograma, creatinina y tasa de filtración glomerular, relación albúmina/creatinina urinaria, fondo de ojo) y cribado de causas secundarias cuando esté indicado (por ejemplo, en hipertensión resistente o de inicio precoz).',
            'En la población negra, la evaluación de la función renal debe realizarse de forma precoz y repetirse con frecuencia, dada la mayor prevalencia de nefropatía hipertensiva y la contribución de variantes del gen APOL1.',
          ],
        },
        {
          heading: 'Tratamiento y conductas',
          body: [
            'Las directrices brasileñas (SBC) recomiendan iniciar la terapia antihipertensiva con combinación de dos clases en dosis baja en la mayoría de los pacientes, con meta de presión individualizada (habitualmente < 130/80 mmHg cuando se tolera).',
            'En la población negra, el perfil de respuesta favorece esquemas con bloqueador de canales de calcio (BCC) y/o diurético tiazídico; los IECA/BRA son particularmente importantes cuando hay nefropatía, albuminuria o diabetes asociadas. La elección debe considerar las comorbilidades y no la raza de forma aislada, evitando tanto el subtratamiento como la estereotipación.',
            'Las medidas no farmacológicas (reducción de sodio, patrón alimentario tipo DASH adaptado a la cultura alimentaria local, actividad física, reducción de alcohol, manejo del estrés) potencian el control y reducen la carga farmacológica.',
            'Punto crítico de equidad: existe evidencia de que los pacientes negros reciben una intensificación terapéutica menos agresiva y tienen menor probabilidad de alcanzar la meta de presión. El racismo institucional — y no la "no adherencia" presunta — debe considerarse activamente al explicar el control inadecuado.',
          ],
        },
        {
          heading: 'Cuándo referir / signos de alarma clínica',
          body: [
            'La emergencia hipertensiva (PA muy elevada con lesión aguda de órgano diana: encefalopatía, ictus, edema agudo de pulmón, síndrome coronario agudo, disección de aorta, insuficiencia renal aguda) exige reducción de la presión controlada en ambiente hospitalario — no reducción abrupta.',
            'La hipertensión resistente (PA por encima de la meta a pesar de tres fármacos, incluido un diurético) debe motivar la investigación de causas secundarias (apnea del sueño, hiperaldosteronismo primario, enfermedad renal parenquimatosa, estenosis de arteria renal) y la derivación a especialista.',
            'La hipertensión de inicio precoz, la hipopotasemia espontánea, el soplo abdominal o el deterioro rápido de la función renal requieren investigación dirigida y referencia.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Directrices Brasileñas de Hipertensión Arterial — Sociedad Brasileña de Cardiología (SBC).',
            'Protocolo Clínico y Directrices Terapéuticas (PCDT) de Hipertensión Arterial Sistémica — Ministerio de Salud de Brasil.',
            'Estudio Técnico-Científico "Condiciones de Vida y Salud de la Población Negra del DF (2015–2024)" — AECID/APRECIA/FIOCRUZ/UnB/FEPECS.',
            'Literatura internacional (NEJM, Lancet, AHA/ACC) sobre disparidades raciales en hipertensión y mortalidad cardiovascular.',
          ],
        },
      ],
    },

    // ================== ENFERMERÍA Y PERSONAL TÉCNICO =======================
    enfermeiro: {
      summary:
        'Medición correcta de la presión, cribado de riesgo, orientación de autocuidado y cuidado continuo de personas con hipertensión en la Atención Primaria y en urgencias.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La hipertensión es una enfermedad crónica en la que la presión de la sangre en las arterias se mantiene alta de forma persistente. Suele no dar síntomas — por eso se la llama "asesina silenciosa" — pero, sin control, sobrecarga el corazón, el cerebro y los riñones.',
            'Es una de las condiciones más frecuentes en la Atención Primaria y una de las que más se benefician del seguimiento continuo y de una buena relación de confianza entre el equipo y el usuario.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'La mayoría de las personas hipertensas son asintomáticas — no espere síntomas para medir la presión. La cefalea, el mareo, la visión borrosa y el dolor en el pecho pueden aparecer, pero no son fiables para el diagnóstico.',
            'Signos de alarma que exigen evaluación médica inmediata: dolor en el pecho, falta de aire, déficit súbito de fuerza o del habla, visión borrosa intensa y súbita, confusión — pueden indicar emergencia hipertensiva (ictus, infarto, edema agudo de pulmón).',
            'Presión muy elevada (por ejemplo, ≥ 180/120 mmHg) sin síntomas es "urgencia hipertensiva": reevalúe tras reposo, confirme con una medición repetida y active al equipo médico según el protocolo.',
          ],
        },
        {
          heading: 'Medición correcta de la presión — paso a paso en la unidad',
          body: [
            'La técnica correcta cambia el resultado: persona sentada, espalda apoyada, pies en el suelo, brazo apoyado a la altura del corazón, sin hablar durante la medición, vejiga vacía y sin café/tabaco en los 30 minutos previos.',
            'Use un brazalete del tamaño adecuado a la circunferencia del brazo — un brazalete pequeño sobreestima la presión. Realice al menos dos mediciones con un intervalo de 1 minuto y registre el promedio.',
            'Registre los valores en la historia clínica y en la tarjeta del usuario en cada visita — el historial es lo que revela la tendencia real, que una sola medición aislada no muestra.',
          ],
        },
        {
          heading: 'Quién debe estar atento — grupos de riesgo y seguimiento',
          body: [
            'Priorice el seguimiento de personas negras, que tienen mayor riesgo de hipertensión precoz y más grave, además de mayor probabilidad de enfermedad renal asociada — la evaluación de la función renal debe ser frecuente.',
            'Grupos que exigen especial atención: personas con diabetes, enfermedad renal, obesidad, antecedentes familiares de hipertensión o de ictus precoz, gestantes (riesgo de preeclampsia) y personas mayores.',
            'Las gestantes negras merecen una vigilancia reforzada de la presión y de los signos de preeclampsia — la mortalidad materna por causas hipertensivas es desproporcionadamente mayor entre las mujeres negras.',
          ],
        },
        {
          heading: 'Cuidado continuo y orientación al paciente/familia',
          body: [
            'Explique, en lenguaje sencillo, que la hipertensión no tiene cura, pero sí control — y que el tratamiento es para toda la vida, incluso cuando la persona se siente bien.',
            'Oriente sobre el uso correcto y continuo de los medicamentos, la reducción de sal, la actividad física regular y el regreso a las consultas. La adherencia depende mucho del vínculo y de la acogida del equipo.',
            'Llamado antirracista: cuando la presión de una persona negra no se controla, no presuma "falta de adherencia" — verifique el acceso al medicamento, las dificultades de transporte, los efectos adversos y si el esquema terapéutico se intensificó realmente. Históricamente, los pacientes negros son tratados con menos intensidad y tienen menos probabilidad de alcanzar la meta — es un sesgo que debe combatirse activamente en la práctica clínica.',
          ],
        },
      ],
    },

    // =============================== USUARIOS ================================
    usuario: {
      summary:
        'Qué es la hipertensión, por qué es tan importante para la población negra, señales de alerta, cuidados diarios y dónde buscar ayuda en el SUS.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La hipertensión (presión alta) es una enfermedad en la que la presión de la sangre dentro de las arterias se mantiene alta casi todo el tiempo. Es muy común y casi nunca da síntomas — la persona puede sentirse bien y aun así tener la presión alta.',
            'Por eso se la llama "asesina silenciosa": sin tratamiento, va sobrecargando poco a poco el corazón, el cerebro y los riñones, y puede provocar infarto, ictus y enfermedad renal.',
          ],
        },
        {
          heading: 'Por qué esto importa',
          body: [
            'La población negra tiene más probabilidad de tener presión alta, suele comenzar más temprano y, muchas veces, la presión es más difícil de controlar. En el Distrito Federal, la muerte por enfermedades del corazón es cerca de un 50% mayor entre las personas negras.',
            'La buena noticia: la hipertensión se controla. Con diagnóstico precoz, seguimiento regular y uso correcto de los medicamentos, es posible vivir bien y reducir mucho el riesgo de complicaciones.',
          ],
        },
        {
          heading: 'Señales de alerta — esté atento(a)',
          body: [
            'Busque atención de inmediato si tiene: dolor en el pecho, falta de aire, dolor de cabeza muy fuerte y súbito, debilidad o dificultad para hablar de un lado del cuerpo, visión borrosa repentina. Estas señales pueden indicar ictus o infarto.',
            'No espere sentir síntomas para medir la presión: aproveche cualquier visita a la Unidad Básica de Salud (UBS) para verificarla. La presión alta sin síntomas sigue dañando el cuerpo.',
            'Si la presión está muy alta y usted tiene síntomas, acuda a la UPA o al servicio de urgencias el mismo día.',
          ],
        },
        {
          heading: 'Cuidados del día a día',
          body: [
            'Tome los medicamentos todos los días, a la hora correcta, incluso cuando se sienta bien — la presión solo se mantiene controlada con el uso continuo.',
            'Reduzca la sal y los alimentos industrializados (embutidos, snacks, condimentos listos); prefiera la comida fresca, hecha en casa, y use condimentos naturales como ajo, cebolla y hierbas.',
            'Muévase: caminar, bailar, subir escaleras. Cualquier actividad física regular ayuda a bajar la presión.',
            'Evite el exceso de alcohol y no fume. Si le cuesta dejar de fumar, pida apoyo en la UBS — el SUS ofrece tratamiento.',
            'Lleve su tarjeta de seguimiento y el resultado de las mediciones a cada consulta; si un medicamento no está disponible en la farmacia, avise al equipo para buscar una alternativa.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'La Unidad Básica de Salud (UBS) es el lugar correcto para medir la presión, recibir los medicamentos y seguir su tratamiento. El medicamento para la hipertensión es gratuito en el SUS.',
            'Si tiene síntomas graves (dolor en el pecho, falta de aire, señales de ictus), acuda a la UPA o al servicio de urgencias de inmediato o llame al 192 (SAMU).',
            'Use la página "Red SUS" de esta plataforma para encontrar las unidades de salud más cercanas a usted en el Distrito Federal.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Sociedad Brasileña de Cardiología (SBC)',
      detail: 'Directrices Brasileñas de Hipertensión Arterial — referencia nacional para diagnóstico y tratamiento.',
    },
    {
      label: 'Ministerio de Salud de Brasil — PCDT Hipertensión Arterial',
      detail: 'Protocolo Clínico y Directrices Terapéuticas vigente, referencia normativa para la conducta en el SUS.',
    },
    {
      label: 'Estudio Población Negra DF 2015–2024',
      detail: 'AECID/APRECIA/FIOCRUZ/UnB/FEPECS — Indicador 13 (mortalidad cardiovascular, razón negra/blanca 1,50).',
    },
    {
      label: 'NEJM / AHA / Lancet',
      detail: 'Literatura internacional sobre disparidades raciales en prevalencia, control y desenlaces de la hipertensión.',
    },
  ],
};

export const hipertensaoContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: hipertensaoContent_pt,
  es: hipertensaoContent_es,
};
