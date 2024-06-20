function open_popup(x) {
  document.getElementById("popup").style.display = 'flex';
  document.getElementById(x).style.display = "block";

}

function close_popup(y) {
  document.getElementById("popup").style.display = 'none';
  document.getElementById("ask_delete").style.display = 'none';
  document.getElementById("more_user_info").style.display = 'none';
}