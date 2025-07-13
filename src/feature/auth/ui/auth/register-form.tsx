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
import { useRegister } from "../../hooks/useRegister";
import { AuthApiError } from "./elements/authApiError";
import { AuthModal } from "./elements/authModal";
import { Link } from "react-router";
import { BtnLoader } from "./elements/btn-loader";
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit, serverError, openModal, setOpenModal, navigate, isLoading } =
    useRegister();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {serverError ? (
            <AuthApiError
              title='Registration error occurred'
              description={serverError}
            ></AuthApiError>
          ) : (
            <CardTitle>Register</CardTitle>
          )}
        </CardHeader>
        <AuthModal
          isOpen={openModal}
          title='Registration successful!'
          description='Check your email to confirm your account.'
          btnTitle='OK'
          onClose={() => {
            navigate(FRONTEND_PATHS.LOGIN);
            setOpenModal(false);
          }}
        ></AuthModal>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Your name' {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='******' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder='******' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size={"lg"}
                className='mt-4 w-full'
                type='submit'
                disabled={isLoading === true}
              >
                {isLoading ? <BtnLoader></BtnLoader> : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <span>Already have an account?</span>
          <Link className='text-primary hover:underline' to={FRONTEND_PATHS.LOGIN}>
            {"Sign in"}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
