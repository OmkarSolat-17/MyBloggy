/* =============================================================
   MYBLOGGY - script.js
   Simple blogging website
   Subject : Web Application Development
   Topics  : variables, functions, if/else, loops, arrays,
             objects, DOM, events, local storage, form validation
   ============================================================= */

/* =============================================================
   1. DARK / LIGHT THEME  (saved in local storage)
   ============================================================= */
const themeButton = document.getElementById("theme-btn");

if (themeButton !== null) {

    /* when the page opens, check if a theme was saved before */
    if (localStorage.getItem("mybloggy-theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeButton.innerHTML = "🌓";
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            themeButton.innerHTML = "🌓";
            localStorage.setItem("mybloggy-theme", "dark");
        } else {
            themeButton.innerHTML = "🌗";
            localStorage.setItem("mybloggy-theme", "light");
        }
    });
}

/* =============================================================
   2. HAMBURGER MENU (mobile)
   ============================================================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle !== null) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show-menu");
    });
}

/* =============================================================
   3. ACTIVE LINK IN THE NAVBAR WHILE SCROLLING
   ============================================================= */
const sections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 120) {
            currentSection = section.getAttribute("id");
        }
    });

    allNavLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

/* =============================================================
   4. TYPING EFFECT IN THE HERO SECTION
   ============================================================= */
const typingText = document.getElementById("typing-text");

if (typingText !== null) {

    const typingLines = [
        "We write about Web Development...",
        "We write about Technology...",
        "We write about Design...",
        "We write about AI..."
    ];

    let lineNumber = 0;
    let letterNumber = 0;

    function typeLetter() {

        const currentLine = typingLines[lineNumber];

        if (letterNumber < currentLine.length) {
            typingText.innerHTML = typingText.innerHTML + currentLine.charAt(letterNumber);
            letterNumber = letterNumber + 1;
            setTimeout(typeLetter, 80);
        } else {
            setTimeout(eraseLetters, 1500);
        }
    }

    function eraseLetters() {

        const currentLine = typingLines[lineNumber];

        if (letterNumber > 0) {
            typingText.innerHTML = currentLine.substring(0, letterNumber - 1);
            letterNumber = letterNumber - 1;
            setTimeout(eraseLetters, 40);
        } else {
            /* go to the next line, and back to the first one at the end */
            lineNumber = lineNumber + 1;
            if (lineNumber === typingLines.length) {
                lineNumber = 0;
            }
            setTimeout(typeLetter, 300);
        }
    }

    typeLetter();
}

/* =============================================================
   5. TRENDING SLIDER
   ============================================================= */
const sliderImage = document.getElementById("slider-image");

if (sliderImage !== null) {

    const trendingTopics = [
        {
            image: "images/img2.jpeg",
            title: "AI Revolution in 2026",
            text: "How Artificial Intelligence is changing the modern world.",
            link: "blog2.html"
        },
        {
            image: "images/img1.jpeg",
            title: "Web Development Trends",
            text: "New technologies that are shaping modern websites.",
            link: "blog1.html"
        },
        {
            image: "images/img3.jpeg",
            title: "Minimal Lifestyle",
            text: "How minimalism can improve your focus and productivity.",
            link: "blog3.html"
        },
        {
            image: "images/img4.jpeg",
            title: "Learn Programming Faster",
            text: "Simple study habits that help students learn to code.",
            link: "blog4.html"
        },
        {
            image: "images/img5.jpeg",
            title: "Git and GitHub for Students",
            text: "The five Git commands you will use every day.",
            link: "blog5.html"
        },
        {
            image: "images/img6.jpeg",
            title: "Machine Learning: A Simple Start",
            text: "What machine learning really is, explained simply.",
            link: "blog6.html"
        }
    ];

    const sliderTitle = document.getElementById("slider-title");
    const sliderText = document.getElementById("slider-text");
    const sliderLink = document.getElementById("slider-link");
    const dotsBox = document.getElementById("slider-dots");

    let slideNumber = 0;

    /* create one dot for every topic */
    for (let i = 0; i < trendingTopics.length; i++) {
        dotsBox.innerHTML = dotsBox.innerHTML +
            '<button class="dot" data-number="' + i + '"></button>';
    }

    const allDots = document.querySelectorAll(".dot");

    function showSlide(number) {

        slideNumber = number;

        const topic = trendingTopics[slideNumber];

        sliderImage.src = topic.image;
        sliderTitle.innerHTML = topic.title;
        sliderText.innerHTML = topic.text;
        sliderLink.href = topic.link;

        /* highlight only the dot of the current slide */
        for (let i = 0; i < allDots.length; i++) {
            allDots[i].classList.remove("active");
        }

        allDots[slideNumber].classList.add("active");
    }

    function nextSlide() {
        let next = slideNumber + 1;

        if (next === trendingTopics.length) {
            next = 0;
        }

        showSlide(next);
    }

    showSlide(0);
    setInterval(nextSlide, 4000);

    /* clicking a dot also changes the slide */
    allDots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            const number = Number(dot.getAttribute("data-number"));
            showSlide(number);
        });
    });
}

