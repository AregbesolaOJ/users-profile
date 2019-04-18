
const birthDate = document.getElementById('btn-birthdate');
const phone = document.getElementById('btn-phone');
const address = document.getElementById('btn-address');
const heading = document.querySelector('h2');
const userPhoto = document.querySelector('.user-photo');
const userDetails = document.querySelector('.details');
var extraUserInfo = {};

const displayBirthdate = ({dob}) => {
  const { age } = dob;
  userDetails.textContent = `${age} years old`
}

const displayPhone = ({phone, cell}) => {
  userDetails.textContent = `${phone} / ${cell}`
}

const displayAddress = ({location}) => {      
  const { street, city, state } = location;
  userDetails.textContent = `${street}, ${city}, ${state}.`
}

const displayExtraUserInfo = (user) => {

  if(user.dob) {
    birthDate.addEventListener('click', () => displayBirthdate(user));
  }

  if(user.phone && user.cell) {
    phone.addEventListener('click', () => displayPhone(user));
  }

  if(user.location) {
    address.addEventListener('click', () => displayAddress(user));
  }
  
}

birthDate.addEventListener('click', displayExtraUserInfo);
phone.addEventListener('click', displayExtraUserInfo);
address.addEventListener('click', displayExtraUserInfo);

const notify = (msg) => {
  const toastr = document.querySelector('.messages');
  if(!toastr) return;
  
  toastr.textContent = msg;
  if(!toastr.classList.contains('on')) {
    toastr.classList.add('on');
  }
};

const clearNotice = () => {
  const toastr = document.querySelector('.messages');
  if(!toastr) return;
  
  toastr.textContent = '';
  toastr.classList.remove('on');
};

const displayUserPhotoAndName = (data) => {
  if(!data) return;
  // add your code here
  var { results } = data;
  var profile = results[0];
  
  heading.textContent = `${profile.name.title} ${profile.name.last} ${profile.name.first}`
  const image = `
      <img src='${profile.picture.large}' alt="" />
  `;
  userPhoto.innerHTML = image;
  clearNotice();

  //store user
  extraUserInfo = {...profile};

  displayExtraUserInfo(extraUserInfo);
};
            
const getAUserProfile = () => {
  const api = 'https://randomuser.me/api/';
  
  // make API call here
  fetch(api)
     .then(response => response.json())
     .then(data => displayUserPhotoAndName(data))
  
  notify(`requesting profile data ...`);
};

const startApp = () => {
  // invoke the getAUserProfile here
  getAUserProfile();
};

startApp();

