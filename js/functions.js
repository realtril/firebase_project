const userId = document.getElementById("userId");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const removeBtn = document.getElementById("removeBtn");

const database = firebase.database();
const rootRef = database.ref("users");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   const autoId = rootRef.push().key;
  rootRef.child(userId.value).set({
    first_name: firstName.value,
    last_name: lastName.value,
    age: age.value,
  });
  alert("Succesfully added!");
});

// using push().This will generate a new push id and return a reference to the location with that id.This is a pure client - side operation.

//child -Gets a Reference for the location at the specified relative path.
// The relative path can either be a simple child name(for example, "ada") or a deeper slash - separated path(for example, "ada/name/first").

//key-he last part of the Reference's path.

// For example, "ada" is the key for https://<DATABASE_NAME>.firebaseio.com/users/ada.

//     The key of a root Reference is null.

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  var newData = {
    first_name: firstName.value,
    last_name: lastName.value,
    age: age.value,
  };
  rootRef.child(userId.value).update(newData);
  alert("Succesfully updated!");
});

removeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  rootRef
    .child(userId.value)
    .remove()
    .then(() => {
      alert("User has been removed from the database!");
    })
    .catch((error) => {
      console.error(error);
    });
});

rootRef
  .orderByKey()
  .limitToLast(2)
  .on("value", (snapshot) => {
    console.log(snapshot.val());
  });