/* =============================================================
   6. SEARCH BOX AND CATEGORY FILTER
   ============================================================= */
const searchInput = document.getElementById("search-input");

if (searchInput !== null) {

    const blogCards = document.querySelectorAll(".blog-card");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const noResult = document.getElementById("no-result");

    let chosenCategory = "all";

    function filterBlogs() {

        const typedText = searchInput.value.toLowerCase();
        let shown = 0;

        /* re-query blog-card so newly created blogs are included */
        const currentCards = document.querySelectorAll(".blog-card");

        currentCards.forEach(function (card) {

            const title = card.querySelector("h3").innerHTML.toLowerCase();
            const category = card.getAttribute("data-category");

            const titleMatches = title.includes(typedText);
            const categoryMatches = (chosenCategory === "all" || chosenCategory === category);

            if (titleMatches && categoryMatches) {
                card.style.display = "flex";
                shown = shown + 1;
            } else {
                card.style.display = "none";
            }
        });

        if (shown === 0) {
            noResult.style.display = "block";
        } else {
            noResult.style.display = "none";
        }
    }

    /* "input" fires every time the text changes (typing, pasting or clearing) */
    searchInput.addEventListener("input", filterBlogs);

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            chosenCategory = button.getAttribute("data-category");
            filterBlogs();
        });
    });
}

/* =============================================================
   7. NEWSLETTER FORM  (validation + local storage)
   ============================================================= */
const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm !== null) {

    const emailInput = document.getElementById("newsletter-email");
    const formMessage = document.getElementById("newsletter-message");
    const subscriberCount = document.getElementById("subscriber-count");

    /* Show how many people have subscribed so far.
       We use Number() so that ANY old value becomes a number.
       (An earlier version saved a list of emails here instead of a count,
       so a value that is not a number is simply replaced with 0.) */
    let savedCount = Number(localStorage.getItem("mybloggy-subscribers"));

    if (isNaN(savedCount) || savedCount < 0) {
        savedCount = 0;
        localStorage.setItem("mybloggy-subscribers", 0);
    }

    subscriberCount.innerHTML = "Subscribers joined: " + savedCount;

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = emailInput.value;

        /* very simple email check */
        if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            formMessage.className = "form-message error";
            formMessage.innerHTML = "Please enter a valid email address.";
            return;
        }

        /* save the new total in local storage */
        savedCount = savedCount + 1;
        localStorage.setItem("mybloggy-subscribers", savedCount);

        subscriberCount.innerHTML = "Subscribers joined: " + savedCount;
        formMessage.className = "form-message success";
        formMessage.innerHTML = "Thank you for subscribing!";

        newsletterForm.reset();
    });
}

/* =============================================================
   8. CONTACT FORM  (validation)
   ============================================================= */
const contactForm = document.getElementById("contact-form");

