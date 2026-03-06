---
layout: layouts/base.njk
title: Newsletter
permalink: /newsletter/index.html
---
A short monthly newsletter with reading notes, works in progress, and event updates.

<form
  class="newsletter-form"
  action="https://app.convertkit.com/forms/{{ site.newsletter.formId }}/subscriptions"
  method="post"
>
  <label for="email">Email address</label>
  <input id="email" name="email_address" type="email" autocomplete="email" required>
  <button type="submit">Subscribe</button>
</form>

Replace `YOUR_FORM_ID` in `src/_data/site.js` with your real ConvertKit form ID.
