const express = require("express");
const fs = require("fs");
const app = express();

const cors = require("cors");
app.use(cors());

const data = JSON.parse(fs.readFileSync("taiwan_postal_api_data.json", "utf8"));

app.get("/zip5json.py", (req, res) => {
  const adrs = req.query.adrs || "";

  const match = data.find(item =>
    adrs.includes(item.city) &&
    adrs.includes(item.area) &&
    adrs.includes(item.address.split(/[0-9]/)[0])
  );

  if (!match) {
    return res.json({
      adrs,
      new_adrs: adrs,
      new_adrs2: adrs,
      zipcode: "",
      dataver: "DAN-v1",
      new_adrs6: adrs,
      new_adrs6_2: adrs,
      zipcode6: "",
      dataver6: "DAN-v1"
    });
  }

  res.json({
    adrs,
    new_adrs: `${match.zipcode} ${match.city}${match.area}${match.village}${match.address}`,
    new_adrs2: `${match.zipcode} ${adrs}`,
    zipcode: match.zipcode,
    dataver: "DAN-v1",
    new_adrs6: `${match.zipcode6} ${match.city}${match.area}${match.village}${match.address}`,
    new_adrs6_2: `${match.zipcode6} ${adrs}`,
    zipcode6: match.zipcode6,
    dataver6: "DAN-v1"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Taiwan ZIP API running on port", port);
});
