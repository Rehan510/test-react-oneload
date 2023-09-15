import { get } from 'lodash';
export const UserKyc = (data) => {
  const htmlContent = `<!DOCTYPE html>
      <html>
      <head>
        <title>Transaction Details</title> 
        <style>
          table {
            width:100%;
            border:1px solid;
            border-collapse:collapse;
          }
          table td {
            border:1px solid #121212;
            text-align:left;
            background: #ffffff;
            color: #313030;
            padding: 10px 2px;
          }
          .lable{
           font-size: 18px;
           font-weight: bold
          }
          .data{
           font-size: 18px;
          }
        </style>
      </head>
      <body>
        <table>
            <tr>
            <td  colspan="4" style="text-align: center;">
            <h3>Transaction Details</h3>
            </td>
            </tr>
          <tbody>
            <tr>
              <td >Transaction Date:</td>
              <td class="data">${get(data, 'transactionDate', '')}</td>
            </tr>
            <tr>
              <td >Transaction Time:</td>
              <td class="data">${get(data, 'transactionTime', '')}</td>
            </tr>
            <tr>
              <td >Transaction Ref No:</td>
              <td class="data">${get(data, 'transactionRef', '')}</td>
            </tr>
            <tr>
              <td >Agent ID:</td>
              <td class="data">${get(data, 'agentId', '')}</td>
            </tr>
            <tr>
              <td >Order #:</td>
              <td class="data">${get(data, 'orderId', '')}</td>
            </tr>
            <tr>
              <td >Amount:</td>
              <td class="data">${get(data, 'amountPaid', '')}</td>
            </tr>
            <tr>
              <td >Service:</td>
              <td class="data">${data.service ? data.service : "Telemart"}</td>
            </tr>
         
            <tr>
              <td >Customer Name:</td>
              <td >${get(data, 'customerName', '')}</td>
            </tr>
            <tr>
            <td >Customer Phone #:</td>
            <td >${get(data, 'customerPhoneNumber', '')}</td>
          </tr>
          <tr>
            <td >CNIC:</td>
            <td >${get(data, 'customerCNIC', '')}</td>
          </tr>
            <tr>
           </tr>
          </tbody>
        </table>
      </body>
      </html>`;

    //   <tr>
    //   <td >Service Charges:</td>
    //   <td class="data">${data.serviceCharges ? data.serviceCharges : "0.00"}</td>
    // </tr>

  return htmlContent;
};
