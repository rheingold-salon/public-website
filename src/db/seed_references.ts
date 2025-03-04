import { db } from "@/db";
import { referencesTable } from "./schema";

const main = async () => {
    const references = [{
        name: "Monika Schulze",
        content: "Ich arbeite seit mehr als 10 Jahren mit Ines Imdahl und Jens Lönneker zusammen. Was mich immer beeindruckt hat, ist die Professionalität verbunden mit positiver Energie und Leidenschaft. Darüber hinaus haben wir es immer geschafft, die tiefenpsychologischen Erkenntnisse in Handlungsableitungen umzusetzen. Konkrete Beispiele sind die Weiterentwicklung von ‚Du darfst‘ von einer ‚low fat‘-Marke zu einem ‚Plus an guten Zutaten‘, die europäische ‚Knorr Meal Maker‘-Strategie und die Marken-Positonierung von Zurich Deutschland zusammen mit Ines Imdahl sowie die Entwicklung eines Leitbildes für Landgard mit Jens Lönneker.",
        position: "Member of Supervisory Board, Zurich Versicherung",
        imagePath: "MonikaSchulze.png"
    },
    {
        name: "Saskia Rosendahl",
        content: "In den letzten Jahren hat Ines mehrere qualitative Forschungsstudien für die FMCG-Marken durchgeführt, für die ich das Vergnügen hatte zu arbeiten. Ich schätze die Einsichten, die Ines aufgrund ihres profunden Wissens und ihrer Fähigkeiten auf den Tisch bringt, sehr. Wann immer wir ein Projekt abgeschlossen hatten, wurden alle Fragen beantwortet, klare Empfehlungen gegeben und die nächsten Schritte festgelegt. Ines hatte einen großen Anteil am Erfolg von vielen Werbekampagnen, Produktkonzepten oder Verpackungsdesigns. Ich empfehle die Zusammenarbeit mit Ines und ihrem Team zu 100%!",
        position: "Marketing Specialist at Upfield",
        imagePath: "SaskiaRosendahl.jpg",
    },
    {
        name: "Anja Litzinger",
        content: "Professionell und zuverlässig – vor allem aber wahnsinnig inspirierend! Das ist eine rare Kombination, die immer wieder Freude macht.",
        position: "Manager Market Category Consumer Insights",
        imagePath: "Innovationhub.png",
    },
    {
        name: "Gabor Steingart",
        content: "Ich habe soeben die gesamte Ergo-Titelstory gelesen und bin begeistert. Das ist tiefer, präziser und origineller noch als ich es mir erhofft hatte. Das schmückt unsere Zeitung sehr – und wird nicht nur in der Branche für Debattenstoff sorgen.",
        position: "Gründer von Media Pioneer und Herausgeber von Steingarts Morning Briefing",
        imagePath: "GaborSteingart.jpg",
    },
    {
        name: "Heike Stadler",
        content: "Ich war Ines‘ Kundin, als ich bei Unilever und bei Upfield in Deutschland arbeitete. Wir haben in Lebensmittelprojekten für Marken wie Knorr und Rama zusammengearbeitet. Ines ist alles, was man sich von einer Forscherin wünscht: Sie versteht Ihr Geschäft und wie die Forschung Geschäftsentscheidungen beeinflusst, hat genug Abstand, um die Themen aus einem anderen, verbraucherrelevanten Blickwinkel zu sehen und nicht zuletzt die Kreativität und den tiefen psychologischen Einblick, um neue Erkenntnisse und Lösungen für das Unternehmen zu liefern. Ich habe es immer genossen, mit Ines zu arbeiten. Es war nie nur Forschung, sondern auch eine Diskussion darüber, was damit zu tun ist und wie man die Erkenntnisse in das Geschäft implementiert!",
        position: "",
        imagePath: "Innovationhub.png",
    },
    {
        name: "Dr. Monika Schmidhofer",
        content: "rheingold salon bleibt nicht bei den analytischen Ergebnissen stehen, sondern geht einen Schritt weiter und liefert exekutionelle Handlungsanweisungen zur Optimierung sowie strategische Denkanstöße. Hinzu kommt ein hoher Grad an Flexibilität und eine gute Portion Charme.",
        position: "Marketing Director Dairy Loose",
        imagePath: "MonikaScmidhofer.png",
    },
    {
        name: "Lisa Ortgies",
        content: "Die Frauenquote zu fordern ist eine Sache, aber den tiefenpsychologischen Hemmschwellen bei den Frauen selbst nachzuspüren – das ist die Kernkompetenz von rheingold salon. Ich freue mich auf die Ergebnisse unserer spannenden Studie zu Top-Frauen in den Medien. Das Ergebnis wird die Arbeit von ProQuote und die aufstiegswilligen Frauen selbst ein großes Stück nach vorne tragen.",
        position: "Journalistin & Kolumnistin, das „Gesicht“ von Frau TV",
        imagePath: "LisaOrtgies.png",
    },
    {
        name: "Lilian-Susan Wilke",
        content: "Ines Imdahl versteht es in ihrer Präsentation perfekt, die psychologische Dimension des Verbaucherverhaltens mit konkreten strategischen Handlungsempfehlungen zu verknüpfen. In ihrer Präsentation ‚Facebook zwischen Anarchie und Diktatur‘ bei unserer Strategiekonferenz ‚International Health Forum‘ präsentierte Ines Imdahl die Dimension der Facebook-Kommunikationskultur, die Markenführung von OTC Unternehmen eindringlich, glaubwürdig und absolut nachvollziehbar und somit als wertvolle strategische Inspiration.",
        position: "Head of Eventmanagemnet, Wort & Bild Verlag",
        imagePath: "LilianSusanWilke.png",
    },
    {
        name: "Christof Rauch",
        content: "Die Zusammenarbeit macht Spaß und führt zu verwertbaren Ergebnissen. Was will man mehr?",
        position: "Leiter Markenmanagement und Marktkommunikation, Versicherungskammer Bayern",
        imagePath: "CrhistofRauch.png",
    },
    {
        name: "Cornelia Ristau",
        content: "rheingold salon steht für qualitative Marktforschung auf höchstem Niveau mit einer bemerkungswerten Sensibilität für tiefenpsychologische Zusammenhänge, die mit viel Praxisnähe und Herzblut in operativ wie strategisch wertvolle Empfehlungen umgesetzt werden.",
        position: "Head of Market Research, Media & Digital, Intersnack Knabber-Gebäck GmbH & Co. KG",
        imagePath: "CorneliaRistau.png",
    },
    ];

    await db.delete(referencesTable);
    await db.insert(referencesTable).values(references);
};

main();
