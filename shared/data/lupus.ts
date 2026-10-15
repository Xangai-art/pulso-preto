// Conteúdo enriquecido — Lúpus Eritematoso Sistêmico (LES)
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
// Recorte racial obrigatório (chamadas anti-racismo) — inclui atenção especial
// às manifestações clínicas em pele negra (lesões cutâneas, fotossensibilidade,
// úlceras). Parceria institucional prevista: SBR (Sociedade Brasileira de
// Reumatologia). Consumido via getDeepContent(diseaseId, localeId) — ver
// site|app/src/data/deepContentRegistry.ts.

import type { LocaleId } from './locales';
import type { DiseaseDeepContent } from './anemiaFalciforme';

const heroImage_pt = {
  url: 'https://sspark.genspark.ai/i/2ZrbjwRPCOIjnBSA?width=2560',
  alt: 'Ilustração médica representando inflamação autoimune multissistêmica do lúpus, com destaque para articulações e pele',
  credit: 'Imagem placeholder (CC/PD) — substituir por material próprio se necessário',
  isPlaceholder: true as const,
};

const heroImage_es = {
  url: 'https://sspark.genspark.ai/i/2ZrbjwRPCOIjnBSA?width=2560',
  alt: 'Ilustración médica que representa la inflamación autoinmune multisistémica del lupus, con énfasis en articulaciones y piel',
  credit: 'Imagen de relleno (CC/PD) — sustituir por material propio si es necesario',
  isPlaceholder: true as const,
};

const lupusContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,
  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Fisiopatologia do lúpus eritematoso sistêmico, critérios de classificação, avaliação de atividade e dano, arsenal terapêutico e evidência sobre a disparidade racial em gravidade, nefrite e mortalidade.',
      sections: [
        {
          heading: 'O que é — fisiopatologia',
          body: [
            'O lúpus eritematoso sistêmico (LES) é uma doença autoimune crônica multissistêmica caracterizada pela perda da autotolerância, produção de autoanticorpos (anti-dsDNA, anti-Sm, anti-Ro, entre outros) e formação de imunocomplexos que depositam em tecidos, gerando inflamação e lesão de órgãos.',
            'A patogênese envolve interação entre predisposição genética, fatores hormonais (predomínio feminino), ambientais (radiação ultravioleta, infecções, tabagismo, exposição a sílica) e epigenética. A ativação do interferon tipo I é um eixo central, e as vias de interferão têm se tornado alvo de terapias modernas.',
            'A doença tem curso em surtos (flares) e remissões, com potencial de acometer pele, articulações, rins (nefrite lúpica — a manifestação de maior gravidade), sistema nervoso central, serosas, sangue e pulmões. A gravidade e a mortalidade variam conforme ancestralidade e acesso ao cuidado.',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'O LES é mais prevalente e mais grave em mulheres negras: incidência 2 a 3 vezes maior que em mulheres brancas, início mais precoce, maior frequência de nefrite lúpica, mais atividade de doença, mais dano acumulado e mortalidade significativamente maior.',
            'A disparidade não é apenas biológica: combina predisposição genética (ancestralidade africana), determinantes sociais e acesso desigual a diagnóstico precoce, medicamentos poupadores de corticoide e terapias avançadas. O atraso diagnóstico é um fator crítico — quanto mais tempo a inflamação atua, maior o dano irreversível a rins e outros órgãos.',
            'Manifestações em pele negra merecem atenção específica: a fotossensibilidade e o exantema malar podem ser mais difíceis de reconhecer em tons de pele mais escuros, contribuindo para subdiagnóstico e atraso de tratamento. Lesões discóides podem deixar cicatrizes com impacto estético e psicossocial importante.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'O diagnóstico é clínico-laboratorial e baseia-se em critérios de classificação (EULAR/ACR 2019), que combinam a positividade do FAN (fator antinuclear) como critério de entrada e escores de domínios clínicos e imunológicos (anti-dsDNA, anti-Sm, anti-fosfolípides, hipocomplementemia, entre outros).',
            'O FAN positivo isolado NÃO é diagnóstico de lúpus — deve ser interpretado no contexto clínico. Complementar com hemograma, urina tipo 1, relação proteína/creatinina urinária, função renal, marcadores inflamatórios e sorologias conforme o quadro.',
            'A avaliação da nefrite lúpica é essencial: proteinúria, sedimento urinário ativo, queda de função renal e, quando indicado, biópsia renal com classificação histológica (ISN/RPS) orientam o tratamento. Rastrear antígenos anti-Ro/anti-La e anticorpos antifosfolípides conforme manifestações.',
          ],
        },
        {
          heading: 'Tratamento e condutas',
          body: [
            'O tratamento é individualizado conforme atividade e gravidade, com objetivo de controlar a inflamação, prevenir dano de órgãos e manter a qualidade de vida. Inclui hidroxicloroquina (pilar do tratamento, recomendada para quase todos os pacientes), corticoides em doses ajustadas, imunossupressores (metotrexato, azatioprina, micofenolato) e terapias biológicas (belimumabe, anifrolumabe, rituximabe) em casos selecionados.',
            'Na nefrite lúpica, o esquema de indução e manutenção com micofenolato ou ciclofosfamida, associado a corticoide, é a base; o acompanhamento com nefrologia é obrigatório. Proteção solar rigorosa, suplementação de vitamina D, vacinação adequada e manejo de fatores de risco cardiovascular são parte do cuidado integral.',
            'Ponto crítico de equidade: mulheres negras com LES têm maior probabilidade de receber apenas corticoide (com suas complicações) e menor acesso a poupadores de corticoide e terapias avançadas. Garantir acesso equânime ao tratamento moderno e o encaminhamento precoce à reumatologia é medida de justiça em saúde.',
          ],
        },
        {
          heading: 'Quando referenciar / sinais de alarme clínico',
          body: [
            'Referenciar à reumatologia: suspeita diagnóstica, atividade de doença, necessidade de imunossupressão/terapia biológica e gestação (lúpus exige planejamento gestacional e equipe multiprofissional).',
            'Encaminhamento urgente à nefrologia: proteinúria significativa, sedimento urinário ativo, elevação de creatinina ou hipertensão — sinais de nefrite, que exigem avaliação e tratamento rápidos.',
            'Sinais de alarme: acometimento do sistema nervoso central (convulsões, psicose, AVC), citopenias graves, serosite, comprometimento pulmonar ou cardíaco, e síndrome antifosfolípide com eventos trombóticos — situações de alto risco que demandam manejo especializado e, muitas vezes, hospitalar.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Sociedade Brasileira de Reumatologia (SBR) — recomendações e diretrizes nacionais para o LES.',
            'EULAR / ACR — critérios de classificação 2019 e recomendações de manejo.',
            'Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas de Lúpus Eritematoso Sistêmico.',
            'Literatura sobre disparidades raciais em lúpus (LUMINA, NIH) — evidência de maior gravidade e mortalidade em mulheres negras.',
          ],
        },
      ],
    },

    // ======================= ENFERMEIROS E TÉCNICOS =======================
    enfermeiro: {
      summary:
        'Reconhecimento dos sinais de lúpus, rastreio de complicações (especialmente renais), acolhimento de mulheres negras com queixas frequentemente desvalorizadas e apoio ao autocuidado.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'O lúpus é uma doença autoimune crônica: o sistema de defesa do corpo ataca os próprios tecidos por engano. Pode afetar a pele, as juntas, os rins, o sangue e outros órgãos. É mais comum em mulheres, especialmente mulheres negras, e costuma aparecer entre os 15 e os 45 anos.',
            'O lúpus vai e volta: tem fases de crise (quando os sintomas pioram) e fases mais calmas. Reconhecer os sinais de crise e agir rápido evita que os órgãos sejam machucados de forma permanente.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'Sintomas gerais frequentes: cansaço intenso e desproporcional, febre baixa sem infecção aparente, dor e inchaço nas juntas, queda de cabelo e aftas na boca.',
            'Manifestações na pele: manchas no rosto (em "asas de borboleta"), lesões que pioram com o sol (fotossensibilidade) e feridas na pele. Em pele negra, essas manchas podem ser mais difíceis de perceber — atenção redobrada à queixa da paciente.',
            'Sinais de gravidade que exigem avaliação médica imediata: urina espumosa ou com sangue, inchaço nas pernas, pressão alta nova, falta de ar, dor no peito, convulsões, confusão mental e queda importante das células do sangue.',
          ],
        },
        {
          heading: 'Triagem e acompanhamento na Atenção Básica',
          body: [
            'Valorize queixas persistentes de cansaço, dor articular e manchas na pele em mulheres negras: o lúpus é mais grave e mais frequente nesse grupo, e o atraso diagnóstico é comum. Não trate como "estresse" ou "drama".',
            'Apoie a investigação: solicitação de FAN, hemograma, urina tipo 1, função renal e marcadores inflamatórios conforme protocolo. O acompanhamento da urina (proteinúria) é essencial para detectar nefrite precocemente.',
            'No acompanhamento: monitore sinais de crise, adesão à hidroxicloroquina e aos demais medicamentos, efeitos adversos, proteção solar, vacinação e saúde cardiovascular (o lúpus aumenta o risco de infarto e AVC).',
          ],
        },
        {
          heading: 'Quem fica atento — grupos de risco',
          body: [
            'Grupos que exigem atenção redobrada: mulheres negras (incidência 2–3× maior e doença mais grave), mulheres entre 15 e 45 anos, com histórico familiar de doenças autoimunes, e pessoas com outras condições autoimunes associadas.',
            'Gestantes com lúpus: exigem acompanhamento conjunto com reumatologia e obstetrícia de alto risco, pois o lúpus pode agravar a gestação e aumentar o risco de complicações maternas e fetais.',
            'Pessoas com nefrite lúpica precisam de monitorização renal frequente e encaminhamento à nefrologia — o cuidado com o rim é o que mais muda o desfecho a longo prazo.',
          ],
        },
        {
          heading: 'Cuidado continuado e orientação ao paciente/família',
          body: [
            'Explique que o lúpus tem tratamento e que, com acompanhamento regular, a maioria das pessoas vive bem. Reforce que a hidroxicloroquina não deve ser interrompida por conta própria — ela reduz crises e protege os órgãos.',
            'Oriente sobre proteção solar rigorosa (protetor, roupas, evitar sol forte), sinais de crise que exigem retorno imediato, uso correto dos medicamentos e a importância das consultas e exames periódicos, especialmente os de urina e sangue.',
            'Chamada anti-racista: a dor e o cansaço de mulheres negras são frequentemente subestimados ou atribuídos a fatores emocionais, atrasando o diagnóstico de lúpus — que é justamente mais grave nelas. Leve a queixa a sério, registre e investigue. A intensidade relatada deve ser sempre considerada um dado clínico legítimo.',
          ],
        },
      ],
    },

    // ============================== USUÁRIOS ===============================
    usuario: {
      summary:
        'O que é lúpus, por que é mais comum e mais grave em mulheres negras, sinais de alerta, cuidados do dia a dia e onde buscar ajuda no SUS.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'Lúpus é uma doença em que o sistema de defesa do corpo (a imunidade) ataca os próprios tecidos por engano. Ele pode afetar a pele, as juntas, os rins, o sangue e outros órgãos. Não é contagioso — não se pega de ninguém.',
            'A doença vai e volta: tem fases em que os sintomas pioram (as crises) e fases mais tranquilas. Com acompanhamento certo, dá para viver bem e proteger os órgãos.',
          ],
        },
        {
          heading: 'Por que isso importa',
          body: [
            'O lúpus é bem mais comum e mais grave em mulheres negras: aparece mais cedo, dá mais crises e afeta os rins com mais frequência. Por isso, é tão importante reconhecer os sinais cedo e não deixar passar.',
            'Muitas mulheres negras ouvem que "é só estresse" ou "é frescura" quando relatam cansaço e dor. Isso atrasa o diagnóstico. Você tem o direito de ser ouvida e investigada com seriedade.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Procure a UBS se você tiver, com frequência: cansaço muito forte, febre baixa sem explicação, dor e inchaço nas juntas, queda de cabelo, aftas na boca ou manchas na pele que pioram com o sol.',
            'Fique atenta às manchas no rosto (em forma de "asas de borboleta") e a feridas na pele que aparecem ou pioram no sol. Em pele negra, elas podem ser mais difíceis de ver — observe mudanças na sua pele.',
            'Vá imediatamente à UPA/pronto-socorro se tiver: urina espumosa ou com sangue, inchaço nas pernas, falta de ar, dor no peito, convulsões, confusão mental ou desmaio. Esses sinais podem indicar crise grave ou problema nos rins.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Tome os remédios todos os dias, principalmente a hidroxicloroquina — ela reduz as crises e protege seus órgãos. Nunca pare por conta própria, mesmo quando estiver se sentindo bem.',
            'Proteja-se do sol: use protetor solar todos os dias, chapéu, roupas que cubram a pele e evite o sol forte entre 10h e 16h. O sol é um dos principais gatilhos de crise.',
            'Vá às consultas e faça os exames de sangue e de urina com regularidade. O exame de urina é muito importante: ele mostra cedo quando o rim está sendo afetado.',
            'Cuide do corpo de forma geral: durma bem, alimente-se de forma saudável, evite cigarro e mantenha a pressão e o açúcar controlados — isso protege o coração e os rins.',
            'Planeje uma gravidez junto com a equipe de saúde: engravidar com o lúpus controlado é mais seguro para você e para o bebê.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'A Unidade Básica de Saúde (UBS) é o ponto de partida: a equipe avalia, pede os exames e, se precisar, encaminha para o reumatologista. O tratamento do lúpus é gratuito no SUS.',
            'Se tiver sinais graves (urina alterada, falta de ar, dor no peito, convulsão, confusão), procure a UPA ou o pronto-socorro imediatamente ou ligue 192 (SAMU).',
            'Use a página "Rede SUS" desta plataforma para encontrar as unidades de saúde mais próximas de você no Distrito Federal. Grupos de apoio entre pacientes ajudam muito a lidar com a doença no dia a dia.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Sociedade Brasileira de Reumatologia (SBR)',
      detail: 'Recomendações e diretrizes nacionais para o diagnóstico e o manejo do lúpus eritematoso sistêmico.',
    },
    {
      label: 'EULAR / ACR 2019',
      detail: 'Critérios de classificação e recomendações internacionais de manejo — referência para a prática clínica baseada em evidência.',
    },
    {
      label: 'Ministério da Saúde — PCDT Lúpus Eritematoso Sistêmico',
      detail: 'Protocolo Clínico e Diretrizes Terapêuticas vigente, referência normativa para a conduta no SUS.',
    },
    {
      label: 'Estudos de disparidade racial (LUMINA / NIH)',
      detail: 'Evidência de maior gravidade, nefrite e mortalidade em mulheres negras com lúpus, associada a fatores genéticos e sociais.',
    },
  ],
};

const lupusContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,
  audiences: {
    // ==================== MÉDICOS Y PERSONAL INVESTIGADOR ===================
    medico: {
      summary:
        'Fisiopatología del lupus eritematoso sistémico, criterios de clasificación, evaluación de actividad y daño, arsenal terapéutico y evidencia sobre la disparidad racial en gravedad, nefritis y mortalidad.',
      sections: [
        {
          heading: 'Qué es — fisiopatología',
          body: [
            'El lupus eritematoso sistémico (LES) es una enfermedad autoinmune crónica multisistémica caracterizada por la pérdida de la autotolerancia, la producción de autoanticuerpos (anti-dsDNA, anti-Sm, anti-Ro, entre otros) y la formación de inmunocomplejos que se depositan en los tejidos, generando inflamación y lesión de órganos.',
            'La patogénesis involucra la interacción entre predisposición genética, factores hormonales (predominio femenino), ambientales (radiación ultravioleta, infecciones, tabaquismo, exposición a sílice) y epigenética. La activación del interferón tipo I es un eje central, y las vías de interferón se han convertido en blanco de terapias modernas.',
            'La enfermedad tiene un curso de brotes (flares) y remisiones, con potencial de afectar piel, articulaciones, riñones (nefritis lúpica — la manifestación de mayor gravedad), sistema nervioso central, serosas, sangre y pulmones. La gravedad y la mortalidad varían según la ancestralidad y el acceso al cuidado.',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'El LES es más prevalente y más grave en mujeres negras: incidencia 2 a 3 veces mayor que en mujeres blancas, inicio más precoz, mayor frecuencia de nefritis lúpica, más actividad de enfermedad, más daño acumulado y mortalidad significativamente mayor.',
            'La disparidad no es solo biológica: combina predisposición genética (ancestralidad africana), determinantes sociales y acceso desigual a diagnóstico precoz, medicamentos ahorradores de corticoide y terapias avanzadas. El retraso diagnóstico es un factor crítico — cuanto más tiempo actúa la inflamación, mayor el daño irreversible a los riñones y otros órganos.',
            'Las manifestaciones en piel negra merecen atención específica: la fotosensibilidad y el exantema malar pueden ser más difíciles de reconocer en tonos de piel más oscuros, contribuyendo al subdiagnóstico y al retraso del tratamiento. Las lesiones discoides pueden dejar cicatrices con impacto estético y psicosocial importante.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'El diagnóstico es clínico-laboratorial y se basa en criterios de clasificación (EULAR/ACR 2019), que combinan la positividad del ANA (anticuerpo antinuclear) como criterio de entrada y puntuaciones de dominios clínicos e inmunológicos (anti-dsDNA, anti-Sm, antifosfolípidos, hipocomplementemia, entre otros).',
            'El ANA positivo aislado NO es diagnóstico de lupus — debe interpretarse en el contexto clínico. Complementar con hemograma, análisis de orina, relación proteína/creatinina urinaria, función renal, marcadores inflamatorios y serologías según el cuadro.',
            'La evaluación de la nefritis lúpica es esencial: proteinuria, sedimento urinario activo, caída de la función renal y, cuando esté indicado, biopsia renal con clasificación histológica (ISN/RPS) orientan el tratamiento. Rastrear anti-Ro/anti-La y anticuerpos antifosfolípidos según las manifestaciones.',
          ],
        },
        {
          heading: 'Tratamiento y conductas',
          body: [
            'El tratamiento es individualizado según actividad y gravedad, con el objetivo de controlar la inflamación, prevenir el daño de órganos y mantener la calidad de vida. Incluye hidroxicloroquina (pilar del tratamiento, recomendada para casi todos los pacientes), corticoides en dosis ajustadas, inmunosupresores (metotrexato, azatioprina, micofenolato) y terapias biológicas (belimumab, anifrolumab, rituximab) en casos seleccionados.',
            'En la nefritis lúpica, el esquema de inducción y mantenimiento con micofenolato o ciclofosfamida, asociado a corticoide, es la base; el seguimiento con nefrología es obligatorio. La fotoprotección rigurosa, la suplementación de vitamina D, la vacunación adecuada y el manejo de los factores de riesgo cardiovascular son parte del cuidado integral.',
            'Punto crítico de equidad: las mujeres negras con LES tienen mayor probabilidad de recibir solo corticoide (con sus complicaciones) y menor acceso a ahorradores de corticoide y terapias avanzadas. Garantizar un acceso equitativo al tratamiento moderno y la derivación precoz a reumatología es una medida de justicia en salud.',
          ],
        },
        {
          heading: 'Cuándo derivar / señales de alarma clínica',
          body: [
            'Derivar a reumatología: sospecha diagnóstica, actividad de enfermedad, necesidad de inmunosupresión/terapia biológica y embarazo (el lupus exige planificación gestacional y equipo multiprofesional).',
            'Derivación urgente a nefrología: proteinuria significativa, sedimento urinario activo, elevación de creatinina o hipertensión — señales de nefritis, que exigen evaluación y tratamiento rápidos.',
            'Señales de alarma: afectación del sistema nervioso central (convulsiones, psicosis, ictus), citopenias graves, serositis, compromiso pulmonar o cardíaco, y síndrome antifosfolípido con eventos trombóticos — situaciones de alto riesgo que requieren manejo especializado y, a menudo, hospitalario.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Sociedad Brasileña de Reumatología (SBR) — recomendaciones y directrices nacionales para el LES.',
            'EULAR / ACR — criterios de clasificación 2019 y recomendaciones de manejo.',
            'Ministerio de Salud de Brasil — Protocolo Clínico y Directrices Terapéuticas de Lupus Eritematoso Sistémico.',
            'Literatura sobre disparidades raciales en lupus (LUMINA, NIH) — evidencia de mayor gravedad y mortalidad en mujeres negras.',
          ],
        },
      ],
    },

    // ====================== ENFERMEROS Y TÉCNICOS ==========================
    enfermeiro: {
      summary:
        'Reconocimiento de las señales de lupus, cribado de complicaciones (especialmente renales), acogida de mujeres negras con quejas frecuentemente desvalorizadas y apoyo al autocuidado.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'El lupus es una enfermedad autoinmune crónica: el sistema de defensa del cuerpo ataca sus propios tejidos por error. Puede afectar la piel, las articulaciones, los riñones, la sangre y otros órganos. Es más común en mujeres, especialmente mujeres negras, y suele aparecer entre los 15 y los 45 años.',
            'El lupus va y viene: tiene fases de brote (cuando los síntomas empeoran) y fases más calmadas. Reconocer las señales de brote y actuar rápido evita que los órganos se dañen de forma permanente.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'Síntomas generales frecuentes: cansancio intenso y desproporcionado, fiebre baja sin infección aparente, dolor e hinchazón en las articulaciones, caída del cabello y aftas en la boca.',
            'Manifestaciones en la piel: manchas en el rostro (en "alas de mariposa"), lesiones que empeoran con el sol (fotosensibilidad) y heridas en la piel. En piel negra, estas manchas pueden ser más difíciles de percibir — atención redoblada a la queja de la paciente.',
            'Señales de gravedad que exigen evaluación médica inmediata: orina espumosa o con sangre, hinchazón en las piernas, presión alta nueva, falta de aire, dolor en el pecho, convulsiones, confusión mental y caída importante de las células de la sangre.',
          ],
        },
        {
          heading: 'Cribado y seguimiento en la Atención Primaria',
          body: [
            'Valore las quejas persistentes de cansancio, dolor articular y manchas en la piel en mujeres negras: el lupus es más grave y más frecuente en este grupo, y el retraso diagnóstico es común. No lo trate como "estrés" o "drama".',
            'Apoye la investigación: solicitud de ANA, hemograma, análisis de orina, función renal y marcadores inflamatorios según protocolo. El seguimiento de la orina (proteinuria) es esencial para detectar la nefritis precozmente.',
            'En el seguimiento: monitorear señales de brote, adherencia a la hidroxicloroquina y a los demás medicamentos, efectos adversos, fotoprotección, vacunación y salud cardiovascular (el lupus aumenta el riesgo de infarto e ictus).',
          ],
        },
        {
          heading: 'Quién debe estar atento — grupos de riesgo',
          body: [
            'Grupos que exigen atención redoblada: mujeres negras (incidencia 2–3× mayor y enfermedad más grave), mujeres entre 15 y 45 años, con antecedente familiar de enfermedades autoinmunes, y personas con otras condiciones autoinmunes asociadas.',
            'Gestantes con lupus: exigen seguimiento conjunto con reumatología y obstetricia de alto riesgo, pues el lupus puede agravar el embarazo y aumentar el riesgo de complicaciones maternas y fetales.',
            'Las personas con nefritis lúpica necesitan monitorización renal frecuente y derivación a nefrología — el cuidado del riñón es lo que más cambia el desenlace a largo plazo.',
          ],
        },
        {
          heading: 'Cuidado continuo y orientación al paciente/familia',
          body: [
            'Explique que el lupus tiene tratamiento y que, con seguimiento regular, la mayoría de las personas vive bien. Refuerce que la hidroxicloroquina no debe interrumpirse por cuenta propia — reduce los brotes y protege los órganos.',
            'Oriente sobre fotoprotección rigurosa (protector, ropa, evitar el sol fuerte), señales de brote que exigen retorno inmediato, uso correcto de los medicamentos y la importancia de las consultas y exámenes periódicos, especialmente los de orina y sangre.',
            'Llamado antirracista: el dolor y el cansancio de las mujeres negras son frecuentemente subestimados o atribuidos a factores emocionales, retrasando el diagnóstico de lupus — que es justamente más grave en ellas. Tome la queja en serio, registre e investigue. La intensidad relatada debe considerarse siempre un dato clínico legítimo.',
          ],
        },
      ],
    },

    // ============================== USUARIOS ===============================
    usuario: {
      summary:
        'Qué es el lupus, por qué es más común y más grave en las mujeres negras, señales de alerta, cuidados diarios y dónde buscar ayuda en el SUS.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'El lupus es una enfermedad en la que el sistema de defensa del cuerpo (la inmunidad) ataca sus propios tejidos por error. Puede afectar la piel, las articulaciones, los riñones, la sangre y otros órganos. No es contagioso — no se contrae de nadie.',
            'La enfermedad va y viene: tiene fases en que los síntomas empeoran (los brotes) y fases más tranquilas. Con el seguimiento correcto, se puede vivir bien y proteger los órganos.',
          ],
        },
        {
          heading: 'Por qué importa',
          body: [
            'El lupus es mucho más común y más grave en las mujeres negras: aparece más temprano, da más brotes y afecta los riñones con más frecuencia. Por eso es tan importante reconocer las señales temprano y no dejar pasar.',
            'Muchas mujeres negras oyen que "es solo estrés" o "es exageración" cuando relatan cansancio y dolor. Eso retrasa el diagnóstico. Tienes derecho a ser escuchada e investigada con seriedad.',
          ],
        },
        {
          heading: 'Señales de alerta — mantente atenta',
          body: [
            'Acude a la UBS si tienes, con frecuencia: cansancio muy fuerte, fiebre baja sin explicación, dolor e hinchazón en las articulaciones, caída del cabello, aftas en la boca o manchas en la piel que empeoran con el sol.',
            'Presta atención a las manchas en el rostro (en forma de "alas de mariposa") y a las heridas en la piel que aparecen o empeoran con el sol. En piel negra, pueden ser más difíciles de ver — observa los cambios en tu piel.',
            'Acude de inmediato a urgencias si tienes: orina espumosa o con sangre, hinchazón en las piernas, falta de aire, dolor en el pecho, convulsiones, confusión mental o desmayo. Estas señales pueden indicar un brote grave o un problema en los riñones.',
          ],
        },
        {
          heading: 'Cuidados diarios',
          body: [
            'Toma los medicamentos todos los días, principalmente la hidroxicloroquina — reduce los brotes y protege tus órganos. Nunca los suspendas por cuenta propia, aunque te sientas bien.',
            'Protégete del sol: usa protector solar todos los días, sombrero, ropa que cubra la piel y evita el sol fuerte entre las 10 h y las 16 h. El sol es uno de los principales desencadenantes de los brotes.',
            'Acude a las consultas y haz los exámenes de sangre y de orina con regularidad. El análisis de orina es muy importante: muestra temprano cuando el riñón está siendo afectado.',
            'Cuida el cuerpo en general: duerme bien, aliméntate de forma saludable, evita el cigarrillo y mantén la presión y el azúcar controlados — esto protege el corazón y los riñones.',
            'Planifica un embarazo junto con el equipo de salud: embarazarse con el lupus controlado es más seguro para ti y para el bebé.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'La Unidad Básica de Salud (UBS) es el punto de partida: el equipo evalúa, pide los exámenes y, si es necesario, te deriva al reumatólogo. El tratamiento del lupus es gratuito en el SUS.',
            'Si tienes señales graves (orina alterada, falta de aire, dolor en el pecho, convulsión, confusión), acude de inmediato a urgencias o llama al 192 (SAMU).',
            'Usa la página "Red SUS" de esta plataforma para encontrar las unidades de salud más cercanas a ti en el Distrito Federal. Los grupos de apoyo entre pacientes ayudan mucho a sobrellevar la enfermedad en el día a día.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'Sociedad Brasileña de Reumatología (SBR)',
      detail: 'Recomendaciones y directrices nacionales para el diagnóstico y el manejo del lupus eritematoso sistémico.',
    },
    {
      label: 'EULAR / ACR 2019',
      detail: 'Criterios de clasificación y recomendaciones internacionales de manejo — referencia para la práctica clínica basada en evidencia.',
    },
    {
      label: 'Ministerio de Salud de Brasil — PCDT Lupus Eritematoso Sistémico',
      detail: 'Protocolo Clínico y Directrices Terapéuticas vigente, referencia normativa para la conducta en el SUS.',
    },
    {
      label: 'Estudios de disparidad racial (LUMINA / NIH)',
      detail: 'Evidencia de mayor gravedad, nefritis y mortalidad en mujeres negras con lupus, asociada a factores genéticos y sociales.',
    },
  ],
};

export const lupusContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: lupusContent_pt,
  es: lupusContent_es,
};
