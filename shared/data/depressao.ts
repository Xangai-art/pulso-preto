// Conteúdo enriquecido — Depressão (Transtorno Depressivo Maior)
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
// Recorte racial obrigatório (chamadas anti-racismo) — foco em subdiagnóstico,
// estigma e no efeito do racismo como determinante de sofrimento psíquico.
// Parceria institucional prevista: ABP (Associação Brasileira de Psiquiatria).
// Consumido via getDeepContent(diseaseId, localeId) — ver
// site|app/src/data/deepContentRegistry.ts.

import type { LocaleId } from './locales';
import type { DiseaseDeepContent } from './anemiaFalciforme';

const heroImage_pt = {
  url: 'https://sspark.genspark.ai/i/JKe27K9j1WJNZSzz?width=2560',
  alt: 'Pessoa sentada em silêncio, com expressão de reflexão, representando o sofrimento psíquico da depressão',
  credit: 'Imagem placeholder (CC/PD) — substituir por material próprio se necessário',
  isPlaceholder: true as const,
};

const heroImage_es = {
  url: 'https://sspark.genspark.ai/i/JKe27K9j1WJNZSzz?width=2560',
  alt: 'Persona sentada en silencio, con expresión de reflexión, representando el sufrimiento psíquico de la depresión',
  credit: 'Imagen de relleno (CC/PD) — sustituir por material propio si es necesario',
  isPlaceholder: true as const,
};

const depressaoContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,
  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Fisiopatologia e classificação do transtorno depressivo maior, critérios diagnósticos, diagnóstico diferencial, opções terapêuticas e evidência sobre subdiagnóstico e disparidades raciais no tratamento.',
      sections: [
        {
          heading: 'O que é — fisiopatologia',
          body: [
            'O transtorno depressivo maior (TDM) é um transtorno do humor caracterizado por tristeza persistente e/ou anedonia (perda de interesse e prazer), acompanhadas de alterações cognitivas, motoras e neurovegetativas (sono, apetite, energia), com prejuízo funcional significativo.',
            'A fisiopatologia é multifatorial e envolve disfunção de circuitos corticolímbicos, desregulação de monoaminas, alterações do eixo hipotálamo-hipófise-adrenal (HPA), neuroinflamação, alterações neuroplásticas (fator neurotrófico derivado do cérebro — BDNF) e fatores genéticos e epigenéticos.',
            'Determinantes sociais desempenham papel central: exposição crônica ao estresse (incluindo o estresse do racismo estrutural e da discriminação), violência, insegurança financeira e alimentar, e isolamento social alteram de forma mensurável o eixo HPA e a carga alostática — tornando o racismo um determinante de sofrimento psíquico, e não um "fator de risco" abstrato.',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'Pessoas negras apresentam carga de sofrimento psíquico igual ou maior que a população branca, mas taxas menores de diagnóstico e de tratamento adequado. O quadro é frequentemente subdiagnosticado ou tratado apenas como sintoma somático, refletindo racismo institucional e estigma.',
            'Quando diagnosticadas, pessoas negras têm menor probabilidade de receber psicoterapia, medicamentos adequados em dose e tempo corretos, e acompanhamento continuado. A depressão pós-parto em mulheres negras é particularmente sub-reconhecida, apesar do maior risco.',
            'O racismo — interpessoal e estrutural — funciona como expositor crônico e fator de manutenção do sofrimento. Reconhecer isso é essencial para não reduzir a depressão na população negra a uma questão individual, descontextualizada das condições de vida.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'O diagnóstico é clínico, baseado nos critérios do DSM-5-TR ou da CID-11. Para o episódio depressivo maior, exige-se humor deprimido e/ou anedonia por pelo menos duas semanas, acompanhados de pelo menos cinco sintomas (alterações de sono, apetite, energia, concentração, psicomotricidade, sentimento de culpa/desvalia e ideação suicida).',
            'Sempre avaliar risco de suicídio de forma direta e cuidadosa — é uma emergência médica. Aplicar instrumentos de rastreio validados (PHQ-9, GAD-7) facilita a detecção, especialmente na Atenção Básica.',
            'Diagnóstico diferencial: transtorno bipolar (essencial antes de iniciar antidepressivo), hipotireoidismo, anemia, deficiência de vitamina B12/folato, uso de substâncias, efeitos de medicamentos e luto — além de condições médicas que mimetizam a depressão.',
          ],
        },
        {
          heading: 'Tratamento e condutas',
          body: [
            'O tratamento combina psicoterapia (terapia cognitivo-comportamental e outras abordagens baseadas em evidência), farmacoterapia (antidepressivos — ISRS como primeira linha) e intervenções psicossociais. A escolha considera gravidade, comorbidades, preferência do paciente e histórico de resposta.',
            'Casos graves, refratários ou com risco elevado de suicídio podem exigir combinação de medicamentos, potencialização, eletroconvulsoterapia (ECT) ou encaminhamento a serviços especializados. O tratamento deve ser continuado por tempo adequado para prevenir recaídas.',
            'Ponto crítico de equidade: não interpretar barreiras culturais ou experiências de racismo como "resistência ao tratamento". Construir vínculo, validar a experiência do paciente e garantir acesso equânime a psicoterapia (e não apenas medicação) é central — pessoas negras recebem menos psicoterapia e menos continuidade do cuidado.',
          ],
        },
        {
          heading: 'Quando referenciar / sinais de alarme clínico',
          body: [
            'Encaminhamento urgente/emergência: risco de suicídio, risco de auto ou heteroagressão, sintomas psicóticos, incapacidade funcional grave, recusa alimentar e sinais de catatonia — encaminhar imediatamente a serviço de urgência psiquiátrica ou CAPS 24h.',
            'Encaminhamento à atenção especializada: depressão refratária a dois antidepressivos em dose e tempo adequados, comorbidade com transtorno bipolar, uso de substâncias, transtorno de personalidade, gestação e puerpério, e quadros graves ou recorrentes.',
            'Articular com a rede psicossocial (CAPS, NASF/eMulti) e, quando houver vulnerabilidade social, com assistência social — a depressão frequentemente exige intervenção intersetorial.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Associação Brasileira de Psiquiatria (ABP) — diretrizes nacionais para o manejo da depressão.',
            'Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas de Depressão e linhas de cuidado em saúde mental.',
            'Organização Mundial da Saúde (OMS) / CID-11 e DSM-5-TR — critérios diagnósticos.',
            'Literatura sobre disparidades raciais em saúde mental (JAMA Psychiatry, estudos de subdiagnóstico em populações negras).',
          ],
        },
      ],
    },

    // ======================= ENFERMEIROS E TÉCNICOS =======================
    enfermeiro: {
      summary:
        'Rastreio e acolhimento do sofrimento psíquico, avaliação de risco de suicídio, apoio ao tratamento continuado e articulação com a rede de saúde mental na Atenção Básica.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'A depressão é mais do que tristeza passageira: é uma doença que afeta o humor, o pensamento, o sono, o apetite e a energia por semanas, atrapalhando a vida da pessoa. Não é "falta de força de vontade" nem preguiça.',
            'Ela tem tratamento e a maioria das pessoas melhora com acompanhamento. Na Atenção Básica, o enfermeiro tem papel central no acolhimento, no rastreio e no vínculo que faz a diferença na continuidade do cuidado.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'Sinais frequentes: tristeza persistente, perda de interesse e prazer, cansaço, alterações de sono (insônia ou dormir demais), mudanças de apetite, dificuldade de concentração, irritabilidade, choro fácil e sentimentos de culpa ou de não ter valor.',
            'Sinais de alerta que exigem ação imediata: falas sobre morrer, querer desaparecer, se machucar ou "dar um fim"; planejamento de suicídio; isolamento abrupto; sintomas psicóticos (ouvir vozes, ideias de perseguição). Nesses casos, acione a equipe e o serviço de urgência conforme protocolo.',
            'Atenção às queixas somáticas repetidas (dor, cansaço, insônia) sem causa aparente: em muitas pessoas, a depressão se manifesta primeiro no corpo — não descarte a possibilidade de sofrimento psíquico.',
          ],
        },
        {
          heading: 'Rastreio e acompanhamento na Atenção Básica',
          body: [
            'Priorize o rastreio em grupos de maior risco: mulheres negras (subdiagnóstico frequente), gestantes e puérperas, pessoas com doenças crônicas, uso de substâncias, perda recente, violência e vulnerabilidade social.',
            'Use instrumentos validados (PHQ-9, GAD-7) como apoio — eles ajudam a objetivar os sintomas e a acompanhar a evolução. Registre sempre a avaliação de risco de suicídio quando houver sinais.',
            'No acompanhamento: verifique adesão e efeitos dos medicamentos (nas primeiras semanas podem surgir náuseas, insônia ou inquietação), incentive a continuidade (o tratamento não pode ser interrompido ao se sentir melhor) e organize o retorno e o encaminhamento à psicologia/psiquiatria quando indicado.',
          ],
        },
        {
          heading: 'Quem fica atento — grupos de risco',
          body: [
            'Grupos que exigem atenção redobrada: pessoas negras (pelo subdiagnóstico e menor acesso a tratamento), mulheres, pessoas em situação de pobreza e insegurança alimentar, pessoas LGBTQIA+ expostas a discriminação, idosos, pessoas com doenças crônicas e com histórico de trauma e violência.',
            'Gestantes e puérperas: rastrear depressão perinatal, que é sub-reconhecida, sobretudo em mulheres negras. O cuidado precoce protege a mãe e o bebê.',
            'Profissionais e usuários: o sofrimento ligado ao racismo e à discriminação cotidiana deve ser levado a sério como fator de agravo, não como algo a ser minimizado.',
          ],
        },
        {
          heading: 'Cuidado continuado e orientação ao paciente/família',
          body: [
            'Acolha sem julgamento. Escute o que a pessoa traz, valide o sofrimento e explique, com clareza, que depressão é uma condição de saúde tratável — não uma fraqueza de caráter.',
            'Oriente sobre a importância de tomar a medicação no horário, de não interromper o tratamento quando melhorar e de retornar se piorar ou se surgirem pensamentos de morte. Oriente a família a acolher e a observar sinais de risco.',
            'Chamada anti-racista: o sofrimento psíquico de pessoas negras é frequentemente minimizado ("tem que ter fé", "é drama") ou atribuído apenas a questões morais ou religiosas. Não banalize: acolha, registre e encaminhe. Levar a sério a dor emocional é um ato de equidade e de combate ao racismo institucional em saúde.',
          ],
        },
      ],
    },

    // ============================== USUÁRIOS ===============================
    usuario: {
      summary:
        'O que é depressão, por que ela merece atenção na população negra, sinais de alerta, cuidados do dia a dia e onde buscar ajuda gratuita no SUS.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'Depressão não é frescura nem falta de força de vontade. É uma doença que afeta o humor, o sono, o apetite, a energia e o jeito de pensar por semanas seguidas, atrapalhando o trabalho, os estudos e as relações.',
            'É uma condição de saúde como qualquer outra, tem tratamento e a maioria das pessoas melhora. Buscar ajuda não é sinal de fraqueza — é sinal de cuidado consigo mesmo.',
          ],
        },
        {
          heading: 'Por que isso importa',
          body: [
            'Muitas pessoas negras têm o sofrimento emocional desvalorizado — ouvem que é "falta de fé", "drama" ou "coisa da cabeça". Isso faz muita gente não buscar ajuda e viver anos com uma doença tratável.',
            'O racismo, o preconceito e as dificuldades do dia a dia pesam sobre a saúde mental e não são "culpa" de quem sofre. Falar sobre isso e procurar apoio é um direito e um cuidado com a sua vida.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Procure ajuda se, por mais de duas semanas, você tiver: tristeza que não passa, perda de interesse pelas coisas de que gostava, cansaço, mudanças no sono ou no apetite, dificuldade de concentração, irritação, choro fácil ou sentimento de não valer nada.',
            'Vá imediatamente a um serviço de saúde (ou ligue 188 — CVV, 24h) se tiver pensamentos de morrer, de se machucar ou de "desaparecer". Você não está só, isso tem tratamento e existe ajuda gratuita.',
            'Cansaço e dores no corpo que não melhoram também podem ser sinais de depressão — vale conversar sobre o que você sente por dentro, não só sobre o corpo.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Converse com alguém de confiança e com a equipe da UBS. Falar sobre o que sente é parte do tratamento — não guarde tudo sozinho(a).',
            'Tome o remédio, quando prescrito, todos os dias e no horário certo. Ele pode levar algumas semanas para fazer efeito — não pare ao se sentir melhor, sem falar com o profissional.',
            'Cuide do básico: procure dormir em horários regulares, alimente-se, movimente o corpo (uma caminhada já ajuda) e evite álcool e outras drogas, que pioram o quadro.',
            'Busque apoio e pertencimento: grupos, comunidade, fé, amigos. A rede de apoio faz diferença — mas não substitui o tratamento.',
            'Tenha paciência consigo mesmo(a): a melhora vem aos poucos, com altos e baixos. Isso é normal e não significa que você está falhando.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'A Unidade Básica de Saúde (UBS) é a porta de entrada: a equipe acolhe, avalia e oferece acompanhamento. O CAPS (Centro de Atenção Psicossocial) é o serviço especializado em saúde mental — também é gratuito e atende sem necessidade de encaminhamento.',
            'Em crises, pensamentos de morte ou risco de se machucar, procure imediatamente uma UPA/pronto-socorro, o CAPS 24h ou ligue 192 (SAMU). O CVV atende 24h, de graça, pelo telefone 188 e pelo chat.',
            'Use a página "Rede SUS" desta plataforma para encontrar as unidades e os serviços de saúde mental mais próximos de você no Distrito Federal.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Associação Brasileira de Psiquiatria (ABP)',
      detail: 'Diretrizes nacionais para o diagnóstico e o manejo da depressão — referência clínica e apoio técnico de conteúdo.',
    },
    {
      label: 'Ministério da Saúde — PCDT e linhas de cuidado em saúde mental',
      detail: 'Protocolo Clínico e Diretrizes Terapêuticas de Depressão e organização da Rede de Atenção Psicossocial (RAPS).',
    },
    {
      label: 'OMS / DSM-5-TR / CID-11',
      detail: 'Critérios diagnósticos e diretrizes internacionais para transtornos depressivos.',
    },
    {
      label: 'JAMA Psychiatry / estudos de disparidade racial',
      detail: 'Evidência de subdiagnóstico e menor acesso a tratamento adequado para pessoas negras com depressão.',
    },
  ],
};

const depressaoContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,
  audiences: {
    // ==================== MÉDICOS Y PERSONAL INVESTIGADOR ===================
    medico: {
      summary:
        'Fisiopatología y clasificación del trastorno depresivo mayor, criterios diagnósticos, diagnóstico diferencial, opciones terapéuticas y evidencia sobre subdiagnóstico y disparidades raciales en el tratamiento.',
      sections: [
        {
          heading: 'Qué es — fisiopatología',
          body: [
            'El trastorno depresivo mayor (TDM) es un trastorno del humor caracterizado por tristeza persistente y/o anhedonia (pérdida de interés y placer), acompañadas de alteraciones cognitivas, motoras y neurovegetativas (sueño, apetito, energía), con deterioro funcional significativo.',
            'La fisiopatología es multifactorial e involucra disfunción de circuitos corticolímbicos, desregulación de monoaminas, alteraciones del eje hipotálamo-hipófisis-suprarrenal (HPA), neuroinflamación, cambios neuroplásticos (factor neurotrófico derivado del cerebro — BDNF) y factores genéticos y epigenéticos.',
            'Los determinantes sociales desempeñan un papel central: la exposición crónica al estrés (incluido el estrés del racismo estructural y de la discriminación), la violencia, la inseguridad financiera y alimentaria, y el aislamiento social alteran de forma mensurable el eje HPA y la carga alostática — convirtiendo el racismo en un determinante del sufrimiento psíquico, y no en un "factor de riesgo" abstracto.',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'Las personas negras presentan una carga de sufrimiento psíquico igual o mayor que la población blanca, pero tasas menores de diagnóstico y de tratamiento adecuado. El cuadro es frecuentemente subdiagnosticado o tratado solo como síntoma somático, reflejando racismo institucional y estigma.',
            'Cuando se diagnostican, las personas negras tienen menor probabilidad de recibir psicoterapia, medicamentos adecuados en dosis y tiempo correctos, y seguimiento continuo. La depresión posparto en mujeres negras está particularmente subreconocida, a pesar del mayor riesgo.',
            'El racismo — interpersonal y estructural — funciona como expositor crónico y factor de mantenimiento del sufrimiento. Reconocerlo es esencial para no reducir la depresión en la población negra a una cuestión individual, descontextualizada de las condiciones de vida.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'El diagnóstico es clínico, basado en los criterios del DSM-5-TR o de la CIE-11. Para el episodio depresivo mayor, se exige humor deprimido y/o anhedonia durante al menos dos semanas, acompañados de al menos cinco síntomas (alteraciones del sueño, apetito, energía, concentración, psicomotricidad, sentimiento de culpa/desvalorización e ideación suicida).',
            'Siempre evaluar el riesgo de suicidio de forma directa y cuidadosa — es una urgencia médica. Aplicar instrumentos de cribado validados (PHQ-9, GAD-7) facilita la detección, especialmente en la Atención Primaria.',
            'Diagnóstico diferencial: trastorno bipolar (esencial antes de iniciar un antidepresivo), hipotiroidismo, anemia, deficiencia de vitamina B12/folato, uso de sustancias, efectos de medicamentos y duelo — además de condiciones médicas que simulan la depresión.',
          ],
        },
        {
          heading: 'Tratamiento y conductas',
          body: [
            'El tratamiento combina psicoterapia (terapia cognitivo-conductual y otros enfoques basados en evidencia), farmacoterapia (antidepresivos — ISRS como primera línea) e intervenciones psicosociales. La elección considera gravedad, comorbilidades, preferencia del paciente y antecedente de respuesta.',
            'Los casos graves, refractarios o con riesgo elevado de suicidio pueden exigir combinación de medicamentos, potenciación, terapia electroconvulsiva (TEC) o derivación a servicios especializados. El tratamiento debe continuarse durante el tiempo adecuado para prevenir recaídas.',
            'Punto crítico de equidad: no interpretar las barreras culturales o las experiencias de racismo como "resistencia al tratamiento". Construir vínculo, validar la experiencia del paciente y garantizar un acceso equitativo a psicoterapia (y no solo medicación) es central — las personas negras reciben menos psicoterapia y menos continuidad del cuidado.',
          ],
        },
        {
          heading: 'Cuándo derivar / señales de alarma clínica',
          body: [
            'Derivación urgente/emergencia: riesgo de suicidio, riesgo de auto o heteroagresión, síntomas psicóticos, incapacidad funcional grave, rechazo alimentario y señales de catatonía — derivar de inmediato a un servicio de urgencia psiquiátrica o CAPS 24 h.',
            'Derivación a la atención especializada: depresión refractaria a dos antidepresivos en dosis y tiempo adecuados, comorbilidad con trastorno bipolar, uso de sustancias, trastorno de personalidad, embarazo y puerperio, y cuadros graves o recurrentes.',
            'Articular con la red psicosocial (CAPS, equipos multiprofesionales) y, cuando haya vulnerabilidad social, con asistencia social — la depresión exige con frecuencia una intervención intersectorial.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Asociación Brasileña de Psiquiatría (ABP) — directrices nacionales para el manejo de la depresión.',
            'Ministerio de Salud de Brasil — Protocolo Clínico y Directrices Terapéuticas de Depresión y líneas de cuidado en salud mental.',
            'Organización Mundial de la Salud (OMS) / CIE-11 y DSM-5-TR — criterios diagnósticos.',
            'Literatura sobre disparidades raciales en salud mental (JAMA Psychiatry, estudios de subdiagnóstico en poblaciones negras).',
          ],
        },
      ],
    },

    // ====================== ENFERMEROS Y TÉCNICOS ==========================
    enfermeiro: {
      summary:
        'Cribado y acogida del sufrimiento psíquico, evaluación del riesgo de suicidio, apoyo al tratamiento continuo y articulación con la red de salud mental en la Atención Primaria.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La depresión es más que tristeza pasajera: es una enfermedad que afecta el humor, el pensamiento, el sueño, el apetito y la energía durante semanas, dificultando la vida de la persona. No es "falta de voluntad" ni pereza.',
            'Tiene tratamiento y la mayoría de las personas mejora con seguimiento. En la Atención Primaria, el enfermero tiene un papel central en la acogida, el cribado y el vínculo que marca la diferencia en la continuidad del cuidado.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'Señales frecuentes: tristeza persistente, pérdida de interés y placer, cansancio, alteraciones del sueño (insomnio o dormir demasiado), cambios de apetito, dificultad de concentración, irritabilidad, llanto fácil y sentimientos de culpa o de no valer nada.',
            'Señales de alarma que exigen acción inmediata: hablar de morir, querer desaparecer, lastimarse o "acabar con todo"; planificación de suicidio; aislamiento abrupto; síntomas psicóticos (oír voces, ideas de persecución). En esos casos, active al equipo y al servicio de urgencia según protocolo.',
            'Atención a las quejas somáticas repetidas (dolor, cansancio, insomnio) sin causa aparente: en muchas personas, la depresión se manifiesta primero en el cuerpo — no descarte la posibilidad de sufrimiento psíquico.',
          ],
        },
        {
          heading: 'Cribado y seguimiento en la Atención Primaria',
          body: [
            'Priorice el cribado en grupos de mayor riesgo: mujeres negras (subdiagnóstico frecuente), gestantes y puérperas, personas con enfermedades crónicas, uso de sustancias, pérdida reciente, violencia y vulnerabilidad social.',
            'Use instrumentos validados (PHQ-9, GAD-7) como apoyo — ayudan a objetivar los síntomas y a seguir la evolución. Registre siempre la evaluación del riesgo de suicidio cuando haya señales.',
            'En el seguimiento: verifique la adherencia y los efectos de los medicamentos (en las primeras semanas pueden aparecer náuseas, insomnio o inquietud), incentive la continuidad (el tratamiento no puede interrumpirse al sentirse mejor) y organice el retorno y la derivación a psicología/psiquiatría cuando esté indicado.',
          ],
        },
        {
          heading: 'Quién debe estar atento — grupos de riesgo',
          body: [
            'Grupos que exigen atención redoblada: personas negras (por el subdiagnóstico y menor acceso a tratamiento), mujeres, personas en situación de pobreza e inseguridad alimentaria, personas LGBTQIA+ expuestas a discriminación, ancianos, personas con enfermedades crónicas y con antecedente de trauma y violencia.',
            'Gestantes y puérperas: cribar la depresión perinatal, que está subreconocida, sobre todo en mujeres negras. El cuidado precoz protege a la madre y al bebé.',
            'El sufrimiento ligado al racismo y a la discriminación cotidiana debe tomarse en serio como factor de agravamiento, no como algo que deba minimizarse.',
          ],
        },
        {
          heading: 'Cuidado continuo y orientación al paciente/familia',
          body: [
            'Acoja sin juzgar. Escuche lo que la persona trae, valide el sufrimiento y explique, con claridad, que la depresión es una condición de salud tratable — no una debilidad de carácter.',
            'Oriente sobre la importancia de tomar la medicación en el horario, de no interrumpir el tratamiento cuando mejore y de regresar si empeora o si surgen pensamientos de muerte. Oriente a la familia a acoger y observar señales de riesgo.',
            'Llamado antirracista: el sufrimiento psíquico de las personas negras es frecuentemente minimizado ("hay que tener fe", "es drama") o atribuido solo a cuestiones morales o religiosas. No banalice: acoja, registre y derive. Tomar en serio el dolor emocional es un acto de equidad y de combate al racismo institucional en salud.',
          ],
        },
      ],
    },

    // ============================== USUARIOS ===============================
    usuario: {
      summary:
        'Qué es la depresión, por qué merece atención en la población negra, señales de alerta, cuidados diarios y dónde buscar ayuda gratuita en el SUS.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'La depresión no es exageración ni falta de voluntad. Es una enfermedad que afecta el humor, el sueño, el apetito, la energía y la forma de pensar durante semanas seguidas, dificultando el trabajo, los estudios y las relaciones.',
            'Es una condición de salud como cualquier otra, tiene tratamiento y la mayoría de las personas mejora. Buscar ayuda no es señal de debilidad — es una señal de cuidado con uno mismo.',
          ],
        },
        {
          heading: 'Por qué importa',
          body: [
            'A muchas personas negras se les desvaloriza el sufrimiento emocional — oyen que es "falta de fe", "drama" o "cosa de la cabeza". Eso hace que mucha gente no busque ayuda y viva años con una enfermedad tratable.',
            'El racismo, el prejuicio y las dificultades del día a día pesan sobre la salud mental y no son "culpa" de quien sufre. Hablar de esto y buscar apoyo es un derecho y un cuidado con tu vida.',
          ],
        },
        {
          heading: 'Señales de alerta — mantente atento(a)',
          body: [
            'Busca ayuda si, durante más de dos semanas, tienes: tristeza que no pasa, pérdida de interés por las cosas que te gustaban, cansancio, cambios en el sueño o el apetito, dificultad de concentración, irritación, llanto fácil o sentimiento de no valer nada.',
            'Acude de inmediato a un servicio de salud (o llama al 188 — CVV, 24 h) si tienes pensamientos de morir, de lastimarte o de "desaparecer". No estás solo, esto tiene tratamiento y existe ayuda gratuita.',
            'El cansancio y los dolores en el cuerpo que no mejoran también pueden ser señales de depresión — vale la pena hablar de lo que sientes por dentro, no solo del cuerpo.',
          ],
        },
        {
          heading: 'Cuidados diarios',
          body: [
            'Conversa con alguien de confianza y con el equipo de la UBS. Hablar de lo que sientes es parte del tratamiento — no lo guardes todo para ti.',
            'Toma el medicamento, cuando esté prescrito, todos los días y en el horario correcto. Puede tardar algunas semanas en hacer efecto — no lo suspendas al sentirte mejor, sin hablar con el profesional.',
            'Cuida lo básico: procura dormir en horarios regulares, aliméntate, mueve el cuerpo (una caminata ya ayuda) y evita el alcohol y otras drogas, que empeoran el cuadro.',
            'Busca apoyo y pertenencia: grupos, comunidad, fe, amigos. La red de apoyo marca la diferencia — pero no sustituye el tratamiento.',
            'Ten paciencia contigo mismo(a): la mejoría llega poco a poco, con altibajos. Esto es normal y no significa que estés fallando.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'La Unidad Básica de Salud (UBS) es la puerta de entrada: el equipo acoge, evalúa y ofrece seguimiento. El CAPS (Centro de Atención Psicosocial) es el servicio especializado en salud mental — también es gratuito y atiende sin necesidad de derivación.',
            'En crisis, pensamientos de muerte o riesgo de lastimarte, acude de inmediato a urgencias, al CAPS 24 h o llama al 192 (SAMU). El CVV atiende 24 h, gratis, por el teléfono 188 y por el chat.',
            'Usa la página "Red SUS" de esta plataforma para encontrar las unidades y los servicios de salud mental más cercanos a ti en el Distrito Federal.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Asociación Brasileña de Psiquiatría (ABP)',
      detail: 'Directrices nacionales para el diagnóstico y el manejo de la depresión — referencia clínica y apoyo técnico de contenido.',
    },
    {
      label: 'Ministerio de Salud de Brasil — PCDT y líneas de cuidado en salud mental',
      detail: 'Protocolo Clínico y Directrices Terapéuticas de Depresión y organización de la Red de Atención Psicosocial (RAPS).',
    },
    {
      label: 'OMS / DSM-5-TR / CIE-11',
      detail: 'Criterios diagnósticos y directrices internacionales para los trastornos depresivos.',
    },
    {
      label: 'JAMA Psychiatry / estudios de disparidad racial',
      detail: 'Evidencia de subdiagnóstico y menor acceso a tratamiento adecuado para personas negras con depresión.',
    },
  ],
};

export const depressaoContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: depressaoContent_pt,
  es: depressaoContent_es,
};
