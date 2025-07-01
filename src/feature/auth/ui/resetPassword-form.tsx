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
import useResetPassword from "../hooks/useResetPassword";
import { AuthApiError } from "./authApiError";
import { BtnLoader } from "./btn-loader";
import { Link } from "react-router";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit, serverError, existingToken, isLoading } =
    useResetPassword();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {existingToken ? (
        <Card>
          <CardHeader>
            {serverError ? (
              <AuthApiError
                title="Произошла ошибка при сбросе пароля "
                description={serverError}
              ></AuthApiError>
            ) : (
              <CardTitle>Придумайте пароль</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Подтвердите пароль</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  size={"lg"}
                  className="w-full mt-4"
                  type="submit"
                  disabled={isLoading === true}
                >
                  {isLoading ? <BtnLoader></BtnLoader> : "Сохранить пароль"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span>Уже есть аккаунт?</span>
            <Link className="text-primary hover:underline" to={"/login"}>
              {"Вернуться к авторизации"}
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">
              Ошибка восстановления пароля
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibol text-red-500">
                  Токен не обнаружен
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Ссылка для восстановления пароля недействительна. Пожалуйста,
                  запросите новую ссылку.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-2">
                <Link to="/forgot-password">Запросить новую ссылку</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              className="text-sm text-primary hover:underline transition-colors"
              to="/login"
            >
              Вернуться к авторизации
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
