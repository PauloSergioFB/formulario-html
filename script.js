const inputs = document.querySelectorAll("input")
inputs.forEach(input => input.addEventListener("blur", event => validInput(event.target)))

function validInput(input) {
    const inputField = input.parentElement
    const inputName = input.name

    const inputValidators = validators[inputName]
    if (inputValidators) {

        for (const inputValidator of inputValidators) {
            const errorMessage = inputValidator(input)
    
            if (errorMessage) {
                inputField.classList.add("input-error")
                inputField.querySelector(".error-message").innerText = errorMessage
                return
            }
        }
        
    }

    inputField.classList.remove("input-error")
    inputField.querySelector(".error-message").innerText = ""
}

const validators = {
    fullName: [requiredValidator],
    rg: [requiredValidator, onlyDigits],
    cpf: [requiredValidator, onlyDigits],
    birthDate: [requiredValidator, validBirthDate],
    password: [requiredValidator],
    confirmPassword: [requiredValidator, passwordMatch],
}

function requiredValidator(input) {
    if (input.value == "") {
        return "Este campo é obrigatório."
    }
}

function onlyDigits(input) {
    if (! (/^\d+$/.test(input.value)) ) {
        return "Este campo só aceita caracteres numéricos."
    }
}

function validBirthDate(input) {
    const inputDate = new Date(input.value)

    const todayDate = new Date();
    const minLimitDate = new Date().setFullYear(todayDate.getFullYear() - 120)

    if (inputDate < minLimitDate) {
        return "A data inserida é inválida. Você é muito velho."
    }

    if (inputDate >= todayDate) {
        return "A data inserida é inválida. Você ainda não nasceu."
    }
}

function passwordMatch(input) {
    const passwordInput = document.getElementById("password")
    console.log(passwordInput.value)

    if (! (passwordInput.value == input.value) ) {
        return "A confirmação de senha deve ser igual a senha."
    }
}
