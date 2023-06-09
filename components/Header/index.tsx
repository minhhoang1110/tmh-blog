import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicT from "@prismicio/types";
import Bounded from "../Bounded";
import Heading from "../Heading";
import HorizontalDivider from "../HorizontalDivider";
import { FeatureImage, Navigation, Setting } from "@/types";
import React, { ReactNode } from "react";
interface Props {
  withDivider: boolean;
  withProfile: boolean;
  navigation: Navigation;
  settings: Setting;
}
interface ProfileProps {
  name?: prismicT.RichTextField | null;
  description?: prismicT.RichTextField | null;
  profilePicture?: FeatureImage;
}
interface NavItemProps {
  children: ReactNode;
}
const Profile: React.FC<ProfileProps> = ({
  name,
  description,
  profilePicture,
}) => {
  return (
    <div className="px-4">
      <div className="grid max-w-lg grid-cols-1 justify-items-center gap-8">
        <PrismicLink
          href="/"
          tabIndex={-1}
          aria-label={prismicH.asText(name) || ""}
        >
          <div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
            {prismicH.isFilled.image(profilePicture) && (
              <PrismicNextImage
                field={profilePicture}
                fill={true}
                className="object-cover"
                priority={true}
                width={150}
                height={150}
                alt=""
              />
            )}
          </div>
        </PrismicLink>
        {(prismicH.isFilled.richText(name) ||
          prismicH.isFilled.richText(description)) && (
          <div className="grid grid-cols-1 gap-2 text-center">
            {prismicH.isFilled.richText(name) && (
              <Heading>
                <PrismicLink href="/" aria-label={prismicH.asText(name) || ""}>
                  <PrismicText field={name} />
                </PrismicLink>
              </Heading>
            )}
            {prismicH.isFilled.richText(description) && (
              <p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500">
                <PrismicText field={description} />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800">{children}</li>
  );
};

const Header: React.FC<Props> = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
}) => {
  return (
    <Bounded
      as="header"
      className="fixed top-0 left-0 z-1000 w-full border-b-1 border-solid border-gray-200 bg-white py-3 shadow-sm md:py-4 lg:py-5"
    >
      <div className="grid grid-cols-1 justify-items-center gap-0 md:gap-3 lg:gap-16">
        <nav>
          <ul className="flex flex-wrap justify-center gap-10">
            <NavItem>
              <PrismicLink
                href="/"
                aria-label={prismicH.asText(settings.data.name) || ""}
              >
                <PrismicText field={navigation.data.homepageLabel} />
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink
                  field={item.link}
                  aria-label={prismicH.asText(item.label) || ""}
                >
                  <PrismicText field={item.label} />
                </PrismicLink>
              </NavItem>
            ))}
          </ul>
        </nav>
        {withProfile && (
          <Profile
            name={settings.data.name}
            description={settings.data.description}
            profilePicture={settings.data.profilePicture}
          />
        )}
        {withDivider && <HorizontalDivider />}
      </div>
    </Bounded>
  );
};
export default Header;
