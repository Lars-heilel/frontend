import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import useConfirmEmail from "../hooks/useConfirmEmail";
import { Button } from "@/shared/components/ui/button";
import { BtnLoader } from "./btn-loader";
import { Link } from "react-router";
import { AuthModal } from "./authModal";
import { CheckCircle2, AlertTriangle, RotateCw } from "lucide-react";
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";

export function ConfirmEmail({ className, ...props }: React.ComponentProps<"div">) {
  const {
    onSubmit,
    isLoading,
    serverError,
    existingToken,
    openModal,
    setOpenModal,
    navigate,
    isTokenInvalid,
  } = useConfirmEmail();

  return (
    <div className={cn("mx-auto flex max-w-md flex-col gap-6", className)} {...props}>
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
        <Card className='border-none shadow-lg'>
          <CardHeader className='text-center'>
            <div className='flex flex-col items-center'>
              <CheckCircle2 className='text-primary mb-4 h-12 w-12' />
              <CardTitle>Confirm your email</CardTitle>
            </div>
          </CardHeader>

          <CardContent className='text-center'>
            {serverError && (
              <div className='bg-destructive/10 text-destructive mb-4 rounded-lg p-3'>
                <p className='font-medium'>{serverError}</p>
              </div>
            )}

            <p className='text-muted-foreground mb-6'>
              Click the button below to complete registration
            </p>

            <Button onClick={onSubmit} size='lg' className='w-full' disabled={isLoading}>
              {isLoading ? <BtnLoader /> : "Confirm email"}
            </Button>
          </CardContent>

          <CardFooter className='flex justify-center pt-0'>
            <Button asChild variant='link' className='text-muted-foreground'>
              <Link to={FRONTEND_PATHS.RESEND_CONFIRMATION}>
                <RotateCw className='mr-2 h-4 w-4' />
                Send new link
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className='border-destructive/30 bg-destructive/10'>
          <CardHeader className='text-center'>
            <div className='flex flex-col items-center'>
              <AlertTriangle className='text-destructive mb-4 h-12 w-12' />
              <CardTitle className='text-destructive'>
                {isTokenInvalid ? "Invalid token" : "Token not found"}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className='text-center'>
            <div className='flex flex-col items-center space-y-4'>
              <p className='text-muted-foreground'>
                {isTokenInvalid
                  ? "The email confirmation link is invalid or expired."
                  : "The activation link is invalid. Please request a new one."}
              </p>

              <Button asChild className='mt-2 w-full' variant='destructive'>
                <Link to={FRONTEND_PATHS.RESEND_CONFIRMATION}>Request new link</Link>
              </Button>
            </div>
          </CardContent>

          <CardFooter className='mt-4 flex justify-center'>
            <Link to={FRONTEND_PATHS.LOGIN} className='text-primary text-sm hover:underline'>
              Back to sign in page
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
