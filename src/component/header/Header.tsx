import "./Header.scss";

type PropsType = {
  title: string;
};

const Header = ({ title = "Hello, world" }: PropsType) => {
  return <h1 className="title_style">{title}</h1>;
};

export default Header;
