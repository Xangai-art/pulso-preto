// Dados da página 'Medicina Tradicional Brasileira' — recuperados/reconstruídos a partir
// do pacote v4.3 (implementado em sessão anterior, publicado no Cloudflare Pages mas nunca
// commitado no GitHub deste repositório). Fonte primária: livro 'Saberes, Ciências e Plantas
// Medicinais: uma abordagem multidisciplinar' (Fiocruz/Farmanguinhos), disponível para
// download em site/public/static/livros/.

export interface PlantSection {
  heading: string;
  body: string[];
}

export interface MedicinalPlant {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  popularNames: string[];
  summary: string;
  heroNote: string;
  sections: PlantSection[];
  preparationMethods: string[];
  study: string;
  finding: string;
  caution: string;
  sources: string[];
}

export const medicinalPlants: MedicinalPlant[] = [
  {
    id: 'picao-preto',
    name: 'Picão-preto',
    scientificName: 'Bidens pilosa',
    family: 'Asteraceae',
    popularNames: ['Picão', 'Carrapicho-de-agulha', 'Fura-capa', 'Amor-de-burro'],
    summary: 'Planta invasora comum em quintais e terrenos baldios de todo o Brasil, usada na medicina popular para diabetes, hipertensão e problemas hepáticos.',
    heroNote: 'Talvez a "erva daninha" mais subestimada do quintal brasileiro — e uma das mais estudadas pela ciência para diabetes.',
    sections: [
      {
        heading: 'Uma planta que cresce onde ninguém planta',
        body: [
          'O Picão-preto não precisa de horta: nasce espontaneamente em calçadas, terrenos baldios e quintais em quase todo o território brasileiro. Essa ubiquidade é parte da sua história popular — por ser acessível e gratuita, tornou-se um dos remédios caseiros mais difundidos entre famílias negras e periféricas, atravessando gerações por transmissão oral, sem depender de farmácia ou receita.',
          'Como boa parte do conhecimento tradicional brasileiro, seu uso não nasceu em laboratório: nasceu da observação cotidiana, repetida, testada por tentativa e ajuste dentro da própria comunidade — o que a literatura chama de conhecimento etnobotânico, transmitido de mãe para filha, de avó para nora.',
        ],
      },
      {
        heading: 'O que a ciência está encontrando',
        body: [
          'Estudos com formulações à base de Bidens pilosa (referência: PMC4381681, e monografia técnica gov.br/Anvisa sobre uso tradicional) mostraram melhora de marcadores glicêmicos — glicemia de jejum e HbA1c — em modelos com animais e ensaios in vitro. É exatamente o tipo de "atalho" que a etnofarmacologia busca: partir do que a comunidade já usa e testar, com rigor, se a ciência confirma o que a prática popular já apontava.',
          'Importante: essa evidência ainda é majoritariamente pré-clínica (estudos em modelos, não em grandes populações humanas). Isso não invalida o saber tradicional — o conhecimento popular não precisa da validação científica para ser válido para quem o pratica — mas significa que o Picão-preto ainda não deve substituir o tratamento medicamentoso prescrito para diabetes ou hipertensão.',
        ],
      },
      {
        heading: 'Como é usado tradicionalmente',
        body: [
          'O modo de preparo mais comum é a infusão das partes aéreas (folhas e flores) em água quente, coada e consumida como chá, geralmente 2 a 3 vezes ao dia. Alguns preparos tradicionais combinam o Picão-preto com outras plantas — uma característica típica da medicina popular brasileira, que costuma tratar "o indivíduo" com receitas de várias plantas, diferente da lógica mais unitária (uma planta, um uso) observada em alguns povos indígenas.',
        ],
      },
    ],
    preparationMethods: ['infusao'],
    study: 'Estudo em modelo com formulação de Bidens pilosa (PMC4381681); Monografia técnica gov.br/Anvisa (uso tradicional)',
    finding: 'Uso tradicional para diabetes, hipertensão e doenças hepáticas. Formulações à base da planta melhoraram marcadores glicêmicos (glicemia de jejum e HbA1c) em estudos com animais/modelos in vitro.',
    caution: 'Evidência em humanos ainda é preliminar (majoritariamente pré-clínica). Pode potencializar hipoglicemiantes — atenção redobrada para quem já usa insulina ou outros medicamentos para diabetes.',
    sources: [
      'PMC4381681 — estudo pré-clínico com Bidens pilosa',
      'Monografia técnica gov.br/Anvisa sobre uso tradicional de plantas medicinais',
      'Saberes, Ciências e Plantas Medicinais (Fiocruz/Farmanguinhos) — contexto de transmissão oral do conhecimento tradicional e preparo por infusão',
    ],
  },
  {
    id: 'boldo-brasileiro',
    name: 'Boldo brasileiro',
    scientificName: 'Plectranthus barbatus',
    family: 'Lamiaceae',
    popularNames: ['Boldo-de-jardim', 'Boldo-nacional', 'Falso-boldo', 'Boldo-de-cheiro'],
    summary: 'Diferente do "boldo-do-chile", esse é o boldo que cresce em quase todo quintal brasileiro — hepatoprotetor e digestivo na tradição popular, mas com interação medicamentosa documentada.',
    heroNote: 'O boldo que sua avó plantava perto da porta não é o mesmo boldo chileno da farmácia — e essa diferença importa.',
    sections: [
      {
        heading: 'Duas plantas, um só nome popular — e o risco que isso traz',
        body: [
          'Um dos alertas centrais da literatura sobre plantas medicinais brasileiras é justamente este: plantas diferentes compartilhando o mesmo nome popular são "passíveis de confusão e substituição no comércio, expondo a saúde do consumidor a risco" — e o boldo é um exemplo clássico. O "boldo brasileiro" (Plectranthus barbatus) é uma planta diferente do boldo-do-chile (Peumus boldus), vendido embalado em farmácias. Ambos têm uso popular hepatoprotetor, mas composição química distinta.',
          'Essa é uma das razões pelas quais este projeto sempre cita o nome científico junto ao nome popular: em plantas medicinais, o nome científico não é formalidade acadêmica — é segurança.',
        ],
      },
      {
        heading: 'Um clássico do quintal e da medicina popular',
        body: [
          'O boldo brasileiro é uma das plantas mais citadas na medicina popular para distúrbios hepáticos e gástricos, cultivada informalmente em quintais e hortas comunitárias em todo o país. Seu efeito hepatoprotetor e digestivo é reconhecido por monografias técnicas oficiais (SES-DF), e a planta também tem efeito cardiovascular inotrópico documentado — ou seja, atua sobre a força de contração do coração, o que explica parte da cautela recomendada com seu uso.',
        ],
      },
      {
        heading: 'A interação que todo usuário de anticoagulante precisa saber',
        body: [
          'Um caso publicado na Revista Brasileira de Farmacognosia (SciELO) documentou redução do efeito da warfarina (anticoagulante) durante uso concomitante do boldo brasileiro, com normalização após a suspensão da planta. Isso não significa que a planta seja "perigosa" — significa que nenhuma planta medicinal, por mais tradicional que seja, está isenta de interagir com medicamentos. Quem está em anticoagulação não deve usar boldo brasileiro sem orientação profissional.',
        ],
      },
    ],
    preparationMethods: ['infusao', 'decoccao'],
    study: 'Monografia técnica de plantas medicinais (SES-DF); Revista Brasileira de Farmacognosia (SciELO) — relato de interação com warfarina',
    finding: 'Uso tradicional hepatoprotetor e digestivo, com efeito cardiovascular (inotrópico) documentado. Amplamente citado na medicina popular para distúrbios hepáticos e gástricos.',
    caution: 'Interage com anticoagulantes: caso publicado mostrou redução do efeito da warfarina durante o uso concomitante, normalizado após suspensão da planta. Não usar sem orientação profissional se estiver em anticoagulação.',
    sources: [
      'Monografia técnica de plantas medicinais — SES-DF',
      'Revista Brasileira de Farmacognosia (SciELO) — relato de caso de interação com warfarina',
      'Saberes, Ciências e Plantas Medicinais (Fiocruz/Farmanguinhos) — risco de confusão/substituição entre espécies de mesmo nome popular',
    ],
  },
  {
    id: 'folha-santa',
    name: 'Folha-santa',
    scientificName: 'Kalanchoe pinnata',
    family: 'Crassulaceae',
    popularNames: ['Coirama', 'Saião', 'Diabinho', 'Folha-da-fortuna', 'Corama'],
    summary: 'Chamada de "diabinho" em algumas regiões, é classificada como planta "fria" na teoria tradicional quente-frio — usada topicamente para inflamações e feridas.',
    heroNote: 'Na teoria popular do quente e frio, essa é uma planta "fria" — usada exatamente para equilibrar o que o corpo sente como "quente demais".',
    sections: [
      {
        heading: 'A lógica do quente e do frio',
        body: [
          'Muito antes da medicina baseada em evidências, comunidades tradicionais brasileiras — como parte de um sistema de saberes que ecoa a antiga teoria humoral hipocrática — classificam doenças e plantas em categorias de "quente" e "frio". Doenças "quentes" (como erisipela, uma inflamação de pele) são tratadas com plantas "frias", buscando reequilíbrio. A Folha-santa, também conhecida popularmente como "diabinho" em algumas regiões, é classificada nessa tradição como planta fria, e por isso indicada para tratar quadros inflamatórios de pele.',
          'Essa lógica pode parecer estranha do ponto de vista biomédico ("etic", a visão de fora, do pesquisador), mas faz total sentido dentro da própria cosmovisão da comunidade que a pratica ("emic", a visão de dentro). O respeito por essa lógica interna — sem julgá-la como "atraso" — é hoje um princípio central da etnofarmacologia responsável.',
        ],
      },
      {
        heading: 'O que a ciência confirma',
        body: [
          'Estudos publicados (PubMed PMID 30856538) confirmam atividade anti-inflamatória tópica em formulações da planta, alinhando-se de forma notável com o uso tradicional predominantemente externo — cataplasma e sumo aplicado diretamente na pele. Há também relatos de uso oral em leishmaniose cutânea na literatura tradicional, embora esse uso específico exija muito mais cautela.',
        ],
      },
      {
        heading: 'Por que o uso interno pede cuidado redobrado',
        body: [
          'Diferente do uso tópico (bem documentado e relativamente seguro), o uso oral da Folha-santa envolve flavonoides com ação sobre a tireoide. Isso significa que ingerir a planta não deve substituir avaliação médica, especialmente para quem já tem hipotireoidismo ou outra condição da tireoide. Este é um exemplo perfeito do princípio central deste projeto: tradição e ciência não competem — se complementam, e a ciência ajuda a tradição a ser praticada com mais segurança.',
        ],
      },
    ],
    preparationMethods: ['cataplasma', 'sumo-topico'],
    study: 'PubMed PMID 30856538 (atividade anti-inflamatória tópica); relatos de uso oral em leishmaniose cutânea',
    finding: 'Formulações tópicas com a planta demonstraram atividade anti-inflamatória local em estudo publicado. Uso popular é predominantemente externo (cataplasma, sumo tópico).',
    caution: 'Uso oral só com orientação profissional: flavonoides da planta têm ação sobre a tireoide e o uso interno não deve substituir avaliação médica, especialmente em quadros de hipotireoidismo.',
    sources: [
      'PubMed PMID 30856538 — atividade anti-inflamatória tópica',
      'Saberes, Ciências e Plantas Medicinais (Fiocruz/Farmanguinhos) — teoria tradicional do quente-frio; classificação de plantas "frias" para doenças "quentes"',
    ],
  },
];

