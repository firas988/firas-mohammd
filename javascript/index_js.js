const image = "https://picsum.photos/200/300?random=";
let users = [
  {
    name: "Mohammmad",
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
  }
];

function showUsers() {
  let user = "";
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

              <button onClick="change_value(${index});open_popup('edit_user_info');show_user(${index})" class="info_settings" ><img src="Images/user_edit.png" width="40em" alt="user_edit"
                  title="user edit"></button>

              <button onclick="open_popup('ask_delete');change_value(${index})" class="info_settings" ><img src="Images/delet.png" width="40em"
                  alt="Delete" title="Delete this user"></button>
            </div>

          </div>

        </li>`
  })

  document.getElementById("users").innerHTML = user;
  //UPDATES CONTACT COUNTER
  document.getElementById("counter_users").innerHTML = `<h2>${users.length} Contacts</h2>`;
}

function open_popup(x) {
  document.getElementById("popup").style.display = 'flex';
  document.getElementById(x).classList.add("show");

}

function close_popup(event) {
  if (event.target == document.getElementById("popup") || event == 'close') {
    document.getElementById("popup").style.display = 'none';
    document.querySelector(".show").classList.remove("show");
  }

}

function add_user() {
  //ADD USER
  let x = document.getElementById('number').value.toString();
  let y = document.getElementById('name').value;
  if (x.length != 10 || y.length == 0) {
    alert("Invalid number or name");
  }
  else {
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
  document.getElementById("pfp").src = users[index].img + index;
  document.getElementById("edit_name").value = users[index].name;
  document.getElementById("edit_phone_num").value = users[index].number;
  document.getElementById("edit_email").value = users[index].email;
  document.getElementById("edit_address").value = users[index].address;
  document.getElementById("edit_description").value = users[index].description;
}

function display_user(index) {
  //DISPLAY USER INFO IN MORE INFO POPUP
  document.getElementById("contact_img").src = users[index].img + index;
  document.getElementById("contact_name").textContent = users[index].name;
  document.getElementById("contact_phone").textContent = users[index].number;
  document.getElementById("phone_email").innerHTML = `
          <div>
            <p><span>Email: ${users[index].email}</span> </p>
          </div>

          <div>
            <p><span>Address: ${users[index].address}</span> </p>
          </div>

          <div>
            <p><span>Description: ${users[index].description}</span> </p>
          </div>`;
}

function save_edit() {
  //SAVES EDIT
  let ind = document.getElementById('save_edit').value;

  if (document.getElementById("edit_phone_num").value.length != 10 || document.getElementById("edit_name").value === "")
    alert("Invalid name or number")
  else {
    users[ind].name = document.getElementById("edit_name").value;
    users[ind].number = document.getElementById("edit_phone_num").value;
    users[ind].email = document.getElementById("edit_email").value;
    users[ind].address = document.getElementById("edit_address").value;
    users[ind].description = document.getElementById("edit_description").value;
    showUsers();

    close_popup('close');
  }

}

function change_value(index) {
  //GETS VALUE OF INDEX OF CONTACT TO EDIT/DELETE
  document.getElementById("confirm").value = index;
  document.getElementById("save_edit").value = index;
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
