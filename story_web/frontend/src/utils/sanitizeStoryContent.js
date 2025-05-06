export default function sanitizeStoryContent (content) {
  if (!content) return 'Nội dung đang cập nhật';

  // 1. Thay thế các ký tự xuống dòng (\n) thành thẻ <br> hoặc <p>
  let processed = content
    // Chuẩn hóa nhiều \n liên tiếp thành 2 \n (tương đương paragraph break)
    .replace(/\n{3,}/g, '\n\n')
    
    // Thay \n\n thành </p><p> để tạo đoạn văn
    .replace(/\n\n/g, '</p><p>')
    
    // Thay \n còn lại thành <br>
    .replace(/\n/g, '<br>')
    
    // Bọc toàn bộ nội dung trong thẻ <p>
    .replace(/^(.*)$/, '<p>$1</p>');

  // 2. Làm sạch HTML (giữ lại các thẻ hợp lệ)
  processed = processed
    // Chỉ cho phép các thẻ: p, br, em, strong, i, b, u
    .replace(/<(?!\/?(p|br|em|strong|i|b|u)(\s|\/|>))[^>]+>/g, '')
    
    // Chuẩn hóa thẻ đóng mở
    .replace(/<([a-z]+)([^>]*)>/g, (match, tag, attrs) => `<${tag}${attrs}>`);

  // 3. Xử lý các khoảng trắng thừa
  processed = processed
    .replace(/\s+/g, ' ')
    .replace(/(<[^>]+>)\s+/g, '$1')
    .replace(/\s+(<\/[^>]+>)/g, '$1');

  // 4. Xử lý các ký tự đặc biệt HTML
  processed = processed
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  return processed;
};