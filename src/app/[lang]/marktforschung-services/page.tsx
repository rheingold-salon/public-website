import { ImageWithTextBox } from '@/components/';
import { strategyLandingImage } from '@/assets';

const MarktforschungServicesPage = () => {
    const strategyText = "Wir ergründen, was Menschen bewegt und motiviert. Wir graben - forschen - dort, wo andere gar nicht suchen. Und entschlüsseln so die geheime Logik des Marktes."
    return (
        <ImageWithTextBox text={strategyText} staticImage={strategyLandingImage} />
    );
};

export default MarktforschungServicesPage;

