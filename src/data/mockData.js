export const jobs = [
  {
    id: 'front-end-react',
    title: 'Desenvolvedor Front-end React',
    company: 'Tech Solutions S/A',
    location: 'Centro, Ferraz',
    mode: 'CLT',
    salary: 'R$ 3.500 - R$ 5.000',
    category: 'Tecnologia',
    time: 'Há 2 horas',
    icon: 'logo-react',
    color: '#3B82F6',
    saved: false,
    description: 'Estamos em busca de uma pessoa desenvolvedora Front-end React para criar interfaces acessíveis, responsivas e conectadas aos serviços digitais da cidade.',
    aboutCompany: 'A Tech Solutions S/A atua com produtos digitais para o setor financeiro e valoriza colaboração, aprendizado contínuo e qualidade de entrega.',
    requirements: [
      'Experiência com React, Hooks e Context API.',
      'Domínio de HTML5, CSS3 e JavaScript moderno.',
      'Consumo de APIs RESTful e organização de componentes.',
      'Conhecimento em boas práticas de UI e acessibilidade.',
    ],
    skills: ['React', 'JavaScript', 'HTML/CSS', 'TailwindCSS', 'TypeScript'],
    benefits: [
      ['heart', 'Plano de Saúde'],
      ['utensils', 'Vale Refeição'],
      ['dumbbell', 'Gympass'],
      ['home-laptop', 'Auxílio Home Office'],
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer Pleno',
    company: 'Agência Criativa Mogi',
    location: 'Mogi das Cruzes, SP',
    mode: 'Presencial',
    salary: 'A combinar',
    category: 'Tecnologia',
    time: 'Há 1 dia',
    icon: 'color-palette-outline',
    color: '#8B5CF6',
    saved: true,
    description: 'A vaga é para atuar na criação de fluxos, wireframes, protótipos e interfaces para campanhas, produtos digitais e experiências de atendimento.',
    aboutCompany: 'A Agência Criativa Mogi atende negócios locais e marcas regionais, com foco em soluções visuais claras, acessíveis e orientadas a resultado.',
    requirements: [
      'Experiência com Figma, prototipação e design systems.',
      'Noções de pesquisa com usuários e testes de usabilidade.',
      'Boa comunicação para apresentar decisões de design.',
      'Portfólio com interfaces web ou mobile.',
    ],
    skills: ['Figma', 'UX Research', 'UI Design', 'Prototipação', 'Design System'],
    benefits: [
      ['utensils', 'Vale Refeição'],
      ['calendar', 'Folga no aniversário'],
      ['school', 'Cursos internos'],
      ['heart', 'Apoio saúde mental'],
    ],
  },
  {
    id: 'backend-node',
    title: 'Engenheiro(a) de Software Back-end',
    company: 'Inovação Tech Brasil',
    location: 'Qualquer lugar',
    mode: '100% Remoto',
    salary: 'R$ 8.000 - 12.000',
    category: 'Tecnologia',
    time: 'Há 3 dias',
    icon: 'logo-nodejs',
    color: '#10B981',
    saved: false,
    description: 'Buscamos uma pessoa para desenvolver APIs, integrações e serviços escaláveis, com atenção a performance, segurança e observabilidade.',
    aboutCompany: 'A Inovação Tech Brasil constrói plataformas digitais para empresas de diferentes setores e trabalha com times distribuídos em todo o país.',
    requirements: [
      'Experiência com Node.js, APIs REST e bancos relacionais.',
      'Conhecimento em autenticação, testes automatizados e filas.',
      'Familiaridade com cloud, Docker ou pipelines de deploy.',
      'Boa prática de documentação técnica.',
    ],
    skills: ['Node.js', 'APIs REST', 'PostgreSQL', 'Docker', 'Testes'],
    benefits: [
      ['home-laptop', '100% remoto'],
      ['heart', 'Plano de Saúde'],
      ['school', 'Budget de cursos'],
      ['utensils', 'Ajuda alimentação'],
    ],
  },
];

export const homeJobs = [
  {
    ...jobs[0],
    logoSource: require('../../assets/prototype/home-company-tech.png'),
  },
  {
    ...jobs[1],
    logoSource: require('../../assets/prototype/home-company-retail.png'),
  },
];

export const searchJobs = [
  {
    ...jobs[0],
    logoSource: require('../../assets/prototype/search-company-tech.png'),
  },
  {
    ...jobs[1],
    logoSource: require('../../assets/prototype/search-company-retail.png'),
  },
];

export const courses = [
  {
    title: 'React do Zero ao Avançado',
    school: 'DevSchool',
    hours: '80h',
    level: 'Avançado',
    category: 'Tecnologia',
    color: '#3B82F6',
    image: 'logo-react',
  },
  {
    title: 'Primeiros Socorros',
    school: 'Cruz Vermelha',
    hours: '20h',
    level: 'Básico',
    category: 'Saúde',
    color: '#10B981',
    image: 'heart',
  },
  {
    title: 'Gestão Financeira Pessoal',
    school: 'Sebrae',
    hours: '15h',
    level: 'Iniciante',
    category: 'Administração',
    color: '#1A365D',
    image: 'pie-chart',
  },
];

export const recommendedCourses = [
  {
    title: 'Python Complete Masterclass',
    school: 'Tech Academy',
    hours: '40h',
    level: 'Iniciante',
    category: 'Tecnologia',
    color: '#9333EA',
    image: 'bar-chart',
    imageSource: require('../../assets/prototype/course-python.png'),
  },
  {
    title: 'Inglês para Negócios',
    school: 'Global Institute',
    hours: '60h',
    level: 'Intermediário',
    category: 'Idiomas',
    color: '#10B981',
    image: 'book',
    imageSource: require('../../assets/prototype/course-english.png'),
  },
];

export const searchCourses = [
  {
    ...courses[0],
    imageSource: require('../../assets/prototype/search-course-coding.png'),
  },
  {
    title: 'Administração para Negócios',
    school: 'Centro Profissional',
    hours: '24h',
    level: 'Intermediário',
    category: 'Administração',
    color: '#10B981',
    image: 'business',
    imageSource: require('../../assets/prototype/search-course-business.png'),
  },
];

export const homeCourses = [
  {
    title: 'Introdução à Programação Web',
    school: 'Curso gratuito',
    hours: '30h',
    level: 'Tecnologia',
    color: '#3B82F6',
    image: 'code-slash',
    imageSource: require('../../assets/prototype/home-course-tech.png'),
  },
  {
    title: 'Gestão Financeira para Pequenos Negócios',
    school: 'Curso gratuito',
    hours: '20h',
    level: 'Negócios',
    color: '#10B981',
    image: 'business',
    imageSource: require('../../assets/prototype/home-course-business.png'),
  },
];

export const events = [
  {
    title: 'Feira do Empreendedor 2026',
    category: 'Negócios',
    time: '09:00 - 18:00',
    place: 'Centro de Convenções, Ferraz',
    organizer: 'Prefeitura Municipal',
  },
  {
    title: 'Festival Gastronômico Local',
    category: 'Cultura',
    time: '18:00 - 23:00',
    place: 'Praça Central',
    organizer: 'Associação Comercial',
  },
];

export const notifications = [
  {
    type: 'Nova Vaga',
    title: 'Desenvolvedor Front-end Pleno',
    text: 'A Tech Soluções acabou de publicar uma vaga que combina com o seu perfil. Salário de R$ 6.000,00.',
    time: 'Agora',
    icon: 'briefcase',
    tone: 'green',
    action: 'Ver Vaga',
  },
  {
    type: 'Recomendação',
    title: 'Curso de React Avançado',
    text: 'Baseado nos seus interesses, separamos este curso gratuito oferecido pela prefeitura.',
    time: '2h atrás',
    icon: 'star',
    tone: 'blue',
    action: 'Detalhes do Curso',
  },
  {
    type: 'Candidatura',
    title: 'Status Atualizado: Analista de Dados',
    text: 'Sua candidatura para a empresa Indústria ABC avançou para a fase de entrevistas.',
    time: 'Ontem',
    icon: 'document-text',
    tone: 'gray',
  },
  {
    type: 'Evento',
    title: 'Feira de Empregabilidade',
    text: 'Não se esqueça: a feira de empregabilidade acontece amanhã às 09:00.',
    time: '12/03',
    icon: 'calendar',
    tone: 'gray',
  },
];

export const news = [
  {
    category: 'EVENTOS',
    title: 'Prefeitura anuncia Feirão de Empregos para o próximo mês',
    date: '12 Mai, 2026',
    imageSource: require('../../assets/prototype/news-job-fair.png'),
  },
  {
    category: 'EDUCAÇÃO',
    title: 'Novas turmas abertas para cursos técnicos profissionalizantes',
    date: '10 Mai, 2026',
    imageSource: require('../../assets/prototype/news-classroom.png'),
  },
];

export const profile = {
  name: 'Ana Silva',
  role: 'Desenvolvedora Front-end Pleno',
  city: 'Ferraz de Vasconcelos',
  bio: 'Apaixonada por criar interfaces intuitivas e acessíveis. Experiência de 4 anos com React, Tailwind CSS e TypeScript.',
  skills: ['React.js', 'Tailwind CSS', 'TypeScript', 'Figma', 'Git/GitHub'],
};

export const candidateApplicationPeriods = {
  '30 dias': {
    stats: [
      { label: 'Candidaturas enviadas', value: '18', note: '+4 este mês', icon: 'paper-plane', tone: 'blue' },
      { label: 'Em análise', value: '6', note: 'Aguardando retorno', icon: 'document-text', tone: 'yellow' },
      { label: 'Entrevistas marcadas', value: '3', note: 'Próxima em 2 dias', icon: 'calendar', tone: 'green' },
      { label: 'Rejeitado pós-entrevista', value: '2', note: 'Feedback disponível', icon: 'close', tone: 'red' },
    ],
    funnel: [
      { label: 'Enviadas', value: 18, percentage: 100, tone: 'blue' },
      { label: 'Currículo selecionado', value: 8, percentage: 44, tone: 'green' },
      { label: 'Entrevistas', value: 3, percentage: 17, tone: 'yellow' },
      { label: 'Propostas', value: 1, percentage: 6, tone: 'blue' },
    ],
  },
  '90 dias': {
    stats: [
      { label: 'Candidaturas enviadas', value: '42', note: '+11 no período', icon: 'paper-plane', tone: 'blue' },
      { label: 'Em análise', value: '9', note: 'Aguardando retorno', icon: 'document-text', tone: 'yellow' },
      { label: 'Entrevistas marcadas', value: '7', note: '3 concluídas', icon: 'calendar', tone: 'green' },
      { label: 'Rejeitado pós-entrevista', value: '4', note: 'Feedback disponível', icon: 'close', tone: 'red' },
    ],
    funnel: [
      { label: 'Enviadas', value: 42, percentage: 100, tone: 'blue' },
      { label: 'Currículo selecionado', value: 19, percentage: 45, tone: 'green' },
      { label: 'Entrevistas', value: 7, percentage: 17, tone: 'yellow' },
      { label: 'Propostas', value: 2, percentage: 5, tone: 'blue' },
    ],
  },
};

export const upcomingInterview = {
  jobId: 'front-end-react',
  title: 'Desenvolvedor Front-end React',
  company: 'Tech Solutions S/A',
  date: '29 Mai, 14:00',
  mode: 'Entrevista por vídeo',
  stage: 'Entrevista técnica',
};

export const recentApplications = [
  {
    jobId: 'front-end-react',
    title: 'Desenvolvedor Front-end React',
    company: 'Tech Solutions S/A',
    updated: 'Atualizada hoje',
    status: 'Entrevista marcada',
    tone: 'green',
  },
  {
    jobId: 'ui-ux-designer',
    title: 'UI/UX Designer Pleno',
    company: 'Agência Criativa Mogi',
    updated: 'Atualizada há 2 dias',
    status: 'Em análise',
    tone: 'yellow',
  },
  {
    jobId: 'backend-node',
    title: 'Analista Front-end Júnior',
    company: 'Digital Hub Ferraz',
    updated: 'Atualizada há 6 dias',
    status: 'Rejeitado pós-entrevista',
    tone: 'red',
  },
];
