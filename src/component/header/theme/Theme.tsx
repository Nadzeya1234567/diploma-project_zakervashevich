import React, { useEffect, useState } from "react";
import { ReactComponent as ThemeIcon } from "../../../assets/theme.svg";
import Storage from "../../../helpers/Storage";

const Theme: React.FC = () => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const storageTheme = Storage.get<string | undefined>("theme", undefined);
    if (storageTheme) {
      document.body.dataset.theme = storageTheme;
      setTheme(storageTheme);
    }
  }, []);

  const handleClick = () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme !== "dark" ? "dark" : "";
    document.body.dataset.theme = newTheme;
    Storage.set("theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <div className="header-theme">
      <ThemeIcon onClick={handleClick} />
    </div>
  );
};

export default Theme;
