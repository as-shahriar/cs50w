text_f = document.querySelector("#add-text");
btn = document.querySelector("#add-btn");
root = document.querySelector("#root");
btn.addEventListener("click", () => {
  text = text_f.value;

  if (text.length != 0) {
    form = new FormData();
    form.append("post", text.trim());
    fetch("/addpost/", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 201) {
          add_html(
            res.post_id,
            res.username,
            text.trim(),
            res.timestamp,
            `/u/${res.username}`
          );
          text_f.value = "";
        }
      });
  }
});

function make_div(className) {
  div = document.createElement("div");
  div.setAttribute("class", className);
  return div;
}

function add_html(id, username, post, time, link) {
  div1 = make_div("card my-2");
  div2 = make_div("card-body my-card");
  div3 = make_div("d-flex mb-2");
  div4 = make_div("d-flex justify-content-start");
  a1 = document.createElement("a");
  a1.setAttribute("href", link);
  span1 = document.createElement("span");
  span1.setAttribute("class", "text-secondary");
  span1.textContent = username;
  div5 = make_div("w-100 d-flex justify-content-end");
  span2 = document.createElement("span");
  span2.setAttribute("class", "mx-2 text-secondary");
  span2.textContent = time;
  span3 = document.createElement("span");
  span3.setAttribute("class", "text-primary edit");
  span3.textContent = "Edit";
  span3.setAttribute("data-id", id);
  span3.setAttribute("id", `edit-btn-${id}`);
  span3.addEventListener("click", () => {
    edit_handeler(span3);
  });

  span4 = document.createElement("span");
  span4.setAttribute("class", "post");
  span4.setAttribute("id", `post-content-${id}`);
  span4.textContent = post;

  textarea = document.createElement("textarea");
  textarea.setAttribute("class", "form-control textarea");
  textarea.setAttribute("id", `post-edit-${id}`);
  textarea.setAttribute("data-id", id);
  textarea.setAttribute("style", "display:none;");
  textarea.textContent = post;
  textarea.addEventListener("keyup", (e) => {
    if (e.keyCode == 13 && e.shiftKey) return;
    if (e.keyCode === 13) edit_handeler(textarea);
  });

  div6 = make_div("like mt-3");
  img = document.createElement("img");
  img.setAttribute("class", "liked");
  img.setAttribute("data-id", id);
  img.setAttribute("id", `post-like-${id}`);
  img.setAttribute("data-is_liked", "no");
  img.setAttribute(
    "src",
    "https://img.icons8.com/carbon-copy/100/000000/like--v2.png"
  );
  like_handeler(img);
  span5 = document.createElement("span");
  span5.setAttribute("id", `post-count-${id}`);
  span5.textContent = "0";

  div6.appendChild(img);
  div6.appendChild(span5);

  div5.appendChild(span2);
  div5.appendChild(span3);
  a1.appendChild(span1);
  div4.appendChild(a1);
  div3.appendChild(div4);
  div3.appendChild(div5);
  div2.appendChild(div3);
  div2.appendChild(span4);
  div2.appendChild(textarea);
  div2.appendChild(div6);
  div1.appendChild(div2);
  root.appendChild(div1);
}
