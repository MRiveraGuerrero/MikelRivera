import QuickNavigation from '../QuickNavigation';
import { useLanguage } from '../context/LanguageContext';
export default function Satellite(props) {
  const { language } = useLanguage();
  return <QuickNavigation {...props} alt={language === 'es' ? 'Satélite · Navegación rápida' : 'Satellite · Quick navigation'} />;
}
