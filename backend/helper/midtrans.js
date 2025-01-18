const midtransClient = require("midtrans-client");
const { v4: uuidv4 } = require("uuid");

let midtransHelper = {};

midtransHelper.userPayment = async (grossAmount, itemName) => {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-t3TjUBc5iafgvc64xgpbmxhn",
    clientKey: "SB-Mid-client-A07tSm37vaN2THEw",
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const order_id = `INV-${year}${month}${day}-${uuidv4()}`;

  const parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: grossAmount,
      item: itemName,
    },
    credit_card: {
      secure: true,
    },
  };

  try {
    const response = await snap.createTransaction(parameter);
    console.log("Response from Midtrans:", response);

    return {
      order_id: order_id,
      token: response,
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

module.exports = midtransHelper;
