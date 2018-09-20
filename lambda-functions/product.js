exports.handler = async (event, context) => {
  const donationAmount = event.queryStringParameters.donationAmount || "160";
  const productId = event.queryStringParameters.productId || "";

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({id: productId, price: donationAmount, url: "https://www.tinysociety.co/.netlify/functions/product?donationAmount=" + donationAmount + "&productId=" + productId})
  };
};