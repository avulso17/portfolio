import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    name: ['text-center text-2xl font-bold text-white'],
    topic: ['text-xl font-bold uppercase text-white'],
    subtopic: ['text-base font-bold first-letter:uppercase'],
    content: ['text-base font-normal'],
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
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center'>
        <h1 className={name()}>FELIPE MATEUS GONÇALVES CRUZEIRO</h1>
        <p className={content('text-center')}>24 anos</p>
        <p className={content('text-center')}>Santa Mônica, Uberlândia/MG</p>
        <p className={content('text-center')}>(34) 99308-8635</p>
        <p className={content('text-center')}>felipe_dev08@hotmail.com</p>
        <a className={content('text-center')}>
          linkedin.com/in/felipe-mateus-g
        </a>
      </div>

      <ResumeItem topic='OBJETIVO' content='Desenvolvedor Web' />
      <ResumeItem
        topic='RESUMO PROFISSIONAL'
        content='Analista financeiro com experiência na Magazine Luiza, Vale e Delta,
          onde desenvolvi habilidades sólidas em análise de crédito, emissão de
          boletos e notas fiscais, elaboração de relatórios financeiros,
          controle de pagamentos e cobranças. Tenho expertise em conciliação
          bancária, contas a receber, fluxo de caixa e contas a pagar. Sou um
          profissional proativo, organizado e focado em resultados, capaz de
          otimizar processos financeiros e contribuir para o sucesso da empresa.'
      />
      <ResumeItem
        topic='FORMAÇÃO ACADÊMICA'
        content={
          <>
            <p>
              <b className='font-bold'>Engenharia da Computação </b>-
              Anhanguera, conclusão em 2022
            </p>
            <p>
              <b className='font-bold'>Manutenção e Suporte em Informática </b>-
              IFTM, conclusão em 2017
            </p>
          </>
        }
      />
      <ResumeItem
        topic='EXPERIÊNCIA PROFISSIONAL'
        content={
          <>
            <h3 className={subtopic()}>Equals9 - jul/2021 à fev/2022</h3>
            <h4 className={subtopic()}>Desenvolvedor front-end</h4>
            <ul className='list-inside list-disc pl-4'>
              <li>Conciliação bancária</li>
              <li>Fluxo de caixa</li>
              <li>Contas à pagar</li>
              <li>Contas à receber</li>
              <li>Processos financeiros</li>
            </ul>
          </>
        }
      />
      <ResumeItem
        topic='IDIOMAS'
        content={
          <>
            <p>Inglês - Fluente</p>
            <p>Espanhol - Avançado</p>
          </>
        }
      />
      <ResumeItem
        topic='FORMAÇÃO COMPLEMENTAR'
        content={
          <ul className='list-inside list-disc px-4'>
            <li>Técnico em contabilidade - EMEJA (30h)</li>
            <li>Simpósio sobre análises financeiras - ECUA (1h)</li>
          </ul>
        }
      />
      <ResumeItem
        topic='INFORMAÇÕES ADICIONAIS'
        content={
          <>
            <p>Mobilidade total para mudanças de estado</p>
            <p>Domínio de linguagem PHP</p>
          </>
        }
      />
    </div>
  )
}
