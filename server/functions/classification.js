const moment = require("moment");

exports.byDate =  function (a,b){
    var dateA = new Date(a.createdAt)
    var dateB = new Date(b.createdAt)
    if(dateA < dateB) return 1;
    else if(dateA > dateB) return -1;
    return 0
}

exports.byTotalAmount =  function (a,b){
    if(a.totalAmount > b.totalAmount) return -1;
    else if(b.totalAmount > a.totalAmount) return 1;
    return 0 
}