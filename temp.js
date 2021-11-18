const FormData = require("form-data");
var formdata = new FormData();
try {
  formdata.append("supplierName", "shivansh");
  formdata.append("branchData", { name: "shivansh", age: 23 });

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("http://localhost:5000/supplier", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
} catch (err) {
  console.log(err);
}
