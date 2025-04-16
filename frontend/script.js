async function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];
    const formData = new FormData();
    formData.append("image", file);
  
    const res = await fetch("http://localhost:5000/caption", {
      method: "POST",
      body: formData
    });
  
    const data = await res.json();
    document.getElementById("caption").innerText = data.caption;
  }
  