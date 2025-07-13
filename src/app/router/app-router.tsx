import { AuthLayout, LoginForm, NotFoundPage } from "@/feature/auth/ui";
import { Route, Routes, Navigate } from "react-router";
import { privateRoutes, publicRoutes } from ".";
import { useAuthStore } from "@/feature/auth/model/store/authStore";

export function AppRouter() {
  const isAuth = useAuthStore().isAuth;

  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        {publicRoutes.map((route) => (
          <Route element={<route.component />} path={route.path} />
        ))}
      </Route>

      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          element={isAuth ? <route.component /> : <Navigate to='/login' replace />}
        />
      ))}

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
