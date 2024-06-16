"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { aiGenerateModel } from "@/ai_model/ai_model";
import { PROMPT_TEXT } from "@/prompt/prompt";
import { useRouter } from "next/navigation";

const AddForm = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handelSave = async () => {
    try {
      setLoading(true);
      const sendDateFormate = "Description: " + formInput + PROMPT_TEXT;
      const result = await aiGenerateModel.sendMessage(sendDateFormate);
      if (result.response.text()) {
        const formData = {
          jsonForm: result.response.text(),
        };
        try {
          const response = await fetch("http://localhost:8000/api/v1/forms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            const data = await response.json();
            if (data.data.id) {
              console.log(data.data)
              router.push('edit',data.data.id);
            }
            setLoading(false);
            setOpenDialog(false);
          }
        } catch (error) {
          setLoading(false);
          setOpenDialog(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Add</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <h1 className="text-xl text-primary">Add</h1>
            <DialogDescription>
              <Textarea
                className="my-3"
                placeholder="Description"
                onChange={(e) => setFormInput(e.target.value)}
              />
              <div className="text-red-500 text-sm my-2">{errorMessage}</div>
              <div className="mt-3 flex justify-end">
                <Button onClick={() => setOpenDialog(false)}>Exit</Button>
                <Button
                  disabled={loading}
                  onClick={handelSave}
                  className="ml-3"
                >
                  Save
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddForm;
