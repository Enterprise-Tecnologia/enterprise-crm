import React from 'react'
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
} from './alert-dialog'

const DialogAlert = ({
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
	return (
		<AlertDialog
			open={open}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{children}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Fechar</AlertDialogCancel>
					{/* <AlertDialogAction>Continue</AlertDialogAction> */}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DialogAlert
