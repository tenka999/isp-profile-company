import { Skeleton } from "primereact/skeleton";
import { useState } from "react";
import { MenuProvider } from "../context/MenuProvider";
import AppMenuitem from "./AppMenuitem";

const AppMenu = () => {
  const model = [
    {
      label: "Beranda",
      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/app" }],
    },
    {
      label: "Admin Features",
      items: [
        {
          label: "Datas",
          icon: "pi pi-fw pi-database",
          items: [
            {
              label: "Users",
              icon: "pi pi-fw pi-users",
              to: "/app/users",
            },
            {
              label: "Artikel",
              items: [
                {
                  label: "Artikel",
                  icon: "pi pi-fw pi-book",
                  to: "/app/artikel",
                },
              ],
            },
            {
              label: "Kontak",
              items: [
                {
                  label: "Kontak",
                  icon: "pi pi-fw pi-envelope",
                  to: "/app/contact",
                },
              ],
            },
            {
              label: "Coverage Area",
              items: [
                {
                  label: "Coverage Area",
                  icon: "pi pi-fw pi-chart-bar",
                  to: "/app/coverageArea",
                },
              ],
            },
            {
              label: "Pertanyaan",
              items: [
                {
                  label: "Pertanyaan",
                  icon: "pi pi-fw pi-question",
                  to: "/app/faq",
                },
                {
                  label: "Reorder",
                  icon: "pi pi-fw pi-question",
                  to: "/app/faq/reorder",
                },
              ],
            },
            {
              label: "Galeri",
              items: [
                {
                  label: "Galeri",
                  icon: "pi pi-fw pi-image",
                  to: "/app/galeri",
                },
              ],
            },
            {
              label: "Layanan",
              items: [
                {
                  label: "Layanan",
                  icon: "pi pi-fw pi-image",
                  to: "/app/layanan",
                },
              ],
            },
            {
              label: "Langganan",
              items: [
                {
                  label: "Langganan",
                  icon: "pi pi-fw pi-image",
                  to: "/app/langganan",
                },
              ],
            },
            {
              label: "Customer Service",
              items: [
                {
                  label: "CS Message",
                  icon: "pi pi-fw pi-image",
                  to: "/app/cs-message",
                },
                {
                  label: "CS Ticket",
                  icon: "pi pi-fw pi-image",
                  to: "/app/cs-ticket",
                },
              ],
            },
            {
              label: "Ulasan",
              items: [
                {
                  label: "Ulasan",
                  icon: "pi pi-fw pi-image",
                  to: "/app/ulasan",
                },
              ],
            },
          ],
        },
        {
          label: "Menu",
          icon: "pi pi-fw pi-bars",
          to: "/app/uikit/menu",
          preventExact: true,
        },
        {
          label: "Message",
          icon: "pi pi-fw pi-comment",
          to: "/app/uikit/message",
        },
        {
          label: "File",
          icon: "pi pi-fw pi-file",
          to: "/app/uikit/file",
        },
        {
          label: "Chart",
          icon: "pi pi-fw pi-chart-bar",
          to: "/app/uikit/charts",
        },
        {
          label: "Misc",
          icon: "pi pi-fw pi-circle",
          to: "/app/uikit/misc",
        },
      ],
    },
    {
      label: "Main Features",
      items: [
        {
          label: "Free Blocks",
          icon: "pi pi-fw pi-eye",
          to: "/app/blocks",
          badge: "NEW",
        },
        {
          label: "All Blocks",
          icon: "pi pi-fw pi-globe",
          url: "https://blocks.primereact.org",
          target: "_blank",
        },
      ],
    },
    {
      label: "Utilities",
      items: [
        {
          label: "PrimeIcons",
          icon: "pi pi-fw pi-prime",
          to: "/app/utilities/icons",
        },
        {
          label: "PrimeFlex",
          icon: "pi pi-fw pi-desktop",
          url: "https://primeflex.org/",
          target: "_blank",
        },
      ],
    },
    {
      label: "Pages",
      icon: "pi pi-fw pi-briefcase",
      to: "/pages",
      items: [
        {
          label: "Landing",
          icon: "pi pi-fw pi-globe",
          to: "/landing",
        },
        {
          label: "Auth",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Login",
              icon: "pi pi-fw pi-sign-in",
              to: "/auth/login",
            },
            {
              label: "Error",
              icon: "pi pi-fw pi-times-circle",
              to: "/auth/error",
            },
            {
              label: "Access Denied",
              icon: "pi pi-fw pi-lock",
              to: "/auth/access",
            },
          ],
        },
        {
          label: "Crud",
          icon: "pi pi-fw pi-pencil",
          to: "/app/pages/crud",
        },
        {
          label: "Timeline",
          icon: "pi pi-fw pi-calendar",
          to: "/app/pages/timeline",
        },
        {
          label: "Not Found",
          icon: "pi pi-fw pi-exclamation-circle",
          to: "/pages/notfound",
        },
        {
          label: "Empty",
          icon: "pi pi-fw pi-circle-off",
          to: "/app/pages/empty",
        },
      ],
    },
    {
      label: "Hierarchy",
      items: [
        {
          label: "Submenu 1",
          icon: "pi pi-fw pi-bookmark",
          items: [
            {
              label: "Submenu 1.1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
              ],
            },
            {
              label: "Submenu 1.2",
              icon: "pi pi-fw pi-bookmark",
              items: [{ label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" }],
            },
          ],
        },
        {
          label: "Submenu 2",
          icon: "pi pi-fw pi-bookmark",
          items: [
            {
              label: "Submenu 2.1",
              icon: "pi pi-fw pi-bookmark",
              items: [
                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
              ],
            },
            {
              label: "Submenu 2.2",
              icon: "pi pi-fw pi-bookmark",
              items: [{ label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" }],
            },
          ],
        },
      ],
    },
    {
      label: "Get Started",
      items: [
        {
          label: "Documentation",
          icon: "pi pi-fw pi-question",
          to: "/app/documentation",
        },
        {
          label: "Figma",
          url: "https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0",
          icon: "pi pi-fw pi-pencil",
          target: "_blank",
        },
        {
          label: "View Source",
          icon: "pi pi-fw pi-search",
          url: "https://github.com/primefaces/sakai-react",
          target: "_blank",
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {/* {isLoading && <AppItemSkeleton length={12} />} */}
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

const AppItemSkeleton = ({ length }) => {
  const [skeletonItems] = useState(new Array(length).fill(0));
  return (
    <>
      {skeletonItems.map((_, i) => (
        <li key={i} className="layout-menu mb-2">
          <div className="layout-menuitem-root-text">
            <div className="flex gap-2 align-items-center">
              <Skeleton shape="circle" size="2rem" className="col-1"></Skeleton>
              <Skeleton className="col-8" width="80%" height="1.5rem" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default AppMenu;
