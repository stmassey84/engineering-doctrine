import React, { createContext, useContext, useState } from "react";
import { SectionMeta } from "./sections/types";
import { sectionsMetaData } from "./sections";

export type SectionsInView = { name: string; inView: boolean }[];

export type tAppContext = {
  sectionsInView: SectionsInView;
  toggleSectionInView: (name: string, inView: boolean) => void;
};

export interface iAppProviderProps {
  children?: JSX.Element | JSX.Element[] | string | string[];
}

const useLoadApp = (): tAppContext => {
  const [sectionsInView, setSectionsInView] = useState<SectionsInView>(
    Object.values(sectionsMetaData).map((section: SectionMeta) => ({
      name: section.name,
      inView: false,
    }))
  );

  const toggleSectionInView = React.useCallback(
    (name: string, inView: boolean) => {
      const newMap: SectionsInView = sectionsInView.map((section) => {
        if (section.name === name) {
          section.inView = inView;
        }
        return section;
      });
      setSectionsInView(newMap);
    },
    []
  );

  return { sectionsInView, toggleSectionInView };
};

const AppContext = createContext<tAppContext>({
  sectionsInView: [],
  toggleSectionInView: (name: string, inView: boolean) => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }: iAppProviderProps) => {
  const app = useLoadApp();
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};
