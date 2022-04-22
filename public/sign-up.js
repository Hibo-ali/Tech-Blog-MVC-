const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#username-input-signup").value.trim();
    const password = document.querySelector("#password-input-signup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ 
          username, 
          password 
        }),
        headers: 
        { 
          "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Cannot sign up at this time, please try again.");
      }
    }
  };
  
  document
    .querySelector("#sign-up-form")
    .addEventListener("submit", signupFormHandler);