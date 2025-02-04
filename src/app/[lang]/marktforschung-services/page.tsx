import { ImageWithTextBox } from '@/components/';

const MarktforschungServicesPage = () => {
    const strategyText = "Wir ergründen, was Menschen bewegt und motiviert. Wir graben - forschen - dort, wo andere gar nicht suchen. Und entschlüsseln so die geheime Logik des Marktes."
    return (
        <ImageWithTextBox text={strategyText} imagePath='/rheingold_strategie.jpg' />
    );
};

export default MarktforschungServicesPage;

