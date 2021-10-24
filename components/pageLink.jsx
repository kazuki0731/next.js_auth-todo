import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const PageLink = (props) => {
  return (
    <NextLink href={props.href} as={props.url}>
      <Link 
        color="whiteAlpha.800"
        fontWeight="semibold"
        {...props}
        onClick={() => document.activeElement.blur()}
      />
    </NextLink>
  );
};

export default PageLink;
