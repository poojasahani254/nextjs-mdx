import Link from "next/link";

const Nav = () => {
  return (
    <nav className={"nav p-3  border-bottom"}>
      <Link href={"/"} passHref>
        <h2 className={"pointer"}>MDX DEMO</h2>
      </Link>
    </nav>
  );
};

export default Nav;
