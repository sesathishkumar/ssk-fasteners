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
  const brief = ['SSK FASTENERS — ENQUIRY BRIEF', '', 'Product family: ' + data.get('product'), 'Quantity / unit: ' + (String(data.get('quantity')).trim() || 'To be confirmed'), 'Delivery location: ' + (String(data.get('location')).trim() || 'To be confirmed'), '', 'Requirements:', requirements, '', 'This is a saved brief. It has not been sent to SSK Fasteners.'].join('\r\n');
  const url = URL.createObjectURL(new Blob([brief], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url; link.download = 'SSK-Fasteners-Enquiry.txt';
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-status').textContent = 'Your enquiry brief is ready to save. It has not been submitted online.';
});
document.querySelector('#requirements').addEventListener('input', event => event.target.setCustomValidity(''));
