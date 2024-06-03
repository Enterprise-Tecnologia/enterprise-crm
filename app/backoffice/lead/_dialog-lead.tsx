import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const DialogLead = ({
	open = false,
	defaultOpen = false,
	onOpenChange,
	title,
	children,
}: {
	open?: boolean
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
	title: string
	children: React.ReactNode
}) => {

  const [openedDialog, setOpenedDialog] = useState(false);

	return (
		<AlertDialog
			open={openedDialog}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
		>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenedDialog(opened => !opened)}>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
	)
}
