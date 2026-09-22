'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
document.querySelectorAll('[data-product]').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('#product').value = link.dataset.product; });
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const requirements = String(data.get('requirements')).trim();
  if (!requirements) {
    document.querySelector('#requirements').setCustomValidity('Please describe your requirements.');
    document.querySelector('#requirements').reportValidity();
    return;
  }
  const brief = ['Hello SSK Fasteners,', '', 'Name: ' + String(data.get('name')).trim(), 'Company: ' + (String(data.get('company')).trim() || 'Not specified'), '', 'I would like a quotation for:', 'Product: ' + data.get('product'), 'Quantity / unit: ' + (String(data.get('quantity')).trim() || 'To be confirmed'), 'Delivery location: ' + (String(data.get('location')).trim() || 'To be confirmed'), '', 'Requirements:', requirements, '', 'Please confirm availability, pricing and delivery.', '', 'Thank you.'].join('\r\n');
  const subject = 'Fastener enquiry — ' + data.get('product');
  const whatsapp = data.get('channel') === 'whatsapp';
  const url = whatsapp
    ? 'https://wa.me/918300986956?text=' + encodeURIComponent(brief)
    : 'mailto:sskfasteners@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(brief);
  document.querySelector('#form-status').textContent = whatsapp
    ? 'WhatsApp draft requested. Review, attach any drawings and press Send in WhatsApp.'
    : 'Email draft requested. Review, attach any drawings and press Send in your email app. If no app opens, email sskfasteners@gmail.com or call +91 8300 986 956.';
  if (whatsapp) window.open(url, '_blank', 'noopener,noreferrer');
  else window.location.href = url;
});
document.querySelector('#requirements').addEventListener('input', event => event.target.setCustomValidity(''));
