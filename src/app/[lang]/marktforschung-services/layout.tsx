import { ImageWithTextBox, ServicesNavigation, ServiceFooter } from "@/components";
import { strategyLandingImage } from "@/assets";
import { getDictionary } from "@/dictionaries";

export default async function MarktforschungServicesLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode,
    params: Promise<{ lang: "de" | "en" }>
}>) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage;
    const servicesNavigation = dict.navigation;

    const routes = [
        { path: `/${lang}/marktforschung-services`, label: servicesNavigation[0] },
        { path: `/${lang}/marktforschung-services/tiefenpsychologe-interviews`, label: servicesNavigation[1] },
        { path: `/${lang}/marktforschung-services/gruppendiskussionen`, label: servicesNavigation[2] },
        { path: `/${lang}/marktforschung-services/tiefenpsychologie-in-workshops-coaching`, label: servicesNavigation[3] },
        { path: `/${lang}/marktforschung-services/grundlagen-operative-forschung`, label: servicesNavigation[4] },
        { path: `/${lang}/marktforschung-services/digitale-quantitative-forschung`, label: servicesNavigation[5] },
        { path: `/${lang}/marktforschung-services/marken-strategieberatung`, label: servicesNavigation[6] },
        { path: `/${lang}/marktforschung-services/employer-branding-purpose`, label: servicesNavigation[7] },
        { path: `/${lang}/marktforschung-services/pr-studien-kommunikationsberatung`, label: servicesNavigation[8] },
        { path: `/${lang}/marktforschung-services/speaker-events`, label: servicesNavigation[9] },
    ];

    return (
        <>
            <ImageWithTextBox text={dict.strategyText} staticImage={strategyLandingImage} />
            <ServicesNavigation routes={routes} />
            {children}
            <ServiceFooter routes={routes} nextButtonText={dict.nextButtonText} backButtonText={dict.backButtonText} />
        </>
    );
};