export interface PreparationMethod {
  nome: string;
  definicao: string;
}

export const preparationMethodsGlossary: Record<string, PreparationMethod> = {
  'infusao': {
    nome: 'Infusão',
    definicao: 'Água quente (não em ebulição) é despejada sobre as partes moles da planta — flores, folhas, frutos — em recipiente coberto, por alguns minutos. É o método clássico do "chá caseiro", indicado quando o calor prolongado da fervura poderia degradar os princípios ativos.',
  },
  'decoccao': {
    nome: 'Decocção',
    definicao: 'A planta — geralmente partes duras: cascas, raízes, frutos secos, caules lenhosos — é mantida em água em fervura por um período. É um método de extração mais "aberto" e prolongado que a infusão, mas de uso restrito: o calor sustentado pode degradar alguns compostos ativos sensíveis.',
  },
  'maceracao': {
    nome: 'Maceração',
    definicao: 'O material vegetal é deixado em repouso dentro de um solvente (água, álcool ou outro), em recipiente fechado, por um tempo determinado, com agitações ocasionais. Depois, o resíduo sólido é separado — às vezes prensado — do líquido extraído.',
  },
  'tintura': {
    nome: 'Tintura',
    definicao: 'Preparação alcoólica ou hidroalcoólica, obtida por maceração ou percolação. A Farmacopeia Brasileira tradicionalmente usa a proporção de 1g de planta seca para 10mL de tintura simples, com teor alcoólico variando entre 25% e 90% dependendo da espécie.',
  },
  'xarope': {
    nome: 'Xarope',
    definicao: 'Solução com no mínimo 45% de sacarose/açúcares. Pode ser preparado por dissolução a quente, dissolução a frio (para extratos secos ou tinturas líquidas), adição de açúcar a uma infusão/decocção já pronta, ou percolação através do próprio açúcar.',
  },
  'cataplasma': {
    nome: 'Cataplasma / uso tópico',
    definicao: 'Aplicação direta da planta (in natura, macerada ou em compressa) sobre a pele — uso externo, comum em plantas indicadas para inflamações, feridas ou dores localizadas. Não substitui avaliação de feridas com sinais de infecção.',
  },
  'sumo-topico': {
    nome: 'Sumo tópico',
    definicao: 'O líquido extraído diretamente da planta fresca (espremida ou amassada) é aplicado sobre a pele, sem preparo intermediário — método comum para plantas "frias" usadas em inflamações superficiais.',
  },
};

