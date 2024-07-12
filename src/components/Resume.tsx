import { LINKEDIN_PATH } from '@/env/social'
import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    name: ['text-center text-2xl font-bold'],
    topic: ['text-xl font-bold uppercase'],
    subtopic: ['text-base font-bold leading-normal first-letter:uppercase'],
    content: ['text-base font-normal leading-tight'],
  },
})

function ResumeItem({
  topic,
  content,
}: {
  content: React.ReactNode
  topic: React.ReactNode
}) {
  const classes = styles()

  return (
    <div>
      <h2 className={classes.topic()}>{topic}</h2>
      <span className={classes.content()}>{content}</span>
    </div>
  )
}

export default function Resume() {
  const { content, subtopic, name } = styles()

  return (
    <div className='flex flex-col gap-6 p-8 font-calibri'>
      <div className='flex flex-col items-center'>
        <h1 className={name()}>FELIPE MATEUS GONÇALVES CRUZEIRO</h1>
        <p className={content('text-center')}>24 anos</p>
        <p className={content('text-center')}>Santa Mônica, Uberlândia/MG</p>
        <p className={content('text-center')}>(34) 99308-8635</p>
        <p className={content('text-center')}>felipe_mateus08@hotmail.com</p>
        <a
          href={LINKEDIN_PATH}
          target='_blank'
          rel='noreferrer noopener'
          className={content('text-center')}
        >
          linkedin.com/in/felipe-mateus-g
        </a>
      </div>

      <ResumeItem topic='OBJETIVO' content='Software Engineer' />
      <ResumeItem
        topic='RESUMO PROFISSIONAL'
        content='Profissional experiente em desenvolvimento de software, com sólida atuação em desenvolvimento e manutenção de aplicações web. Possuo forte habilidade em HTML, CSS e JavaScript para a construção de layouts "pixel-perfect", e SEO, garantindo a otimização e a alta performance dos sites, além de condução de testes rigorosos para assegurar a qualidade e a funcionalidade dos sistemas. Expertise em levantamento de requisitos e metodologias ágeis, focado em soluções eficientes e escaláveis.'
      />
      <ResumeItem
        topic='FORMAÇÃO ACADÊMICA'
        content={
          <ul className='list-inside list-disc pl-4'>
            <li>
              <b className='font-bold'>Engenharia da Computação </b>- Faculdade
              Anhanguera, conclusão em 2022
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
              <h4 className={subtopic()}>
                ago de 2023 - mai de 2024 · 10 meses
              </h4>
              <h5 className={subtopic()}>Software Engineer</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>desenvolvimento de software</li>
                <li>desenvolvimento e manutenção</li>
                <li>testes</li>
                <li>levantamento de requisitos</li>
                <li>desenvolvimento de aplicações</li>
              </ul>
            </div>

            <div className='mb-4'>
              <h3 className={subtopic()}>Zeus Agrotech</h3>
              <h4 className={subtopic()}>
                dez de 2022 - set de 2023 · 10 meses
              </h4>
              <h5 className={subtopic()}>Desenvolvedor Front-end PL</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>desenvolvimento de software</li>
                <li>desenvolvimento e manutenção</li>
                <li>testes</li>
                <li>levantamento de requisitos</li>
                <li>desenvolvimento de aplicações</li>
              </ul>
            </div>

            <div className='mb-4'>
              <h3 className={subtopic()}>SolaLand</h3>
              <h4 className={subtopic()}>
                mar de 2022 - nov de 2022 · 9 meses
              </h4>
              <h5 className={subtopic()}>Front-end Developer</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>desenvolvimento de software</li>
                <li>desenvolvimento e manutenção</li>
                <li>testes</li>
                <li>levantamento de requisitos</li>
                <li>desenvolvimento de aplicações</li>
              </ul>
            </div>

            <div>
              <h3 className={subtopic()}>
                Equals9 Empreendimentos e Participações S/A
              </h3>
              <h4 className={subtopic()}>
                jul de 2021 - fev de 2022 · 8 meses
              </h4>
              <h5 className={subtopic()}>Desenvolvedor Front-end</h5>
              <ul className='list-inside list-disc pl-4'>
                <li>desenvolvimento de software</li>
                <li>desenvolvimento e manutenção</li>
                <li>testes</li>
                <li>levantamento de requisitos</li>
                <li>desenvolvimento de aplicações</li>
              </ul>
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
              Udemy (9.5h)
            </li>
            <li>
              Next.js e React - Curso Completo - Aprenda com Projetos - Udemy
              (28.5h)
            </li>
            <li>SASS e SCSS do básico ao avançado + Projetos - Udemy (14h)</li>
            <li>
              Tailwind CSS do básico ao avançado + Projetos - Udemy (11.5h)
            </li>
            <li>
              REACT: GERENCIAMENTO DE ESTADOS GLOBAIS COM REDUX - Alura (10h)
            </li>
            <li>NEXT.JS: TRABALHANDO COM ARQUITETURA FRONT-END - Alura (8h)</li>
            <li>NODE.JS: API REST COM EXPRESS E MONGODB - Alura (12h)</li>
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
            <p>Domínio de linguagem Java</p>
            <p>Conhecimento em modelagem de dados</p>
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
