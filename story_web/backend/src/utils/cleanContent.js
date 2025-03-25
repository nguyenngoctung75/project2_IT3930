const { decode } = require("html-entities");

function cleanContent(htmlContent) {
    if (!htmlContent) return "";

    // Giải mã các ký tự HTML như &gt; (>) &lt; (<), &quot; ("), v.v.
    let text = decode(htmlContent);

    // Loại bỏ tất cả các thẻ HTML (trừ <br>)
    text = text.replace(/<\/?(?!br\s*\/?)[a-z][a-z0-9]*\b[^>]*>/gi, "");

    // Chuyển <br> thành xuống dòng "\n"
    text = text.replace(/<br\s*\/?>/gi, "\n");

    // Chuẩn hóa khoảng trắng dư thừa (loại bỏ nhiều dòng trống)
    text = text.replace(/\n\s*\n+/g, "\n\n").trim();

    return text;
}

module.exports = { cleanContent };