export interface TraditionalMedicineSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  glossaryRef?: boolean;
}

export const traditionalMedicinePage = {
  eyebrow: 'Folhas com ciência — página completa',
  title: 'Medicina Tradicional Brasileira',
  subtitle: 'Ciência e ancestralidade não competem — se completam. Esta página existe para honrar o saber que atravessou gerações por transmissão oral, e para mostrar, com transparência, onde a ciência já confirma esse saber e onde ainda pede cautela.',
  intro: [
    '"As plantas participam da vida dos seres humanos desde os tempos mais remotos da nossa história." É com essa frase que começa boa parte da literatura científica sobre plantas medicinais no Brasil — e é o ponto de partida desta página.',
    'O uso de plantas segundo indicações baseadas na tradição popular "representa uma grande vantagem estratégica" para a descoberta de novos tratamentos: é um atalho legítimo, construído por gerações de observação, tentativa e transmissão oral — sobretudo em comunidades que não têm, ou historicamente não tiveram, tradição escrita.',
    'E aqui está o ponto mais importante, direto da literatura: o conhecimento tradicional e popular não precisa ser validado pela ciência para ser válido. Ele existe por si — independente da avaliação da medicina formal. A ciência entra não para "autorizar" o saber popular, mas para dialogar com ele, confirmar o que pode ser confirmado, e alertar sobre riscos que o uso popular, sozinho, não teria como enxergar (como interações medicamentosas ou contaminação de produtos vendidos informalmente).',
  ],
  sections: [
    {
      id: 'quente-frio',
      eyebrow: 'Cosmovisão popular',
      title: 'A teoria do quente e do frio',
      body: [
        'Muito antes de qualquer laboratório, comunidades tradicionais brasileiras desenvolveram sistemas próprios e coerentes de compreensão do corpo e da doença — entre eles, a classificação de doenças e plantas em "quentes" e "frias", um sistema que ecoa (sem depender dela) a antiga teoria humoral hipocrática.',
        'Doenças entendidas como "quentes" — como a erisipela, uma inflamação aguda da pele — são tratadas com plantas classificadas como "frias", buscando reequilíbrio. É o caso da Folha-santa (Kalanchoe pinnata), tradicionalmente usada dessa forma.',
        'Esse sistema só faz sentido plenamente quando observado de dentro da cosmovisão que o pratica — o que a antropologia chama de perspectiva "emic" (interna, da própria comunidade), em contraste com a perspectiva "etic" (externa, do pesquisador, mais comparativa e descritiva). A recomendação da literatura é clara: comece pelo emic, para não incorrer em preconceito ou incompreensão do saber tradicional.',
      ],
    },
    {
      id: 'preparo',
      eyebrow: 'Da floresta ao chá',
      title: 'Como preparar plantas medicinais com segurança',
      body: [
        'Cada método de preparo existe por um motivo técnico — não é apenas "jeito da vovó fazer". Abaixo, o glossário dos métodos tradicionais mais citados na literatura e usados nas plantas desta página.',
      ],
      glossaryRef: true,
    },
    {
      id: 'saberes-apagados',
      eyebrow: 'História que resiste',
      title: 'Saberes que a colonização tentou apagar',
      body: [
        'Nem todo saber tradicional chegou intacto até hoje. A literatura documenta com clareza: comunidades indígenas preservaram uso ritual e prático de plantas; comunidades afro-brasileiras mantiveram, mesmo sob forte pressão de conversão católica, rituais envolvendo plantas de efeito psicoativo; já comunidades ribeirinhas/caboclas, segundo estudos citados no livro, perderam boa parte desse conhecimento justamente pela conversão religiosa e pela erosão cultural ao longo de gerações.',
        'Um estudo comparativo citado na literatura (Rodrigues & Carlini, 2006) entre a medicina indígena Krahô e a medicina quilombola do Pantanal revela uma diferença profunda de lógica: os Krahô costumam usar 1 planta por receita, para 1 uso terapêutico específico — tratam "a doença". Comunidades quilombolas, por outro lado, chegam a combinar até 10 plantas em uma única receita, e uma mesma planta pode ter até 7 usos terapêuticos diferentes — a lógica quilombola trata "o indivíduo" em sua totalidade, não apenas o sintoma.',
        'Essa diferença não é hierarquia — é diversidade de sistemas de cuidado, cada um coerente dentro de sua própria lógica. Reconhecer essa diversidade, sem hierarquizar "qual é mais científico", é parte do compromisso editorial desta página.',
      ],
    },
    {
      id: 'biopirataria',
      eyebrow: 'Proteção e soberania',
      title: 'Biopirataria e proteção do conhecimento tradicional',
      body: [
        'Biopirataria é a apropriação de recursos genéticos ou conhecimento tradicional associado sem autorização e sem repartição justa de benefícios com quem os detém ou os originou. A história brasileira tem exemplos emblemáticos — como a saída não autorizada de sementes de seringueira (Hevea brasiliensis) do Brasil no século XIX, que quebrou o monopólio nacional da produção de látex.',
        'Para enfrentar esse risco, o Brasil tem a Lei da Biodiversidade (Lei 13.123/2015), que regula o acesso ao patrimônio genético e ao conhecimento tradicional associado, exigindo repartição de benefícios quando há exploração econômica. Outro instrumento internacional de referência é a TKDL — Traditional Knowledge Digital Library, criada na Índia, que documenta formalmente conhecimentos tradicionais exatamente para impedir que sejam patenteados por terceiros como se fossem "descobertas" novas.',
        'Documentar e valorizar publicamente o conhecimento tradicional brasileiro — como esta página tenta fazer, de forma modesta — também é, em certa medida, um ato de proteção desse patrimônio.',
      ],
    },
    {
      id: 'seguranca',
      eyebrow: 'Atenção',
      title: 'Nem tudo que é natural é seguro',
      body: [
        'Ser natural não significa estar isento de risco. A literatura é direta: "muitas espécies causam efeitos tóxicos ou carecem de comprovação de eficácia e segurança."',
        'Um problema pouco discutido é a qualidade do que se compra informalmente. Plantas com alta semelhança morfológica, ou que compartilham o mesmo nome popular, são frequentemente confundidas ou substituídas no comércio — expondo quem compra a risco real, especialmente quando o material já vem seco ou triturado, o que torna a identificação visual impossível. A presença de rótulo NÃO garante autenticidade: fraude e adulteração (adição de terra, insetos, partes não terapêuticas da planta para aumentar peso) são recorrentes em produtos de pequenos produtores sem controle de qualidade — sem necessariamente haver má-fé, apenas colheita e manuseio pouco cuidadosos.',
        'Por isso, recomendações práticas: prefira sempre que possível cultivar suas próprias plantas medicinais de confiança (horta/quintal), busque procedência clara ao comprar, informe seu médico ou farmacêutico sobre qualquer planta que use — principalmente se estiver em tratamento com outros medicamentos — e nunca use plantas medicinais para substituir tratamento prescrito sem orientação profissional. Gestantes e lactantes merecem cautela redobrada: para a maioria das plantas, simplesmente não existem estudos de segurança reprodutiva.',
      ],
    },
  ] as TraditionalMedicineSection[],
};

