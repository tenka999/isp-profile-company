"use client";

import { ReactLenis, useLenis } from "@studio-freight/lenis";
import usePathname from "next/navigation";
import { useEffect } from "react";

function LenisWrapper({ children }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return (
    <ReactLenis root options={{ duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}

export default LenisWrapper;