if (contactForm !== null) {

    const nameInput = document.getElementById("name");
    const contactEmail = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const contactMessage = document.getElementById("contact-message");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = nameInput.value;
        const email = contactEmail.value;
        const message = messageInput.value;
        let allCorrect = true;

        /* ---- name ---- */
        if (name.length < 3) {
            nameError.innerHTML = "Name must have at least 3 letters.";
            allCorrect = false;
        } else {
            nameError.innerHTML = "";
        }

        /* ---- email ---- */
        if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            emailError.innerHTML = "Please enter a valid email address.";
            allCorrect = false;
        } else {
            emailError.innerHTML = "";
        }

        /* ---- message ---- */
        if (message.length < 10) {
            messageError.innerHTML = "Message must have at least 10 characters.";
            allCorrect = false;
        } else {
            messageError.innerHTML = "";
        }

        /* ---- final message ---- */
        if (allCorrect === true) {
            contactMessage.className = "form-message success";
            contactMessage.innerHTML = "Thank you " + name + "! Your message was sent.";
            contactForm.reset();
        } else {
            contactMessage.className = "form-message error";
            contactMessage.innerHTML = "Please correct the fields shown in red.";
        }
    });
}

/* =============================================================
   9. MARKS PREDICTOR PAGE
   ------------------------------------------------------------
   A very simple "model". We look at some example student data,
   take the average line through the points, and use it as a
   formula:   marks = 16 + 8 x study hours
   If attendance is below 60%, 10 marks are cut.
   ============================================================= */
const predictForm = document.getElementById("predict-form");

if (predictForm !== null) {

    const hoursInput = document.getElementById("hours");
    const attendanceInput = document.getElementById("attendance");
    const hoursError = document.getElementById("hours-error");
    const resultMarks = document.getElementById("result-marks");
    const resultGrade = document.getElementById("result-grade");
    const barsBox = document.getElementById("bars");

    const hoursList = [2, 4, 6, 8, 10];

    /* draw the sample bars on the page */
    function drawBars() {

        barsBox.innerHTML = "";

        for (let i = 0; i < hoursList.length; i++) {

            let predicted = 16 + (hoursList[i] * 8);

            if (predicted > 100) {
                predicted = 100;
            }

            /* the bar width is the marks percentage */
            barsBox.innerHTML = barsBox.innerHTML +
                '<div class="bar-row">' +
                    '<span>' + hoursList[i] + ' hrs</span>' +
                    '<div class="bar" style="width: ' + predicted + '%"></div>' +
                    '<span>' + predicted + '</span>' +
                '</div>';
        }
    }

    function getGrade(marks) {
        if (marks >= 90) {
            return "A+";
        } else if (marks >= 80) {
            return "A";
        } else if (marks >= 70) {
            return "B+";
        } else if (marks >= 60) {
            return "B";
        } else if (marks >= 40) {
            return "C";
        } else {
            return "F";
        }
    }

    predictForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const hours = Number(hoursInput.value);
        const attendance = Number(attendanceInput.value);

        /* ---- validation ---- */
        if (hoursInput.value === "" || hours < 0 || hours > 12) {
            hoursError.innerHTML = "Enter study hours between 0 and 12.";
            return;
        }

        hoursError.innerHTML = "";

        /* ---- the calculation ---- */
        let marks = 16 + (hours * 8);

        if (attendance < 60) {
            marks = marks - 10;
        }

        if (marks > 100) {
            marks = 100;
        }

        if (marks < 0) {
            marks = 0;
        }

        marks = Math.round(marks);

        /* ---- show the answer ---- */
        resultMarks.innerHTML = marks + " / 100";
        resultGrade.innerHTML = "Grade: " + getGrade(marks);

        drawBars();
    });

    drawBars();
}


/* =============================================================
   10. SIGN UP, LOG IN AND LOG OUT
   ------------------------------------------------------------
   The accounts are saved in the browser with localStorage.
   For a real website the user would be saved on a server and the
   password would be hidden (hashed), never kept like this.
   ============================================================= */

/* ---- small helpers to read and write the saved accounts ---- */
function getUsers() {

    const saved = localStorage.getItem("mybloggy-users");

    if (saved === null) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        /* if the saved text is damaged we start with an empty list */
        console.log("Could not read the accounts:", error.message);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("mybloggy-users", JSON.stringify(users));
}

function findUserByEmail(email) {

    const users = getUsers();
    const lowEmail = email.toLowerCase();

    for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === lowEmail) {
            return users[i];
        }
    }

    return null;
}

/* the email of the person who is logged in right now (or null) */
function getCurrentUser() {

    const email = localStorage.getItem("mybloggy-user");

    if (email === null) {
        return null;
    }

    return findUserByEmail(email);
}

