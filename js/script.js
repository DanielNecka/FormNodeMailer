'use strict';

function newLoad() {
  const btn = document.querySelector('.btn');

  const emailInput = document.querySelector('#email');
  const themeInput = document.querySelector('#theme');
  const messageInput = document.querySelector('#message');

  emailHandler();
  themeHandler();
  messageHandler();

  btn.addEventListener('click', () => { 
    check(emailInput, themeInput, messageInput);
  });
};

function emailHandler() {
    const emailInput = document.querySelector('#email');
    const emailLabel = document.querySelector('[for="email"]');
    const inputEmail = document.querySelector('.inputEmail'); 
    const complexEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    emailInput.addEventListener('focusout', () => {

        if (complexEmailRegex.test(emailInput.value)) {
            setValidEmail(emailInput, emailLabel, inputEmail);
        } else {
            setInvalidEmail(emailInput, emailLabel, inputEmail);
        }

    });
}

function setValidEmail(emailInput, emailLabel, inputEmail) {
    emailInput.classList.add('validImput');
    emailLabel.classList.add('validLabel');
    inputEmail.classList.add('validContainer'); 
    emailInput.classList.remove('invalidImput');
    emailLabel.classList.remove('invalidLabel');
    inputEmail.classList.remove('invalidContainer');
}

function setInvalidEmail(emailInput, emailLabel, inputEmail) {
    emailInput.classList.add('invalidImput');
    emailLabel.classList.add('invalidLabel');
    inputEmail.classList.add('invalidContainer'); 
    emailInput.classList.remove('validImput');
    emailLabel.classList.remove('validLabel');
    inputEmail.classList.remove('validContainer');
}


function themeHandler() {
    const themeInput = document.querySelector('#theme');
    const themeLabel = document.querySelector('label[for="theme"]');
    const inputTheme = document.querySelector('.inputTheme'); 
  
    themeInput.addEventListener('focusout', () => {

        if (themeInput.value.length > 0) {
            setValidTheme(themeInput, themeLabel, inputTheme);
        } else {
            setInvalidTheme(themeInput, themeLabel, inputTheme);
        } 

    });
}

function setValidTheme(themeInput, themeLabel, inputTheme) {
    themeInput.classList.add('validImput');
    themeLabel.classList.add('validLabel');
    inputTheme.classList.add('validContainer'); 
    themeInput.classList.remove('invalidImput');
    themeLabel.classList.remove('invalidLabel');
    inputTheme.classList.remove('invalidContainer');
}

function setInvalidTheme(themeInput, themeLabel, inputTheme) {
    themeInput.classList.add('invalidImput');
    themeLabel.classList.add('invalidLabel');
    inputTheme.classList.add('invalidContainer'); 
    themeInput.classList.remove('validImput');
    themeLabel.classList.remove('validLabel');
    inputTheme.classList.remove('validContainer');
}

  
function messageHandler() {
    const messageInput = document.querySelector('#message');
    const messageLabel = document.querySelector('label[for="message"]');
    const inputMessage = document.querySelector('.inputMessage'); 

    messageInput.addEventListener('focusout', () => {
        if (messageInput.value.length > 0) {
            setValidMessage(messageInput, messageLabel, inputMessage);
        } else {
            setInvalidMessage(messageInput, messageLabel, inputMessage);
        }
    });
}

function setValidMessage(messageInput, messageLabel, inputMessage) {
    messageInput.classList.add('validImput');
    messageLabel.classList.add('validLabelBig');
    inputMessage.classList.add('validContainer'); 
    messageInput.classList.remove('invalidImput');
    messageLabel.classList.remove('invalidLabelBig');
    inputMessage.classList.remove('invalidContainer');
}

function setInvalidMessage(messageInput, messageLabel, inputMessage) {
    messageInput.classList.add('invalidImput');
    messageLabel.classList.add('invalidLabelBig');
    inputMessage.classList.add('invalidContainer'); 
    messageInput.classList.remove('validImput');
    messageLabel.classList.remove('validLabelBig');
    inputMessage.classList.remove('validContainer');
}



function check(emailInput, themeInput, messageInput) {
    const complexEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (complexEmailRegex.test(emailInput.value) && themeInput.value.length > 0 && messageInput.value.length > 0) {
        send(emailInput, themeInput, messageInput);
    }

}

function send(emailInput, themeInput, messageInput) {
    const email = emailInput.value;
    const theme = themeInput.value;
    const message = messageInput.value;

    fetch('https://nodemailerserver-p3rp.onrender.com/send', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                theme,
                message
            })
        })
        .then(res => {
            if (!res.ok) throw new Error('Błąd podczas wysyłania maila');
            return res.text();
        })
        .then(() => {
            showConfirmation(emailInput, themeInput, messageInput);
        })
        .catch(err => {
            alert('Nie udało się wysłać wiadomości 😢');
            console.error(err);
        });
}


function showConfirmation(emailInput, themeInput, messageInput) {
    const row1 = document.querySelector('.row1');
    const row2 = document.querySelector('.row2');
    const row3 = document.querySelector('.row3');
    const row4 = document.querySelector('.row4');

    row1.innerHTML = `<p>1</p><p class="confirmMessage">Wiadomość została wysłana</p>`;
    row1.classList.add('success');

    row2.innerHTML = `<p>2</p>`;
    row2.classList.add('success');

    row3.innerHTML = `<div class="numbers"><p>3</p><p class="margin">4</p><p class="margin">5</p></div>`;
    row3.classList.add('success');

    row4.innerHTML = `<p>6</p><div class="btn successBtn">Powrót</div>`;
    row4.classList.add('success');

    console.log('Email:', emailInput.value);
    console.log('Theme:', themeInput.value);
    console.log('Message:', messageInput.value);

    

    const returnBtn = row4.querySelector('.successBtn');

    returnBtn.addEventListener('click', () => {
        row1.innerHTML = `<p>1</p><div class="input inputEmail"> <input type="text" id="email"><label for="email">email</label></div>`;
        row1.classList.remove('success');

        row2.innerHTML = `<p>2</p><div class="input inputTheme"><input type="text" id="theme"><label for="theme">temat</label></div>`;
        row2.classList.remove('success');  

        row3.innerHTML = `<div class="numbers"><p>3</p><p class="margin">4</p><p class="margin">5</p></div><div class="input inputMessage"><textarea id="message"></textarea><label for="message">wiadomość</label></div>`;
        row3.classList.remove('success');

        row4.innerHTML = `<p>6</p><div class="btn">WYŚLIJ!</div>`;
        row4.classList.remove('success');

        newLoad();
    });
}

document.addEventListener('DOMContentLoaded', newLoad);