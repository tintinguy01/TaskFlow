"use client";

import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TypeSelector = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {

    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="z-[99999]">
                <SelectGroup>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="leisure">Leisure</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default TypeSelector;
