import { createBrowserRouter } from "react-router";
// import Layout from '@/layouts/Layout'
import LandingPage from "@/presentation/views/LandingComponent/Landing";
import React from "react";
import withLenis from "@/presentation/views/withLenis";
import authMiddleware, {
  redirectMiddleware,
} from "./middleware/AuthMiddleware";
import { ProgressBarIndicator } from "./middleware/ProgressBarIndicator";
import UserCrudPage from "./presentation/views/app/users/UserCrudPage";
const routesConfig = {
  future: {
    unstable_middleware: true,
  },
};
import { useLocation } from "react-router";

//#region Pages
//#region Login
const Login = withLenis(React.lazy(() => import("@/presentation/views/Login")));
//#endregion Login
//#region Register
const Register = React.lazy(() => import("@/presentation/views/Registrasi"));
const AboutUs = withLenis(
  React.lazy(() => import("@/presentation/views/AboutUsPage")),
);
const CoverageAreaPage = withLenis(
  React.lazy(() => import("@/presentation/views/CoverageAreaPage")),
);
const PricingPage = withLenis(
  React.lazy(() => import("@/presentation/views/PricingPage")),
);
const ArticlePage = withLenis(
  React.lazy(() => import("@/presentation/views/ArticleListPage")),
);
const GaleriPage = withLenis(
  React.lazy(() => import("@/presentation/views/GalleryPage")),
);
const ArticleDetail = withLenis(
  React.lazy(() => import("@/presentation/views/ArticleDetail")),
);
//#endregion Register
//#region Layout
const Layout = React.lazy(() => import("@/layouts/Layout"));
const LandingLayout = React.lazy(() => import("@/layouts/LandingLayout"));
//#endregion Layout
//#region Dashboard
const Dashboard = React.lazy(
  () => import("@/presentation/views/app/Dashboard"),
);
//#endregion Dashboard
//#region UI Kits
const FormLayout = React.lazy(
  () => import("@/presentation/views/app/ui-kits/FormLayout"),
);
const Datatable = React.lazy(
  () => import("@/presentation/views/app/ui-kits/Datatable"),
);
//#endregion UI Kits
//#region Not Found
const NotFound = React.lazy(() => import("@/presentation/views/NotFound"));
//#endregion Not Found
//#region Book
const ListBooks = React.lazy(
  () => import("@/presentation/views/books/ListBook"),
);
const DetailBook = React.lazy(
  () => import("@/presentation/views/books/DetailBook"),
);
const DataBooks = React.lazy(
  () => import("@/presentation/views/app/books/DataBooks"),
);
const ListBook = React.lazy(
  () => import("@/presentation/views/app/books/ListBook"),
);
const CreateBook = React.lazy(
  () => import("@/presentation/views/app/books/CreateBook"),
);
const EditBook = React.lazy(
  () => import("@/presentation/views/app/books/EditBook"),
);
//#endregion Book
//#region Detail Book
const DataDetailBook = React.lazy(
  () => import("@/presentation/views/app/detailBook/DataDetailBook"),
);
//#endregion Detail Book
//#region User
const DataUser = React.lazy(
  () => import("@/presentation/views/app/users/DataUser"),
);
//#endregion User
//#region Profile
const DataProfile = React.lazy(
  () => import("@/presentation/views/app/profile/DataProfile"),
);
//#endregion Profile
//#region Category
const DataCategory = React.lazy(
  () => import("@/presentation/views/app/category/DataCategory"),
);
//#endregion Category
//#region Genre
const DataGenre = React.lazy(
  () => import("@/presentation/views/app/genre/DataGenre"),
);
//#endregion Genre
//#region Borrowing
const DataBorrowing = React.lazy(
  () => import("@/presentation/views/app/borrowing/DataBorrowings"),
);
//#endregion Borrowing
//#region Review
const DataReview = React.lazy(
  () => import("@/presentation/views/app/review/DataReview"),
);
//#endregion Review
//#region Profile
const ProfileUser = React.lazy(
  () => import("@/presentation/views/app/profile/ProfileUser"),
);
//#endregion Profile

const Landing = React.lazy(
  () => import("@/presentation/views/LandingComponent/Landing"),
);
const ArtikelCrudPage = React.lazy(
  () => import("@/presentation/views/app/artikel/ArtikelCrudPage"),
);

const ContactCrudPage = React.lazy(
  () => import("@/presentation/views/app/contact/ContactCrudPage"),
);

const CoverageAreaCrudPage = React.lazy(
  () => import("@/presentation/views/app/coverageArea/CoverageAreaCrudPage"),
);

const FaqCrudPage = React.lazy(
  () => import("@/presentation/views/app/faq/FaqCrudPage"),
);
const ReorderPage = React.lazy(
  () => import("@/presentation/views/app/faq/ReorderPage"),
);

