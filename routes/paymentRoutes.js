const express = require('express')
const router = express.Router();
const isAuth = require('../config/jwt').isAuth;
const crypto = require('crypto');
const checksum_lib = require('../paytm/checksum');
const merchant_id = require('../config/keys').MERCHANT_ID;
const merchant_key = require('../config/keys').MERCHANT_KEY;



router.post('/',isAuth,(req,res) => {
    let params = {};
    let order_id = crypto.randomBytes(16).toString("hex");
    (params["MID"] = merchant_id),
  (params["WEBSITE"] = "WEBSTAGING"),
  (params["CHANNEL_ID"] = "WEB"),
  ((params["ORDER_ID"] = order_id.toString()),
    (params["CUST_ID"] = req.body.user._id.toString()),
    (params["INDUSTRY_TYPE_ID"] = "Retail"),
    (params["TXN_AMOUNT"] = req.body.txn_amount.toString()),
    params["EMAIL"] = req.body.user.email.toString());

    checksum_lib.genchecksum(params,merchant_key,(err,checksum) => {
        const txn_url = "https://securegw-stage.paytm.in/order/process";
        let form_fields = "";
        for (x in params) {
            form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' />";
          }
          form_fields += "<input type='hidden' name='CHECKSUMHASH' value=" + checksum + " />";
          var html =
            "<html><body><center><h1>Please Do Not Refresh The Page</h1></center><form method='POST' action='" +
            txn_url +
            "' name='f1'>" +
            form_fields +
            "</form><script type='text/javascript'>document.f1.submit()</script></body></html>";
            res.writeHead(200, {
                "Content-Type": "text/html",
              });
              res.write(html);
              res.end();
    });
});


module.exports = router;