"use strict";

const image = "https://picsum.photos/200/300?random=";
let users = [
  {
    name: "Mohammad",
    number: "0525290963",
    email: "Mohammmad@example.com",
    address: "ba8h",
    description: "gg",
    img: "https://picsum.photos/200/300?random="
  },
  {
    name: "Firas",
    number: "0525214875",
    email: "Firas@example.com",
    address: "arraba",
    description: "ff",
    img: "https://picsum.photos/200/300?random="
  },
  {
    name: "zkrya",
    number: "0525231648",
    email: "zkrya@example.com",
    address: "mdre",
    description: "qq",
    img: "https://picsum.photos/200/300?random="
  },
  {
    name: "mozan",
    number: "0525298981",
    email: "mozan@example.com",
    address: "moo",
    description: "hh",
    img: "https://picsum.photos/200/300?random="
  },

];

function showUsers() {
  let user = "";
  users.sort((a, b) => a.name.localeCompare(b.name));
  users.forEach(function (person, index) {
    user += `<li class="frame">
          <div class="User">

            <div class="user_info">
              <img src=${person.img + `${index}`} alt="${person.name}" class="user_img">
              <span class="user_name">${person.name}</span>
            </div>

            <span class="number">${person.number}</span>

            <div class="user_settings">
              <button onClick="open_popup('more_user_info');display_user(${index})" class="info_settings" ><img src="Images/user_info.png" width="40em" alt="showinfo"
                  title="more  info"></button>

              <button onClick="change_value(${index});open_popup('Add_user');show_user(${index})" class="info_settings" ><img src="Images/user_edit.png" width="40em" alt="user_edit"
                  title="user edit"></button>

              <button onclick="open_popup('ask_delete');change_value(${index})" class="info_settings" ><img src="Images/delet.png" width="40em"
                  alt="Delete" title="Delete this user"></button>
            </div>

          </div>

        </li>`
  })
  document.getElementById("users").innerHTML = user;
  updatecount(users.length)

}

function updatecount(value) {
  //UPDATES CONTACT COUNTER
  document.getElementById("counter_users").innerHTML = `<h2>${value} Contacts</h2>`;
}



function has(name, text) {
  if (text.length > name.length)
    return false;
  else
    for (let i = 0; i < text.length; i++)
      if (name[i].toUpperCase() !== text[i].toUpperCase() && name[i].toLowerCase() !== text[i].toLowerCase())
        return false

  return true;
}
function search() {


  let allcontacts = document.getElementsByClassName("frame");

  let searchvalue = document.getElementById("Search").value
  let searchtext = document.createElement('span')
  searchtext.textContent = searchvalue;


  if (event.target === document.getElementById("Search")) {
    users.forEach((e, i) => {

      let name = allcontacts[i].querySelector('.user_name').textContent

      if (has(name, searchtext.textContent.trim())) {
        allcontacts[i].classList.add("show")
        allcontacts[i].classList.remove("hide")
      }
      else if (!has(name, searchtext.textContent.trim())) {
        allcontacts[i].classList.remove("show")
        allcontacts[i].classList.add("hide")
      }
    })

  }

  updatecount(document.getElementsByClassName('show').length)


}


function open_popup(x) {
  document.getElementById("popup").style.display = 'flex';
  document.getElementById(x).classList.add("show");

}

function close_popup(event) {
  if (event.target == document.getElementById("popup") || event == 'close' || event.keyCode == 27 && document.getElementById("popup").style.display == 'flex') {
    document.getElementById("popup").style.display = 'none';
    document.querySelector(".show").classList.remove("show");
    document.getElementById('name').value = "";
    document.getElementById('number').value = "";
    document.getElementById('email').value = "";
    document.getElementById('address').value = "";
    document.getElementById('description').value = "";
    document.getElementById("user_img_add").src = image;
    document.getElementById("add_button").innerHTML = ` <button onclick="close_popup('close')" id="cancel_add">Cancel</button>
            <button onclick="add_user()" id="save_add" >Add</button>`;

    document.getElementById("contact_email").style.display = "block";
    document.getElementById("contact_address").style.display = "block";
    document.getElementById("contact_description").style.display = "block";

    document.getElementById('name').classList.remove("redborder");
    document.getElementById('number').classList.remove("redborder");
    document.getElementById('email').classList.remove("redborder");
    document.querySelectorAll(".error_msg").forEach(elem =>
      elem != null ? elem.remove() : console.log()
    )
  }




}

function name_check(index) {


  let error = document.createElement("p");
  error.classList.add('error_msg');
  error.classList.add('hide');

  let x = document.getElementById('name');
  x.after(error);

  if (x.value.length == 0) {
    x.classList.add("redborder");
    error.textContent = "Can't have an empty name field.";
    error.classList.remove('hide');

    return false;
  }


  for (let i = 0; i < users.length; i++) {
    if (x.value.trim() == users[i].name.trim() && index != i) {
      x.classList.add("redborder");

      document.querySelector('#Name_label .error_msg').textContent = "Name already exists in contacts.";
      error.classList.remove('hide');

      return false;
    }
  }
  x.classList.remove("redborder");
  document.querySelector("#Name_label .error_msg").remove();
  return true;
}

