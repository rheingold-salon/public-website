import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { createEventSchema, type Event } from "@/lib/zod";


export function DataForm() {
    //const eventsInsertSchema = createInsertSchema(eventsTable);

    const form = useForm<Event>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
        }
    })

    const onSubmit = () => ({})

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle />
                    Add new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Add new Event
                </DialogTitle>
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="titleDe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="titleDe">Title (German)</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="titleDe"
                                            type="text"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="location">Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="location"
                                            type="text"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
