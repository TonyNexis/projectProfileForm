const infoWindow = () => {
    // async function searchProfile() {
    //     await fetch('http://localhost:3000/profile')
    //     .then(responce => responce.json())
    //     .then(data => {
    //         data.forEach(element => {
    //             if (element.id === localStorage.getItem('id')) { profile = element;
    //             return element; }
    //         });
    //     });
    // }

    async function searchProfile() {
        const response = await fetch('http://localhost:3000/profile');
        const data = await response.json();
        const profile = data.find((element) => element.id === localStorage.getItem('id'));
        return profile;
    }

    searchProfile()
    .then((profile) => {
        console.log(profile);
        const info = document.createElement('div');
        info.classList.add('profile-form');
        info.innerHTML = `<p class="box box1">Age: ${profile.age}</p>`;
        document.body.appendChild(info);
    });
};

export default infoWindow;
