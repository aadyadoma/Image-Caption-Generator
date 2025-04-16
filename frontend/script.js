async function uploadImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];
  const formData = new FormData();
  formData.append("image", file);

  const imagePreview = document.getElementById("imagePreview");
  const reader = new FileReader();
  
  reader.onloadend = () => {
    imagePreview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }

  try {
    const res = await fetch("http://localhost:5000/caption", {
      method: "POST",
      body: formData
    });

    // const text = await res.text();
    const text = await res.json();
    console.log("Status:", res.status);
    console.log("Response text:", text);

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    document.getElementById("caption").innerText = text.caption;
  } catch (err) {
    console.error("error fetching caption:", err);
    document.getElementById("caption").innerText = "failed to get caption. :3 ";
  }
}
