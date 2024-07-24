// event.tsx

import { CommandDialog, CommandInput, CommandItem, CommandList, CommandGroup, CommandEmpty } from "./ui/command";
import { File } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEventForm } from "@/hooks/use-event-form";
import { useCommandInput } from "./ui/command-input";

export const AddEvent = () => {
    const { user } = useUser();
    const router = useRouter();

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    const { title, startDate, endDate, eventType, setTitle, setStartDate, setEndDate, setEventType } = useEventForm(); // Use the custom hook

    // Custom hooks for managing input states and onChange functions
    const titleInput = useCommandInput("");
    const startInput = useCommandInput("");
    const endInput = useCommandInput("");
    const typeInput = useCommandInput("");

    const handleCreateEvent = () => {
        // Implement event creation logic here, e.g., sending data to backend
        console.log("Creating event:", { title: titleInput.value, startDate: startInput.value, endDate: endInput.value, eventType: typeInput.value });
        onClose(); // Close the dialog after creating the event
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <div>
                <span>Title:</span>
                <CommandInput
                    placeholder="Title"
                    value={titleInput.value}
                    onChange={titleInput.onChange}
                />
            </div>
            <div>
                <span>Start:</span>
                <CommandInput
                    placeholder="Start Date & Time"
                    value={startInput.value}
                    onChange={startInput.onChange}
                />
            </div>
            <div>
                <span>End:</span>
                <CommandInput
                    placeholder="End Date & Time"
                    value={endInput.value}
                    onChange={endInput.onChange}
                />
            </div>
            <div>
                <span>Type:</span>
                <CommandInput
                    placeholder="Type (work, personal, leisure, school)"
                    value={typeInput.value}
                    onChange={typeInput.onChange}
                />
            </div>
            <CommandList>
                <CommandGroup heading="Suggestions">
                    <CommandEmpty>No suggestions available.</CommandEmpty>
                </CommandGroup>
            </CommandList>
            <CommandList>
                <CommandItem onSelect={handleCreateEvent}>
                    <File className="mr-2 h-4 w-4" />
                    <span>Create Event</span>
                </CommandItem>
            </CommandList>
        </CommandDialog>
    );
};
