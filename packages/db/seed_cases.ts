import { db } from ".";
import { casesTable } from "./schema";

const main = async () => {
    const cases = [{
        title: "",
        subtitle: "",
        content: "",
        imagePath: "",
    }];

    await db.delete(casesTable);
    await db.insert(casesTable).values(cases);
};

main();
