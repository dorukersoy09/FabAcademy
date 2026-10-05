---
title: "Principles and Practices"
week: 1
date: 2026-09-29
status: "done"
---
# Week 1 - Project Management

Documentation is an essential skill and a fundamental requirement at Fab Academy. It serves not only to track and reflect on my own progress but also to share my experiences, insights, and challenges with others. By documenting my journey, I can contribute to a collective learning process and make it possible for others to learn from my work.

This week, I built the foundation of my personal website that I will use to document my Fab Academy journey.

## 0. Laptop Specifications

**Device:** MacBook Air M3  
**OS:** macOS Sequoia 15.6

---

# 1. Setting Up Git + GitHub

## 1.1 Downloading Git

The first step was to install [**Git**](https://git-scm.com/). Since I am using a Mac, I followed the instructions provided on the [**Git Downloads page**](https://git-scm.com/downloads/mac).

I did not have Homebrew installed, so I installed it using the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
After installing Homebrew, I installed Git:

```
brew install git
```

To make sure Git was installed correctly, I ran:

```
git version
```

The output confirmed that Git was installed and working correctly:

```
git version 2.51.0
```

---

## 1.2 Generating an SSH Key

I wanted to connect my local computer to GitHub using SSH so that I could securely push and pull files from my repository.

I generated an SSH key pair using:

```
ssh-keygen -t rsa -C "personal@mail.com" -f ~/.ssh/id_rsa_github
```

This created a public/private RSA key pair that I can use to authenticate with GitHub.

I then copied my public key to the clipboard:

```
pbcopy < ~/.ssh/id_rsa_github.pub
```

I added this public key to my GitHub account under:

**GitHub → Settings → SSH and GPG keys → New SSH key**

After generating the SSH key, I added it to the SSH agent:

```
ssh-add ~/.ssh/id_rsa_github
```

This allows my computer to use the SSH key when connecting to GitHub.

I then tested the connection:

```
ssh -T git@github.com
```

If the connection is successful, GitHub returns a message confirming that authentication was successful.

---

# 2. Creating My Website

## 2.1 Installing Hugo

To create my documentation website, I used [**Hugo**](https://gohugo.io/), a static website generator.

Following the [**Hugo installation instructions for macOS**](https://gohugo.io/installation/macos/#homebrew), I installed Hugo using Homebrew:

```
brew install hugo
```

After installing Hugo, I created a directory on my Desktop called `FabAcademy`:

```
mkdir FabAcademy
cd FabAcademy
```

I then created a new Hugo website:

```
hugo new site mywebsite
```

This created the basic Hugo project structure:

```
mywebsite/
├── archetypes/
├── assets/
├── content/
├── data/
├── i18n/
├── layouts/
├── static/
├── themes/
└── hugo.toml
```

I then entered the website directory:

```
cd mywebsite
```

and initialized Git:

```
git init
```

---

## 2.2 Creating My Own Website Design

Instead of using an existing Hugo theme, I decided to create my own website design.

I wanted my Fab Academy documentation website to have a design that represents my own style rather than looking like a standard Hugo documentation site.

I created the website using:

- HTML
- CSS
- JavaScript
- Hugo
- Markdown

The visual design contains a dark technical interface with interactive elements for navigating between the different Fab Academy weeks.

I used Hugo as the underlying static-site generator while keeping the visual design under my own control.

This means that Hugo is responsible for organizing and generating the website, while my HTML, CSS, and JavaScript control the appearance and interactions.

I tested the website locally using:

```
hugo server -D
```

This allowed me to open the website in my browser while working on it.

---

# 3. Adding Content

## 3.1 Using Markdown

Hugo uses Markdown files to store website content.

I decided to use [**Obsidian**](https://obsidian.md/) to write and organize my documentation.

I opened the `content` directory inside my Hugo project as an Obsidian vault.

My current structure is:

```
mywebsite/
└── content/
    ├── about/
    ├── assignments/
    │   └── week-01/
    │       └── index.md
    └── final-project/
```

This allows me to keep my documentation separate from the website's design and code.

For example, my Week 1 documentation is stored at:

```
content/assignments/week-01/index.md
```

I can edit this Markdown file in Obsidian, while Hugo uses the file to generate the website.

---

## 3.2 My Documentation Workflow

My documentation workflow is:

```
Obsidian
    ↓
Markdown
    ↓
Hugo
    ↓
Website
```

I write my documentation in Obsidian.

The Markdown files are stored inside the Hugo `content` directory.

Hugo then processes these files when I build or run the website.

This makes it possible for me to document my Fab Academy work without directly editing the website's HTML every time I create a new assignment.

---

# 4. Deploying My Website with GitHub

Once I was satisfied with my initial website, I created a repository on GitHub.

My GitHub username is:

```
dorukerso09
```

I connected my local Hugo project to my GitHub repository using SSH.

The remote repository can be added using:

```
git remote add origin git@github.com:dorukerso09/repositoryname.git
```

I then added my files:

```
git add .
```

and created my first commit:

```
git commit -m "Initial Fab Academy website"
```

I then pushed my files to GitHub:

```
git push -u origin main
```

This uploads my Hugo project to my GitHub repository.

---

# 5. GitHub Pages

I plan to use GitHub Pages to deploy my Fab Academy documentation website.

GitHub Pages allows a repository to be published as a website.

For a Hugo website, the website needs to be built into static HTML, CSS, JavaScript, and other required files before it can be deployed.

My Hugo project can be built locally using:

```
hugo
```

This generates the website inside the:

```
public/
```

directory.

The generated `public` directory contains the static version of the website.

I also need to make sure that generated files are handled correctly in Git so that I do not accidentally commit unnecessary build files.

---

# 6. Adding Images

Hugo supports images inside content using Markdown.

For example:

```
![Description](./image.jpg)
```

I can also organize images together with a specific assignment using a page bundle.

For example:

```
content/
└── assignments/
    └── week-01/
        ├── index.md
        ├── image-01.jpg
        └── image-02.jpg
```

The `index.md` file contains the documentation for the assignment, while the images are stored in the same directory.

This makes it easier to keep the documentation and the files associated with each assignment together.

For example:

```
![My website](./image-01.jpg)
```

---

# 7. What I Learned

During the first week, I learned how to set up the basic infrastructure for my Fab Academy documentation.

I learned:

- How to install and use Git
- How to install Git using Homebrew
- How SSH authentication works with GitHub
- How to generate and use an SSH key
- How to create a Hugo website
- How to organize a Hugo project
- How to create a custom website without relying on a pre-made theme
- How HTML, CSS, and JavaScript work together with Hugo
- How to use Markdown for documentation
- How to use Obsidian as a Markdown documentation environment
- How to organize weekly Fab Academy assignments
- How to build my Hugo website locally
- How Git can be used to manage versions of my website
- How GitHub can be used to store and eventually deploy my website

---

# 8. Current Website Structure

At the end of this week, my project has the following general structure:

```
FabAcademy/
├── original-design.html
└── mywebsite/
    ├── archetypes/
    ├── assets/
    │   ├── css/
    │   └── js/
    ├── content/
    │   ├── about/
    │   ├── assignments/
    │   │   └── week-01/
    │   │       └── index.md
    │   └── final-project/
    ├── data/
    ├── i18n/
    ├── layouts/
    │   ├── _default/
    │   └── partials/
    ├── static/
    ├── themes/
    └── hugo.toml
```

My website is now ready to be used as the foundation for documenting the rest of my Fab Academy journey.

````

### One important correction

I **didn't keep the original person's GitLab screenshot links**, because those screenshots belong to the original documentation and would make your page look like you performed someone else's setup.

For your version, you should eventually add **your own screenshots**, for example:

```text
content/assignments/week-01/
├── index.md
├── git-version.png
├── github-ssh.png
├── hugo-installation.png
├── website.png
└── obsidian.png
````

Then we can place them into the documentation with:

```
![Git version](./git-version.png)
```