/* find the first name, for example "Omkar Solat" -> "Omkar" */
function firstName(fullName) {
    return fullName.split(" ")[0];
}

/* ---- 10a. the navbar: Log In / Sign Up  OR  Hi, name / Log Out ---- */
const userBox = document.getElementById("user-box");

function showUserInNav() {

    if (userBox === null) {
        return;
    }

    const user = getCurrentUser();

    if (user === null) {
        userBox.innerHTML =
            '<a href="login.html" class="nav-login">Log In</a>' +
            '<a href="signup.html" class="nav-signup">Sign Up</a>';
        return;
    }

    userBox.innerHTML =
        '<span class="user-name">Hi, ' + firstName(user.name) + '</span>' +
        '<button class="logout-btn">Log Out</button>';

    document.querySelector(".logout-btn").addEventListener("click", function () {
        localStorage.removeItem("mybloggy-user");
        window.location.href = "index.html";
    });
}

showUserInNav();

/* ---- 10b. the SIGN UP form ---- */
const signupForm = document.getElementById("signup-form");

if (signupForm !== null) {

    const nameBox = document.getElementById("signup-name");
    const emailBox = document.getElementById("signup-email");
    const passwordBox = document.getElementById("signup-password");
    const confirmBox = document.getElementById("signup-confirm");

    const nameErr = document.getElementById("signup-name-error");
    const emailErr = document.getElementById("signup-email-error");
    const passwordErr = document.getElementById("signup-password-error");
    const confirmErr = document.getElementById("signup-confirm-error");
    const formMsg = document.getElementById("signup-message");

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = nameBox.value.trim();
        const email = emailBox.value.trim();
        const password = passwordBox.value;
        const confirm = confirmBox.value;

        let allCorrect = true;

        /* ---- name ---- */
        if (name.length < 3) {
            nameErr.innerHTML = "Please write your full name (at least 3 letters).";
            allCorrect = false;
        } else {
            nameErr.innerHTML = "";
        }

        /* ---- email ---- */
        if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            emailErr.innerHTML = "Please write a valid email address.";
            allCorrect = false;
        } else if (findUserByEmail(email) !== null) {
            emailErr.innerHTML = "This email is already registered. Please log in.";
            allCorrect = false;
        } else {
            emailErr.innerHTML = "";
        }

        /* ---- password ---- */
        if (password.length < 6) {
            passwordErr.innerHTML = "Password must have at least 6 characters.";
            allCorrect = false;
        } else {
            passwordErr.innerHTML = "";
        }

        /* ---- confirm password ---- */
        if (confirm !== password || confirm === "") {
            confirmErr.innerHTML = "Both passwords must be the same.";
            allCorrect = false;
        } else {
            confirmErr.innerHTML = "";
        }

        if (allCorrect === false) {
            formMsg.className = "form-message error";
            formMsg.innerHTML = "Please correct the fields shown in red.";
            return;
        }

        /* ---- save the new account ---- */
        const users = getUsers();
        users.push({ name: name, email: email, password: password });
        saveUsers(users);

        /* ---- log the person in straight away ---- */
        localStorage.setItem("mybloggy-user", email);

        formMsg.className = "form-message success";
        formMsg.innerHTML = "Account created. Taking you to the home page...";

        setTimeout(function () {
            window.location.href = "index.html";
        }, 900);
    });
}

/* ---- 10c. the LOG IN form ---- */
const loginForm = document.getElementById("login-form");

if (loginForm !== null) {

    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");
    const loginEmailErr = document.getElementById("login-email-error");
    const loginPasswordErr = document.getElementById("login-password-error");
    const loginMsg = document.getElementById("login-message");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value;

        loginEmailErr.innerHTML = "";
        loginPasswordErr.innerHTML = "";

        if (email === "") {
            loginEmailErr.innerHTML = "Please write your email address.";
            return;
        }

        if (password === "") {
            loginPasswordErr.innerHTML = "Please write your password.";
            return;
        }

        /* ---- check the email and the password together ---- */
        const user = findUserByEmail(email);

        if (user === null || user.password !== password) {
            loginMsg.className = "form-message error";
            loginMsg.innerHTML = "Email or password is wrong. Please try again.";
            return;
        }

        localStorage.setItem("mybloggy-user", user.email);

        loginMsg.className = "form-message success";
        loginMsg.innerHTML = "Welcome back " + firstName(user.name) + "! Taking you home...";

        setTimeout(function () {
            window.location.href = "index.html";
        }, 900);
    });
}

