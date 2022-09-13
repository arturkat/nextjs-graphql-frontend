import React, { ReactNode } from "react";
import { NextSeo } from "next-seo";
import MyContainer from "@/components/MyContainer";
import MyFooter from "@/components/MyFooter";

const Layout = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}): JSX.Element => {
  return (
    <main style={{ marginTop: "5rem" }}>
      <MyContainer>
        <NextSeo
          title={title}
          description={description}
          openGraph={{ title, description }}
        />
        {children}
      </MyContainer>
    </main>
  );
};

export default Layout;
