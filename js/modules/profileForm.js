import blockChanger from '../services/blockChanger';
import infoWindow from './infoWindow';

const profileForms = () => {
    const profileObject = {};

    // profile to JSON

    const profileForm = document.querySelector('.profile-form'),
    btnProfile = document.querySelector('.button-profile');

    profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const profileData = new FormData(profileForm);

    profileData.forEach((value, key) => {
      profileObject[key] = value;
    });

    profileObject.id = localStorage.getItem('id');

    // async function getId() {
    //   try {
    //     const response = await fetch('http://localhost:3000/database');
    //     const data = await response.json();
    //     // console.log(data);
    //     profileObject.id = data[data.length - 1].id;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    async function postProfile() {
    // await getId();
    await fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileObject),
    })
      .then(response => response.json())
      // .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => {
        // form.reset();
      });
    }

    postProfile();

    blockChanger('.profile', '.loader');

    setTimeout(() => {
      if (document.querySelector('.loader').classList !== 'hide') {
        document.querySelector('.loader').classList.add('hide');
      }

      infoWindow();
    }, 4000);

    return profileObject;
    });
};

export default profileForms;
