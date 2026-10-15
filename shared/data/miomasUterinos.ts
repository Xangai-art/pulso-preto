// Conteúdo enriquecido — Miomas Uterinos (Leiomiomas / Fibromas)
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
// Recorte racial obrigatório (chamadas anti-racismo). Parceria institucional
// prevista: SOGESP / FEBRASGO. Consumido via getDeepContent(diseaseId,
// localeId) — ver site|app/src/data/deepContentRegistry.ts.

import type { LocaleId } from './locales';
import type { DiseaseDeepContent } from './anemiaFalciforme';

const heroImage_pt = {
  url: 'https://sspark.genspark.ai/i/NYpPsNuS3oGvOr9t?width=2560',
  alt: 'Ilustração anatômica do útero humano com representação de nódulos (miomas) na parede uterina',
  credit: 'Imagem placeholder (CC/PD) — substituir por material próprio se necessário',
  isPlaceholder: true as const,
};

const heroImage_es = {
  url: 'https://sspark.genspark.ai/i/NYpPsNuS3oGvOr9t?width=2560',
  alt: 'Ilustración anatómica del útero humano con representación de nódulos (miomas) en la pared uterina',
  credit: 'Imagen de relleno (CC/PD) — sustituir por material propio si es necesario',
  isPlaceholder: true as const,
};

