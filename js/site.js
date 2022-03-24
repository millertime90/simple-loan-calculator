function displayAllFigures() {

    let results = document.querySelector("#results"); 
    let monthlyPayments = document.querySelector(".monthlyPayments>h1"); 
    let totalInterest = document.querySelector("#totalInterest"); 

    results.innerHTML = ""; 

    monthlyPayments.innerHTML = `$${getMonthlyPayment().toFixed(2)}`; 
    getTotalPrincipal(); 
    totalInterest.innerHTML = `$${getTotalInterest().reduce((a, b) => a + b, 0).toFixed(2)}`; 
    getTotalCost(); 
    getSchedule(); 

}

function getMonthlyPayment() {

    let loanAmt = parseInt(document.querySelector("#loanAmt").value); 
    let monthlyInterestRate = (parseInt(document.querySelector("#intRate").value) / 100) / 12; 
    let term = parseInt(document.querySelector("#term").value); 
    
    let nominator = loanAmt * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)); 
    let denominator = Math.pow(1 + monthlyInterestRate, term) - 1; 

    return nominator / denominator; 

} 

function getTotalPrincipal() {

    let loanAmt = document.querySelector("#loanAmt"); 
    let totalPrincipal = document.querySelector("#totalPrincipal"); 
    totalPrincipal.innerHTML = `$${parseInt(loanAmt.value).toFixed(2)}`; 

} 

function getTotalInterest() {

    let loanAmt = parseInt(document.querySelector("#loanAmt").value); 
    let term = parseInt(document.querySelector("#term").value); 
    let monthly_intRate = (parseInt(document.querySelector("#intRate").value) / 100) / 12; 
    let interestPayments = []; 

    for(let i = 0; i < term; i++) {

        interestPayments.push(monthly_intRate * loanAmt); 
        loanAmt -= getMonthlyPayment() - (monthly_intRate * loanAmt); 

    } 

    return interestPayments; 

} 

function getTotalCost() {

    let loanAmt = parseInt(document.querySelector("#loanAmt").value); 
    let totalCost = document.querySelector("#totalCost"); 

    totalCost.innerHTML = `$${loanAmt + Number(getTotalInterest().reduce((a, b) => a + b, 0).toFixed(2))}`; 

} 

function getSchedule() {

    let getMonthFigures = (month, payment, principal, interest, totalPrincipalPaid, totalInterestPaid, balance) => {

        let tr = document.createElement("TR"); 
        tr.setAttribute("class", "text-center"); 
        tr.innerHTML = 
        `<td>${month}</td>
        <td>${payment}</td>
        <td>${principal}</td>
        <td>${interest}</td>
        <td>${totalPrincipalPaid}</td>
        <td>${totalInterestPaid}</td>
        <td>${balance}</td>`; 

        return tr; 

    }; 

    let term = parseInt(document.querySelector("#term").value); 
    let balance = parseInt(document.querySelector("#loanAmt").value); 
    let month = 1; 
    let payment = getMonthlyPayment(); 
    let intArray = getTotalInterest(); 

    let principalArray = (() => {

        let arr = []; 
        for(let i = 0; i < intArray.length; i++) {

            arr.push(payment - intArray[i]); 

        } 

        return arr; 

    })(); 

    let totalPrincipalPaid = (() => {

        let arr = new Array(...principalArray); 
        let arr1 = []; 
        let arr2 = []; 

        for(let i = 0; i < arr.length; i++) {

            arr1.push(arr[i]); 
            arr2.push([...arr1].reduce((a, b) => a + b, 0)); 

        } 

        return arr2; 

    })(); 

    let totalInterestPaid = (() => {

        let arr = new Array(...intArray); 
        let arr1 = []; 
        let arr2 = []; 

        for(let i = 0; i < arr.length; i++) {

            arr1.push(arr[i]); 
            arr2.push([...arr1].reduce((a, b) => a + b, 0)); 

        } 

        return arr2; 

    })(); 

    let results = document.querySelector("#results"); 

    for(let i = 0; i < term; i++) { 

        balance -= getMonthlyPayment() - intArray[i]; 
        results.append(getMonthFigures(month++, getMonthlyPayment().toFixed(2), principalArray[i].toFixed(2), intArray[i].toFixed(2), totalPrincipalPaid[i].toFixed(2), totalInterestPaid[i].toFixed(2), balance.toFixed(2))); 

    } 

} 