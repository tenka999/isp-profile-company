// layouts/RootWithRouter.jsx
import { RouterProvider } from "react-router/dom";
import routes from "../routes";
import ScrollToTop from "@/presentation/views/ScrollToTop";

export default function RootWithRouter() {
  return (
    <>
      <ScrollToTop />
      <RouterProvider router={routes} />
    </>
  );
}
