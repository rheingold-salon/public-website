import { db } from "@/db";
import { peopleTable } from "./schema";

const main = async () => {
    const people = [
        {
            name: "Ines Imdahl",
            roleDe: "Geschäftsführerin & Inhaberin",
            roleEn: "Managing Director & Owner",
            quoteDe: "Meine drei Ks sind nicht Kinder, Küche und Kirche, sondern Karneval, Knutschen und Kreativität.",
            quoteEn: "My three Ks are not children, kitchen, and church, but carnival, kissing, and creativity.",
            aboutDe: "Performed in der Analyse, im Fernsehen und an Karneval.",
            aboutEn: "Performs in analysis, on television, and at carnival.",
            imagePath: "Ines-2.jpg",
        },
        {
            name: "Jens Lönneker",
            roleDe: "Geschäftsführer & Inhaber",
            roleEn: "Managing Director & Owner",
            quoteDe: "Ich bin kein Bot – safe.",
            quoteEn: "I am not a bot – for sure.",
            aboutDe: "Ob Thermomix oder Morphologie – beides beherrscht er auch im Schlaf.",
            aboutEn: "Whether Thermomix or morphology – he masters both even in his sleep.",
            imagePath: "Jens-2.jpg",
        },
        {
            name: "Marco Diefenbach",
            roleDe: "Senior Projektleiter",
            roleEn: "Senior Project Manager",
            quoteDe: "Das Faszinierende an unserer Arbeit: wenn man über scheinbare Nebensächlichkeiten an einen wichtigen Kern der Sache kommt.",
            quoteEn: "The fascinating thing about our work: when you reach the important core of a matter through seemingly minor details.",
            aboutDe: "Wenn der salon feiert, verwandelt sich Marco vom Projektleiter zum Vollblutkünstler.",
            aboutEn: "When the salon celebrates, Marco transforms from project manager to full-blooded artist.",
            imagePath: "Marco-1.jpg",
        },
        {
            name: "Christine Liebers",
            roleDe: "Senior Consultant",
            roleEn: "Senior Consultant",
            quoteDe: "Yeah - so einfach geht das.",
            quoteEn: "Yeah - that's how easy it is.",
            aboutDe: "Der salon hat Christine aus Hamburg bekommen, aber Hamburg nicht aus Christine.",
            aboutEn: "The salon got Christine from Hamburg, but Hamburg never left Christine.",
            imagePath: "Christine.jpg",
        },
        {
            name: "Lukas Struwe",
            roleDe: "Senior Projektleiter",
            roleEn: "Senior Project Manager",
            quoteDe: "Nirgendds kann man so intensiv in andere Lebnswelten eintauchen die man sonst nie kennenlernen würde.",
            quoteEn: "Nowhere else can you immerse yourself so deeply in other worlds of life that you would never otherwise get to know.",
            aboutDe: "Lukas ist McMealPrep - auf die Mittagspause immer am besten vorbereitet.",
            aboutEn: "Lukas is McMealPrep – always the best prepared for lunch break.",
            imagePath: "Lukas-2.jpg",
        },
        {
            name: "Karin Klumpp",
            roleDe: "Leitung Fielmanagment",
            roleEn: "Head of Field Management",
            quoteDe: "Ich weiss wie der (Feld-) Hase läuft!",
            quoteEn: "I know how the (field) rabbit runs!",
            aboutDe: "Wer noch nie Karins Kässpätzle gegessen hat, kann nicht behaupten jemals Kässpätzle gegessen zu haben.",
            aboutEn: "Anyone who has never eaten Karin’s Kässpätzle cannot claim to have ever eaten Kässpätzle.",
            imagePath: "Karin.jpg",
        },
        {
            name: "Jeremias Ekert",
            roleDe: "",
            roleEn: "",
            quoteDe: "",
            quoteEn: "",
            aboutDe: "",
            aboutEn: "",
            imagePath: "Jeremias.jpg",
        },
        {
            name: "Claudia Schwalm",
            roleDe: "Fielmanagment",
            roleEn: "Field Management",
            quoteDe: "Ich würde gerne pünktlich kommen, aber dann wären alle nur verwirrt!",
            quoteEn: "I’d love to arrive on time, but then everyone would just be confused!",
            aboutDe: "Hund, Katze Maus? Ja klar! Aber auch Schwan, Esel und Tabe! Claudie kümmert sich mit Leidenschaft um das Wohl aller Tiere - natrürlich auch um das der salon-LöwInnen",
            aboutEn: "Dog, cat, mouse? Of course! But also swan, donkey, and Tabe! Claudia passionately cares for the well-being of all animals – of course, including the salon’s lions.",
            imagePath: "Claudia.jpg",
        },
        {
            name: "Tilman Imdahl",
            roleDe: "Werkstudent",
            roleEn: "Working Student",
            quoteDe: "Ich hasse Sprüche. Ich kümmere mich um die Technik - und so.",
            quoteEn: "I hate catchphrases. I take care of the tech – and stuff.",
            aboutDe: "Tilman ist unser kürzester Draht zur Jugendsprache",
            aboutEn: "Tilman is our shortest connection to youth slang.",
            imagePath: "Tilman.jpg",
        },
        {
            name: "Dr.Wolfram Domke",
            roleDe: "Leiter der rheingold Akademie",
            roleEn: "Head of the Rheingold Academy",
            quoteDe: "Et es, wie ets - Nix bliev, wie et wor.",
            quoteEn: "It is what it is – nothing stays as it was.",
            aboutDe: "Herr Domke sucht immer noch nach einem Märchen, dass zum 1. FC Köln passt.",
            aboutEn: "Mr. Domke is still looking for a fairy tale that fits 1. FC Köln.",
            imagePath: "Herr-Domke.jpg",
        },
    ];

    await db.delete(peopleTable);
    await db.insert(peopleTable).values(people);
};

main();