/* ---- 10d. if somebody is logged in, fill the contact form for them ---- */
const contactNameBox = document.getElementById("name");
const contactEmailBox = document.getElementById("email");

if (contactNameBox !== null && contactEmailBox !== null) {

    const user = getCurrentUser();

    if (user !== null) {
        contactNameBox.value = user.name;
        contactEmailBox.value = user.email;
    }
}


/* =============================================================
   11. WRITE NEW BLOG POST & BLOG MODAL
   ------------------------------------------------------------
   Allows logged-in users to publish their own blog posts.
   Posts are saved in localStorage under "mybloggy-custom-blogs".
   Clicking "Read More" on a custom card opens a modal reader.
   ============================================================= */

/* Helper to get custom blogs from localStorage */
function getCustomBlogs() {
    const saved = localStorage.getItem("mybloggy-custom-blogs");
    if (saved === null) {
        return [];
    }
    try {
        return JSON.parse(saved);
    } catch (e) {
        console.log("Could not load custom blogs:", e.message);
        return [];
    }
}

function saveCustomBlogs(blogs) {
    localStorage.setItem("mybloggy-custom-blogs", JSON.stringify(blogs));
}

/* Build a blog card HTML string for a custom post */
function createCardElement(blog) {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.setAttribute("data-category", blog.category);
    card.setAttribute("data-custom-id", blog.id);

    card.innerHTML =
        '<img src="' + blog.image + '" alt="' + blog.title + '">' +
        '<div class="blog-content">' +
            '<span class="custom-badge">Community Post</span>' +
            '<h3>' + blog.title + '</h3>' +
            '<p>' + blog.summary + '</p>' +
            '<button type="button" class="btn read-custom-btn" data-custom-id="' + blog.id + '">Read More</button>' +
        '</div>';

    return card;
}

/* Render all saved custom blogs into the container on index.html */
const blogContainer = document.querySelector(".blog-container");

function loadCustomBlogs() {
    if (blogContainer === null) {
        return;
    }

    const blogs = getCustomBlogs();

    /* Prepend each custom blog so newest appears first */
    for (let i = 0; i < blogs.length; i++) {
        const card = createCardElement(blogs[i]);
        blogContainer.insertBefore(card, blogContainer.firstChild);
    }
}

/* Call on page load */
loadCustomBlogs();

/* ---- 11a. Opening & closing the Add New Blog form ---- */
const openBlogBtn = document.getElementById("open-blog-form-btn");
const closeBlogBtn = document.getElementById("close-blog-form-btn");
const newBlogBox = document.getElementById("new-blog-box");
const authorDisplay = document.getElementById("author-display-name");

if (openBlogBtn !== null && newBlogBox !== null) {

    openBlogBtn.addEventListener("click", function () {
        /* Check if user is logged in */
        const currentUser = getCurrentUser();

        if (currentUser === null) {
            alert("Please log in first to write a blog post.");
            window.location.href = "login.html";
            return;
        }

        /* Show who is authoring this post */
        if (authorDisplay !== null) {
            authorDisplay.innerHTML = currentUser.name + " (" + currentUser.email + ")";
        }

        /* Toggle form visibility */
        if (newBlogBox.style.display === "none" || newBlogBox.style.display === "") {
            newBlogBox.style.display = "block";
            newBlogBox.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            newBlogBox.style.display = "none";
        }
    });

    if (closeBlogBtn !== null) {
        closeBlogBtn.addEventListener("click", function () {
            newBlogBox.style.display = "none";
        });
    }
}

/* ---- 11b. Validating and Submitting the New Blog ---- */
const newBlogForm = document.getElementById("new-blog-form");

