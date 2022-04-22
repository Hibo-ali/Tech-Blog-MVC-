const logout = async () => {
    
  
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/");
    } else {
        alert("Error, cannot be logged out at this time.")
    }
  };
  
  document.querySelector("#logout").addEventListener("click", logout);