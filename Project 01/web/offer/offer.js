let name = document.getElementById("name");
let surname = document.getElementById("surname");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let title = document.getElementById("title");
let message = document.getElementById("message");
let form = document.querySelector('form');
form.addEventListener('submit', function(event){
    event.preventDefault();

    let nameValue = name.value;
    if(nameValue === "" || !nameValue.match(/^[a-zA-Zа-яА-ЯёЁ]+$/)){
        alert("The name can only contain letters.")
        return;
    }

    let surnameValue = surname.value;
    if(surnameValue === "" || !nameValue.match(/^[a-zA-Zа-яА-ЯёЁ]+$/)){
        alert("The surname can only contain letters.");
        return;
    }

    let phoneValue = phone.value;
    if (phoneValue === "" || !phoneValue.match(/^[0-9]+$/)){
        alert("The phone number can only contain digits.");
        return;
    }

    let emailValue = email.value;
    if (emailValue === "" || !emailValue.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu)$/)) {
        alert("Please enter a valid email address.");
        return;
    }

    let titleValue = title.value;
    if (titleValue === "") {
        alert("Title cannot be empty.");
        return;
    }

    let messageValue = message.value;
    if (messageValue === "") {
        alert("Message cannot be empty.");
        return;
    }

    let entryNewData = {
        name: nameValue,
        surname: surnameValue,
        phone: phoneValue,
        email: emailValue,
        title: titleValue,
        message: messageValue
    }

    let entriesNewArray = JSON.parse(localStorage.getItem('entriesNewArray')) || [];
    entriesNewArray.push(entryNewData);

    localStorage.setItem('entriesNewArray', JSON.stringify(entriesNewArray));
    alert("Your data has been successfully submitted!");
    console.log(entriesNewArray);
})