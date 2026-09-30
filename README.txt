# MyBloggy - Simple Version

A blogging website made with **HTML, CSS and JavaScript**.
Subject: Web Application Development.

---

## 1. How to open it

**Just double-click `index.html`.**

That is all. This version has no back-end and no external library, so it
works straight from the file on your computer - no server, no internet needed.

(You can still use VS Code "Live Server" if you want, but it works the same.)

---

## 2. Files

```
MyBloggy/
├── index.html        Home page: hero, featured article, slider, blog cards, about, newsletter
├── predictor.html    Marks Predictor page (small calculation example)
├── contact.html      Contact page with a validated form
├── login.html        Log in page (email + password)
├── signup.html       Create an account page
├── blog1.html        Article: Top Web Development Trends in 2026
├── blog2.html        Article: The Future of AI in Everyday Life
├── blog3.html        Article: The Power of Minimalism
├── blog4.html        Article: How Students Can Learn Programming Faster
├── blog5.html        Article: Git and GitHub: A Beginner's Guide for Students
├── blog6.html        Article: Machine Learning: A Simple Start for Students
├── css/
│   └── style.css     All the styling (flexbox, grid, media queries, dark theme)
├── js/
│   └── script.js     All the JavaScript for every page
└── images/           Pictures used on the pages
```

---

## 3. What the JavaScript does

| Feature | Where |
|---|---|
| Dark / light theme, saved with local storage | `script.js` part 1 |
| Hamburger menu on mobile | part 2 |
| Highlighting the navbar link while scrolling | part 3 |
| Typing effect in the hero section | part 4 |
| Trending slider (auto change + clickable dots) | part 5 |
| Search box + category filter | part 6 |
| Newsletter form (email check + subscriber count) | part 7 |
| Contact form validation | part 8 |
| Marks Predictor (simple calculation + bar chart made with divs) | part 9 |
| Sign up, log in and log out | part 10 |
| Write new blog + modal reader | part 11 |

---

## 3b. How the account system works

* **signup.html** - name, email, password and confirm password, all checked by
  JavaScript (name length, email format, password length and both passwords
  must match).
* **login.html** - the email and password are compared with the saved account.
* **Every page** - the navbar shows *Log In / Sign Up*, or *Hi, name / Log Out*
  when somebody is logged in.
* The account list and the logged in user are kept in the browser with
  **localStorage** (`mybloggy-users` and `mybloggy-user`).
* When a logged in user opens the contact page, their name and email are
  filled in for them.

Please note: because there is no server in this project, the accounts are
stored inside the browser. A real website would save the user on a server and
keep the password hidden (hashed), never as plain text like this.

---

## 3c. How adding a new blog post works

* In the toolbar on `index.html`, click **"✍️ Add New Blog"**.
* If nobody is logged in, the user is alerted to log in first and redirected
  to `login.html` (giving authentication a real purpose).
* If logged in, the inline form expands smoothly above the blog cards with
  the active user's name displayed as the author.
* JavaScript validates Title (>= 5 chars), Summary (>= 10 chars), and
  Content (>= 30 chars).
* On submit, the post is saved to `localStorage` under `mybloggy-custom-blogs`
  and prepended immediately to the blog grid with a "Community Post" badge.
* Clicking "Read More" on any community post opens a clean, responsive
  **Modal Reader** popup showing full article content, date, and author.
* Newly published posts automatically work with live search and category filters.

---

## 4. How the Marks Predictor works

It is not machine learning - it is simple maths:

```
marks = 16 + (8 x study hours)          -> no library, only one formula
if attendance < 60%, subtract 10 marks
```

The formula comes from the average line through the sample data shown in the
table on the page. The bars are plain `div` elements whose width is set with
`style="width: __%"`.

---

## 5. How to change the content

- **Add a blog post:** copy one `<div class="blog-card">...</div>` block in
  `index.html` (there are 6 of them now), paste it below the last one, and
  change the image, heading, text and link. Give it a `data-category` of
  `Tech`, `AI` or `Lifestyle` so the filter buttons work.
- **Change the colours:** the main colour is `#c8a97e` (brown-gold).
  Use Find & Replace in `style.css` to swap it with any colour you like.
- **Change the slider:** edit the `trendingTopics` array at the top of
  part 5 in `script.js`.

---

## 6. Making sure the form validation runs

The forms have a `novalidate` attribute, for example:

```html
<form id="contact-form" novalidate>
```

This switches **off** the browser's own checking, so the messages come from
our own JavaScript (name length, email format, message length).
Remove `novalidate` if you would rather let the browser check them.


---

## 7. If an old number or email ever shows up on the page

The newsletter count and the theme are saved in the browser, so a value from
an older version can stay behind. The JavaScript now keeps only a number, but
you can also clear the saved values yourself:

1. Press **F12** to open the developer tools.
2. Click the **Console** tab.
3. Type this and press Enter:

```
localStorage.clear()
```

4. Refresh the page (F5). The subscriber count starts again from 0.
