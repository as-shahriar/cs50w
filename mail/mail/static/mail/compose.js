document.addEventListener(
  "DOMContentLoaded",
  function () {
    const form = document.querySelector("#compose-form");
    const msg = document.querySelector("#message");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      to = document.querySelector("#compose-recipients");
      subject = document.querySelector("#compose-subject");
      body = document.querySelector("#compose-body");
      if (from.length == 0 && to.length == 0) return;

      fetch("/emails", {
        method: "POST",
        body: JSON.stringify({
          recipients: to.value,
          subject: subject.value,
          body: body.value,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.status);
          if (result.status == 201) {
            load_mailbox("sent");
          } else {
            msg.innerHTML = `<div class="alert alert-danger" role="alert">
            ${result.error}
          </div>`;
          }
        });
    });
  },
  false
);
