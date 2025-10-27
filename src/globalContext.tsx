import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Define the type for the context value
type SelectedCategoryType = {
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
};
// Create the context with a default value
const CategoryContext = createContext<SelectedCategoryType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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
  category_id: number;
};

type ResourceType = {
  // id: number;
  // title: string;
  // link: string;
  // notes: string;
  selectedResource: ResourceData[];
  setResources: React.Dispatch<React.SetStateAction<ResourceData[]>>;
};
// Create the context with a default value
const ResourcesContext = createContext<ResourceType | undefined>(undefined);

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedResource, setResources] = useState<ResourceData[]>([]);
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
