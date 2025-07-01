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
import { useRegister } from "../hooks/useRegister";
import { AuthApiError } from "./authApiError";
import { AuthModal } from "./authModal";
import { Link } from "react-router";
import { BtnLoader } from "./btn-loader";
export function RegisterForm({
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
  } = useRegister();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {serverError ? (
            <AuthApiError
              title="Произошла ошибка при регистрации"
              description={serverError}
            ></AuthApiError>
          ) : (
            <CardTitle>Регистрация</CardTitle>
          )}
        </CardHeader>
        <AuthModal
          isOpen={openModal}
          title="Регистрация успешна!"
          description="Проверьте почту для подтверждения аккаунта."
          btnTitle="Ок"
          onClose={() => {
            navigate("/login");
            setOpenModal(false);
          }}
        ></AuthModal>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя пользователя</FormLabel>
                    <FormControl>
                      <Input placeholder="Ваше имя" {...field} />
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
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
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
                      <Input placeholder="******" type="password" {...field} />
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
                {isLoading ? <BtnLoader></BtnLoader> : "Зарегистрироваться"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>Уже есть аккаунт?</span>
          <Link className="text-primary hover:underline" to={"/login"}>
            {"Войти"}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
