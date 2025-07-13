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
import useResetPassword from "../../hooks/useResetPassword";
import { AuthApiError } from "../auth/elements/authApiError";
import { BtnLoader } from "../auth/elements/btn-loader";
import { Link } from "react-router";
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";
import { AuthModal } from "../auth/elements/authModal";

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    form,
    onSubmit,
    serverError,
    existingToken,
    isLoading,
    openModal,
    setOpenModal,
    navigate,
    isTokenInvalid,
  } = useResetPassword();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <AuthModal
        isOpen={openModal}
        title='Email confirmed!'
        description='You can now sign in to your account'
        btnTitle='Sign in'
        onClose={() => {
          navigate(FRONTEND_PATHS.LOGIN);
          setOpenModal(false);
        }}
      />

      {existingToken && !isTokenInvalid ? (
        <Card>
          <CardHeader>
            {serverError ? (
              <AuthApiError
                title='Password reset error occurred'
                description={serverError}
              ></AuthApiError>
            ) : (
              <CardTitle>Create a password</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                  {isLoading ? <BtnLoader></BtnLoader> : "Save password"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <span>Already have an account?</span>
            <Link className='text-primary hover:underline' to={FRONTEND_PATHS.LOGIN}>
              {"Back to sign in"}
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-red-600'>Password recovery error</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='space-y-2'>
                <h3 className='font-semibol text-lg text-red-500'>Token not found</h3>
                <p className='text-muted-foreground max-w-sm text-sm'>
                  The password reset link is invalid. Please request a new one.
                </p>
              </div>
              <Button asChild variant='outline' className='mt-2'>
                <Link to={FRONTEND_PATHS.FORGOT_PASSWORD}>Request new link</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <Link
              className='text-primary text-sm transition-colors hover:underline'
              to={FRONTEND_PATHS.LOGIN}
            >
              Back to sign in
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
