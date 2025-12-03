import {useTranslations} from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('Footer');
  return <h1>{t('title')}</h1>;
}