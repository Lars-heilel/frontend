import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { Link } from "react-router";
import { AuthApiError } from "./authApiError";
import { AuthModal } from "./authModal";
import { BtnLoader } from "./btn-loader";
import useResendConfirmation from "../hooks/useResendConfirmationEmail";

export function ResendConfirmationEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    form,
    onSubmit,
    serverError,
    openModal,
    setOpenModal,
    navigate,
    isLoading,
  } = useResendConfirmation();

  return (
    <div
      className={cn("flex flex-col gap-6 max-w-md mx-auto", className)}
      {...props}
    >
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <span>Повторная отправка подтверждения</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <AuthModal
            isOpen={openModal}
            title="Письмо отправлено!"
            description="Проверьте вашу почту для подтверждения email"
            btnTitle="Понятно"
            onClose={() => {
              navigate("/login");
              setOpenModal(false);
            }}
          />

          {serverError && (
            <div className="mb-4">
              <AuthApiError title="Ошибка отправки" description={serverError} />
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваш Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@mail.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                size="lg"
                className="w-full"
                type="submit"
              >
                {isLoading ? <BtnLoader /> : "Отправить письмо"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-0">
          <Link to="/login" className="text-sm text-primary hover:underline">
            Вернуться к авторизации
          </Link>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Не получили письмо? Проверьте папку "Спам" или запросите повторную
            отправку
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
