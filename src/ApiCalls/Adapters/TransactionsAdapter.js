/**
 * Converts the each object into camal case. temporary use
 * @param {*} transaction
 * @returns
 */
const transactionsAdapter = transactions => {
  return transactions.map(transaction => {
    transaction.oid = transaction.OID;
    transaction.company = transaction.company;
    transaction.job = transaction.job;
    transaction.employee = transaction.employee;
    transaction.transactionType = transaction.transactiontype;
    transaction.transactionDate = transaction.transactiondate;
    transaction.quantity = transaction.quantity;
    transaction.unitOfMeasure = transaction.unitofmeasure;
    transaction.unitTransaction = transaction.unittransaction;
    transaction.totalTransaction = transaction.totaltransaction;
    transaction.startTime = transaction.starttime;
    transaction.endTime = transaction.endtime;
    transaction.reference = transaction.reference;
    transaction.noteOrDescription = transaction.noteordescription;
    transaction.discount = transaction.discount;
    transaction.invoice = transaction.invoice;
    transaction.userTag = transaction.usertag;
    transaction.paymentApplied = transaction.paymentapplied;
    transaction.ignoreInAgeing = transaction.ignoreinageing;

    delete transaction.OID;
    delete transaction.transactiontype;
    delete transaction.transactiondate;
    delete transaction.unitofmeasure;
    delete transaction.unitofmeasure;
    delete transaction.unittransaction;
    delete transaction.totaltransaction;
    delete transaction.starttime;
    delete transaction.endtime;
    delete transaction.noteordescription;
    delete transaction.noteordescription;
    delete transaction.noteordescription;
    delete transaction.usertag;
    delete transaction.ignoreinageing;
    delete transaction.paymentapplied;

    return transaction;
  });
};

export default transactionsAdapter;
