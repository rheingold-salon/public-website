import { db } from ".";
import { casesTable } from "./schema";

const main = async () => {
    const cases = [
        {
            titleDe: "Kesselchips Intersnack",
            titleEn: "Kesselchips Intersnack",
            subtitleDe: "New Product Development",
            subtitleEn: "New Product Development",
            contentDe: "**Der Prozess:**\nTiefenpsychologische Forschung von der Ideengenerierung bis zur Markteinführung Konzeptentwicklung, Namensentwicklung, Positionierung und Gestaltungsentwicklung bis hin zur Finalisierung.\n\n**Das Ergebnis:**\nErste erfolgreiche Premium Positionierung von Chips auf breiter Basis. Rund 500% Wachstum im ersten Jahr. Gesamtmarkt Kesselchips in Deutschland nach Neu-Einführung durch Intersnack im Jahr 2012 ist explodiert. Alle Marken und Handelsmarken ahmen den Erfolg dieser Innovation nach. Die Marktdynamik liegt noch immer bei 60%\n\n**Fazit:**\nProduktentwicklung von Anfang an mit Lönneker & Imdahl rheingold salon – lohnt sich.",
            contentEn: "**The Process:**\nDepth-psychological research from idea generation to market launch: concept development, name development, positioning, and design development up to finalization.\n\n**The Result:**\nThe first successful premium positioning of chips on a broad basis. Around 500% growth in the first year. The overall kettle chips market in Germany exploded after Intersnack's reintroduction in 2012. All brands and private labels imitated the success of this innovation. Market dynamics are still at 60%.\n\n**Conclusion:**\nProduct development from the very beginning with Lönneker & Imdahl rheingold salon – pays off.",
            imagePath: "kesselchips.png"
        },
        {
            titleDe: "Vom Staub befreit Vorwerk",
            titleEn: "Freed from Dust - Vorwerk",
            subtitleDe: "Market-Award 2015 und Marketing Preis 2017",
            subtitleEn: "Market Award 2015 and Marketing Prize 2017",
            contentDe: "**Die Ausgangslage:**\nDeutliche Umsatzrückgänge zwangen Vorwerk 2010 zum Handeln.\n\n**Das Ergebnis:**\nEine neue Markenarchitektur machte den Anfang: Unter der Dachmarke Vorwerk stehen heute die jeweiligen Produktmarken für die Kompetenzfelder Reinigung (Kobold), Kochen (Thermomix) und Bodenbeläge (Flooring). Die Produkte sollten sich durch überlegene Qualität und ein zeitgemäßes Design auszeichnen. Der Direktvertrieb wurde um E-Commerce und Social-Media-Aktivitäten ergänzt. Hinzu kamen eigene Marken-Shops in Deutschland, deren Zahl auf rund 80 steigen soll. Die Maßnahmen zeigten Wirkung und bescherten Vorwerk vier Umsatz-Rekordjahre in Folge.\n**Fazit:**\nEin sauber durchgeführter Relaunch.",
            contentEn: "**The Initial Situation:**\nSignificant revenue declines forced Vorwerk to take action in 2010.\n\n**The Result:**\nA new brand architecture marked the beginning: Under the Vorwerk umbrella brand, the respective product brands today represent the areas of expertise – cleaning (Kobold), cooking (Thermomix), and flooring (Flooring). The products were to be characterized by superior quality and contemporary design. Direct sales were expanded to include e-commerce and social media activities. Additionally, dedicated brand shops were introduced in Germany, with the number expected to grow to around 80. The measures proved effective, leading Vorwerk to four consecutive record-breaking revenue years.\n\n**Conclusion:**\nA well-executed relaunch.",
            imagePath: "thermomix.png"
        },
        {
            titleDe: "Kultur- & Markenstudie Trill",
            titleEn: "Cultural & Brand Study - Trill",
            subtitleDe: "Warum das beste Vogelfutter zu gut ist",
            subtitleEn: "Why the Best Bird Food is Too Good",
            contentDe: "**Die Forschung:**\nIn-Home Interviews mit Menschen, die sich gerade einen Vogel angeschafft haben – und Menschen, die schon viele Jahre einen haben. Große Enttäuschungen bei neuen Vogelhaltern: die Vögel reagieren nicht auf Bindungs- und Kommunikationsversuche – freuen sich nicht, wenn ihr Mensch nach Hause kommt oder sie füttert.\n\n**Das Ergebnis:**\nUnbewusst möchten die Halter die Tiere wieder loswerden – das können sie aber nicht mit ihrem Gewissen vereinbaren. Fast allen Haltern „passieren“ daher kleine Unfälle – Fenster offen stehen lassen, Vogel mit ein tapezieren, beim Kartoffelschälen gerät das Tier in den Mülleimer – die ihnen schrecklich peinlich sind. Der innere Konflikt: Ich will das Tier eigentlich nicht mehr, aber als gewissenhafter Tierhalter kann ich es ja nicht einfach „um die Ecke bringen“. Die Lösung der Vogelhalter: Nicht das allerbeste Vogelfutter verwenden, sondern nur das zweitbeste, gleich teure Futter. So tut man etwas Gutes für die Tiere – Vitakraft ist auch gut genug – muss aber nicht die Sorge haben, dass die Tiere via Jod S 11 Körnchen ‚ewig‘ leben. Denn die Lebensverlängerung war das zentrale Versprechen des Futters.\n\n**Die Empfehlung für unseren Kunden:**\nDie verraten wir hier natürlich nicht.",
            contentEn: "**The Research:**\nIn-home interviews with people who had just gotten a bird – and those who had owned one for many years. Major disappointments among new bird owners: the birds do not respond to bonding and communication attempts – they do not show joy when their owner returns home or feeds them.\n\n**The Result:**\nUnconsciously, owners want to get rid of the animals – but they cannot reconcile this with their conscience. Almost all owners therefore experience ‘accidents’ – leaving windows open, wallpapering over the bird, accidentally throwing it in the trash while peeling potatoes – which they find deeply embarrassing. The inner conflict: I no longer want the animal, but as a conscientious pet owner, I cannot simply ‘dispose’ of it. The bird owners' solution: Do not use the absolute best bird food, but only the second-best, equally priced food. This way, they feel they are still doing something good for the animals – Vitakraft is good enough – but they do not have to worry that the birds will ‘live forever’ thanks to Jod S 11 pellets. After all, longevity was the core promise of the food.\n\n**The Recommendation for Our Client:**\nOf course, we won't reveal that here.",
            imagePath: "trill.png"
        },
        {
            titleDe: "„Das ist nicht lustig, aber funny“ für funny frisch",
            titleEn: "„Das ist nicht lustig, aber funny“ for funny frisch",
            subtitleDe: "Kampagnenentwicklung mit Bastian Schweinsteiger für Intersnack",
            subtitleEn: "Campaign Development with Bastian Schweinsteiger for Intersnack",
            contentDe: "**Der Prozess:**\nForschung, Strategieberatung – Entwicklung und Weiterentwicklung der Kampagne vom Storytelling bis hin zu Claim & Forschung und Strategieentwicklung zur Einführung zweites Testimonial Lukas Podolski in 2017.\n\n**Das Ergebnis:**\nDurch Werbung und tiefenpsychologisch fundierte Positionierung zum Marktführer innerhalb von wenigen Jahren. Der bekannteste Chips-Claim auf dem deutschen Markt.",
            contentEn: "**The Process:**\nResearch, strategic consulting – development and evolution of the campaign from storytelling to claim, including research and strategy development for introducing a second testimonial, Lukas Podolski, in 2017.\n\n**The Result:**\nThrough advertising and depth-psychologically grounded positioning, the brand became the market leader within a few years. The most well-known chips slogan in the German market.",
            imagePath: "funnyfrisch.png"
        }
    ]
    await db.delete(casesTable);
    await db.insert(casesTable).values(cases);
};

main();
