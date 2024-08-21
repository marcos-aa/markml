function markdown_to_html() {
  const markdown = document.getElementById("mkd-field").value;
  const matches = {
    "header": /^(#{1,6})\s*(.*)/gm,
    "bold": /\*\*(.*?)\*\*/g,
    "italic": /[*_](.*?)[*_]/g,
    "link": /\[(.*?)\]\((.*?)\)/g,
    "list": /^[*+-]\s(.*?)\n/gm,
    "paragraphs": /^(?!<)(.+?)$/gm
  };


  let page = markdown.replace(matches["header"], (match, hashtags, text) => {
    const heading_level = `h${hashtags.length}`
    return `<${heading_level}>${text}</${heading_level}>`;
  });

  page = page.replace(matches["bold"], '<strong>$1</strong>');
  page = page.replace(matches["italic"], '<i>$1</i>');
  page = page.replace(matches["link"], '<a href="$2">$1</a>');

  let length_before_list = page.length;
  page = page.replace(matches["list"], '<li>$1</li>');

  const has_list_items = page.length > length_before_list;

  if (has_list_items) {
    page = page.replace("<li>", "<ul><li>", 1);
    const parts = page.split("</li>");
    page = parts.slice(0, -1).join("</li>") + "</ul>" + parts[parts.length - 1];
  }

  page = page.replace(matches["paragraphs"], '<p>$1</p>');
  document.querySelector("#output").innerHTML = page;
}

document.addEventListener("DOMContentLoaded", () => {
  const mkd = document.querySelector("#mkd-field");
  mkd.addEventListener('input', markdown_to_html)
});
