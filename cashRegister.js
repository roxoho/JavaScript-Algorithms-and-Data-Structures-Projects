function checkCashRegister(price, cash, cid) {
  const currencyUnit = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  let due = cash - price;
  let change = [];
  let tcid = 0;

  for (let i = 0; i < cid.length; i++) {
    tcid += cid[i][1];
  }
  tcid = parseFloat(tcid.toFixed(2));

  if (tcid < due) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (tcid === due) {
    return { status: "CLOSED", change: cid };
  } else {
    for (let i = currencyUnit.length - 1; i >= 0; i--) {
      const cname = currencyUnit[i][0];
      const cvalue = currencyUnit[i][1];
      const availableCurrency = cid[i][1];
      let currencyCount = Math.floor(availableCurrency / cvalue) * cvalue;
      
      while (due >= cvalue && currencyCount > 0) {
        due = parseFloat((due - cvalue).toFixed(2));
        currencyCount = parseFloat((currencyCount - cvalue).toFixed(2));
        if (change.length === 0 || change[change.length - 1][0] !== cname) {
          change.push([cname, cvalue]);
        } else {
          change[change.length - 1][1] += cvalue;
        }
      }
    }

    if (due === 0) {
      if (parseFloat(change.reduce((acc, val) => acc + val[1], 0).toFixed(2)) === tcid) {
        return { status: "CLOSED", change: cid };
      } else {
        return { status: "OPEN", change };
      }
    } else {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  }
}


/*
Question: Cash Register

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/
