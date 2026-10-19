// PERGUNTAS FREQUENTES — fonte única (site /perguntas-frequentes + App /perguntas
// + banco). Funcionalidade do MVP do Produto 2.2 (Relatório de Planejamento,
// item 4.1): "respostas para dúvidas recorrentes sobre doenças prevalentes na
// população negra, direitos dos usuários e acesso aos serviços públicos de saúde".
//
// Regras editoriais: linguagem leiga, siglas por extenso na 1ª menção (D14-a),
// só leis/normas e serviços verificáveis, sem números do DF que não estejam na
// análise de dados. PT e ES obrigatórios (o build falha se faltar tradução).

import type { LocaleId } from './locales.ts';

export type FaqCategoryId = 'saude' | 'direitos' | 'sus';

export interface FaqCategory {
  id: FaqCategoryId;
  title: Record<LocaleId, string>;
}

export interface FaqItem {
  id: string;
  category: FaqCategoryId;
  q: Record<LocaleId, string>;
  a: Record<LocaleId, string>;
  /** Link interno do SITE para saber mais (opcional; o App não exibe). */
  to?: string;
  linkLabel?: Record<LocaleId, string>;
}

export const faqCategories: FaqCategory[] = [
  { id: 'saude', title: { pt: 'Saúde', es: 'Salud' } },
  { id: 'direitos', title: { pt: 'Direitos', es: 'Derechos' } },
  { id: 'sus', title: { pt: 'Como usar o SUS', es: 'Cómo usar el SUS' } },
];

