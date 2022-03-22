// CONTROLLER/VIEW FUNCTION(s) 

function displaySchedule() {

    let monthlyPayments = document.querySelector(".monthlyPayments>h1"); 
    let totalPrincipal = document.querySelector("#totalPrincipal"); 

    // LOGIC/VIEW FUNCTION RETURNED 

    return () => { 

        // let interest = getInterestPayment(monthlyInterestRate, currentWholePrincipal); 
        // let principal = getPrincipalPayment(getInterestPayment); 

        // RENDER HTML HERE WITH A LOOP 

        let getMonthFigures = function(currentMonth, monthlyPayment, getPrincipalPayment, gip, totalPrincipalPaid, totalInterestPaid, balance) {

            let tr = document.createElement("TR"); 
            tr.setAttribute("class", "text-center"); 
            tr.innerHTML = 
            `<td>${currentMonth}</td>
            <td>${monthlyPayment.toFixed(2)}</td>
            <td>${getPrincipalPayment(getInterestPayment).toFixed(2)}</td>
            <td>${gip.toFixed(2)}</td>
            <td>${totalPrincipalPaid}</td>
            <td>${totalInterestPaid}</td>
            <td>${balance.toFixed(2)}</td>`; 

            return tr; 

        }; 

        let getInterestPayment = function(monthlyInterestRate, currentWholePrincipal) { 
            
            return monthlyInterestRate * currentWholePrincipal; 
        
        }

        let getPrincipalPayment = getInterestPayment => {

            let currentMonthInterest = getInterestPayment(monthlyInterestRate, currentWholePrincipal); 
            return MONTHLY_PAYMENT - currentMonthInterest; 
    
        }; 

        let intRate = Number.parseInt(document.querySelector("#intRate").value); 
        let currentWholePrincipal = Number.parseInt(document.querySelector("#loanAmt").value);              // decrements per monthly payment 
        let term = Number.parseInt(document.querySelector("#term").value); 
        let monthlyInterestRate = (intRate / 100) / 12; 

        const MONTHLY_PAYMENT = getMonthlyPayment(currentWholePrincipal, monthlyInterestRate, term); 

        let results = document.querySelector("#results"); 
        let monthlyPayment = getMonthlyPayment(currentWholePrincipal, monthlyInterestRate, term); 
        let currentMonth = 1; 

        monthlyPayments.innerHTML = "$" + MONTHLY_PAYMENT.toFixed(2); 
        totalPrincipal.innerHTML = "$" + currentWholePrincipal.toFixed(2); 

        for(let i = 0; i < term; i++) { 

            let currentMonthInterest = getInterestPayment(monthlyInterestRate, currentWholePrincipal); 
            let interestArg = getInterestPayment(monthlyInterestRate, currentWholePrincipal); 
            currentWholePrincipal -= MONTHLY_PAYMENT - currentMonthInterest; 
            results.append(getMonthFigures(currentMonth++, MONTHLY_PAYMENT, getPrincipalPayment, interestArg, "This needs a function", "This needs a function", currentWholePrincipal)); 

        }

    }; 

} 

// LOGIC FUNCTION(s) 

function getMonthlyPayment(loanAmt, monthlyInterestRate, term) {

    let nominator = loanAmt * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)); 
    let denominator = Math.pow(1 + monthlyInterestRate, term) - 1; 

    return nominator / denominator; 

} 

const DISPLAY_SCHEDULE_EXEC = displaySchedule(); 