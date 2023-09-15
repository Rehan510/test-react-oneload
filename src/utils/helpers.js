import { get } from 'lodash';
export const statusCode = {
  0: false,
  1: true
};

export const getPercentage = (total, obtain) => {
  const per = obtain / total;
  let roundOff = 100 - (per * 100);

  return roundOff.toFixed(2) + ' % OFF';
};


export const rounded = (value, valueDecimalPlaces, minimumFractionDigits = 0) => {
  const options = {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: valueDecimalPlaces,
  };

  // Use the en-US locale for formatting (comma as a grouping separator)
  const formattedValue = value.toLocaleString('en-US', options);

  return formattedValue;

}



export const getProductPrice = (data) => {
  let price = null;
  if (data) {
    price = get(data, 'discountedPrice', 0) > 0 ? data.discountedPrice : data.productPrice;
  }

  return price
};

export const getProductFinalPrice = (data) => {
  let price = null;
  if (data) {
    price = get(data, 'discountedPrice', 0) > 0 ? data.discountedPrice : data.productPrice;
  }

  return price
};












// Example usage:
const value = 12345.6789;
const valueDecimalPlaces = 2;
const formattedValue = rounded(value, valueDecimalPlaces);
console.log(formattedValue); // Output: "12,345.68"