export const referenceBook = {
  id: 'saberes-ciencias-plantas-medicinais',
  titulo: 'Saberes, Ciências e Plantas Medicinais: uma abordagem multidisciplinar',
  autoria: 'Fiocruz / Farmanguinhos',
  descricao: 'A obra de referência por trás do conteúdo desta página: 16 capítulos cobrindo história do uso de plantas medicinais no Brasil, cultivo, autenticação botânica e genética, etnofarmacologia, quimiossistemática, metabolômica, produção industrial de fitoterápicos, controle de qualidade e proteção do conhecimento tradicional contra a biopirataria.',
  arquivo: '/static/livros/saberes-ciencias-e-plantas-medicinais.pdf',
  tamanho: '~19 MB · PDF',
  capitulos: [
    'História do uso de plantas medicinais',
    'Cultivo de plantas medicinais',
    'Preparo de extratos vegetais',
    'Autenticidade morfológica',
    'Autenticação genética',
    'Etnofarmacologia',
    'Quimiossistemática',
    'Metabolismo e célula vegetal',
    'Metabólitos primários e proteínas',
    'Isolamento de metabólitos secundários',
    'Metabolômica, RMN e espectrometria de massas',
    'Química medicinal e síntese',
    'Produção industrial de fitoterápicos',
    'Controle de qualidade',
    'Estudos farmacológicos e clínicos',
    'Proteção do conhecimento tradicional e biopirataria',
  ],
};
