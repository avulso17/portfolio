import { SOCIAL_LINKS } from '@/constants/social'
import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    name: ['text-2xl font-bold'],
    topic: ['text-xl font-bold uppercase'],
    subtopic: ['text-base font-bold leading-normal first-letter:uppercase'],
    content: ['text-base font-normal leading-tight'],
  },
})

const ResumeItem: React.FC<{
  content: React.ReactNode
  topic: React.ReactNode
}> = ({ topic, content }) => {
  const classes = styles()

  return (
    <div>
      <h2 className={classes.topic()}>{topic}</h2>
      <span className={classes.content()}>{content}</span>
    </div>
  )
}

const Resume: React.FC = () => {
  const { content, subtopic, name } = styles()

  return (
    <div className='flex flex-col gap-6 p-8 font-calibri'>
      <div className='flex flex-col items-center'>
        <h1 className={name()}>FELIPE MATEUS GONÇALVES CRUZEIRO</h1>
        <p className={content('text-center')}>25 anos</p>
        <p className={content('text-center')}>Uberlândia/MG, Brasil</p>
        <p className={content('text-center')}>felipe_dev08@hotmail.com</p>
        <a
          href={SOCIAL_LINKS.linkedIn}
          target='_blank'
          rel='noreferrer noopener'
          className={content('text-center')}
        >
          linkedin.com/in/felipe-mateus-g
        </a>
        <a
          href={SOCIAL_LINKS.github}
          target='_blank'
          rel='noreferrer noopener'
          className={content('text-center')}
        >
          github.com/avulso17
        </a>
      </div>

      <ResumeItem topic='CARGO' content='Software Engineer' />
      <ResumeItem
        topic='RESUMO PROFISSIONAL'
        content='Sou desenvolvedor front-end pleno, apaixonado por criar soluções digitais que conectam funcionalidade e experiência de usuário. Especializado em React.js, TypeScript, Next.js e Node.js, possuo experiência no desenvolvimento de WebApps, LPs e SaaS. Em projetos anteriores, liderei refatoramentos que resultaram em aumento de performance, como redução de tempo de carregamento em até 60% e melhoria na produtividade da equipe. Busco oportunidades que unam criatividade, inovação e desafios complexos.'
      />
      <ResumeItem
        topic='FORMAÇÃO ACADÊMICA'
        content={
          <ul className='list-inside list-disc pl-4'>
            <li>
              <b className='font-bold'>Engenharia da Computação </b>- Faculdade
              Anhanguera, conclusão em 2023
            </li>
            <li>
              <b className='font-bold'>Manutenção e Suporte em Informática </b>-
              IFTM, conclusão em 2017
            </li>
          </ul>
        }
      />
      <ResumeItem
        topic='EXPERIÊNCIA PROFISSIONAL'
        content={
          <>
            <div className='mb-4'>
              <h3 className={subtopic()}>Pigmo</h3>
              <h4 className={subtopic()}>ago de 2023 - mai de 2024</h4>
              <h5 className={subtopic()}>Software Engineer</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>atual</li>
              </ul>
              <span>Stack: --</span>
            </div>

            <div className='mb-4'>
              <h3 className={subtopic()}>Zeus Agrotech</h3>
              <h4 className={subtopic()}>dez de 2022 - set de 2023</h4>
              <h5 className={subtopic()}>Desenvolvedor Front-end Pleno</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>
                  Liderança técnica na definição de arquitetura frontend e
                  seleção de tecnologias.
                </li>
                <li>
                  Redução de 50% no tempo de desenvolvimento de novas features
                  com arquitetura de componentes reutilizáveis.
                </li>
                <li>
                  Recriação de sistema legado, com foco em performance e UX,
                  utilizando microfrontends e stacks modernas.
                </li>
                <li>
                  Uso de Storybook para documentação e padronização visual dos
                  componentes.
                </li>
              </ul>
              <span>
                Stack: React.js, Vite, Redux, Styled-Components, Stitches, SCSS,
                Jest, Storybook, TailwindCSS, Radix
              </span>
            </div>

            <div className='mb-4'>
              <h3 className={subtopic()}>SolaLand</h3>
              <h4 className={subtopic()}>mar de 2022 - nov de 2022</h4>
              <h5 className={subtopic()}>Frontend Web Developer</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>
                  Criação de um Design System completo do zero, promovendo
                  consistência e eficiência.
                </li>
                <li>
                  Desenvolvimento do primeiro dApp de soft staking da empresa.
                </li>
                <li>
                  Refatoramento de aplicações para otimizar performance e
                  responsividade.
                </li>
                <li>
                  Mentoria de devs júnior e colaboração na definição de stack e
                  boas práticas.
                </li>
              </ul>
              <span>
                Stack: React.js, Next.js, Styled-Components, TailwindCSS,
                Stitches, WebSockets, Jest, StoryBook
              </span>
            </div>

            <div>
              <h3 className={subtopic()}>
                Equals9 Empreendimentos e Participações S/A
              </h3>
              <h4 className={subtopic()}>jul de 2021 - fev de 2022</h4>
              <h5 className={subtopic()}>Frontend Web Developer & UX/UI</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>
                  Desenvolvimento integral do sistema EqualsVenue desde a
                  arquitetura até a entrega final.
                </li>
                <li>
                  Transformei ideias do time em interfaces responsivas e
                  intuitivas com Figma.
                </li>
                <li>
                  Implementação de componentes performáticos com foco em reuso e
                  animações modernas.
                </li>
              </ul>
              <span>Stack: React.js, CSS, Sass/SCSS, Material UI, Figma</span>
            </div>
          </>
        }
      />
      <ResumeItem
        topic='IDIOMAS'
        content={
          <>
            <p>Inglês - Fluente</p>
            <p>Espanhol - Intermediário</p>
          </>
        }
      />
      <ResumeItem
        topic='FORMAÇÃO COMPLEMENTAR'
        content={
          <ul className='list-inside list-disc px-4'>
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
        topic='INFORMAÇÕES ADICIONAIS'
        content={
          <>
            <p>Mobilidade total para mudanças de estado</p>
            <p>
              Preferência pelo modelo de trabalho remoto e flexível para os
              modelos híbrido/presencial
            </p>
            <p>
              Conhecimento em renderização 3D, Blender, React Three Fiber e
              Three.js
            </p>
          </>
        }
      />
    </div>
  )
}

export default Resume
