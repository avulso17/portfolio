export type ResumeCertifications = {
  course: string
  institution: string
}

export type ResumeAcademicExperience = {
  course_name: string
  finish_year: string | null
  institution_name: string
  level: string
  start_year: string
}

export type ResumeLanguages = {
  level: string
  name: string
}

export type ResumeWorkExperience = {
  achievements: string[]
  company_name: string
  end_date: string
  role: string
  stacks: string[]
  start_date: string
}

export type ResumeTechStack = {
  category: string
  stacks: string[]
}

export type Resume = {
  academic_experience: Array<ResumeAcademicExperience>
  certifications: Array<ResumeCertifications>
  city: string
  email: string
  github_url: string
  languages: Array<ResumeLanguages>
  linkedin_url: string
  name: string
  phone: string
  portfolio_url: string
  resume: string
  role: string
  tech_stack: Array<ResumeTechStack>
  work_experience: Array<ResumeWorkExperience>
}

export const resume: Resume = {
  name: 'Felipe Mateus Gonçalves Cruzeiro',
  role: 'Desenvolvedor Front-end',
  phone: '(34) 99308-8635',
  city: 'Uberlândia/MG, Brasil',
  email: 'felipe_mateus08@hotmail.com',
  linkedin_url: 'https://linkedin.com/in/felipe-mateus-g',
  github_url: 'https://github.com/avulso17',
  portfolio_url: 'https://felipe-mateus.com',
  resume:
    'Sou desenvolvedor front-end com mais de 4 anos de experiência, com foco em performance, acessibilidade e interfaces responsivas. Especializado em React.js, Next.js e TypeScript, atuo com integração via APIs REST, SSR, otimização web e boas práticas de UI/UX. Domino o uso de design system, testes automatizados com React Testing Library e Jest, e estratégias de arquiteturas escaláveis. Busco oportunidades onde possa continuar entregando produtos eficientes, visualmente impecáveis e que entreguem real valor para as pessoas/clientes.',
  work_experience: [
    {
      role: 'Frontend Engineer',
      company_name: 'Pigmo',
      start_date: 'ago de 2023',
      end_date: 'o momento',
      achievements: [
        'Desenhei e implementei a base do frontend desde o zero, em parceria com os fundadores, estabelecendo uma fundação sólida para a evolução contínua da plataforma.',
        'Desenvolvi interfaces com alta fidelidade ao design system (pixel perfect), fortalecendo a consistência visual da plataforma e promovendo uma colaboração eficiente com o time de design.',
        'Implementei camadas de cache com React Query para otimização de requisições e estado remoto, além de estratégias de Server-Side Rendering (SSR) com Next.js para melhorar tempo de carregamento e SEO.',
        'Contribui para a refatoração completa da plataforma na versão 2, otimizando a performance em até 78% com a migração de bibliotecas CSS em tempo de execução para CSS puro e técnicas de build-time styling.',
        'Implementei a tradução da plataforma em produção para 16 idiomas, ampliando o alcance global e contribuindo diretamente para o crescimento de +500 novos usuários cadastrados.',
        'Desenvolvi do zero um mini-app interativo para Telegram, gamificando a experiência dos usuários e impulsionando o lançamento da criptomoeda da empresa.',
      ],
      stacks: [
        'React 18',
        'Next.js 14',
        'TypeScript',
        'REST APIs',
        'CSS',
        'SCSS',
        'Git',
        'React Testing Library',
        'SSR',
        'Arquitetura de Software',
        'performance web',
        'PageSpeed Insights',
        'Google Lighthouse',
        'Figma',
        'i18n',
        'next-intl',
        'Vite',
        'ChakraUI',
        'React Query',
        'KanBan',
      ],
    },
    {
      role: ' Desenvolvedor Front-end Pleno',
      company_name: 'Zeus Agrotech',
      start_date: 'dez de 2022',
      end_date: 'set de 2023',
      achievements: [
        'Liderei tecnicamente na definição de arquitetura frontend e seleção de tecnologias.',
        'Reduzi em até 50% o tempo de desenvolvimento de novas funcionalidades ao estruturar um sistema de componentes com Storybook.',
        'Ajudei na refatoração de sistema legado com foco em performance e acessibilidade, implementando microfrontend para modularização.',
        'Implementei testes unitários com React Testing Library + Jest para garantir estabilidade e manutenção do código.',
        'Colaborei diretamente com designers na evolução do design system da empresa.',
      ],
      stacks: [
        'React',
        'Redux',
        'React Query',
        'Styled-Components',
        'TailwindCSS',
        'Stitches',
        'SCSS',
        'React Testing Library',
        'Jest',
        'Storybook',
        'Git',
        'React Leaflet',
        'Google Maps API',
        'Scrum',
        'KanBan',
      ],
    },
    {
      role: 'Frontend Web Developer',
      company_name: 'SolaLand',
      start_date: 'mar de 2022',
      end_date: 'nov de 2022',
      achievements: [
        'Mentorei desenvolvedores juniores na adoção de boas práticas e alinhamento com os padrões dos produtos da empresa.',
        'Criei um Design System com foco em pixel perfect, performance web e acessibilidade, padronizando os componentes dos produtos.',
        'Construí o primeiro dApp (decentralized application) da empresa para soft staking de NFTs, com integração via APIs REST.',
        'Refatorei aplicações existentes para melhorar responsividade e manutenção.',
      ],
      stacks: [
        'React',
        'Next.js',
        'Styled-Components',
        'TailwindCSS',
        'WebSockets',
        'Jest',
        'Storybook',
        'Git',
        'KanBan',
      ],
    },
    {
      role: 'Frontend Web Developer & UX/UI',
      company_name: 'Equals9 Empreendimentos e Participações S/A',
      start_date: 'jul de 2021',
      end_date: 'fev de 2022',
      achievements: [
        'Desenvolvi a Landing Page e ajudei na EqualsSports, integrando interfaces modernas e responsivas com foco em pixel perfect e responsividade.',
        'Aprendi e apliquei conceitos de grid system e padrões de UI/UX.',
        'Transformei ideias em protótipos funcionais com Figma e grid responsivo.',
        'Desenvolvi a Equals Venue, plataforma de solução de pagamentos, desde sua concepção até a entrega.',
      ],
      stacks: [
        'React',
        'CSS',
        'Sass/SCSS',
        'Material UI',
        'Figma',
        'Git',
        'KanBan',
        'Scrum',
      ],
    },
  ],
  tech_stack: [
    {
      category: 'Linguagens',
      stacks: ['JavaScript', 'TypeScript', 'Rust'],
    },
    {
      category: 'Frameworks e Bibliotecas',
      stacks: [
        'React.js',
        'Next.js',
        'Vite',
        'Angular',
        'Redux',
        'Zustand',
        'React Query',
      ],
    },
    {
      category: 'DevOps e Ferramentas',
      stacks: [
        'Git',
        'CI/CD',
        'observabilidade/logs',
        'Storybook',
        'WebSocket',
      ],
    },
    {
      category: 'Testes',
      stacks: ['Jest', 'React Testing Library', 'Cypress'],
    },
    {
      category: 'Estilização e UI/UX',
      stacks: [
        'CSS',
        'SCSS',
        'TailwindCSS',
        'Styled Components',
        'Material UI',
        'Design System',
        'Pixel Perfect',
        'Figma',
      ],
    },
    {
      category: 'Outros',
      stacks: [
        'REST APIs',
        'GraphQL',
        'Microsserviços',
        'Mono Repo',
        'SSR',
        'acessibilidade',
        'PageSpeed Insights',
        'Google Lighthouse',
        'i18n',
        'next-intl',
      ],
    },
  ],
  academic_experience: [
    {
      course_name: 'Engenharia da Computação',
      level: 'Bacharel',
      institution_name: 'Faculdade Anhanguera',
      start_year: '2018',
      finish_year: null,
    },
    {
      course_name: 'Manutenção e Suporte em Informática',
      level: 'Técnico',
      institution_name: 'Instituto Federal do Triângulo Mineiro (IFTM)',
      start_year: '2015',
      finish_year: '2017',
    },
  ],
  certifications: [
    {
      course: 'HTML5 e CSS3: Técnicas Avançadas',
      institution: 'Udemy',
    },
    {
      course: 'Next.js e React - Curso Completo',
      institution: 'Udemy',
    },
    {
      course: 'SASS e SCSS do básico ao avançado',
      institution: 'Udemy',
    },
    {
      course: 'TailwindCSS do básico ao avançado',
      institution: 'Udemy',
    },
    {
      course: 'React: Gerenciamento de estados globais com Redux',
      institution: 'Alura',
    },
    {
      course: 'Next.js: Arquitetura Front-end',
      institution: 'Alura',
    },
    {
      course: 'Node.js: API Rest com Express e MongoDB',
      institution: 'Alura',
    },
  ],
  languages: [
    {
      name: 'Português',
      level: 'Nativo',
    },
    {
      name: 'Inglês',
      level: 'Avançado',
    },
    {
      name: 'Espanhol',
      level: 'Intermediário',
    },
  ],
}
