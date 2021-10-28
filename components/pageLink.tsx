import React, { VFC } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

// interface Props {
//   href:
//     | {
//         pathname: string;
//         query: {
//           todo: string | string[];
//         };
//       }
//     | string;
//   url?: string;
//   mr?: number;
//   children: React.ReactNode;
// }

// const PageLink: VFC<Props> = (props) => {
  
const PageLink = (props) => {
  const clickLink = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <NextLink href={props.href} as={props.url}>
      <Link
        color="whiteAlpha.800"
        fontWeight="semibold"
        {...props}
        onClick={clickLink}
      />
    </NextLink>
  );
};

export default PageLink;
