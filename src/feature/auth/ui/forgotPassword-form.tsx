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
import useForgotPassword from "../hooks/useForgotPassword";
import { Link } from "react-router";
import { AuthApiError } from "./authApiError";
import { AuthModal } from "./authModal";
import { BtnLoader } from "./btn-loader";
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit, serverError, openModal, setOpenModal, navigate, isLoading } =
    useForgotPassword();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {serverError ? (
            <AuthApiError
              title='Password reset error'
              description={serverError}
            ></AuthApiError>
          ) : (
            <CardTitle>Reset password</CardTitle>
          )}
        </CardHeader>
        <AuthModal
          isOpen={openModal}
          title='Request sent!'
          description='Check your email to reset your password.'
          btnTitle='OK'
          onClose={() => {
            navigate(FRONTEND_PATHS.LOGIN);
            setOpenModal(false);
          }}
        ></AuthModal>
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
              <Button disabled={isLoading} size={"lg"} className='w-full' type='submit'>
                {isLoading ? <BtnLoader></BtnLoader> : "Reset password"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <nav>
            <Link className='hover:underline' to={FRONTEND_PATHS.LOGIN}>
              {"Back to sign in"}
            </Link>
          </nav>
        </CardFooter>
      </Card>
    </div>
  );
}
