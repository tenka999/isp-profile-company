import "@/styles/landing.css";
import { Outlet } from "react-router";
import ScrollToTopLenis from "@/presentation/views/scrollTop";

export default function LandingLayout() {
  return (
    <div className="landing-root">
      <ScrollToTopLenis />
      <Outlet />
    </div>
  );
}
