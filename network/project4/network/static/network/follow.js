follow_btn = document.querySelector("#follow-btn");
follow_btn.addEventListener("click", (e) => {
  user = follow_btn.getAttribute("data-user");
  action = follow_btn.textContent.trim();
  form = new FormData();
  form.append("user", user);
  form.append("action", action);
  fetch("/follow/", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 201) {
        follow_btn.textContent = res.action;
        document.querySelector(
          "#follower"
        ).textContent = `Followers ${res.follower_count}`;
      }
    });
});
