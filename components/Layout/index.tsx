import Header from "../Header";
import Footer from "../Footer";
import React, { ReactNode } from "react";
import { Navigation, Setting } from "@/types";
import ScrollToTop from "../ScrollToTop";

interface Props {
  navigation: Navigation;
  settings: Setting;
  withHeaderDivider?: boolean;
  withProfile?: boolean;
  withSignUpForm?: boolean;
  children: ReactNode;
}
const Layout: React.FC<Props> = ({
  navigation,
  settings,
  withHeaderDivider = false,
  withProfile = false,
  withSignUpForm = false,
  children,
}) => {
  return (
    <div className="text-slate-700">
      <Header
        withProfile={withProfile}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
      />
      <main
        className={
          withProfile ? "mt-88 md:mt-80 lg:mt-96" : "mt-8 md:mt-10 lg:mt-12"
        }
      >
        {children}
      </main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
      <ScrollToTop />
    </div>
  );
};
export default Layout;
