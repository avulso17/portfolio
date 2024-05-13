import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./messages/en'),
  'pt-BR': () => import('./messages/pt-br'),
})
