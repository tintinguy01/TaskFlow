"use client";

import "@blocknote/core/fonts/inter.css";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (content: string) => void;
    initialContent?: string;
};

const Editor: React.FC<EditorProps> = ({
    onChange,
    initialContent
}) => {

    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({ file });
        return response.url;
    };

    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
    });

    const handleChange = () => {
        onChange(JSON.stringify(editor.document));
    };

    return (
        <div>
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={handleChange}
            />
        </div>
    );
};

export default Editor;
