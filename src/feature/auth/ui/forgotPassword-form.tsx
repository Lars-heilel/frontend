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
import useForgotPassword from "../hooks/useForgotPassword";
import { Link } from "react-router";
import { AuthApiError } from "./authApiError";
import { AuthModal } from "./authModal";
import { BtnLoader } from "./btn-loader";

export function ForgotPasswordForm({
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
  } = useForgotPassword();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {serverError ? (
            <AuthApiError
              title="Ошибка при изменении пароля"
              description={serverError}
            ></AuthApiError>
          ) : (
            <CardTitle>Сбросить пароль</CardTitle>
          )}
        </CardHeader>
        <AuthModal
          isOpen={openModal}
          title="Запрос отправлен!"
          description="Проверьте почту для изменения пароля."
          btnTitle="Ок"
          onClose={() => {
            navigate("/login");
            setOpenModal(false);
          }}
        ></AuthModal>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@mail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                size={"lg"}
                className="w-full"
                type="submit"
              >
                {isLoading ? <BtnLoader></BtnLoader> : "Сбросить пароль "}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <nav>
            <Link className="hover:underline" to={"/login"}>
              {"Вернуться к авторизации"}
            </Link>
          </nav>
        </CardFooter>
      </Card>
    </div>
  );
}
