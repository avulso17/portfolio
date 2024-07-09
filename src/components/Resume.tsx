export default function Resume() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center'>
        <h1 className='text-xl'>FELIPE MATEUS GONÇALVES CRUZEIRO</h1>
        <p>24 anos</p>
        <p>Santa Mônica, Uberlândia/MG</p>
        <p>(34) 9 9308-8635</p>
        <p>felipe_dev08@hotmail.com</p>
        <p>linkedin.com/in/felipe-mateus-g</p>
      </div>

      <div>
        <h2>OBJETIVO</h2>
        <span>Analista financeiro</span>
      </div>

      <div>
        <h2>RESUMO PROFISSIONAL</h2>
        <span>
          Analista financeiro com experiência na Magazine Luiza, Vale e Delta,
          onde desenvolvi habilidades sólidas em análise de crédito, emissão de
          boletos e notas fiscais, elaboração de relatórios financeiros,
          controle de pagamentos e cobranças. Tenho expertise em conciliação
          bancária, contas a receber, fluxo de caixa e contas a pagar. Sou um
          profissional proativo, organizado e focado em resultados, capaz de
          otimizar processos financeiros e contribuir para o sucesso da empresa.
        </span>
      </div>

      <div>
        <h2>FORMAÇÃO ACADÊMICA</h2>
        <span>
          <b>Curso de tecnologia superior em Processos Gerenciais </b>- FAFAL,
          conclusão em 2020
        </span>
      </div>

      <div>
        <h2>EXPERIÊNCIA PROFISSIONAL</h2>

        <div>
          <h3>Magazine Luiza - abril/2001 à janeiro/2023</h3>
          <h4>Analista financeiro</h4>
          <ul className='list-inside list-disc'>
            <li>Conciliação bancária</li>
            <li>Fluxo de caixa</li>
            <li>Contas à pagar</li>
            <li>Contas à receber</li>
            <li>Processos financeiros</li>
          </ul>
        </div>
      </div>

      <div>
        <h2>IDIOMAS</h2>
        <span>Inglês - Fluente</span>
      </div>

      <div>
        <h2>FORMAÇÃO COMPLEMENTAR</h2>
        <ul className='list-inside list-disc'>
          <li>Técnico em contabilidade - EMEJA (30h)</li>
          <li>Simpósio sobre análises financeiras - ECUA (1h)</li>
        </ul>
      </div>

      <div>
        <h2>INFORMAÇÕES ADICIONAIS</h2>
        <span>Mobilidade total para mudanças de estado</span>
        <span>Domínio de linguagem PHP</span>
      </div>
    </div>
  )
}
