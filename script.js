document.addEventListener("DOMContentLoaded", () => {
  const donateButton = document.querySelector("#donateButton");
  if (donateButton) {
    donateButton.addEventListener("click", () => {
      window.location.href = "mailto:SFLimmigrant@gmail.com?subject=Donation%20Inquiry";
    });
  }
});
