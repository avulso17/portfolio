import { SOCIAL_LINKS } from '@/constants/social'
import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    name: ['text-lg font-bold'],
    title: ['mb-2 text-lg font-bold'],
    subtopic: ['text-base leading-normal'],
    content: ['text-base font-normal leading-tight'],
  },
})

const ResumeItem: React.FC<{
  content: React.ReactNode
  title?: React.ReactNode
}> = ({ title, content }) => {
  const classes = styles()

  return (
    <div>
      {title && <h2 className={classes.title()}>{title}</h2>}
      <span className={classes.content()}>{content}</span>
    </div>
  )
}

const Resume: React.FC = () => {
  const { content, subtopic, name } = styles()

  return (
    <div className='flex flex-col gap-6 font-calibri mobile:p-8'>
      <div className='flex flex-col'>
        <h1 className={name()}>FELIPE MATEUS GONÇALVES CRUZEIRO</h1>
        <p className={content()}>Uberlândia/MG, Brasil</p>
        <p className={content()}>
          E-mail:{' '}
          <a
            href={SOCIAL_LINKS.linkedIn}
            target='_blank'
            rel='noreferrer noopener'
            className='underline'
          >
            felipe_mateus08@hotmail.com
          </a>
        </p>

        <p className={content()}>
          LinkedIn:{' '}
          <a
            href={SOCIAL_LINKS.linkedIn}
            target='_blank'
            rel='noreferrer noopener'
            className='underline'
          >
            linkedin.com/in/felipe-mateus-g
          </a>
        </p>

        <p className={content()}>
          GitHub:{' '}
          <a
            href={SOCIAL_LINKS.github}
            target='_blank'
            rel='noreferrer noopener'
            className='underline'
          >
            github.com/avulso17
          </a>
        </p>

        <p className={content()}>
          Portfolio:{' '}
          <a
            href='https://felipe-mateus.com'
            target='_blank'
            rel='noreferrer noopener'
            className='underline'
          >
            felipe-mateus.com
          </a>
        </p>
      </div>
      <ResumeItem
        title='🔍 Resumo Profissional'
        content='Desenvolvedor Front-end Sênior com mais de 4 anos de experiência na construção de aplicações web modernas, escaláveis e orientadas a produto. Especialista em React, Next.js e TypeScript, com forte foco em performance, acessibilidade, arquitetura e experiência do usuário.'
      />

      <ResumeItem content='Atuo com alto grau de autonomia, participando de decisões técnicas de ponta a ponta — da concepção visual e definição de arquitetura até a entrega em produção. Possuo vivência prática em integração com sistemas distribuídos, mensageria, cache e automações, compreendendo o front-end como parte estratégica do ecossistema do produto.' />

      <ResumeItem
        title='💼 Experiência Profissional'
        content={
          <>
            <div className='mb-6'>
              <h3 className={subtopic()}>
                <b>Colmeia Lab</b> — Lead Software Engineer / Front-end
              </h3>
              <h4 className={subtopic()}>jun de 2025 - atualmente</h4>
              <ul className='my-2 list-inside list-disc pl-8'>
                <li>
                  Responsável técnico pela concepção, arquitetura e
                  desenvolvimento de produtos digitais, atuando sozinho em todas
                  as etapas do projeto.
                </li>
                <li>
                  Desenvolvi do zero a Landing Page da Colmeia Lab, desde a
                  criação do design até a implementação final, aplicando boas
                  práticas de UI/UX, acessibilidade, responsividade e
                  performance web.
                </li>
                <li>
                  Defini stacks, padrões de código e organização de projetos,
                  garantindo escalabilidade e facilidade de manutenção.
                </li>
                <li>
                  Atuei na integração do front-end com arquiteturas modernas e
                  fluxos assíncronos, adquirindo experiência prática com Docker,
                  Redis, RabbitMQ e n8n.
                </li>
                <li>
                  Desenvolvi interfaces conectadas a APIs e automações
                  complexas, entendendo impactos arquiteturais no desempenho,
                  confiabilidade e experiência do usuário.
                </li>
                <li>
                  Experiência sólida em autonomia técnica, tomada de decisão e
                  visão sistêmica, conectando front-end, backend e automações de
                  negócio.
                </li>
              </ul>
              <span>
                <b>Stack:</b> React, Next.js, TypeScript, CSS, SCSS, Docker,
                Redis, RabbitMQ, n8n, REST APIs, Arquitetura de Software, UI/UX,
                Performance Web, Git
              </span>
            </div>

            <div className='mb-6'>
              <h3 className={subtopic()}>
                <b>Pigmo</b> — Frontend Engineer
              </h3>
              <h4 className={subtopic()}>ago de 2023 - o momento</h4>
              <ul className='my-2 list-inside list-disc pl-8'>
                <li>
                  Iniciei o projeto desde a concepção com os fundadores,
                  liderando a criação da base de código e arquitetura do
                  frontend.
                </li>
                <li>
                  Criei interfaces pixel perfect com alta fidelidade ao design
                  system, consolidando excelente relação com o time de design.
                </li>
                <li>
                  Implementei camadas de cache com React Query para requisições
                  e https state, e estratégias de renderização com SSR do
                  Next.js.
                </li>
                <li>
                  Ajudei na refatoração completa para v2 do sistema, com aumento
                  de performance de até 85% ao migrar de bibliotecas run-time
                  para CSS puro e build-time styling.
                </li>
                <li>
                  Traduzi todo o projeto já em produção para 16 linguagens,
                  utilizando Next.js internationalization (i18n).
                </li>
                <li>
                  Desenvolvimento em parceria com engenheiro sênior em sessões
                  de pair programming, aprimorando tomada de decisão e qualidade
                  arquitetural.
                </li>
                <li>
                  Construí do zero um mini-app para o telegram, mini-game para
                  impulsionar o lançamento da criptomoeda da empresa.
                </li>
              </ul>
              <span>
                <b>Stack:</b> React 18, Next.js 14, TypeScript, REST APIs, CSS,
                SCSS, Git, React Testing Library, SSR, Arquitetura de Software,
                performance web, PageSpeed Insights, Google Lighthouse, Figma,
                i18n, next-intl, Vite, ChakraUI, React Query
              </span>
            </div>

            <div className='mb-6'>
              <h3 className={subtopic()}>
                <b>Zeus Agrotech</b> — Desenvolvedor Front-end Pleno
              </h3>
              <h4 className={subtopic()}>dez de 2022 - set de 2023</h4>
              <ul className='my-2 list-outside list-disc pl-8'>
                <li>
                  Liderei tecnicamente na definição de arquitetura frontend e
                  seleção de tecnologias.
                </li>
                <li>
                  Reduzi em até 50% o tempo de desenvolvimento de novas
                  funcionalidades ao estruturar um sistema de componentes com
                  Storybook.
                </li>
                <li>
                  Ajudei na refatoração de sistema legado com foco em
                  performance e acessibilidade, implementando microfrontend para
                  modularização.
                </li>
                <li>
                  Implementei testes unitários com React Testing Library + Jest
                  para garantir estabilidade e manutenção do código.
                </li>
                <li>
                  Colaborei diretamente com designers na evolução do design
                  system da empresa.
                </li>
              </ul>
              <span>
                <b>Stack:</b> React, Redux, React Query, Styled-Components,
                TailwindCSS, Stitches, SCSS, React Testing Library, Jest,
                Storybook, Git, React Leaflet, Google Maps API
              </span>
            </div>

            <div className='mb-6'>
              <h3 className={subtopic()}>
                <b>SolaLand</b> — Frontend Web Developer
              </h3>
              <h4 className={subtopic()}>mar de 2022 - nov de 2022</h4>
              <ul className='my-2 list-outside list-disc pl-8'>
                <li>
                  Mentorei desenvolvedores juniores na adoção de boas práticas e
                  alinhamento com os padrões dos produtos da empresa.
                </li>
                <li>
                  Criei um Design System com foco em pixel perfect, performance
                  web e acessibilidade, padronizando os componentes dos
                  produtos.
                </li>
                <li>
                  Construí o primeiro dApp (decentralized application) da
                  empresa para soft staking de NFTs, com integração via APIs
                  REST.
                </li>
                <li>
                  Refatorei aplicações existentes para melhorar responsividade e
                  manutenção.
                </li>
              </ul>
              <span>
                <b>Stack:</b> React, Next.js, Styled-Components, TailwindCSS,
                WebSockets, Jest, Storybook, Git
              </span>
            </div>

            <div>
              <h3 className={subtopic()}>
                <b>Equals9 Empreendimentos e Participações S/A</b> — Frontend
                Web Developer & UX/UI
              </h3>
              <h4 className={subtopic()}>jul de 2021 - fev de 2022</h4>
              <ul className='my-2 list-outside list-disc pl-8'>
                <li>
                  Desenvolvi a Landing Page e ajudei na EqualsSports, integrando
                  interfaces modernas e responsivas com foco em pixel perfect e
                  responsividade.
                </li>
                <li>
                  Aprendi e apliquei conceitos de grid system e padrões de
                  UI/UX.
                </li>
                <li>
                  Transformei ideias em protótipos funcionais com Figma e grid
                  responsivo.
                </li>
                <li>
                  Desenvolvi a Equals Venue, plataforma de solução de
                  pagamentos, desde sua concepção até a entrega.
                </li>
              </ul>
              <span>
                <b>Stack:</b> React, CSS, Sass/SCSS, Material UI, Figma, Git
              </span>
            </div>
          </>
        }
      />
      <ResumeItem
        title='🛠 Stack Técnica'
        content={
          <ul className='list-outside list-disc pl-8'>
            <li>
              <b>Linguagens:</b> JavaScript, TypeScript, Rust
            </li>
            <li>
              <b>Frameworks e Bibliotecas:</b> React.js, Next.js, Vite, Angular,
              Redux, Zustand, React Query
            </li>
            <li>
              <b>DevOps e Ferramentas:</b> Git, CI/CD, observabilidade/logs,
              Storybook, WebSocket
            </li>
            <li>
              <b>Testes:</b> Jest, React Testing Library, Cypress
            </li>
            <li>
              <b>Estilização e UI/UX:</b> CSS, SCSS, TailwindCSS, Styled
              Components, Material UI, Design System, Pixel Perfect, Figma
            </li>
            <li>
              <b>Outros:</b> REST APIs, GraphQL, Microsserviços, Mono Repo, SSR,
              acessibilidade, PageSpeed Insights, Google Lighthouse, i18n,
              next-intl
            </li>
          </ul>
        }
      />
      <ResumeItem
        title='📍 Formação Acadêmica'
        content={
          <ul className='list-outside list-disc pl-8'>
            <li>
              <b>Bacharel em Engenharia da Computação</b> — Faculdade Pitágoras
              (2018 - 2023)
            </li>
            <li>
              <b className='font-bold'>
                Técnico em Manutenção e Suporte em Informática{' '}
              </b>
              — IFTM (2015 - 2017)
            </li>
          </ul>
        }
      />
      <ResumeItem
        title='🎓 Certificações e Cursos'
        content={
          <ul className='list-outside list-disc px-4'>
            <li>
              HTML5 e CSS3: Técnicas Avançadas (Com Flexbox e 5 Projetos) -
              Udemy
            </li>
            <li>
              Next.js e React - Curso Completo - Aprenda com Projetos - Udemy
            </li>
            <li>SASS e SCSS do básico ao avançado + Projetos - Udemy</li>
            <li>Tailwind CSS do básico ao avançado + Projetos - Udemy</li>
            <li>REACT: GERENCIAMENTO DE ESTADOS GLOBAIS COM REDUX - Alura</li>
            <li>NEXT.JS: TRABALHANDO COM ARQUITETURA FRONT-END - Alura</li>
            <li>NODE.JS: API REST COM EXPRESS E MONGODB - Alura</li>
          </ul>
        }
      />
      <ResumeItem
        title='🌍 Idiomas'
        content={
          <ul className='list-outside list-disc pl-8'>
            <li>
              <b>Português:</b> Nativo
            </li>
            <li>
              <b>Inglês:</b> Fluente
            </li>
            <li>
              <b>Espanhol:</b> Intermediário
            </li>
          </ul>
        }
      />
      <ResumeItem
        title='INFORMAÇÕES ADICIONAIS'
        content={
          <ul className='list-outside list-disc pl-8'>
            <li>Mobilidade total para mudanças de estado</li>
            <li>
              Preferência pelo modelo de trabalho remoto e flexível para os
              modelos híbrido/presencial
            </li>
            <li>
              Conhecimento em renderização 3D, Blender, React Three Fiber e
              Three.js
            </li>
            <li>Experiência em desenvolvimento de jogos</li>
          </ul>
        }
      />
    </div>
  )
}

export default Resume