if (newBlogForm !== null) {

    const titleInput = document.getElementById("new-blog-title");
    const categoryInput = document.getElementById("new-blog-category");
    const imageInput = document.getElementById("new-blog-image");
    const summaryInput = document.getElementById("new-blog-summary");
    const contentInput = document.getElementById("new-blog-content");

    const titleErr = document.getElementById("new-blog-title-error");
    const summaryErr = document.getElementById("new-blog-summary-error");
    const contentErr = document.getElementById("new-blog-content-error");
    const blogMsg = document.getElementById("new-blog-message");

    newBlogForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const currentUser = getCurrentUser();
        if (currentUser === null) {
            alert("Session expired. Please log in again.");
            window.location.href = "login.html";
            return;
        }

        const title = titleInput.value.trim();
        const category = categoryInput.value;
        const image = imageInput.value;
        const summary = summaryInput.value.trim();
        const content = contentInput.value.trim();

        let valid = true;

        /* Validate Title */
        if (title.length < 5) {
            titleErr.innerHTML = "Title must be at least 5 characters long.";
            valid = false;
        } else {
            titleErr.innerHTML = "";
        }

        /* Validate Summary */
        if (summary.length < 10) {
            summaryErr.innerHTML = "Summary must be at least 10 characters long.";
            valid = false;
        } else {
            summaryErr.innerHTML = "";
        }

        /* Validate Content */
        if (content.length < 30) {
            contentErr.innerHTML = "Article content must have at least 30 characters.";
            valid = false;
        } else {
            contentErr.innerHTML = "";
        }

        if (!valid) {
            blogMsg.className = "form-message error";
            blogMsg.innerHTML = "Please fix the errors above before publishing.";
            return;
        }

        /* Build blog object */
        const now = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateStr = now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();

        const newPost = {
            id: "post-" + Date.now(),
            title: title,
            category: category,
            image: image,
            summary: summary,
            content: content,
            author: currentUser.name,
            date: dateStr
        };

        /* Save to localStorage */
        const blogs = getCustomBlogs();
        blogs.unshift(newPost);
        saveCustomBlogs(blogs);

        /* Prepend to page */
        if (blogContainer !== null) {
            const card = createCardElement(newPost);
            blogContainer.insertBefore(card, blogContainer.firstChild);
            card.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        /* Reset form & notify */
        newBlogForm.reset();
        blogMsg.className = "form-message success";
        blogMsg.innerHTML = "Your blog post was published successfully!";

        setTimeout(function () {
            newBlogBox.style.display = "none";
            blogMsg.innerHTML = "";
            blogMsg.className = "form-message";
        }, 1500);
    });
}

/* ---- 11c. Blog Reading Modal ---- */
const blogModal = document.getElementById("blog-modal");

if (blogModal !== null) {

    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalAuthor = document.getElementById("modal-author");
    const modalDate = document.getElementById("modal-date");
    const modalImage = document.getElementById("modal-image");
    const modalBody = document.getElementById("modal-body");
    const closeModalBtn = document.getElementById("close-modal-btn");

    function openModalForBlog(blogId) {
        const blogs = getCustomBlogs();
        let target = null;

        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === blogId) {
                target = blogs[i];
                break;
            }
        }

        if (target === null) {
            return;
        }

        modalTitle.innerHTML = target.title;
        modalCategory.innerHTML = target.category;
        modalAuthor.innerHTML = target.author;
        modalDate.innerHTML = target.date;
        modalImage.src = target.image;

        /* Convert line breaks into paragraphs */
        const paras = target.content.split("\n");
        let bodyHtml = "";
        for (let j = 0; j < paras.length; j++) {
            const trimmed = paras[j].trim();
            if (trimmed !== "") {
                bodyHtml += "<p>" + trimmed + "</p>";
            }
        }
        modalBody.innerHTML = bodyHtml;

        blogModal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        blogModal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    /* Event delegation on blog container for 'Read More' clicks */
    if (blogContainer !== null) {
        blogContainer.addEventListener("click", function (event) {
            const btn = event.target.closest(".read-custom-btn");
            if (btn !== null) {
                const blogId = btn.getAttribute("data-custom-id");
                openModalForBlog(blogId);
            }
        });
    }

    if (closeModalBtn !== null) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    /* Close when clicking outside the modal content */
    blogModal.addEventListener("click", function (event) {
        if (event.target === blogModal) {
            closeModal();
        }
    });

    /* Close on Escape key */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && blogModal.style.display === "flex") {
            closeModal();
        }
    });
}