function number_check(index) {
  let error = document.createElement("p");
  error.classList.add('error_msg');
  error.classList.add('hide');


  let x = document.getElementById('number');
  let stringX = x.value.toString();
  x.after(error)

  if (stringX.length != 10) {
    x.classList.add("redborder");
    error.innerHTML = `Phone number must <br/> have exactly 10 numbers.`;
    error.classList.remove('hide');

    return false;
  }

  for (let i = 0; i < stringX.length; i++) {
    if (stringX[i] < '0' || stringX[i] > '9') {
      x.classList.add("redborder");
      return false;
    }
  }

  for (let i = 0; i < users.length; i++) {
    if (stringX.trim() == users[i].number.trim() && index != i) {
      x.classList.add("redborder");
      error.innerHTML = `Phone number is already in contacts.`;
      error.classList.remove('hide');

      return false;
    }
  }

  x.classList.remove("redborder");
  document.querySelector("#Number_label .error_msg").remove();

  return true;
}
function email_check(index) {
  let error = document.createElement("p");
  error.classList.add('error_msg');
  error.classList.add('hide');

  let x = document.getElementById("email");
  x.after(error);


  if (x.value.toString().length == 0) {
    return true;
  }
  if (!x.value.toString().includes('@')) {
    error.innerHTML = "the email has to include (@)";
    error.classList.remove('hide');
    x.classList.add("redborder");
    return false;
  }
  let str = x.value.toString().substring(x.value.indexOf('@'));
  if (!str.includes(".com") && !str.includes(".net")) {

    error.innerHTML = "the email has to <br> include (.com,.net etc..)";
    error.classList.remove('hide');

    x.classList.add("redborder");
    return false;
  }

  for (let i = 0; i < users.length; i++) {
    if (x.value.toString().trim() == users[i].email.trim() && index != i) {
      x.classList.add("redborder");
      alert("email already exists in contacts.");
      return false;
    }
  }

  x.classList.remove("redborder");
  document.querySelector("#Email_label .error_msg").remove();

  return true;
}

function add_user() {

  if (document.querySelector('#Name_label .error_msg') !== null)
    document.querySelector('#Name_label .error_msg').remove();

  if (document.querySelector('#Number_label .error_msg') !== null)
    document.querySelector('#Number_label .error_msg').remove();

  if (document.querySelector('#Email_label .error_msg') !== null)
    document.querySelector('#Email_label .error_msg').remove();



  //ADD USER
  let name = name_check();
  let number = number_check();
  let email = email_check();

  if (name && number && email) {
    users.push({
      name: document.getElementById('name').value,
      number: document.getElementById('number').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      description: document.getElementById('description').value,
      img: image
    });
    close_popup('close');
    showUsers();
    document.getElementById('name').value = "";
    document.getElementById('number').value = "";
    document.getElementById('email').value = "";
    document.getElementById('address').value = "";
    document.getElementById('description').value = "";
  }

}

function show_user(index) {
  //DISPLAY USER INFO IN EDIT FORM
  document.getElementById("user_img_add").src = users[index].img + index;
  document.getElementById("name").value = users[index].name;
  document.getElementById("number").value = users[index].number;
  document.getElementById("email").value = users[index].email;
  document.getElementById("address").value = users[index].address;
  document.getElementById("description").value = users[index].description;
}

function display_user(index) {
  //DISPLAY USER INFO IN MORE INFO POPUP
  document.getElementById("contact_img").src = users[index].img + index;
  document.getElementById("contact_name").textContent = users[index].name;
  document.getElementById("contact_phone").textContent = users[index].number;
  if (users[index].email.length > 0)
    document.querySelector("#contact_email span").textContent = `Email: ${users[index].email}`;
  else
    document.getElementById("contact_email").style.display = "none";

  if (users[index].address.length > 0)
    document.querySelector("#contact_address span").textContent = `Address: ${users[index].address}`;
  else
    document.getElementById("contact_address").style.display = "none";

  if (users[index].description.length > 0)
    document.querySelector("#contact_description span").innerHTML = `Description: ${users[index].description}`
  else
    document.getElementById("contact_description").style.display = "none";

}

function save_edit() {
  //SAVES EDIT

  if (document.querySelector('#Name_label .error_msg') !== null)
    document.querySelector('#Name_label .error_msg').remove();

  if (document.querySelector('#Number_label .error_msg') !== null)
    document.querySelector('#Number_label .error_msg').remove();

  if (document.querySelector('#Email_label .error_msg') !== null)
    document.querySelector('#Email_label .error_msg').remove();

  let ind = document.getElementById('save_add').value;

  let name = name_check(ind);
  let number = number_check(ind);
  let email = email_check(ind);

  if (name && number && email) {
    users[ind].name = document.getElementById("name").value;
    users[ind].number = document.getElementById("number").value;
    users[ind].email = document.getElementById("email").value;
    users[ind].address = document.getElementById("address").value;
    users[ind].description = document.getElementById("description").value;
    showUsers();
    close_popup('close');

    document.getElementById('name').value = "";
    document.getElementById('number').value = "";
    document.getElementById('email').value = "";
    document.getElementById('address').value = "";
    document.getElementById('description').value = "";

    document.getElementById("add_button").innerHTML = ` <button onclick="close_popup('close')" id="cancel_add">Cancel</button>
            <button onclick="add_user()" id="save_add" >Add</button>`

  }

}

function change_value(index) {
  //GETS VALUE OF INDEX OF CONTACT TO EDIT/DELETE
  document.getElementById("confirm").value = index;

  document.getElementById("add_button").innerHTML = ` <button onclick="close_popup('close')" id="cancel_add">Cancel</button>
            <button onclick="save_edit()" id="save_add" >Save</button>`
  document.getElementById("save_add").value = index;

}

function delet_user() {
  //DELETE USER/ALL USERS
  let conf = document.querySelector("#checkbox input");
  if (conf.checked == true) {

    let ind = document.getElementById("confirm").value;
    if (ind === 'all') {
      users = [];
      close_popup('close');
      showUsers();
      conf.checked = false;


    }
    else {
      users.splice(ind, 1);
      close_popup('close');
      showUsers();
      conf.checked = false;
    }

  }
  else {
    alert("You have to select the checkbox to confirm delete.")
  }

}