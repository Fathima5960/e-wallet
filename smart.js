function register() {
  uname = reg_uname.value;
  email = reg_email.value;
  pswd = reg_pswd.value;

  console.log(uname, email, pswd);

  userDetails = {
    uname,
    email,
    pswd,
  };

  if (uname in localStorage) {
    alert("Existing User");
  } else {
    localStorage.setItem(uname, JSON.stringify(userDetails));
    alert("User Registered Successfully");
    window.location = "./index.html";
  }
}

function login() {
  uname = login_uname.value;
  pswd = login_pswd.value;

  console.log(uname, pswd);

  if (uname in localStorage) {
    userDetails = JSON.parse(localStorage.getItem(uname));
    if (pswd == userDetails.pswd) {
      alert("Login Successful");
      window.location = "./home.html";
    } else {
      alert("Incorrect Password");
    }
  } else {
    alert("User Does Not Exist");
  }
}

let totalbalance = 0;
function addIncome() {
  type = incometype.value;
  amnt = incomeamnt.value;
  amnt = Math.floor(amnt);
  console.log(type, amnt);
  income = {
    type,
    amnt,
    balance: 0,
  };
  uname = localStorage.key(0);
  if (uname in localStorage) {
    userDetails = JSON.parse(localStorage.getItem(uname));

    if (type == "" || amnt <= 0 || amnt == "") {
      alert("Field cannot be empty");
    } else {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      totalbalance += amnt;

      alert("Amount added successfully");
      resultbalance.innerHTML = `
      Rs${totalbalance}/-`;
      incometableresult.innerHTML += `<tbody>
        <td style=" border-bottom:5px #556B2F solid; height:45px;">${income.type}</td>
        <td style=" border-bottom:5px #556B2F solid; height:45px;">+${income.amnt}</td>
        <td style=" border-bottom:5px #556B2F solid; height:45px;">${totalbalance}</td>
        <td style=" border-bottom:5px #556B2F solid; height:45px;">${formattedDate}</td>
        </tbody>`;

      localStorage.setItem(uname, totalbalance);
    }
  }
}
expense = 0;
function addExpense() {
  type = expensetype.value;
  amnt = expenseamnt.value;
  amnt = Math.floor(amnt);

  if (type == "" || amnt == "" || amnt <= 0) {
    alert("Field cannot be empty");
  } else {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    totalbalance -= amnt;
    expense += amnt;
    alert("Expense added successfully");
    resultbalance.innerHTML = ` Rs${totalbalance}/-`;

    expensedisplay.innerHTML = ` Rs${expense}/-
    `;

    expensetableresult.innerHTML += `<tbody>
      <td style=" border-bottom:5px #556B2F solid; height:45px;">${type}</td>
      <td style=" border-bottom:5px #556B2F solid; height:45px;">-${amnt}</td>
      <td style=" border-bottom:5px #556B2F solid; height:45px;">${totalbalance}</td>
      <td style=" border-bottom:5px #556B2F solid; height:45px;">${formattedDate}</td>
      </tbody>`;

    localStorage.setItem(uname, totalbalance);
  }
}

document.getElementById(
  "profilename"
).innerHTML = `<i class="fa-solid fa-circle-user"></i>Welcome ${localStorage.key(
  0
)}`;

function logout() {
  localStorage.clear();
  window.location = "./index.html";
}

function clearall() {
  confirm("Are you sure you want to clear data?");
  alert("All data cleared");
  incometype.value = "";
  incomeamnt.value = "";

  expensetype.value = "";
  expenseamnt.value = "";

  resultbalance.innerHTML = `Rs 0/-`;
  expensedisplay.innerHTML = `Rs 0/-`;
  incometableresult.innerHTML = "";
  expensetableresult.innerHTML = "";
}
