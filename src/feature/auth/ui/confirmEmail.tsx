import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import useConfirmEmail from "../hooks/useConfirmEmail";
import { Button } from "@/shared/components/ui/button";
import { BtnLoader } from "./btn-loader";
import { Link } from "react-router";
import { AuthModal } from "./authModal";
import { CheckCircle2, AlertTriangle, RotateCw } from "lucide-react";

export function ConfirmEmail({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    onSubmit,
    isLoading,
    serverError,
    existingToken,
    openModal,
    setOpenModal,
    navigate,
    isTokenInvalid,
  } = useConfirmEmail();

  return (
    <div
      className={cn("flex flex-col gap-6 max-w-md mx-auto", className)}
      {...props}
    >
      <AuthModal
        isOpen={openModal}
        title="Email подтверждён!"
        description="Теперь вы можете войти в свой аккаунт"
        btnTitle="Войти"
        onClose={() => {
          navigate("/login");
          setOpenModal(false);
        }}
      />

      {existingToken && !isTokenInvalid ? (
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Подтвердите ваш email</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="text-center">
            {serverError && (
              <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg">
                <p className="font-medium">{serverError}</p>
              </div>
            )}

            <p className="mb-6 text-muted-foreground">
              Нажмите кнопку ниже для завершения регистрации
            </p>

            <Button
              onClick={onSubmit}
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <BtnLoader /> : "Подтвердить email"}
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center pt-0">
            <Button asChild variant="link" className="text-muted-foreground">
              <Link to="/resend-confirmation">
                <RotateCw className="mr-2 h-4 w-4" />
                Отправить новую ссылку
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border-destructive/30 bg-destructive/10">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
              <CardTitle className="text-destructive">
                {isTokenInvalid
                  ? "Недействительный токен"
                  : "Токен не обнаружен"}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-muted-foreground">
                {isTokenInvalid
                  ? "Ссылка для подтверждения email недействительна или устарела."
                  : "Ссылка для активации недействительна. Пожалуйста, запросите новую ссылку."}
              </p>

              <Button asChild className="mt-2 w-full" variant="destructive">
                <Link to="/resend-confirmation">Запросить новую ссылку</Link>
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center mt-4">
            <Link to="/login" className="text-sm text-primary hover:underline">
              Вернуться на страницу входа
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
