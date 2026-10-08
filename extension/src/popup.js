const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");

function clearValues() {
  document.getElementById("recipient").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("body").value = "";
}

sendButton.addEventListener("click", async () => {
  const recipient = document.getElementById("recipient").value;
  const subject = document.getElementById("subject").value;
  const body = document.getElementById("body").value;

  if (!recipient || !subject || !body) {
    status.textContent = "Please complete all fields.";
    return;
  }

  status.textContent = "Sending...";

  try {
    const response = await fetch("http://127.0.0.1:8000/api/mail/send-email/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        recipient,
        subject,
        body,
      }),
    });

    const data = await response.json();
    clearValues();

    if (!response.ok) {
      status.textContent = data.error || "Something went wrong.";
      clearValues();
      return;
    }

    status.textContent = data.message;
  } catch (error) {
    console.error(error);
    status.textContent = "Could not connect to MailAgent.";
    clearValues();
  }
});
