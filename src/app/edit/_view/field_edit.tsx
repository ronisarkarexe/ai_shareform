"use client";
import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { IFormFields } from "@/model/form.model";
import { Button } from "@/components/ui/button";

const FieldEdit = (props: {
  defaultValue: IFormFields;
  onSaveUpdate: (value: any) => void;
}) => {
  const [fieldLabel, setFieldLabel] = useState<string | undefined>(
    props?.defaultValue?.label
  );
  const [fieldPlaceHolder, setFieldPlaceHolder] = useState<string | undefined>(
    props?.defaultValue?.placeholder
  );

  return (
    <div className="flex gap-1">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-4 w-4 cursor-pointer text-green-500" />
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <label className="text-xs">Label Name</label>
            <Input
              type="text"
              defaultValue={props?.defaultValue?.fieldTitle}
              onChange={(e) => setFieldLabel(e.target.value)}
            />
            <label className="text-xs">Placeholder</label>
            <Input
              type="text"
              defaultValue={props?.defaultValue?.placeholder}
              onChange={(e) => setFieldPlaceHolder(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            className="mt-2"
            onClick={() =>
              props.onSaveUpdate({
                label: fieldLabel,
                placeholder: fieldPlaceHolder,
              })
            }
          >
            Save
          </Button>
        </PopoverContent>
      </Popover>
      <Trash className="h-4 w-4 cursor-pointer text-red-500" />
    </div>
  );
};

export default FieldEdit;
