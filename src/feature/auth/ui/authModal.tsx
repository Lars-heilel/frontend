import { Button } from "@/shared/components/ui/button";
import {
  DialogContent,
  Dialog,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  btnTitle: string;
}
export default function AuthModal({
  isOpen,
  onClose,
  title,
  description,
  btnTitle,
}: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Button onClick={onClose}>{btnTitle}</Button>
      </DialogContent>
    </Dialog>
  );
}
