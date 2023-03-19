const factory = require("./handlerFactory");

const Item = require("../models/ItemModel");
const { validateForm } = require("../lib");

const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const { loginId, transactionKey } = require("./config");
//Authorize net
const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;
const SDKConstants = require("authorizenet").Constants;

exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);
exports.getAllItems = factory.getAll(Item);

exports.getCategoryItems = async (req, res, next) => {
  try {
    const items = await Item.find({ refOfCategory: req.params.id }).populate([
      { path: "Item" },
    ]);
    res.status(200).json({
      status: "success",
      result: items.length,
      data: items,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.PayPayment = async (req, res, next) => {
  const validationErrors = validateForm(req);

  if (validationErrors.length > 0) {
    res.json({ errors: "Enter correct" });
    return;
  }
  const { cc, cvv, expire, amount } = req.body;
  const merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(loginId);
  merchantAuthenticationType.setTransactionKey(transactionKey);

  const creditCard = new ApiContracts.CreditCardType();
  creditCard.setCardNumber(cc);
  creditCard.setExpirationDate(expire);
  creditCard.setCardCode(cvv);

  const paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  const transactionSetting = new ApiContracts.SettingType();
  transactionSetting.setSettingName("recurringBilling");
  transactionSetting.setSettingValue("false");

  const transactionSettingList = [];
  transactionSettingList.push(transactionSetting);

  const transactionSettings = new ApiContracts.ArrayOfSetting();
  transactionSettings.setSetting(transactionSettingList);

  const transactionRequestType = new ApiContracts.TransactionRequestType();

  transactionRequestType.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );

  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(amount);
  transactionRequestType.setTransactionSettings(transactionSettings);

  const createRequest = new ApiContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);

  console.log(createRequest.getJSON());
  const ctrl = new ApiControllers.CreateTransactionController(
    createRequest.getJSON()
  );
  console.log("===============================");
  ctrl._endpoint = "https://api.authorize.net/xml/v1/request.api";
  console.log(ctrl);
  ctrl.execute(() => {
    const apiResponse = ctrl.getResponse();
    const response = new ApiContracts.CreateTransactionResponse(apiResponse);

    if (response !== null) {
      if (
        response.getMessages().getResultCode() ===
        ApiContracts.MessageTypeEnum.OK
      ) {
        if (response.getTransactionResponse().getMessages() !== null) {
          res.status(200).json({
            status: "Transaction was successful.",
          });
        } else {
          if (response.getTransactionResponse().getErrors() !== null) {
            let code = response
              ?.getTransactionResponse()
              ?.getErrors()
              ?.getError()[0]
              ?.getErrorCode();
            let text = response
              .getTransactionResponse()
              ?.getErrors()
              ?.getError()[0]
              ?.getErrorText();
            res.json({
              error: `${code}: ${text}`,
            });
          } else {
            res.json({ error: "Transaction failed." });
          }
        }
      } else {
        if (
          response.getTransactionResponse() !== null &&
          response.getTransactionResponse().getErrors() !== null
        ) {
          let code = response
            ?.getTransactionResponse()
            ?.getErrors()
            ?.getError()[0]
            ?.getErrorCode();
          let text = response
            ?.getTransactionResponse()
            ?.getErrors()
            ?.getError()[0]
            ?.getErrorText();
          res.status(404).json({
            status: "Failed",
            error: `${code}: ${text}`,
          });
          // res.json({

          // });
        } else {
          let code = response.getMessages().getMessage()[0].getCode();
          let text = response.getMessages().getMessage()[0].getText();
          res.status(404).json({
            status: "Failed",
            error: `${code}: ${text}`,
          });
        }
      }
    } else {
      res.json({ error: "No response." });
    }
  });
};
