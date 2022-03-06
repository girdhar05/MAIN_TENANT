// For containing the reference of the 'mainBtn', 'myModal', 'closeModal'.
const mainBtn = document.getElementById('mainBtn');
const myModal = document.getElementById('myModal');

// For taking reference of parent node of 'myModal'.
const parentModal = myModal.parentNode;
// new div
const newDiv = document.createElement('div');
// new Button
const newBtn = document.createElement('button');

const registerLogin = document.getElementById('register-login');
const closeModal = document.getElementById('close');
const img = document.getElementById('img-cont');
const prblmImg = document.getElementById('problem_image');
const fileUpInfo = document.getElementById('fileUpInfo');
const chooseLocationButton = document.getElementById('choose-location-btn');
// for taking user's html-element
var userLocation = document.getElementById("user-location");
// for taking the element of label of choose-location
const locationChooseLabel = document.getElementById('locationChooseLabel');
const lat = document.getElementById('latitude');
const lng = document.getElementById('longitude');

// event listner for 'mainBtn' for removing this mainBtn
mainBtn.addEventListener('click', () => {
    var mainBtnClone = mainBtn;
    //if user press 'choose-location-button', the main-button will remove from home-page
    chooseLocationButton.addEventListener('click', () => {
        var myModalClone = myModal;
        myModal.remove();
        mainBtn.remove();
        // for getting attributes of body-elements so that in future we can use.
        const body = document.body;
        var bodyAtts = [];
        var bodyAttVals = [];
        var bodyatt;
        for(var i=0; i<body.attributes.length; i++) {
            bodyAtt = body.attributes;
            bodyAtts[i] = bodyAtt[i].nodeName;
            bodyAttVals[i] = bodyAtt[i].nodeValue;
        }
        // for deleting body-element attribtes
        for(var i=0; i<=body.attributes.length+1; i++) {
            body.removeAttribute(body.attributes[0].name);
        }
        // for taking attributes of last-div created by modal. 
        const modalBackDrop = document.querySelector('.modal-backdrop');
        modalBackDropAttr = modalBackDrop.attributes[0];
        modalBackDropAttrName = modalBackDropAttr.nodeName;
        modalBackDropAttVal = modalBackDropAttr.nodeValue;
        // for removing atttributes of last-div that is created by modal
        modalBackDrop.removeAttribute('class');
        // for adding a new button dynamically when user clicks on choose-location button named as 'done'
        img.insertBefore(newDiv, registerLogin);
        newDiv.appendChild(newBtn);
        newDiv.setAttribute('class', 'container done');
        newBtn.innerHTML = 'Done';
        newBtn.setAttribute('type', 'button');
        newBtn.setAttribute('class', 'btn btn-primary btn-block');

        // for getting user's current location
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                userLocation.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
        function showPosition(position) {
            lat.value = position.coords.latitude;
            lng.value = position.coords.longitude;
            // userLocation.innerHTML = "Latitude: " + position.coords.latitude +
            //  "<br>Longitude: " + position.coords.longitude;
        }
        // defining error function for geoLocation function
        function showError(error) {
            switch(error.code) {
              case error.PERMISSION_DENIED:
              userLocation.innerHTML = "User denied the request for Geolocation."
                break;
              case error.POSITION_UNAVAILABLE:
              userLocation.innerHTML = "Location information is unavailable."
                break;
              case error.TIMEOUT:
              userLocation.innerHTML = "The request to get user location timed out."
                break;
              case error.UNKNOWN_ERROR:
              userLocation.innerHTML = "An unknown error occurred."
                break;
            }
          }

        // calling getLocation() function
        getLocation();

        // done-button event listner
        newBtn.addEventListener('click', () => {
            // for setting body-elment attributes that we deleted in past
            for(var i=0; i<bodyAtts.length; i++) {
                body.setAttribute(bodyAtts[i], bodyAttVals[i]);
            }
            // for setting last-div attributes that we deleted before.
            modalBackDrop.setAttribute(modalBackDropAttrName, modalBackDropAttVal);
            // for adding the modal that we deleted before
            body.appendChild(myModalClone);
            // for adding mainBtn again
            var mainBtnParent = document.querySelector('.flex-container');
            mainBtnParent.appendChild(mainBtnClone);
            // for removing newBtn that is created when user press on choose-location button.
            newBtn.remove();
            locationChooseLabel.innerHTML = 'You Choose This Location:';
        });


    });

    // to change the content of file upload input dynamically...
    var prblmImg = document.getElementById('problem_image');
    // here 'handleFiles' is also an 'eventListner', so pass it as argument not in as in arrow function.
    prblmImg.addEventListener('change', handleFiles, false);
    // 'handleFiles' eventListner fires when a user select the file to the form.
    function handleFiles() {
        // if file is not selected then this condition will accessed.
        if(!this.files.length) {
            document.getElementById('uploadLabelId').innerHTML = 'Please select a file......';
            fileUpInfo.innerHTML = 'Only .jpg, .jpeg, .png file supported and file-size must be less than 1 MB';
            fileUpInfo.classList.add('bg-info');
        } else {
            var file = this.files[0];
            var fileName = file.name;
            var fileSize = file.size;
            var fileType = file.type;
            if(fileType !== 'image/jpeg') {
                fileName = '';
                document.getElementById('uploadLabelId').innerHTML = 'Please enter valid file';
                fileUpInfo.classList.add('bg-danger');
                fileUpInfo.innerHTML = 'file type must be .jpg, .jpeg, .png';
            } else if(fileSize > 1048576) {
                fileName = '';
                document.getElementById('uploadLabelId').innerHTML = 'please enter valid file';
                fileUpInfo.classList.add('bg-danger');
                fileUpInfo.innerHTML = 'file must be less than 1 MB';
            } else {
                fileUpInfo.classList.remove('bg-danger');
                fileUpInfo.classList.add('bg-success');
                fileUpInfo.innerHTML = 'Ok! all condition met';
                document.getElementById('uploadLabelId').innerHTML = fileName;
            }
        }
    }
    
    
    
});