const miomasUterinosContent_pt: DiseaseDeepContent = {
  heroImage: heroImage_pt,
  audiences: {
    // ======================= MÉDICOS E PESQUISADORES =======================
    medico: {
      summary:
        'Fisiopatologia dos leiomiomas, classificação FIGO, diagnóstico por imagem, opções terapêuticas e evidência sobre a disparidade racial em prevalência, gravidade e acesso a tratamentos menos invasivos.',
      sections: [
        {
          heading: 'O que é — fisiopatologia',
          body: [
            'Os miomas uterinos (leiomiomas ou fibromas) são tumores benignos monoclonais do músculo liso do miométrio, extremamente prevalentes e dependentes de estrogênio e progesterona. Apesar de benignos, podem causar sangramento uterino anormal, dor pélvica, anemia ferropriva, efeitos compressivos (bexiga/reto) e infertilidade.',
            'A patogênese envolve fatores genéticos (mutações somáticas como MED12), epigenética, hormônios ovarianos, fatores de crescimento (TGF-β, FGF), inflamação e remodelamento da matriz extracelular. A deficiência de vitamina D e a exposição a disruptores endócrinos têm sido implicadas na maior proliferação.',
            'A classificação FIGO (0–8) descreve a localização (submucosa, intramural, subserosa), com impacto direto no tipo de sintoma e na elegibilidade para tratamentos conservadores (histeroscopia, embolização, miomectomia).',
          ],
        },
        {
          heading: 'Por que importa — epidemiologia e recorte racial',
          body: [
            'Mulheres negras apresentam prevalência de miomas aproximadamente 2 a 3 vezes maior que mulheres brancas, com início mais precoce (idade mais jovem no diagnóstico), tumores maiores e mais numerosos, sintomas mais intensos (sangramento abundante, dor, anemia) e maior taxa de histerectomia.',
            'Essa disparidade combina predisposição genética/biológica, determinantes sociais (estresse crônico do racismo, exposição ambiental, vitamina D) e acesso desigual: mulheres negras têm menor probabilidade de receber tratamentos menos invasivos (miomectomia, embolização, terapias hormonais) e chegam mais frequentemente à cirurgia radical.',
            'O impacto na vida reprodutiva e na qualidade de vida (dor, sangramento, anemia, afastamentos) é significativo e frequentemente subvalorizado — o que reforça a necessidade de escuta qualificada e manejo equânime.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'A avaliação inicial é clínica (história menstrual, sintomas compressivos, impacto na qualidade de vida) e complementada por exame pélvico. O diagnóstico por imagem de escolha é a ultrassonografia pélvica (transvaginal); a ressonância magnética é útil para mapeamento pré-operatório, miomas múltiplos ou planejamento de tratamento conservador.',
            'A histeroscopia diagnóstica avalia miomas submucosos e permite tratamento no mesmo procedimento. Sempre investigar anemia ferropriva associada ao sangramento, dosando hemograma e ferritina.',
            'Diagnóstico diferencial: pólipos endometriais, adenomiose, hiperplasia/malignidade endometrial, sarcomas uterinos (raros, suspeitar em crescimento rápido pós-menopausa).',
          ],
        },
        {
          heading: 'Tratamento e condutas',
          body: [
            'O manejo é individualizado conforme sintomas, desejo de fertilidade, tamanho/localização dos miomas e comorbidades. Opções incluem: vigilância para casos assintomáticos; tratamento farmacológico (anticoncepcionais, progestágenos, sistema intrauterino de levonorgestrel, análogos de GnRH, moduladores seletivos); e intervenções procedimentais.',
            'Procedimentos conservadores: miomectomia (histeroscópica, laparoscópica ou aberta) e embolização de artérias uterinas (UAE), além de técnicas menos invasivas (ablação por radiofrequência, HIFU). A histerectomia é reservada para casos refratários ou quando não há desejo de preservar o útero.',
            'Ponto crítico de equidade: há evidência de que mulheres negras são encaminhadas com mais frequência à histerectomia e têm menos acesso a alternativas conservadoras. A oferta de todas as opções — de forma informada e sem estereótipos — é obrigação ética e de justiça reprodutiva.',
          ],
        },
        {
          heading: 'Quando referenciar / sinais de alarme clínico',
          body: [
            'Referenciar à ginecologia: sangramento uterino anormal refratário ao tratamento inicial, anemia ferropriva grave, dor pélvica incapacitante, crescimento rápido de massa uterina, suspeita de malignidade, desejo de fertilidade com miomas que possam comprometer a implantação, e sintomas compressivos importantes.',
            'Sinais de alarme: sangramento pós-menopausa, sangramento com repercussão hemodinâmica (síncope, taquicardia, palidez), massa de crescimento acelerado ou sinais de obstrução/compressão urinária — exigem investigação urgente.',
            'Mulheres com anemia importante devem ser tratadas da anemia concomitantemente, com reposição de ferro e, quando necessário, transfusão, além do controle do sangramento.',
          ],
        },
        {
          heading: 'Fontes e diretrizes',
          body: [
            'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — protocolos e diretrizes nacionais.',
            'Sociedade de Ginecologia e Obstetrícia do Estado de São Paulo (SOGESP) — referência clínica.',
            'American College of Obstetricians and Gynecologists (ACOG) / American Society for Reproductive Medicine (ASRM) — diretrizes internacionais baseadas em evidência.',
            'Literatura sobre disparidades raciais em miomas uterinos (NIH / estudos populacionais em mulheres negras).',
          ],
        },
      ],
    },

    // ======================= ENFERMEIROS E TÉCNICOS =======================
    enfermeiro: {
      summary:
        'Reconhecimento do sangramento uterino anormal, triagem de anemia, acolhimento sem viés racial e orientação sobre os caminhos de cuidado dos miomas na Atenção Básica.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'Miomas são tumores benignos (não cancerosos) que crescem na parede do útero. São muito comuns e, muitas vezes, não causam sintoma nenhum. Quando causam, os problemas mais frequentes são sangramento menstrual muito intenso, dor e sensação de pressão na barriga.',
            'É importante dizer com clareza: mioma NÃO é câncer. Mas, quando dá sintoma, precisa de acompanhamento — especialmente porque o sangramento intenso pode causar anemia.',
          ],
        },
        {
          heading: 'Sinais que a equipe deve reconhecer',
          body: [
            'Sangramento uterino anormal: menstruação muito intensa (troca de absorvente a cada hora, coágulos grandes), menstruação prolongada, sangramento entre as menstruações ou fora do período esperado.',
            'Sinais de anemia associada: cansaço intenso, palidez, falta de ar aos esforços, taquicardia, queda de cabelo — investigar hemograma e ferritina.',
            'Sintomas compressivos: necessidade frequente de urinar, dificuldade para evacuar, sensação de peso/volume abdominal e dor pélvica.',
            'Sinais de alarme que exigem encaminhamento prioritário: sangramento pós-menopausa, sangramento muito intenso com tontura/desmaio, crescimento rápido de massa abdominal.',
          ],
        },
        {
          heading: 'Triagem e acompanhamento na Atenção Básica',
          body: [
            'Priorize a escuta qualificada de mulheres negras que relatam menstruação intensa ou dor pélvica: elas têm maior prevalência de miomas e, historicamente, têm a dor subestimada. Registre a intensidade e o impacto do sangramento na vida diária (trabalho, escola, sono).',
            'Garanta a investigação básica: hemograma (anemia), ferritina, avaliação ginecológica e solicitação de ultrassonografia conforme protocolo. Busque ativamente casos de anemia em mulheres com sangramento abundante.',
            'No acompanhamento: monitorar sangramento e sintomas, reforçar a adesão a tratamentos hormonais quando prescritos, orientar sobre sinais de alarme e organizar o encaminhamento à ginecologia quando indicado.',
          ],
        },
        {
          heading: 'Quem fica atento — grupos de risco',
          body: [
            'Grupos que exigem atenção redobrada: mulheres negras (prevalência 2–3× maior e sintomas mais graves), mulheres na faixa de 30–50 anos, com histórico familiar de miomas, obesidade, hipertensão, início precoce da menstruação e que nunca engravidaram.',
            'Mulheres com anemia recorrente ou que não respondem ao ferro merecem investigação de sangramento uterino anormal como causa.',
            'Atenção especial ao desejo reprodutivo: registrar e respeitar o planejamento de gravidez da usuária, pois isso influencia diretamente as opções de tratamento e a defesa do direito de escolha informada.',
          ],
        },
        {
          heading: 'Cuidado continuado e orientação ao paciente/família',
          body: [
            'Explique, em linguagem simples, que mioma é comum, não é câncer e que existem várias formas de tratamento — nem toda mulher precisa de cirurgia. Desmistificar o medo ajuda a mulher a decidir com tranquilidade.',
            'Oriente sobre o registro dos dias e do volume do sangramento, a importância de tratar a anemia (ferro, alimentação) e o comparecimento às consultas. Esclareça que existem tratamentos com remédio, procedimentos que preservam o útero e, em alguns casos, cirurgia.',
            'Chamada anti-racista: a dor pélvica e o sangramento intenso de mulheres negras são frequentemente normalizados ("é assim mesmo") ou minimizados. Não banalize a queixa: acolha, registre e investigue. A intensidade relatada deve ser sempre levada a sério — pessoas negras historicamente têm sua dor subestimada e subtratada no sistema de saúde, e esse viés precisa ser combatido ativamente na triagem.',
          ],
        },
      ],
    },

    // ============================== USUÁRIOS ===============================
    usuario: {
      summary:
        'O que são miomas, por que são tão comuns entre mulheres negras, sinais de alerta, cuidados do dia a dia e onde buscar ajuda no SUS.',
      sections: [
        {
          heading: 'O que é',
          body: [
            'Miomas (também chamados de fibromas) são caroços que crescem na parede do útero. Eles são muito comuns e não são câncer — são benignos. Muitas mulheres têm miomas e nem sabem, porque não sentem nada.',
            'Quando dão sintoma, o mais comum é a menstruação ficar muito intensa, com coágulos e muitos dias de duração, além de dor na barriga e vontade frequente de urinar. Em alguns casos, os miomas podem dificultar a gravidez.',
          ],
        },
        {
          heading: 'Por que isso importa',
          body: [
            'Os miomas são bem mais frequentes em mulheres negras: aparecem mais cedo, costumam ser maiores e dar mais sintomas, como sangramento intenso e anemia. Isso não é "coisa da sua cabeça" nem frescura — é uma condição real e mais grave para nós.',
            'A boa notícia: existem vários tratamentos, e a maioria não exige retirar o útero. Você tem o direito de conhecer todas as opções e decidir o que é melhor para o seu corpo e para os seus planos de vida.',
          ],
        },
        {
          heading: 'Sinais de alerta — fique atento(a)',
          body: [
            'Procure a UBS se você tiver: menstruação muito intensa (trocar absorvente a cada hora, com coágulos grandes), menstruação que dura muitos dias, sangramento entre as menstruações, dor forte na barriga ou na relação sexual.',
            'Fique atenta à anemia: cansaço que não passa, palidez, falta de ar, coração acelerado e queda de cabelo podem ser sinal de que o sangramento está tirando ferro do seu corpo.',
            'Vá com prioridade se tiver: sangramento muito intenso com tontura ou desmaio, ou sangramento depois da menopausa. Nesses casos, procure atendimento no mesmo dia.',
          ],
        },
        {
          heading: 'Cuidados do dia a dia',
          body: [
            'Anote em um caderno (ou no celular) os dias e o quanto você sangra, e leve essa anotação nas consultas — isso ajuda muito a equipe a entender o seu caso e a escolher o melhor tratamento.',
            'Trate a anemia: tome o ferro prescrito, mesmo que ele escureça o cocô (é normal), e coma alimentos ricos em ferro (feijão, carnes, folhas verdes escuras) junto com vitamina C (laranja, acerola), que ajuda na absorção.',
            'Não aceite "é normal sangrar assim": se o sangramento atrapalha sua vida, seu trabalho ou seu sono, isso é motivo para investigar e tratar. Você tem direito a tratamento.',
            'Se tiver planos de engravidar, fale isso claramente na consulta — existem tratamentos que preservam o útero e a sua capacidade de gestar.',
          ],
        },
        {
          heading: 'Onde buscar ajuda no SUS',
          body: [
            'A Unidade Básica de Saúde (UBS) é o ponto de partida: lá a equipe avalia o seu caso, pede os exames e, se precisar, encaminha para a ginecologia. Tudo pelo SUS, de graça.',
            'Se tiver sangramento muito intenso com tontura, desmaio ou dor insuportável, procure a UPA/pronto-socorro imediatamente.',
            'Use a página "Rede SUS" desta plataforma para encontrar as unidades de saúde mais próximas de você no Distrito Federal. Pergunte também sobre grupos de saúde da mulher na sua UBS.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'FEBRASGO',
      detail: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia — protocolos nacionais sobre miomas e sangramento uterino anormal.',
    },
    {
      label: 'SOGESP',
      detail: 'Sociedade de Ginecologia e Obstetrícia do Estado de São Paulo — referência clínica e apoio técnico de conteúdo.',
    },
    {
      label: 'ACOG / ASRM',
      detail: 'American College of Obstetricians and Gynecologists e American Society for Reproductive Medicine — diretrizes internacionais baseadas em evidência.',
    },
    {
      label: 'Literatura sobre disparidades raciais (NIH)',
      detail: 'Estudos populacionais que documentam a maior prevalência, gravidade e taxa de histerectomia em mulheres negras.',
    },
  ],
};

const miomasUterinosContent_es: DiseaseDeepContent = {
  heroImage: heroImage_es,
  audiences: {
    // ==================== MÉDICOS Y PERSONAL INVESTIGADOR ===================
    medico: {
      summary:
        'Fisiopatología de los leiomiomas, clasificación FIGO, diagnóstico por imagen, opciones terapéuticas y evidencia sobre la disparidad racial en prevalencia, gravedad y acceso a tratamientos menos invasivos.',
      sections: [
        {
          heading: 'Qué es — fisiopatología',
          body: [
            'Los miomas uterinos (leiomiomas o fibromas) son tumores benignos monoclonales del músculo liso del miometrio, extremadamente prevalentes y dependientes de estrógeno y progesterona. Aunque benignos, pueden causar sangrado uterino anormal, dolor pélvico, anemia ferropénica, efectos compresivos (vejiga/recto) e infertilidad.',
            'La patogénesis involucra factores genéticos (mutaciones somáticas como MED12), epigenética, hormonas ováricas, factores de crecimiento (TGF-β, FGF), inflamación y remodelación de la matriz extracelular. La deficiencia de vitamina D y la exposición a disruptores endocrinos han sido implicadas en la mayor proliferación.',
            'La clasificación FIGO (0–8) describe la localización (submucoso, intramural, subseroso), con impacto directo en el tipo de síntoma y en la elegibilidad para tratamientos conservadores (histeroscopia, embolización, miomectomía).',
          ],
        },
        {
          heading: 'Por qué importa — epidemiología y enfoque racial',
          body: [
            'Las mujeres negras presentan una prevalencia de miomas aproximadamente 2 a 3 veces mayor que las mujeres blancas, con inicio más precoz (edad más joven al diagnóstico), tumores más grandes y numerosos, síntomas más intensos (sangrado abundante, dolor, anemia) y mayor tasa de histerectomía.',
            'Esta disparidad combina predisposición genética/biológica, determinantes sociales (estrés crónico del racismo, exposición ambiental, vitamina D) y acceso desigual: las mujeres negras tienen menor probabilidad de recibir tratamientos menos invasivos (miomectomía, embolización, terapias hormonales) y llegan con más frecuencia a la cirugía radical.',
            'El impacto en la vida reproductiva y en la calidad de vida (dolor, sangrado, anemia, ausencias laborales) es significativo y frecuentemente subvalorado — lo que refuerza la necesidad de una escucha cualificada y un manejo equitativo.',
          ],
        },
        {
          heading: 'Diagnóstico',
          body: [
            'La evaluación inicial es clínica (historia menstrual, síntomas compresivos, impacto en la calidad de vida) y se complementa con el examen pélvico. El diagnóstico por imagen de elección es la ecografía pélvica (transvaginal); la resonancia magnética es útil para el mapeo preoperatorio, miomas múltiples o la planificación de un tratamiento conservador.',
            'La histeroscopia diagnóstica evalúa los miomas submucosos y permite el tratamiento en el mismo procedimiento. Siempre investigar la anemia ferropénica asociada al sangrado, dosificando hemograma y ferritina.',
            'Diagnóstico diferencial: pólipos endometriales, adenomiosis, hiperplasia/malignidad endometrial, sarcomas uterinos (raros, sospechar en crecimiento rápido posmenopáusico).',
          ],
        },
        {
          heading: 'Tratamiento y conductas',
          body: [
            'El manejo es individualizado según síntomas, deseo de fertilidad, tamaño/localización de los miomas y comorbilidades. Las opciones incluyen: vigilancia en casos asintomáticos; tratamiento farmacológico (anticonceptivos, progestágenos, sistema intrauterino de levonorgestrel, análogos de GnRH, moduladores selectivos); e intervenciones procedimentales.',
            'Procedimientos conservadores: miomectomía (histeroscópica, laparoscópica o abierta) y embolización de arterias uterinas (UAE), además de técnicas menos invasivas (ablación por radiofrecuencia, HIFU). La histerectomía se reserva para casos refractarios o cuando no hay deseo de preservar el útero.',
            'Punto crítico de equidad: hay evidencia de que las mujeres negras son derivadas con más frecuencia a la histerectomía y tienen menos acceso a alternativas conservadoras. Ofrecer todas las opciones — de forma informada y sin estereotipos — es una obligación ética y de justicia reproductiva.',
          ],
        },
        {
          heading: 'Cuándo derivar / señales de alarma clínica',
          body: [
            'Derivar a ginecología: sangrado uterino anormal refractario al tratamiento inicial, anemia ferropénica grave, dolor pélvico incapacitante, crecimiento rápido de masa uterina, sospecha de malignidad, deseo de fertilidad con miomas que puedan comprometer la implantación, y síntomas compresivos importantes.',
            'Señales de alarma: sangrado posmenopáusico, sangrado con repercusión hemodinámica (síncope, taquicardia, palidez), masa de crecimiento acelerado o señales de obstrucción/compresión urinaria — exigen investigación urgente.',
            'Las mujeres con anemia importante deben ser tratadas de la anemia concomitantemente, con reposición de hierro y, cuando sea necesario, transfusión, además del control del sangrado.',
          ],
        },
        {
          heading: 'Fuentes y directrices',
          body: [
            'Federación Brasileña de las Asociaciones de Ginecología y Obstetricia (FEBRASGO) — protocolos y directrices nacionales.',
            'Sociedad de Ginecología y Obstetricia del Estado de São Paulo (SOGESP) — referencia clínica.',
            'American College of Obstetricians and Gynecologists (ACOG) / American Society for Reproductive Medicine (ASRM) — directrices internacionales basadas en evidencia.',
            'Literatura sobre disparidades raciales en miomas uterinos (NIH / estudios poblacionales en mujeres negras).',
          ],
        },
      ],
    },

    // ====================== ENFERMEROS Y TÉCNICOS ==========================
    enfermeiro: {
      summary:
        'Reconocimiento del sangrado uterino anormal, cribado de anemia, acogida sin sesgo racial y orientación sobre los caminos de cuidado de los miomas en la Atención Primaria.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'Los miomas son tumores benignos (no cancerosos) que crecen en la pared del útero. Son muy comunes y, muchas veces, no causan ningún síntoma. Cuando los causan, los problemas más frecuentes son sangrado menstrual muy intenso, dolor y sensación de presión en la barriga.',
            'Es importante decirlo con claridad: el mioma NO es cáncer. Pero, cuando da síntomas, necesita seguimiento — especialmente porque el sangrado intenso puede causar anemia.',
          ],
        },
        {
          heading: 'Señales que el equipo debe reconocer',
          body: [
            'Sangrado uterino anormal: menstruación muy intensa (cambio de toalla cada hora, coágulos grandes), menstruación prolongada, sangrado entre las menstruaciones o fuera del periodo esperado.',
            'Señales de anemia asociada: cansancio intenso, palidez, falta de aire al esfuerzo, taquicardia, caída del cabello — investigar hemograma y ferritina.',
            'Síntomas compresivos: necesidad frecuente de orinar, dificultad para evacuar, sensación de peso/volumen abdominal y dolor pélvico.',
            'Señales de alarma que exigen derivación prioritaria: sangrado posmenopáusico, sangrado muy intenso con mareo/desmayo, crecimiento rápido de masa abdominal.',
          ],
        },
        {
          heading: 'Cribado y seguimiento en la Atención Primaria',
          body: [
            'Priorice la escucha cualificada de mujeres negras que relatan menstruación intensa o dolor pélvico: tienen mayor prevalencia de miomas y, históricamente, su dolor es subestimado. Registre la intensidad y el impacto del sangrado en la vida diaria (trabajo, escuela, sueño).',
            'Garantice la investigación básica: hemograma (anemia), ferritina, evaluación ginecológica y solicitud de ecografía según protocolo. Busque activamente casos de anemia en mujeres con sangrado abundante.',
            'En el seguimiento: monitorear sangrado y síntomas, reforzar la adherencia a tratamientos hormonales cuando estén prescritos, orientar sobre señales de alarma y organizar la derivación a ginecología cuando esté indicado.',
          ],
        },
        {
          heading: 'Quién debe estar atento — grupos de riesgo',
          body: [
            'Grupos que exigen atención redoblada: mujeres negras (prevalencia 2–3× mayor y síntomas más graves), mujeres de 30–50 años, con antecedente familiar de miomas, obesidad, hipertensión, inicio precoz de la menstruación y que nunca han estado embarazadas.',
            'Las mujeres con anemia recurrente o que no responden al hierro merecen investigación de sangrado uterino anormal como causa.',
            'Atención especial al deseo reproductivo: registrar y respetar el planeamiento de embarazo de la usuaria, pues esto influye directamente en las opciones de tratamiento y en la defensa del derecho de elección informada.',
          ],
        },
        {
          heading: 'Cuidado continuo y orientación al paciente/familia',
          body: [
            'Explique, en lenguaje sencillo, que el mioma es común, no es cáncer y que existen varias formas de tratamiento — no toda mujer necesita cirugía. Desmitificar el miedo ayuda a la mujer a decidir con tranquilidad.',
            'Oriente sobre el registro de los días y el volumen del sangrado, la importancia de tratar la anemia (hierro, alimentación) y la asistencia a las consultas. Aclare que existen tratamientos con medicamentos, procedimientos que preservan el útero y, en algunos casos, cirugía.',
            'Llamado antirracista: el dolor pélvico y el sangrado intenso de las mujeres negras son frecuentemente normalizados ("así es") o minimizados. No banalice la queja: acoja, registre e investigue. La intensidad relatada debe tomarse siempre en serio — las personas negras históricamente tienen su dolor subestimado y subtratado en el sistema de salud, y ese sesgo debe combatirse activamente en el triaje.',
          ],
        },
      ],
    },

    // ============================== USUARIOS ===============================
    usuario: {
      summary:
        'Qué son los miomas, por qué son tan comunes entre las mujeres negras, señales de alerta, cuidados diarios y dónde buscar ayuda en el SUS.',
      sections: [
        {
          heading: 'Qué es',
          body: [
            'Los miomas (también llamados fibromas) son bultos que crecen en la pared del útero. Son muy comunes y no son cáncer — son benignos. Muchas mujeres tienen miomas y ni lo saben, porque no sienten nada.',
            'Cuando dan síntomas, lo más común es que la menstruación se vuelva muy intensa, con coágulos y muchos días de duración, además de dolor en la barriga y ganas frecuentes de orinar. En algunos casos, los miomas pueden dificultar el embarazo.',
          ],
        },
        {
          heading: 'Por qué importa',
          body: [
            'Los miomas son mucho más frecuentes en las mujeres negras: aparecen más temprano, suelen ser más grandes y dar más síntomas, como sangrado intenso y anemia. Esto no es "cosa de tu cabeza" ni exageración — es una condición real y más grave para nosotras.',
            'La buena noticia: existen varios tratamientos, y la mayoría no exige extirpar el útero. Tienes derecho a conocer todas las opciones y a decidir lo que es mejor para tu cuerpo y para tus planes de vida.',
          ],
        },
        {
          heading: 'Señales de alerta — mantente atenta',
          body: [
            'Acude a la UBS si tienes: menstruación muy intensa (cambiar la toalla cada hora, con coágulos grandes), menstruación que dura muchos días, sangrado entre las menstruaciones, dolor fuerte en la barriga o en las relaciones sexuales.',
            'Presta atención a la anemia: cansancio que no pasa, palidez, falta de aire, corazón acelerado y caída del cabello pueden ser señal de que el sangrado está quitando hierro a tu cuerpo.',
            'Acude con prioridad si tienes: sangrado muy intenso con mareo o desmayo, o sangrado después de la menopausia. En esos casos, busca atención el mismo día.',
          ],
        },
        {
          heading: 'Cuidados diarios',
          body: [
            'Anota en un cuaderno (o en el móvil) los días y cuánto sangras, y lleva esa anotación a las consultas — esto ayuda mucho al equipo a entender tu caso y a elegir el mejor tratamiento.',
            'Trata la anemia: toma el hierro prescrito, aunque oscurezca las heces (es normal), y come alimentos ricos en hierro (frijol, carnes, hojas verdes oscuras) junto con vitamina C (naranja, acerola), que ayuda en la absorción.',
            'No aceptes "es normal sangrar así": si el sangrado interfiere en tu vida, tu trabajo o tu sueño, eso es motivo para investigar y tratar. Tienes derecho a tratamiento.',
            'Si tienes planes de embarazo, dilo claramente en la consulta — existen tratamientos que preservan el útero y tu capacidad de gestar.',
          ],
        },
        {
          heading: 'Dónde buscar ayuda en el SUS',
          body: [
            'La Unidad Básica de Salud (UBS) es el punto de partida: allí el equipo evalúa tu caso, pide los exámenes y, si es necesario, te deriva a ginecología. Todo por el SUS, gratis.',
            'Si tienes sangrado muy intenso con mareo, desmayo o dolor insoportable, acude de inmediato a urgencias.',
            'Usa la página "Red SUS" de esta plataforma para encontrar las unidades de salud más cercanas a ti en el Distrito Federal. Pregunta también por grupos de salud de la mujer en tu UBS.',
          ],
        },
      ],
    },
  },
  sources: [
    {
      label: 'FEBRASGO',
      detail: 'Federación Brasileña de las Asociaciones de Ginecología y Obstetricia — protocolos nacionales sobre miomas y sangrado uterino anormal.',
    },
    {
      label: 'SOGESP',
      detail: 'Sociedad de Ginecología y Obstetricia del Estado de São Paulo — referencia clínica y apoyo técnico de contenido.',
    },
    {
      label: 'ACOG / ASRM',
      detail: 'American College of Obstetricians and Gynecologists y American Society for Reproductive Medicine — directrices internacionales basadas en evidencia.',
    },
    {
      label: 'Literatura sobre disparidades raciales (NIH)',
      detail: 'Estudios poblacionales que documentan la mayor prevalencia, gravedad y tasa de histerectomía en mujeres negras.',
    },
  ],
};

export const miomasUterinosContent: Record<LocaleId, DiseaseDeepContent> = {
  pt: miomasUterinosContent_pt,
  es: miomasUterinosContent_es,
};
