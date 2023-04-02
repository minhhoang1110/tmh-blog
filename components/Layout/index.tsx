import Header from "../Header";
import Footer from "../Footer";
import React, { ReactNode } from "react";
import { Navigation, Setting } from "@/types";

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
      <main>{children}</main>
      <Footer withSignUpForm={withSignUpForm} settings={settings} />
    </div>
  );
};
export default Layout;