export const faqItems: FaqItem[] = [
  // ------------------------------- SAÚDE -------------------------------
  {
    id: 'por-que-doencas-afetam-mais',
    category: 'saude',
    q: {
      pt: 'Por que algumas doenças afetam mais a população negra?',
      es: '¿Por qué algunas enfermedades afectan más a la población negra?',
    },
    a: {
      pt: 'Por dois motivos que se somam. Algumas condições têm origem genética mais comum em pessoas de ascendência africana, como a doença falciforme. E muitas outras — como pressão alta, diabetes e mortalidade materna — pesam mais por causa do racismo: menos acesso a serviços, diagnóstico mais tarde, estresse constante e piores condições de vida. Não é "da raça": é desigualdade, e pode ser mudada.',
      es: 'Por dos motivos que se suman. Algunas condiciones tienen un origen genético más común en personas de ascendencia africana, como la enfermedad falciforme. Y muchas otras — como la presión alta, la diabetes y la mortalidad materna — pesan más por el racismo: menos acceso a servicios, diagnóstico más tardío, estrés constante y peores condiciones de vida. No es "de la raza": es desigualdad, y se puede cambiar.',
    },
    to: '/saude',
    linkLabel: { pt: 'Conheça a Biblioteca de Saúde', es: 'Conozca la Biblioteca de Salud' },
  },
  {
    id: 'pressao-alta-sem-sintoma',
    category: 'saude',
    q: {
      pt: 'Pressão alta dá sintoma? Como sei se tenho?',
      es: '¿La presión alta da síntomas? ¿Cómo sé si la tengo?',
    },
    a: {
      pt: 'Quase sempre não dá sintoma nenhum — por isso é chamada de "doença silenciosa". O único jeito de saber é medir. A medição é rápida, gratuita e pode ser feita em qualquer Unidade Básica de Saúde (UBS). Pessoas negras costumam ter pressão alta mais cedo, então vale medir pelo menos uma vez por ano a partir dos 18 anos.',
      es: 'Casi siempre no da ningún síntoma — por eso se llama "enfermedad silenciosa". La única forma de saberlo es medirla. La medición es rápida, gratuita y se hace en cualquier Unidad Básica de Salud (UBS). Las personas negras suelen tener presión alta más temprano, así que conviene medirla al menos una vez al año desde los 18 años.',
    },
    to: '/saude/cardiovasculares/hipertensao',
    linkLabel: { pt: 'Saiba mais sobre hipertensão', es: 'Más sobre hipertensión' },
  },
  {
    id: 'anemia-falciforme-teste-pezinho',
    category: 'saude',
    q: {
      pt: 'Como saber se meu bebê tem doença falciforme?',
      es: '¿Cómo saber si mi bebé tiene enfermedad falciforme?',
    },
    a: {
      pt: 'Pelo teste do pezinho, feito de graça no SUS nos primeiros dias de vida. Ele identifica a doença falciforme e também o "traço falciforme" (quando a pessoa carrega o gene, mas não tem a doença). A doença não é contagiosa: passa dos pais para os filhos. Com diagnóstico cedo e acompanhamento, a criança tem muito mais qualidade de vida.',
      es: 'Con la prueba del talón ("teste do pezinho"), gratuita en el SUS en los primeros días de vida. Identifica la enfermedad falciforme y también el "rasgo falciforme" (cuando la persona lleva el gen pero no tiene la enfermedad). No es contagiosa: pasa de padres a hijos. Con diagnóstico temprano y seguimiento, el niño tiene mucha más calidad de vida.',
    },
    to: '/saude/raras-autoimunes/anemia-falciforme',
    linkLabel: { pt: 'Saiba mais sobre anemia falciforme', es: 'Más sobre anemia falciforme' },
  },
  {
    id: 'exames-rins',
    category: 'saude',
    q: {
      pt: 'Tenho pressão alta ou diabetes. Preciso cuidar dos rins?',
      es: 'Tengo presión alta o diabetes. ¿Debo cuidar los riñones?',
    },
    a: {
      pt: 'Sim. Pressão alta e diabetes são as principais causas de doença nos rins, que costuma não dar sinal no começo. Peça na sua UBS, uma vez por ano, o exame de sangue (creatinina) e o de urina (albumina). E evite tomar remédio para dor e inflamação por conta própria.',
      es: 'Sí. La presión alta y la diabetes son las principales causas de enfermedad de los riñones, que al principio no suele dar señales. Pida en su UBS, una vez al año, el examen de sangre (creatinina) y el de orina (albúmina). Y evite tomar remedios para el dolor y la inflamación por su cuenta.',
    },
    to: '/saude/renais-geneticas/doenca-renal-cronica',
    linkLabel: { pt: 'Saiba mais sobre doença renal crônica', es: 'Más sobre enfermedad renal crónica' },
  },
  {
    id: 'saude-mental-ajuda',
    category: 'saude',
    q: {
      pt: 'Estou sofrendo emocionalmente. Onde posso buscar ajuda?',
      es: 'Estoy sufriendo emocionalmente. ¿Dónde puedo buscar ayuda?',
    },
    a: {
      pt: 'Você pode começar pela UBS, que acolhe e acompanha. O Centro de Atenção Psicossocial (CAPS) é o serviço do SUS especializado em saúde mental e atende sem precisar de encaminhamento. Para conversar a qualquer hora, o Centro de Valorização da Vida (CVV) atende de graça pelo telefone 188, 24 horas. Em crise ou risco imediato, ligue 192 (Serviço de Atendimento Móvel de Urgência — SAMU).',
      es: 'Puede empezar por la UBS, que acoge y acompaña. El Centro de Atención Psicosocial (CAPS) es el servicio del SUS especializado en salud mental y atiende sin derivación. Para hablar a cualquier hora, el Centro de Valorização da Vida (CVV) atiende gratis en el teléfono 188, las 24 horas. En crisis o riesgo inmediato, llame al 192 (Servicio de Atención Móvil de Urgencia — SAMU).',
    },
    to: '/saude?categoria=saude-mental',
    linkLabel: { pt: 'Ver temas de Saúde Mental', es: 'Ver temas de Salud Mental' },
  },
  {
    id: 'remedios-gratuitos',
    category: 'saude',
    q: {
      pt: 'Existem remédios gratuitos para pressão alta, diabetes e asma?',
      es: '¿Hay medicamentos gratuitos para presión alta, diabetes y asma?',
    },
    a: {
      pt: 'Sim. Eles são entregues de graça nas farmácias das UBS e também pelo programa Farmácia Popular, em farmácias credenciadas — basta levar a receita médica e um documento com foto e CPF.',
      es: 'Sí. Se entregan gratis en las farmacias de las UBS y también por el programa Farmácia Popular, en farmacias acreditadas — basta llevar la receta médica y un documento con foto y CPF.',
    },
  },

  // ------------------------------ DIREITOS ------------------------------
  {
    id: 'racismo-no-atendimento',
    category: 'direitos',
    q: {
      pt: 'Sofri racismo em um atendimento de saúde. O que fazer?',
      es: 'Sufrí racismo en una atención de salud. ¿Qué hago?',
    },
    a: {
      pt: 'Você não precisa aceitar. Racismo é crime (Lei nº 7.716/1989) e, desde 2023, a injúria racial também é tratada como racismo (Lei nº 14.532/2023). Anote data, local, nomes e testemunhas, se houver. Você pode relatar pelo App Sentinela e procurar a Ouvidoria do SUS (136), a Ouvidoria-Geral do Distrito Federal (162) ou o Disque Direitos Humanos (100). Em situação grave, registre boletim de ocorrência.',
      es: 'No tiene que aceptarlo. El racismo es delito (Ley nº 7.716/1989) y, desde 2023, la injuria racial también se trata como racismo (Ley nº 14.532/2023). Anote fecha, lugar, nombres y testigos, si los hay. Puede reportarlo en la App Sentinela y buscar la Ouvidoria del SUS (136), la Ouvidoria-Geral del Distrito Federal (162) o el Disque Direitos Humanos (100). En casos graves, haga la denuncia policial.',
    },
    to: '/ouvidoria',
    linkLabel: { pt: 'Ir para a Ouvidoria', es: 'Ir a la Ouvidoria' },
  },
  {
    id: 'pnsipn',
    category: 'direitos',
    q: {
      pt: 'Existe uma política de saúde específica para a população negra?',
      es: '¿Existe una política de salud específica para la población negra?',
    },
    a: {
      pt: 'Sim. A Política Nacional de Saúde Integral da População Negra (Portaria do Ministério da Saúde nº 992/2009) reconhece o racismo como fator que afeta a saúde e orienta o SUS a promover equidade. O Estatuto da Igualdade Racial (Lei nº 12.288/2010) garante à população negra acesso universal e igualitário ao SUS.',
      es: 'Sí. La Política Nacional de Salud Integral de la Población Negra (Ordenanza del Ministerio de Salud nº 992/2009) reconoce el racismo como factor que afecta la salud y orienta al SUS a promover la equidad. El Estatuto de la Igualdad Racial (Ley nº 12.288/2010) garantiza a la población negra acceso universal e igualitario al SUS.',
    },
    to: '/ouvidoria',
    linkLabel: { pt: 'Conheça seus direitos', es: 'Conozca sus derechos' },
  },
  {
    id: 'raca-cor-cadastro',
    category: 'direitos',
    q: {
      pt: 'Por que me perguntam raça/cor no atendimento?',
      es: '¿Por qué me preguntan raza/color en la atención?',
    },
    a: {
      pt: 'Porque, desde 2017, o preenchimento do quesito raça/cor é obrigatório nos sistemas de informação do SUS (Portaria do Ministério da Saúde nº 344/2017). Sem esse dado, as desigualdades ficam invisíveis e não viram política pública. A resposta é sempre sua: é você quem declara, e ninguém pode decidir por você.',
      es: 'Porque, desde 2017, el registro del dato raza/color es obligatorio en los sistemas de información del SUS (Ordenanza del Ministerio de Salud nº 344/2017). Sin ese dato, las desigualdades se vuelven invisibles y no se convierten en política pública. La respuesta es siempre suya: usted declara, y nadie puede decidir por usted.',
    },
    to: '/dados-e-indicadores',
    linkLabel: { pt: 'Veja o que os dados mostram', es: 'Vea lo que muestran los datos' },
  },
  {
    id: 'acompanhante',
    category: 'direitos',
    q: {
      pt: 'Posso ter um acompanhante na consulta, no exame ou no parto?',
      es: '¿Puedo tener un acompañante en la consulta, el examen o el parto?',
    },
    a: {
      pt: 'Sim. A gestante tem direito a acompanhante de sua escolha durante o trabalho de parto, o parto e o pós-parto (Lei nº 11.108/2005). Toda mulher tem direito a acompanhante em consultas, exames e procedimentos (Lei nº 14.737/2023). A pessoa idosa internada também tem direito a acompanhante (Estatuto da Pessoa Idosa, Lei nº 10.741/2003).',
      es: 'Sí. La gestante tiene derecho a un acompañante de su elección durante el trabajo de parto, el parto y el posparto (Ley nº 11.108/2005). Toda mujer tiene derecho a acompañante en consultas, exámenes y procedimientos (Ley nº 14.737/2023). La persona mayor hospitalizada también tiene derecho a acompañante (Estatuto de la Persona Mayor, Ley nº 10.741/2003).',
    },
  },
  {
    id: 'direitos-usuario',
    category: 'direitos',
    q: {
      pt: 'Quais são meus direitos como usuário do SUS?',
      es: '¿Cuáles son mis derechos como usuario del SUS?',
    },
    a: {
      pt: 'A Carta dos Direitos dos Usuários da Saúde (Portaria do Ministério da Saúde nº 1.820/2009) garante, entre outros: atendimento humanizado e sem discriminação; informação clara sobre seu estado de saúde e tratamento; acesso ao seu prontuário; sigilo dos seus dados; e o direito de recusar ou aceitar procedimentos depois de informado(a).',
      es: 'La Carta de los Derechos de los Usuarios de la Salud (Ordenanza del Ministerio de Salud nº 1.820/2009) garantiza, entre otros: atención humanizada y sin discriminación; información clara sobre su estado de salud y tratamiento; acceso a su historia clínica; confidencialidad de sus datos; y el derecho a aceptar o rechazar procedimientos después de ser informado(a).',
    },
  },
  {
    id: 'pesquisa-clinica-direitos',
    category: 'direitos',
    q: {
      pt: 'Fui convidado(a) para uma pesquisa clínica. Sou obrigado(a) a participar?',
      es: 'Me invitaron a un ensayo clínico. ¿Estoy obligado(a) a participar?',
    },
    a: {
      pt: 'Não. A participação é sempre voluntária. Antes de aceitar, você deve receber e entender o Termo de Consentimento Livre e Esclarecido, e pode desistir a qualquer momento, sem perder seu atendimento. Toda pesquisa com pessoas precisa de aprovação de um Comitê de Ética em Pesquisa (Resolução do Conselho Nacional de Saúde nº 466/2012).',
      es: 'No. La participación es siempre voluntaria. Antes de aceptar, debe recibir y entender el Término de Consentimiento Libre e Informado, y puede retirarse en cualquier momento sin perder su atención. Toda investigación con personas necesita aprobación de un Comité de Ética en Investigación (Resolución del Consejo Nacional de Salud nº 466/2012).',
    },
    to: '/ensaios-clinicos',
    linkLabel: { pt: 'Entenda os ensaios clínicos', es: 'Entienda los ensayos clínicos' },
  },
  {
    id: 'dados-no-app',
    category: 'direitos',
    q: {
      pt: 'O que acontece com meus dados no App Sentinela?',
      es: '¿Qué pasa con mis datos en la App Sentinela?',
    },
    a: {
      pt: 'Dados de saúde e de raça/cor são dados sensíveis pela Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). No App você escolhe, em níveis separados, o que autoriza: uso do App, participação em pesquisas, dados agregados para políticas públicas e localização. Você pode mudar essas escolhas quando quiser.',
      es: 'Los datos de salud y de raza/color son datos sensibles según la Ley General de Protección de Datos de Brasil (LGPD — Ley nº 13.709/2018). En la App usted elige, en niveles separados, qué autoriza: uso de la App, participación en investigaciones, datos agregados para políticas públicas y ubicación. Puede cambiar esas elecciones cuando quiera.',
    },
    to: '/transparencia',
    linkLabel: { pt: 'Transparência e proteção de dados', es: 'Transparencia y protección de datos' },
  },

  // ---------------------------- ACESSO AO SUS ----------------------------
  {
    id: 'por-onde-comecar',
    category: 'sus',
    q: {
      pt: 'Por onde começo para ser atendido(a) no SUS?',
      es: '¿Por dónde empiezo para ser atendido(a) en el SUS?',
    },
    a: {
      pt: 'Pela Unidade Básica de Saúde (UBS) mais perto da sua casa. É lá que você faz consultas, exames de rotina, vacinas, acompanhamento de pressão e diabetes, pré-natal e recebe remédios. A UBS também encaminha para especialistas quando precisar.',
      es: 'Por la Unidad Básica de Salud (UBS) más cercana a su casa. Allí hace consultas, exámenes de rutina, vacunas, seguimiento de presión y diabetes, control prenatal y recibe medicamentos. La UBS también deriva a especialistas cuando sea necesario.',
    },
    to: '/rede-sus',
    linkLabel: { pt: 'Encontre a sua unidade de saúde', es: 'Encuentre su unidad de salud' },
  },
  {
    id: 'cartao-sus',
    category: 'sus',
    q: {
      pt: 'Preciso do Cartão SUS para ser atendido(a)?',
      es: '¿Necesito la Tarjeta SUS para ser atendido(a)?',
    },
    a: {
      pt: 'O Cartão Nacional de Saúde (Cartão SUS) organiza seu histórico, e você pode fazê-lo de graça na UBS com documento com foto e CPF. Mas a falta do cartão não pode impedir atendimento de urgência e emergência.',
      es: 'La Tarjeta Nacional de Salud (Cartão SUS) organiza su historial, y puede hacerla gratis en la UBS con documento con foto y CPF. Pero no tenerla no puede impedir la atención de urgencia y emergencia.',
    },
  },
  {
    id: 'urgencia-onde-ir',
    category: 'sus',
    q: {
      pt: 'É urgência. Vou à UBS, à UPA ou ao hospital?',
      es: 'Es una urgencia. ¿Voy a la UBS, a la UPA o al hospital?',
    },
    a: {
      pt: 'Para casos do dia a dia, a UBS. Para urgências como febre muito alta, crise de asma, pressão muito alta ou cortes, a Unidade de Pronto Atendimento (UPA), que funciona 24 horas. Em emergências graves — dor forte no peito, desmaio, falta de ar intensa, sinais de AVC (boca torta, fraqueza de um lado do corpo, fala enrolada) — ligue 192 (SAMU) ou vá direto ao hospital.',
      es: 'Para casos cotidianos, la UBS. Para urgencias como fiebre muy alta, crisis de asma, presión muy alta o cortes, la Unidad de Pronta Atención (UPA), que funciona las 24 horas. En emergencias graves — dolor fuerte en el pecho, desmayo, falta de aire intensa, signos de ACV (boca torcida, debilidad de un lado del cuerpo, habla arrastrada) — llame al 192 (SAMU) o vaya directo al hospital.',
    },
    to: '/rede-sus',
    linkLabel: { pt: 'Ver UPAs e hospitais do Distrito Federal', es: 'Ver UPA y hospitales del Distrito Federal' },
  },
  {
    id: 'violencia-cepav',
    category: 'sus',
    q: {
      pt: 'Sofri violência. Onde encontro apoio de saúde?',
      es: 'Sufrí violencia. ¿Dónde encuentro apoyo de salud?',
    },
    a: {
      pt: 'No Distrito Federal, os Centros de Especialidades para a Atenção às Pessoas em Situação de Violência (CEPAV) oferecem atendimento de saúde e acompanhamento. Em casos de violência sexual, procure um hospital o quanto antes: há medicamentos que previnem infecções e gravidez quando tomados cedo. Para denunciar violência contra a mulher, ligue 180.',
      es: 'En el Distrito Federal, los Centros de Especialidades para la Atención de Personas en Situación de Violencia (CEPAV) ofrecen atención de salud y acompañamiento. En casos de violencia sexual, acuda a un hospital lo antes posible: hay medicamentos que previenen infecciones y embarazo si se toman pronto. Para denunciar violencia contra la mujer, llame al 180.',
    },
    to: '/rede-sus',
    linkLabel: { pt: 'Ver os CEPAV por região', es: 'Ver los CEPAV por región' },
  },
  {
    id: 'prep-gratuita',
    category: 'sus',
    q: {
      pt: 'A prevenção ao HIV (PrEP) é gratuita?',
      es: '¿La prevención del VIH (PrEP) es gratuita?',
    },
    a: {
      pt: 'Sim. A Profilaxia Pré-Exposição ao HIV (PrEP) é oferecida de graça pelo SUS, assim como o teste de HIV e o tratamento. Procure a UBS ou um serviço de referência em infecções sexualmente transmissíveis para saber onde retirar.',
      es: 'Sí. La Profilaxis Pre-Exposición al VIH (PrEP) se ofrece gratis en el SUS, igual que la prueba de VIH y el tratamiento. Busque la UBS o un servicio de referencia en infecciones de transmisión sexual para saber dónde retirarla.',
    },
    to: '/saude/outras/hiv',
    linkLabel: { pt: 'Saiba mais sobre HIV/AIDS', es: 'Más sobre VIH/SIDA' },
  },
];
