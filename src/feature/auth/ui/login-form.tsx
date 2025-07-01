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
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router";
import { AuthApiError } from "./authApiError";
import { BtnLoader } from "./btn-loader";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit, serverError, isLoading } = useLogin();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {serverError ? (
            <AuthApiError
              title="Произошла ошибка при авторизации"
              description={serverError}
            ></AuthApiError>
          ) : (
            <CardTitle>Войти в ваш аккунт</CardTitle>
          )}
        </CardHeader>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {"Password"}
                      <Link
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        to="/forgot-password"
                      >
                        {"Забыли пароль?"}
                      </Link>
                    </FormLabel>

                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading === true}
                size={"lg"}
                className="w-full"
                type="submit"
              >
                {isLoading ? <BtnLoader></BtnLoader> : " Авторизоваться"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>Нужен аккаунт?</span>
          <Link className="hover:underline" to={"/register"}>
            {"Регистрация"}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
