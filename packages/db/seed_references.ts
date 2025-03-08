import { db } from ".";
import { referencesTable } from "./schema";

const main = async () => {
    const references = [
        {
            name: "Monika Schulze",
            contentDe: "Ich arbeite seit mehr als 10 Jahren mit Ines Imdahl und Jens Lönneker zusammen. Was mich immer beeindruckt hat, ist die Professionalität verbunden mit positiver Energie und Leidenschaft. Darüber hinaus haben wir es immer geschafft, die tiefenpsychologischen Erkenntnisse in Handlungsableitungen umzusetzen. Konkrete Beispiele sind die Weiterentwicklung von ‚Du darfst‘ von einer ‚low fat‘-Marke zu einem ‚Plus an guten Zutaten‘, die europäische ‚Knorr Meal Maker‘-Strategie und die Marken-Positonierung von Zurich Deutschland zusammen mit Ines Imdahl sowie die Entwicklung eines Leitbildes für Landgard mit Jens Lönneker.",
            contentEn: "I have been working with Ines Imdahl and Jens Lönneker for more than 10 years. What has always impressed me is the professionalism combined with positive energy and passion. Moreover, we have always managed to translate the deep psychological insights into actionable recommendations. Specific examples include the development of 'Du darfst' from a 'low fat' brand to 'a plus of good ingredients,' the European 'Knorr Meal Maker' strategy, and the brand positioning of Zurich Germany together with Ines Imdahl, as well as the development of a guiding principle for Landgard with Jens Lönneker.",
            positionDe: "Mitglied des Aufsichtsrats, Zurich Versicherung",
            positionEn: "Member of Supervisory Board, Zurich Insurance",
            imagePath: "MonikaSchulze.png"
        },
        {
            name: "Saskia Rosendahl",
            contentDe: "In den letzten Jahren hat Ines mehrere qualitative Forschungsstudien für die FMCG-Marken durchgeführt, für die ich das Vergnügen hatte zu arbeiten. Ich schätze die Einsichten, die Ines aufgrund ihres profunden Wissens und ihrer Fähigkeiten auf den Tisch bringt, sehr. Wann immer wir ein Projekt abgeschlossen hatten, wurden alle Fragen beantwortet, klare Empfehlungen gegeben und die nächsten Schritte festgelegt. Ines hatte einen großen Anteil am Erfolg von vielen Werbekampagnen, Produktkonzepten oder Verpackungsdesigns. Ich empfehle die Zusammenarbeit mit Ines und ihrem Team zu 100%!",
            contentEn: "In recent years, Ines has conducted several qualitative research studies for the FMCG brands I had the pleasure of working for. I greatly appreciate the insights that Ines brings to the table due to her profound knowledge and skills. Whenever we completed a project, all questions were answered, clear recommendations were given, and the next steps were outlined. Ines played a significant role in the success of many advertising campaigns, product concepts, and packaging designs. I recommend working with Ines and her team 100%!",
            positionDe: "Marketing Specialist bei Upfield",
            positionEn: "Marketing Specialist at Upfield",
            imagePath: "SaskiaRosendahl.jpg"
        },
        {
            name: "Anja Litzinger",
            contentDe: "Professionell und zuverlässig – vor allem aber wahnsinnig inspirierend! Das ist eine rare Kombination, die immer wieder Freude macht.",
            contentEn: "Professional and reliable – but above all, incredibly inspiring! That is a rare combination that is always a pleasure.",
            positionDe: "Manager Market Category Consumer Insights",
            positionEn: "Manager Market Category Consumer Insights",
            imagePath: "Innovationhub.png"
        },
        {
            name: "Gabor Steingart",
            contentDe: "Ich habe soeben die gesamte Ergo-Titelstory gelesen und bin begeistert. Das ist tiefer, präziser und origineller noch als ich es mir erhofft hatte. Das schmückt unsere Zeitung sehr – und wird nicht nur in der Branche für Debattenstoff sorgen.",
            contentEn: "I have just read the entire Ergo cover story and am thrilled. It is deeper, more precise, and more original than I had hoped. This greatly enhances our newspaper – and will not only spark discussions within the industry.",
            positionDe: "Gründer von Media Pioneer und Herausgeber von Steingarts Morning Briefing",
            positionEn: "Founder of Media Pioneer and Editor of Steingart's Morning Briefing",
            imagePath: "GaborSteingart.jpg"
        },
        {
            "name": "Heike Stadler",
            "contentDe": "Ich war Ines‘ Kundin, als ich bei Unilever und bei Upfield in Deutschland arbeitete. Wir haben in Lebensmittelprojekten für Marken wie Knorr und Rama zusammengearbeitet. Ines ist alles, was man sich von einer Forscherin wünscht: Sie versteht Ihr Geschäft und wie die Forschung Geschäftsentscheidungen beeinflusst, hat genug Abstand, um die Themen aus einem anderen, verbraucherrelevanten Blickwinkel zu sehen und nicht zuletzt die Kreativität und den tiefen psychologischen Einblick, um neue Erkenntnisse und Lösungen für das Unternehmen zu liefern. Ich habe es immer genossen, mit Ines zu arbeiten. Es war nie nur Forschung, sondern auch eine Diskussion darüber, was damit zu tun ist und wie man die Erkenntnisse in das Geschäft implementiert!",
            "contentEn": "I was Ines' client when I worked at Unilever and Upfield in Germany. We collaborated on food projects for brands like Knorr and Rama. Ines is everything you could want from a researcher: she understands your business and how research influences business decisions, has enough distance to see issues from a different, consumer-relevant perspective, and, last but not least, the creativity and deep psychological insight to provide new findings and solutions for the company. I always enjoyed working with Ines. It was never just research, but also a discussion about what to do with it and how to implement the insights into the business!",
            "positionDe": "",
            "positionEn": "",
            "imagePath": "Innovationhub.png"
        },
        {
            "name": "Dr. Monika Schmidhofer",
            "contentDe": "rheingold salon bleibt nicht bei den analytischen Ergebnissen stehen, sondern geht einen Schritt weiter und liefert exekutionelle Handlungsanweisungen zur Optimierung sowie strategische Denkanstöße. Hinzu kommt ein hoher Grad an Flexibilität und eine gute Portion Charme.",
            "contentEn": "rheingold salon does not stop at analytical results but goes a step further, providing actionable execution guidelines for optimization as well as strategic food for thought. In addition, there is a high degree of flexibility and a good dose of charm.",
            "positionDe": "Marketing Director Dairy Loose",
            "positionEn": "Marketing Director Dairy Loose",
            "imagePath": "MonikaSchmidhofer.png"
        },
        {
            "name": "Lisa Ortgies",
            "contentDe": "Die Frauenquote zu fordern ist eine Sache, aber den tiefenpsychologischen Hemmschwellen bei den Frauen selbst nachzuspüren – das ist die Kernkompetenz von rheingold salon. Ich freue mich auf die Ergebnisse unserer spannenden Studie zu Top-Frauen in den Medien. Das Ergebnis wird die Arbeit von ProQuote und die aufstiegswilligen Frauen selbst ein großes Stück nach vorne tragen.",
            "contentEn": "Demanding a women's quota is one thing, but tracking the deep psychological barriers in women themselves – that is the core competence of rheingold salon. I am looking forward to the results of our exciting study on top women in the media. The outcome will significantly advance the work of ProQuote and the ambitious women themselves.",
            "positionDe": "Journalistin & Kolumnistin, das „Gesicht“ von Frau TV",
            "positionEn": "Journalist & Columnist, the 'face' of Frau TV",
            "imagePath": "LisaOrtgies.png"
        },
        {
            "name": "Lilian-Susan Wilke",
            "contentDe": "Ines Imdahl versteht es in ihrer Präsentation perfekt, die psychologische Dimension des Verbaucherverhaltens mit konkreten strategischen Handlungsempfehlungen zu verknüpfen. In ihrer Präsentation ‚Facebook zwischen Anarchie und Diktatur‘ bei unserer Strategiekonferenz ‚International Health Forum‘ präsentierte Ines Imdahl die Dimension der Facebook-Kommunikationskultur, die Markenführung von OTC Unternehmen eindringlich, glaubwürdig und absolut nachvollziehbar und somit als wertvolle strategische Inspiration.",
            "contentEn": "Ines Imdahl perfectly understands how to link the psychological dimension of consumer behavior with concrete strategic recommendations for action in her presentation. In her talk 'Facebook Between Anarchy and Dictatorship' at our strategy conference 'International Health Forum,' Ines Imdahl presented the dimension of Facebook's communication culture, making brand management for OTC companies vivid, credible, and absolutely comprehensible, serving as a valuable strategic inspiration.",
            "positionDe": "Head of Eventmanagement, Wort & Bild Verlag",
            "positionEn": "Head of Event Management, Wort & Bild Verlag",
            "imagePath": "LilianSusanWilke.png"
        },
        {
            "name": "Christof Rauch",
            "contentDe": "Die Zusammenarbeit macht Spaß und führt zu verwertbaren Ergebnissen. Was will man mehr?",
            "contentEn": "Working together is fun and leads to usable results. What more could you want?",
            "positionDe": "Leiter Markenmanagement und Marktkommunikation, Versicherungskammer Bayern",
            "positionEn": "Head of Brand Management and Market Communication, Versicherungskammer Bayern",
            "imagePath": "ChristofRauch.png"
        },
        {
            "name": "Cornelia Ristau",
            "contentDe": "rheingold salon steht für qualitative Marktforschung auf höchstem Niveau mit einer bemerkenswerter Sensibilität für tiefenpsychologische Zusammenhänge, die mit viel Praxisnähe und Herzblut in operativ wie strategisch wertvolle Empfehlungen umgesetzt werden.",
            "contentEn": "rheingold salon stands for qualitative market research at the highest level, with remarkable sensitivity to deep psychological relationships, which are translated into valuable operational and strategic recommendations with a great deal of practical relevance and passion.",
            "positionDe": "Head of Market Research, Media & Digital, Intersnack Knabber-Gebäck GmbH & Co. KG",
            "positionEn": "Head of Market Research, Media & Digital, Intersnack Knabber-Gebäck GmbH & Co. KG",
            "imagePath": "CorneliaRistau.png"
        }
    ]

    await db.delete(referencesTable);
    await db.insert(referencesTable).values(references);
};

main();
