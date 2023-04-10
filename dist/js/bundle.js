/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/infoWindow.js":
/*!**********************************!*\
  !*** ./js/modules/infoWindow.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (infoWindow);


/***/ }),

/***/ "./js/modules/loginForm.js":
/*!*********************************!*\
  !*** ./js/modules/loginForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_blockChanger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/blockChanger */ "./js/services/blockChanger.js");


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

        (0,_services_blockChanger__WEBPACK_IMPORTED_MODULE_0__["default"])('.container', '.profile');
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loginForms);


/***/ }),

/***/ "./js/modules/profileForm.js":
/*!***********************************!*\
  !*** ./js/modules/profileForm.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_blockChanger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/blockChanger */ "./js/services/blockChanger.js");
/* harmony import */ var _infoWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./infoWindow */ "./js/modules/infoWindow.js");



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

    (0,_services_blockChanger__WEBPACK_IMPORTED_MODULE_0__["default"])('.profile', '.loader');

    setTimeout(() => {
      if (document.querySelector('.loader').classList !== 'hide') {
        document.querySelector('.loader').classList.add('hide');
      }

      (0,_infoWindow__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }, 3000);

    return profileObject;
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (profileForms);


/***/ }),

/***/ "./js/services/blockChanger.js":
/*!*************************************!*\
  !*** ./js/services/blockChanger.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const blockChanger = (visible, notVisible) => {
        const visibleBlock = document.querySelector(visible),
          notVisibleBlock = document.querySelector(notVisible);

        visibleBlock.classList.add('hide');
        notVisibleBlock.classList.remove('hide');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (blockChanger);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_loginForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/loginForm */ "./js/modules/loginForm.js");
/* harmony import */ var _modules_profileForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/profileForm */ "./js/modules/profileForm.js");



window.addEventListener('DOMContentLoaded', () => {
(0,_modules_loginForm__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_profileForm__WEBPACK_IMPORTED_MODULE_1__["default"])();

// // Info window

// function createInfo() {
// console.log(`Age: ${profileObject.age}`);

// const infoWindow = document.createElement('div');
// infoWindow.classList.add('profile-form');
// infoWindow.innerHTML = `<p class="box box1">Age: ${profileObject.age}</p>`;
// document.body.appendChild(infoWindow);
// }
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map