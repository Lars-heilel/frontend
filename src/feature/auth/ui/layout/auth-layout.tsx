import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
