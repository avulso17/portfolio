type SVGProps = React.SVGProps<SVGSVGElement>

export default function LogoSvg(props: SVGProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 92 60'
      fill='none'
      height='1em'
      width='1em'
      {...props}
    >
      <path
        d='M58.964 5.32603C57.4063 5.10908 55.8406 5 54.2684 5C51.7187 5 49.359 5.28765 47.1877 5.86295C45.0164 6.43825 43.1291 7.33351 41.5246 8.54714C39.9201 9.76157 38.6682 11.3089 37.7717 13.1883C36.8752 15.0673 36.4268 17.3107 36.4268 19.9186V56H47.6133V19.458C47.6133 18.1806 47.7864 17.0938 48.1329 16.1985C48.4785 15.3041 48.9896 14.5757 49.6663 14.0129C50.343 13.4501 51.1683 13.0477 52.1443 12.8041C53.1194 12.5617 54.2361 12.4397 55.495 12.4397C56.6585 12.4397 57.8945 12.5233 59.2007 12.689C60.5058 12.8558 61.7732 13.0659 62.9998 13.3212V6.11181C61.8677 5.80437 60.5217 5.54217 58.964 5.32522V5.32603Z'
        fill='currentColor'
      />
      <path
        d='M54.111 35.0443H23L31.889 25.9551H63L54.111 35.0443Z'
        fill='currentColor'
      />
      <path d='M0 0H14V6H6V54H14V60H0V0Z' fill='currentColor' />
      <path d='M92 60H78V54H86V6H78V0H92V60Z' fill='currentColor' />
    </svg>
  )
}
