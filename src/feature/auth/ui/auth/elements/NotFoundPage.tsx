import { Link } from "react-router";
import { Button } from "../../../../../shared/components/ui/button";
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";

export function NotFoundPage() {
  return (
    <div className='bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <h1 className='text-primary text-9xl font-bold'>404</h1>
      <h2 className='mt-4 mb-6 text-4xl font-semibold'>Page not found</h2>
      <p className='mb-8 max-w-md text-lg'>
        Sorry, but the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link to={FRONTEND_PATHS.LOGIN}>
        <Button size='lg' className='px-8 py-4 text-lg'>
          Return to home.
        </Button>
      </Link>
    </div>
  );
}
