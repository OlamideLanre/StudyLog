import React, { createContext, useContext, useState } from "react";
// Define the type for the context value
type SelectedCategoryType = {
  selectedCategory: number;
  setSelectedCategory: (selectedCategory: number) => {};
};
// Create the context with a default value
const CategoryContext = createContext<SelectedCategoryType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = (): SelectedCategoryType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

//resources context provider
export type ResourceData = {
  id: number;
  title: string;
  link: string;
  notes: string;
};

type ResourceType = {
  id: number;
  title: string;
  link: string;
  notes: string;
  selectedResource: ResourceData[];
  setResources: (selectedResource: ResourceData[]) => {};
};
// Create the context with a default value
const ResourcesContext = createContext<ResourceType | undefined>(undefined);

export const ResourceProvider = ({ children }) => {
  const [selectedResource, setResources] = useState<[]>();
  return (
    <ResourcesContext.Provider value={{ selectedResource, setResources }}>
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResourcesContext = (): ResourceType => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error("useResourcesContext must be used within an AppProvider");
  }
  return context;
};
