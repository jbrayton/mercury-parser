export default function prepareForUnread($article, $) {
  $('iframe', $article).wrap(`<div class="unread-iframe-container"></div>`);
  return $;
}
