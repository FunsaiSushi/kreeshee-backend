// supply.middleware.js

export const setProduceType = function (next) {
  try {
    if (!this.produceType) {
      // Logic to set the produceType based on the produceName
      // For simplicity, let's assume a direct mapping from produceName to produceType
      const produceNameToTypeMap = {
        Tomato: "Vegetable",
        Apple: "Fruit",
        // Add more mappings as needed
      };

      const produceType = produceNameToTypeMap[this.produceName] || "Others"; // Default to 'Others' if not mapped
      this.produceType = produceType;
    }
    next();
  } catch (error) {
    next(error);
  }
};
