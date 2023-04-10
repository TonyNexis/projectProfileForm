import blockChanger from '../services/blockChanger';

const loginForms = () => {
  const loginForm = document.querySelector('.form'),
    btn = document.querySelector('#button'),
    passwordToggle = document.querySelector('#showHideBtn'),
    passwordInput = document.querySelector('#password');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginFormData = new FormData(loginForm);

    const loginObject = {};

    loginFormData.forEach((value, key) => {
      loginObject[key] = value;
    });

    // async function getID() {
    // await fetch('http://localhost:3000/database')
    // .then(response => response.json())
    // .then(data => { loginObject.id = data[data.length - 1].id + 111; })
    // .catch(error => console.error(error));
    // }

    async function getID() {
      try {
        const response = await fetch('http://localhost:3000/database');
        const data = await response.json();
        loginObject.id = data[data.length - 1].id + 1;
        localStorage.setItem('id', `${loginObject.id}`);
      } catch (error) {
        console.error(error);
      }
    }

    async function postData() {
      await getID();
      await fetch('http://localhost:3000/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginObject),
      })
        .then(response => response.json())
        // .then(data => console.log(data))
        .catch((error) => console.error(error))
        .finally(() => {
          loginForm.reset();
        });
      }

    function passwordChecker(str) {
      if (/^[a-zA-Z]+$/.test(str) || /^\d+$/.test(str) || str.length < 5 || str.length > 10) {
        btn.animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(2.5px)' },
            { transform: 'translateX(-2.5px)' },
            { transform: 'translateX(0)' },
          ],
          {
            duration: 200,
            iterations: 2,
          },
        );
        const pswdMessage = document.querySelector('#pswdMessage');
      if (!pswdMessage) {
          const message = document.createElement('p');
          message.classList.add('pswdMessage');
          message.id = 'pswdMessage';
          message.innerHTML = 'Use 5-10 symbol password with letters and numbers';
          document.querySelector('.password').appendChild(message);
        }
      } else {
        postData();

        blockChanger('.container', '.profile');
      }
    }

    passwordChecker(loginObject.password);
  });

  function passwordChangeView() {
    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
      passwordToggle.classList.remove('password-control');
      passwordToggle.classList.add('password-free');
    } else {
      passwordInput.setAttribute('type', 'password');
      passwordToggle.classList.remove('password-free');
      passwordToggle.classList.add('password-control');
    }
  }

  passwordToggle.addEventListener('click', passwordChangeView);
};

export default loginForms;
