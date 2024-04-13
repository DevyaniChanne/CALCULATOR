const inputs = document.querySelectorAll("input, select");
const errorIcons = document.querySelectorAll(".bi-exclamation-circle");
const ageGroup = document.querySelector("#age-group");
const overallIncome = document.querySelector("#overall-income");
const resultDiv = document.querySelector("#result");
const closeButton = document.querySelector(".close");
const taxText = document.querySelector("#tax-text");
const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");
const submitButton = document.querySelector('.submit');
const resultBox = document.getElementById('result');
const inputChecker = (input, errorIcon, errorText) => {
    if (input.value.length === 0) {
        errorIcon.style.display = "flex";
        errorText.innerText = "Please enter numbers only";
    } else if (isNaN(input.value) && input !== ageGroup) {
        errorIcon.style.display = "flex";
        errorText.innerText = "Please enter numbers only";
    } else if (Number(input.value) < 0) {
        errorIcon.style.display = "flex";
        errorText.innerText = "Please enter non-negative numbers only";
    } else {
        errorIcon.style.display = "none";
    }
};

const submitChecker = () => {
    let checkedInputs = Array.from(inputs).filter((inp) =>
        inp === ageGroup ? inp.value.length > 0 : inp.value.length > 0 && !isNaN(inp.value) && inp.value >= 0
    );

    return checkedInputs.length === inputs.length;
};

const taxCalculator = () => {
    const grossIncome = Number(document.querySelector("#gross-income").value);
    const extraIncome = Number(document.querySelector("#extra-income").value);
    const deductions = Number(document.querySelector("#total-deductions").value);

    const incomeAfterDeductions = grossIncome + extraIncome - deductions;

    let tax = 0;

    if (incomeAfterDeductions > 800000) {
        if (ageGroup.value === "lessthan40") {
            tax = 0.3 * (incomeAfterDeductions - 800000);
        } else if (ageGroup.value === "between40and60") {
            tax = 0.4 * (incomeAfterDeductions - 800000);
        } else {
            tax = 0.1 * (incomeAfterDeductions - 800000);
        }
    }

    overallIncome.innerText = "₹ " + (incomeAfterDeductions - tax);
    taxText.innerText = tax === 0 ? "no tax applicable" : "tax amount: ₹ " + tax.toFixed(2);
};

submitButton.addEventListener("click", () => {
    let hasErrors = false;
    inputs.forEach((input, index) => {
        if (input.value.length === 0 || (isNaN(input.value) && input.type !== "select-one")) {
            hasErrors = true;
        }
    });

    inputs.forEach((input, index) => {
        if (hasErrors) {
            errorIcons[index].style.display = "flex";
            errorIcons[index].setAttribute("title", "Please enter numbers only");
        } else {
            errorIcons[index].style.display = "none";
            errorIcons[index].setAttribute("title", "");
        }
    });

    if (!hasErrors && submitChecker()) {
        taxCalculator();
        resultDiv.style.display = "flex";
        inputs.forEach((input) => (input.value = ""));
    } else {
        resultDiv.style.display = "none";
    }
    resultBox.classList.toggle('result-box');
});

closeButton.addEventListener("click", () => {
    resultDiv.style.display = "none";
});

inputs.forEach((input, index) => {
    input.addEventListener("change", () => {
        inputChecker(input, errorIcons[index]);
    });
});

inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        inputChecker(input, errorIcons[index]);
    });
});

incrementButton.addEventListener("click", () => {
    if (ageGroup.selectedIndex < ageGroup.options.length - 1) {
        ageGroup.selectedIndex++;
    }
});

decrementButton.addEventListener("click", () => {
    if (ageGroup.selectedIndex > 0) {
        ageGroup.selectedIndex--;
    }
});
