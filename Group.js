function create_group_button() {
    let groupname = document.getElementById("group-name");
    let groupDesc = document.getElementById("group-description");
    if (groupname.value === "" || groupDesc.value === "") {
        alert("Please enter Groupname and Description");
        return;
    }
    else {
        console.log("Hello world");
        username.value = "";
        usr_password.value = "";
    }

}