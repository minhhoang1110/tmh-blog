import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import Bounded from "../Bounded";
import Heading from "../Heading";
import HorizontalDivider from "../HorizontalDivider";
import { Setting } from "@/types";
import React from "react";

interface Props {
  withSignUpForm: boolean;
  settings: Setting;
}
interface SignUpFormProps {
  settings: Setting;
}
const SignUpForm: React.FC<SignUpFormProps> = ({ settings }) => {
  return (
    <div className="px-4">
      <form
        action="/api/sign-up"
        method="post"
        className="grid w-full max-w-xl grid-cols-1 gap-6"
      >
        {prismicH.isFilled.richText(settings.data.newsletterDisclaimer) && (
          <div className="font-serif text-center tracking-tight text-slate-500">
            <PrismicRichText
              field={settings.data.newsletterDescription}
              components={{
                heading1: ({ children }) => (
                  <Heading as="h2" className="mb-4 last:mb-0">
                    {children}
                  </Heading>
                ),
                paragraph: ({ children }) => (
                  <p className="mb-4 italic last:mb-0">{children}</p>
                ),
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-2">
          <div className="relative">
            <label>
              <span className="sr-only">Email address</span>
              <input
                name="email"
                type="email"
                placeholder="jane.doe@example.com"
                required={true}
                className="w-full rounded-none border-b border-slate-200 py-3 pl-3 pr-10 text-slate-800 placeholder-slate-400"
              />
            </label>
            <button
              type="submit"
              className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-3 text-2xl text-slate-400"
            >
              <span className="sr-only">Submit</span>
              <span aria-hidden={true}>&rarr;</span>
            </button>
          </div>
          {prismicH.isFilled.richText(settings.data.newsletterDisclaimer) && (
            <p className="text-center text-xs tracking-tight text-slate-500">
              <PrismicText field={settings.data.newsletterDisclaimer} />
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

const Footer: React.FC<Props> = ({ withSignUpForm = true, settings }) => {
  return (
    <Bounded as="footer">
      <div className="grid grid-cols-1 justify-items-center gap-24">
        <HorizontalDivider />
        {withSignUpForm && <SignUpForm settings={settings} />}
        <div className="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight text-slate-500">
          Copyright © 2023{" "}
          <PrismicLink
            href="https://my-resume-minhhoang1110.vercel.app/"
            target={"_blank"}
            className="text-slate-700"
            aria-label={"TMH"}
          >
            TMH
          </PrismicLink>
        </div>
      </div>
    </Bounded>
  );
};
export default Footer;
