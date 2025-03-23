import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage
} from "@/components/ui/form";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { PlusCircle, Pencil } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createEventSchema, updateEventSchema, type Event } from "@/lib/zod";
import MDEditior from "@uiw/react-md-editor"
import { createEvent, updateEvent } from "@/server/db/events-crud";
import { uploadImage } from "@/server/images";
import { type ReactNode, useState } from "react";
import { useToast } from "@/hooks/use-toast";


interface DataFormProps {
    mode: 'create' | 'update';
    initialData?: Event;
    id?: number;
}

export function DataForm({
    mode = 'create',
    initialData,
    id,
}: DataFormProps) {

    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { toast } = useToast();

    // Choose the appropriate resolver based on mode
    const resolver = mode === 'create'
        ? zodResolver(createEventSchema)
        : zodResolver(updateEventSchema);

    // Set default values based on mode
    const defaultValues = mode === 'create'
        ? {
            titleDe: "",
            titleEn: "",
            contentDe: "",
            contentEn: "",
            location: "",
            date: "",
            time: "",
            type: "event",
            imagePath: "",
            externalLink: "",
            highlight: false
        }
        : initialData;

    const [contentDe, setContentDe] = useState(defaultValues?.contentDe ?? "")
    const [contentEn, setContentEn] = useState(defaultValues?.contentDe ?? "")

    const form = useForm<Event>({
        resolver: resolver,
        defaultValues: defaultValues
    })

    // Handle form submission based on mode
    const onSubmit = async (data: Event) => {
        setIsSubmitting(true)
        const formData = new FormData();

        const imageFile = data.imagePath as unknown as File;
        const imageName = imageFile ? imageFile.name : "";


        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'contentDe' && key !== 'contentEn' && key !== 'imagePath') {
                // Convert boolean to string for FormData
                if (typeof value === 'boolean') {
                    formData.append(key, value ? 'true' : 'false');
                } else if (value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            }
        })
        formData.append('contentDe', contentDe)
        formData.append('contentEn', contentEn)
        formData.append('imagePath', imageName);
        await uploadImage(imageFile);
        let result;
        if (mode === 'create') {
            result = await createEvent(formData);
        } else if (mode === 'update' && id) {
            result = await updateEvent(id, formData);
        }
        if (result?.success) {
            toast({
                title: mode === 'create' ? "Successfully created." : "Succesfully updated"
            })
            setOpen(false);
        } else {
            toast({
                variant: "destructive",
                title: "Updating failed",
                description: result?.error
            })
        }
        setIsSubmitting(false)

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === 'create' ? (
                    <Button>
                        <PlusCircle className="mr-2" />
                        Add new
                    </Button>
                ) : (
                    <div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            aria-label="Edit"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>

                )}
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogTitle>
                    {mode === 'create' ? 'Add new Event' : 'Edit Event'}
                </DialogTitle>
                {mode === 'update' && (
                    <DialogDescription>
                        Editing event ID: {id}
                    </DialogDescription>
                )}
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* Title fields with tabs */}
                        <Tabs defaultValue="titleDe" >
                            <TabsList className="mb-2">
                                <ErrorTabsTrigger
                                    value="titleDe"
                                    hasError={!!form.formState.errors.titleDe}
                                >
                                    Title (German)
                                </ErrorTabsTrigger>
                                <ErrorTabsTrigger
                                    value="titleEn"
                                    hasError={!!form.formState.errors.titleEn}
                                >
                                    Title (English)
                                </ErrorTabsTrigger>
                            </TabsList>
                            <TabsContent value="titleDe">
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
                                                    placeholder="German title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                            <TabsContent value="titleEn">
                                <FormField
                                    control={form.control}
                                    name="titleEn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="titleEn">Title (English)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="titleEn"
                                                    type="text"
                                                    placeholder="English title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>

                        {/* Content fields with tabs */}
                        <Tabs defaultValue="contentEn" >
                            <TabsList className="mb-2">
                                <ErrorTabsTrigger
                                    value="contentDe"
                                    hasError={!!form.formState.errors.contentDe}
                                >
                                    Content (German)
                                </ErrorTabsTrigger>
                                <ErrorTabsTrigger
                                    value="contentEn"
                                    hasError={!!form.formState.errors.contentEn}
                                >
                                    Content (English)
                                </ErrorTabsTrigger>
                            </TabsList>
                            <TabsContent value="contentDe">
                                <FormField
                                    control={form.control}
                                    name="contentDe"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="contentDe">Content (German)</FormLabel>
                                            <FormControl>
                                                <MDEditior
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        setContentDe(value ?? "");
                                                        form.setValue("contentDe", value ?? "", {
                                                            shouldValidate: true
                                                        })
                                                    }}
                                                    height={200}
                                                />
                                            </FormControl>
                                            {form.formState.errors.contentDe && (
                                                <FormMessage>
                                                    {form.formState.errors.contentDe.message}
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                            <TabsContent value="contentEn">
                                <FormField
                                    control={form.control}
                                    name="contentEn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="contentEn">Content (English)</FormLabel>
                                            <FormControl>
                                                <MDEditior
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        setContentEn(value ?? "");
                                                        form.setValue("contentEn", value ?? "", {
                                                            shouldValidate: true
                                                        })
                                                    }}
                                                    height={200}
                                                />
                                            </FormControl>
                                            {form.formState.errors.contentEn && (
                                                <FormMessage>
                                                    {form.formState.errors.contentEn.message}
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>

                        {/* Location field */}
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
                                            placeholder="Event location"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Date and Time fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="date">Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="date"
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="time">Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="time"
                                                type="time"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Event Type field */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select event type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="event">Event</SelectItem>
                                            <SelectItem value="vortrag">Vortrag</SelectItem>
                                            <SelectItem value="podcast">Podcast</SelectItem>
                                            <SelectItem value="tv">TV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image Path field */}
                        <FormField
                            control={form.control}
                            name="imagePath"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="imagePath">Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="images/*"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload the corresponding Image
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* External Link field */}
                        <FormField
                            control={form.control}
                            name="externalLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="externalLink">External Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="externalLink"
                                            type="url"
                                            placeholder="https://example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter an external URL for more information about this event
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Highlight checkbox */}
                        <FormField
                            control={form.control}
                            name="highlight"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Highlight Event</FormLabel>
                                        <FormDescription>
                                            Feature this event prominently on the website
                                        </FormDescription>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between">
                            <Button
                                disabled={isSubmitting}
                                variant="outline"
                                onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {mode === 'create' ? 'Create Event' : 'Update Event'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}

const ErrorTabsTrigger = ({ value, hasError, children }: { value: string, hasError: boolean, children: ReactNode }) => {
    return (
        <TabsTrigger
            value={value}
            className={hasError ? "text-red-500 font-medium" : ""}
        >
            {children}
        </TabsTrigger>
    );
};
