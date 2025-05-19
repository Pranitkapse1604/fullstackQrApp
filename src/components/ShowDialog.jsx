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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
 
export function ShowDialog({ButtonName,DialogHeader,DialogDescription,action}) {
  return (
    <AlertDialog className="barlow">
      <AlertDialogTrigger asChild>
        <Button className={"w-full h-12 "}>{ButtonName}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={"barlow"}>{DialogHeader}</AlertDialogTitle>
          <AlertDialogDescription className={"barlow"}>
            {DialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={"barlow"}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={"barlow"} onClick={action}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}