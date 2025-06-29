import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
interface AuthApiErrorProps {
  onClose?: () => void;
  title: string;
  description: string;
  btnTitle: string;
}
export default function AuthApiError({
  onClose,
  title,
  description,
  btnTitle,
}: AuthApiErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {onClose && <Button onClick={onClose}>{btnTitle}</Button>}
    </Alert>
  );
}
