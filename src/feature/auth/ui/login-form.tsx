import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
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
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit, serverError, isLoading } = useLogin();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {serverError ? (
            <AuthApiError
              title='Login error occurred'
              description={serverError}
            ></AuthApiError>
          ) : (
            <CardTitle>Sign in to your account</CardTitle>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='example@mail.com' type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {"Password"}
                      <Link
                        className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                        to={FRONTEND_PATHS.FORGOT_PASSWORD}
                      >
                        {"Forgot password?"}
                      </Link>
                    </FormLabel>

                    <FormControl>
                      <Input placeholder='******' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading === true} size={"lg"} className='w-full' type='submit'>
                {isLoading ? <BtnLoader></BtnLoader> : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <span>Need an account?</span>
          <Link className='hover:underline' to={FRONTEND_PATHS.REGISTER}>
            {"Register"}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
