// supply.middleware.js

export const setProduceType = function (next) {
  try {
    if (!this.produceType) {
      const produceNameToTypeMap = {
        Tomato: "Vegetable",
        Apple: "Fruit",
      };

      const produceType = produceNameToTypeMap[this.produceName] || "Others";
      this.produceType = produceType;
    }
    next();
  } catch (error) {
    next(error);
  }
};