const GaleriCrudPage = React.lazy(
  () => import("@/presentation/views/app/galeri/GaleriCrudPage"),
);

const LayananCrudPage = React.lazy(
  () => import("@/presentation/views/app/layanan/LayananCrudPage"),
);

const LanggananCrudPage = React.lazy(
  () => import("@/presentation/views/app/langganan/LanggananCrudPage"),
);

const ProfilPerusahaanCrudPage = React.lazy(
  () =>
    import("@/presentation/views/app/profilePerusahaan/ProfilPerusahaanCrudPage"),
);
const BannerCrudPage = React.lazy(
  () => import("@/presentation/views/app/banner/BannerCrudPage"),
);

const UlasanCrudPage = React.lazy(
  () => import("@/presentation/views/app/ulasan/UlasanCrudPage"),
);
const CSMessage = React.lazy(
  () =>
    import("@/presentation/views/app/customerService/CustomerServiceMessageCrudPage"),
);

const CSTicket = React.lazy(
  () =>
    import("@/presentation/views/app/customerService/CustomerServiceTicketCrudPage"),
);

const NotifCrudPage = React.lazy(
  () => import("@/presentation/views/app/notif/NotifCrudPage"),
);

//#endregion Pages
const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingLayout />,
      children: [{ index: true, element: <Landing /> }],
    },
    {
      path: "/login",
      element: <LandingLayout />,
      children: [{ index: true, element: <Login /> }],
      loader: redirectMiddleware,
    },
    {
      path: "/register",
      Component: Register,
      loader: redirectMiddleware,
    },
    {
      path: "/about",
      Component: AboutUs,
    },
    {
      path: "/coverage-area",
      Component: CoverageAreaPage,
    },
    {
      path: "/pricing",
      Component: PricingPage,
    },
    {
      path: "/article",
      Component: ArticlePage,
    },
    {
      path: "/gallery",
      Component: GaleriPage,
    },
    {
      path: "/article/:slug",
      Component: ArticleDetail,
    },
    //#region App
    {
      path: "/app",
      Component: Layout,
      loader: authMiddleware,
      unstable_middleware: [ProgressBarIndicator],
      children: [
        {
          index: true,
          Component: Dashboard,
        },
        {
          path: "/app/uikit",
          children: [
            {
              path: "formlayout",
              Component: FormLayout,
            },
            {
              path: "datatable",
              Component: Datatable,
            },
          ],
        },
        {
          path: "/app/admin/",
          children: [
            {
              path: "books",
              Component: DataBooks,
            },
          ],
        },
        {
          path: "/app/books",
          Component: DataBooks,
        },
        {
          path: "/app/books/create",
          Component: CreateBook,
        },
        {
          path: "/app/books/list",
          Component: ListBook,
        },
        {
          path: "/app/books/edit/:id",
          Component: EditBook,
        },
        {
          path: "/app/users",
          Component: UserCrudPage,
        },
        {
          path: "/app/users/create",
          Component: UserCrudPage,
        },
        {
          path: "/app/profiles",
          Component: DataProfile,
        },
        {
          path: "/app/borrows",
          Component: DataBorrowing,
        },
        {
          path: "/app/categories",
          Component: DataCategory,
        },
        {
          path: "/app/genres",
          Component: DataGenre,
        },
        {
          path: "/app/detailbook/:id",
          Component: DataDetailBook,
        },
        {
          path: "/app/reviews",
          Component: DataReview,
        },
        {
          path: "/app/profile",
          Component: ProfileUser,
        },
        {
          path: "/app/artikel",
          Component: ArtikelCrudPage,
        },
        {
          path: "/app/contact",
          Component: ContactCrudPage,
        },
        {
          path: "/app/coverageArea",
          Component: CoverageAreaCrudPage,
        },
        {
          path: "/app/faq",
          Component: FaqCrudPage,
        },
        {
          path: "/app/galeri",
          Component: GaleriCrudPage,
        },
        {
          path: "/app/layanan",
          Component: LayananCrudPage,
        },
        {
          path: "/app/langganan",
          Component: LanggananCrudPage,
        },
        {
          path: "/app/ulasan",
          Component: UlasanCrudPage,
        },
        {
          path: "/app/notif",
          Component: NotifCrudPage,
        },
        {
          path: "/app/cs-message",
          Component: CSMessage,
        },
        {
          path: "/app/cs-ticket",
          Component: CSTicket,
        },
        {
          path: "/app/faq/reorder",
          Component: ReorderPage,
        },
      ],
    },
    //#endregion App
    //#region Books
    {
      path: "/books",
      Component: ListBooks,
    },
    {
      path: "/books/:id",
      Component: DetailBook,
    },

    //#endregion Books
    //#region Not Found
    {
      path: "*",
      Component: NotFound,
    },
  ],
  routesConfig,
);

export default routes;
