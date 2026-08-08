// ==============================
// Professional Multi-Step Form
// ==============================

const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const steps = document.querySelectorAll(".step");

const form = document.getElementById("quoteForm");
const successMessage = document.getElementById("successMessage");

let currentStep = 0;

// ==============================
// Show Current Step
// ==============================

function showStep(step){

    formSteps.forEach((formStep,index)=>{

        formStep.classList.remove("active");

        if(index===step){

            formStep.classList.add("active");

        }

    });

    steps.forEach((item,index)=>{

        if(index<=step){

            item.classList.add("active");

        }

        else{

            item.classList.remove("active");

        }

    });

    progress.style.width=((step+1)/formSteps.length)*100+"%";

}

// ==============================
// Validation
// ==============================

function validateStep(step){

    let valid=true;

    const fields=formSteps[step].querySelectorAll("input,select,textarea");

    fields.forEach(field=>{

        const error=field.parentElement.querySelector(".error");

        error.textContent="";

        if(field.value.trim()===""){

            error.textContent="This field is required.";

            valid=false;

        }

        if(field.type==="email"){

            const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(field.value.trim()!=="" && !pattern.test(field.value)){

                error.textContent="Enter a valid email address.";

                valid=false;

            }

        }

    });

    return valid;

}

// ==============================
// Review Information
// ==============================

function updateReview(){

    document.getElementById("reviewName").textContent=
    document.getElementById("name").value;

    document.getElementById("reviewEmail").textContent=
    document.getElementById("email").value;

    document.getElementById("reviewPhone").textContent=
    document.getElementById("phone").value;

    document.getElementById("reviewService").textContent=
    document.getElementById("service").value;

    document.getElementById("reviewBudget").textContent=
    document.getElementById("budget").value;

    document.getElementById("reviewDescription").textContent=
    document.getElementById("description").value;

}

// ==============================
// Next Button
// ==============================

nextBtns.forEach(button=>{

    button.addEventListener("click",()=>{

        if(validateStep(currentStep)){

            if(currentStep===1){

                updateReview();

            }

            currentStep++;

            showStep(currentStep);

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    });

});

// ==============================
// Previous Button
// ==============================

prevBtns.forEach(button=>{

    button.addEventListener("click",()=>{

        currentStep--;

        showStep(currentStep);

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

});

// ==============================
// Submit
// ==============================

form.addEventListener("submit",function(e){

    e.preventDefault();

    form.style.display="none";

    successMessage.style.display="block";

    form.reset();

});

// ==============================
// Initialize
// ==============================

showStep(currentStep);