import Image from 'next/image';
import { ImageWithTextBox } from '@/components';
import { EmbeddedVideo } from '@/components';

const HomePage = () => {
    const landingPageText = "Wir entschlüsseln die geheime Logik des Marktes. Wir graben, wo andere gar nicht suchen!"
    return (
        <>
            <ImageWithTextBox text={landingPageText} imagePath='/landingpage.jpg' />
            <div id="contact" className="flex py-12 justify-center">
                <Image
                    src="/Logo_Text_Black.png"
                    alt="Rheingold Salon logo"
                    width={360}
                    height={180}
                />
            </div>
            <EmbeddedVideo />
        </>

    );
};

export default HomePage;
