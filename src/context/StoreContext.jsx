import React, {
  createContext,
  useContext,
  useState
} from "react";

import initialProducts from "../data/products";

const StoreContext = createContext();

const defaultCategories = [
  "Rose Bouquets",
  "Tulips",
  "Mixed Flowers",
  "Lilies",
  "Other Flowers"
];

export const defaultSettings = {
  storeName: "Roselle",
  description: "Flowers for every beautiful moment.",
  email: "roselle@example.com",
  phone: "9876543210",
  address: "Kerala, India",
  adminName: "Roselle Admin",
  adminEmail: "admin@roselle.com",
  adminImage: "",
  currency: "INR",
  notifications: true,
  orderAlerts: true,
  customerAlerts: false
};

const normalizeCategory = (category) => {
  if (typeof category === "string") return category;

  if (category && typeof category === "object") {
    return category.name || "";
  }

  return "";
};

const uniqueCategories = (categories) => {
  return [
    ...new Map(
      categories
        .map(normalizeCategory)
        .filter(Boolean)
        .map(category => [
          category.toLowerCase(),
          category
        ])
    ).values()
  ];
};

export function StoreProvider({ children }) {

  // Shared Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("roselleProducts");
      const data = saved ? JSON.parse(saved) : initialProducts;

      return data.map(product => ({
        ...product,
        category: normalizeCategory(product.category)
      }));
    } catch {
      return initialProducts;
    }
  });


  // Shared Categories
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("roselleCategories");

      const productCategories = products.map(
        product => normalizeCategory(product.category)
      );

      const allCategories = saved !== null
        ? [...JSON.parse(saved), ...productCategories]
        : [...defaultCategories, ...productCategories];

      return uniqueCategories(allCategories);
    } catch {
      return uniqueCategories([
        ...defaultCategories,
        ...products.map(product => product.category)
      ]);
    }
  });


  // Shared Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("roselleSettings");

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });


  // Update Products
  const updateProducts = (updatedProducts) => {
    const normalizedProducts = updatedProducts.map(product => ({
      ...product,
      category: normalizeCategory(product.category)
    }));

    setProducts(normalizedProducts);

    localStorage.setItem(
      "roselleProducts",
      JSON.stringify(normalizedProducts)
    );
  };


  // Update Categories
  const updateCategories = (updatedCategories) => {
    const normalizedCategories = uniqueCategories(updatedCategories);

    setCategories(normalizedCategories);

    localStorage.setItem(
      "roselleCategories",
      JSON.stringify(normalizedCategories)
    );
  };


  // Update Settings
  const updateSettings = (updatedSettings) => {
    setSettings(updatedSettings);

    localStorage.setItem(
      "roselleSettings",
      JSON.stringify(updatedSettings)
    );
  };


  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        settings,
        updateProducts,
        updateCategories,
        updateSettings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}


// Custom Hook
export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}