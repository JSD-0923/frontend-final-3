import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { RootLayout } from "../layouts/RootLayout";
import { Listing } from "../pages/Listing/Listing";
import { NotFound } from "../pages/NotFound/NotFound";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { MyCartPage } from "../pages/MyCartPage/MyCartPage";
import { CheckOutPage } from "../pages/CheckOutPage/CheckOutPage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import  AuthGuard ,  {LoginGuard } from "../pages/AuthGuard/AuthGuard";
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route
          path="/listing"
          element={
            <Listing />
          }
        ></Route>
        <Route
          path="/product/:id"
          element={
            <AuthGuard>
              <ProductPage />
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/cartpage"
          element={
            <AuthGuard>
              <MyCartPage />
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/checkoutpage"
          element={
            <AuthGuard>
              <CheckOutPage />
            </AuthGuard>
          }
        ></Route>
        <Route
          path="*"
          element={
              <NotFound />
          }
        ></Route>
      </Route>
      <Route path="/login" element={<LoginGuard><LogInPage /></LoginGuard>}></Route>
    </>
  )
)