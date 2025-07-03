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
import { Link } from "react-router";
import { AuthApiError } from "./authApiError";
import { AuthModal } from "./authModal";
import { BtnLoader } from "./btn-loader";
import useResendConfirmation from "../hooks/useResendConfirmationEmail";
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";

export function ResendConfirmationEmailForm({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit, serverError, openModal, setOpenModal, navigate, isLoading } =
    useResendConfirmation();

  return (
    <div className={cn("mx-auto flex max-w-md flex-col gap-6", className)} {...props}>
      <Card className='border-primary/20 shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='flex items-center justify-center gap-2'>
            <span>Resend confirmation</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <AuthModal
            isOpen={openModal}
            title='Email sent!'
            description='Check your email to confirm'
            btnTitle='OK'
            onClose={() => {
              navigate(FRONTEND_PATHS.LOGIN);
              setOpenModal(false);
            }}
          />

          {serverError && (
            <div className='mb-4'>
              <AuthApiError title='Sending error' description={serverError} />
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='example@mail.com'
                        type='email'
                        autoComplete='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} size='lg' className='w-full' type='submit'>
                {isLoading ? <BtnLoader /> : "Send email"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className='flex flex-col gap-3 pt-0'>
          <Link to={FRONTEND_PATHS.LOGIN} className='text-primary text-sm hover:underline'>
            Back to sign in
          </Link>
          <p className='text-muted-foreground mt-2 text-center text-sm'>
            Didn't receive the email? Check your spam folder or request a new one
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
