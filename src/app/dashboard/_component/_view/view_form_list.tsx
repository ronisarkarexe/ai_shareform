import { Button } from "@/components/ui/button";
import { IForm } from "@/model/form.model";
import { Edit, Share, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ViewFormList = (props: {
  form: IForm;
  id: string;
  onDelete: (id: string) => void;
}) => {
  const { formTitle, formHeading } = props.form;

  return (
    <div className="border shadow-sm rounded-md p-3">
      <div className="flex justify-between">
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash className="h-4 w-4 text-red-500 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure, want to delete this form?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => props.onDelete(props.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h1 className="text-lg text-primary">{formTitle}</h1>
      <h1 className="text-sm text-gray-500">{formHeading}</h1>
      <hr className="my-3" />
      <div className="flex justify-between">
        <Button variant="outline" size="sm" className="flex gap-1">
          <Share className="h-4 w-4" /> Share
        </Button>
        <Link href={"/edit/" + props.id}>
          <Button variant="outline" size="sm" className="flex gap-1">
            <Edit className="h-4 w-4" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ViewFormList;
