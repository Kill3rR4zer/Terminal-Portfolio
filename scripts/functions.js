//Functions file. All important functions are defined here. These are used for setup & operations

//Imports done
import config from "../config.js";
import {
    fetchGithubSocialStats,
    fetchLinkedInStats,
    fetchLeetCodeStats,
    fetchGithubStats,
    connections,
    githubStats,
    followers,
    following,
    ranking,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
} from "./fetchStats.js";
import {
    getContributors,
    getBlogs,
    getIPDetails,
    getRepo,
    contributors,
    userBlogs,
    IpDetails,
    userRepos,
} from "./getDetails.js";
import { suggestFurtherCommand } from "./compare.js";
import {
    commandHistory,
    saveHistory,
    clearHistory,
    popInvalidCommand,
    runSpecificHistoryCmd,
} from "./history.js";

const app = document.querySelector("#app");
let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const resumeUrl = "https://drive.google.com/u/0/uc?id=1J8QGMreVTsC-K-d5bpKV1BVNXxrCUYQa&export=download";

//Defining the functions
function neofetch() {
    // read data from data.json
    const data = config.neofetch;
    console.log(data);

    const container = document.createElement("div");
    container.classList.add("fetch-container");

    const fimg = document.createElement("div");
    fimg.classList.add("fetch-img-container");
    fimg.innerHTML = "<img class='fetch-img' src='js.png' />";

    const info = document.createElement("div");
    info.classList.add("info");
    container.appendChild(fimg);
    container.appendChild(info);

    for (const [key, value] of Object.entries(data)) {
        const p = document.createElement("p");
        p.innerHTML = `<span class="key">${key}</span>: <span class="value">${value}</span>`;
        info.appendChild(p);
    }

    app.appendChild(container);
}


function removeNeoFetch() {
    document.querySelector(".fetch-container").remove();
}


async function getInputValue(history, cmd = undefined) {
    const val = cmd || document.querySelector("input").value.trim().toLowerCase();
    saveHistory(val);
    const a = val.split(" ");
    const flag = a[1];
    const value = a[0];
    const flags = [...a];

    flags.shift(); // removes the first element
    if (value.substring(0, 5) === "cheer") {
        value.substring(0, 5).toLowerCase();
    } else {
        value.replace(/\s+/g, "").toLowerCase();
    }

    history.push(document.querySelector("input").value);
    switch (value) {
        case "help":
        case "ls":
            config.help.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            if (flag == '-d') {
                trueValue(val)
                config.help.forEach((item) => {
                    createText(`${item.title} :- ${item.description}`);
                });
                break;
            }
            trueValue(value);
            let titles = config.help.map(item => item.title);
            let titlesString = titles.join(', ');
            createText(titlesString);
            createText("type -d for more description")
            break;

        case "neofetch":
            neofetch();
            break;
        case "about":
            trueValue(value);
            createText(config.about);
            break;
        case "social":
            if (flag == "-l") {
                trueValue(val);
                config.social.forEach((item) => {
                    createText(`${item.title} : - <a href=${item.link} target = "_blank" > ${item.link}</a >
                    `);
                });
                break;
            } else if (flag == "-d") {
                trueValue(val);
                config.social.forEach((item) => {
                    createText(`${item.title} Link: - <a href=${item.link} target = "_blank" > ${item.link}</a >
                    `);
                    if (item.title == "Github") {
                        createText(`Number of followers: ${followers} `);
                        createText(`Number of following: ${following} `);
                    }
                    if (item.title == "LinkedIn") {
                        createText(`Connections: - ${connections} `);
                    }
                    if (item.title == "LeetCode") {
                        createText(`Problems Solved: ${totalSolved} `);
                        createText(
                            `Distribution: - Easy:${easySolved} Medium:${mediumSolved} Hard:${hardSolved} `
                        );
                        createText(`Ranking: ${ranking} `);
                    }
                    if (item.title == "Codechef") {
                        createText(`Rank: - ${item.rank} `);
                        createText(`Rating: - ${item.rating} `);
                    }
                });
                break;
            }
            trueValue(value);
            config.social.forEach((item) => {
                createText(
                    `< a href = ${item.link} target = "_blank" > ${item.title}</a > `
                );
            });
            break;
        case "projects":
            trueValue(value);
            createText("Projects:");
            config.projects.forEach((item) => {
                createText(
                    `< a href = ${item.link} target = "_blank" > ${item.title}</a > - ${item.description} `
                );
            });
            break;
        case "blogs":
            trueValue(value);
            createText("Recent Blogs:");
            // Hashnode Feed URL: https://username.hashnode.dev/rss.xml
            // Dev.to Feed URL: https://dev.to/feed/username
            // Medium Feed URL: https://medium.com/feed/@username
            // TODO: Insert your Medium/Dev/Hashnode or any blog feed URL below
            userBlogs.forEach((blog) => {
                createText(`${blog.site}: `);
                blog.items.forEach((item, index) => {
                    createText(
                        `< a href = "${item.link}" target = "_blank" > ${index + 1}. ${item.title
                        }</a > `
                    );
                });
            });
            break;
        case "contributors":
            trueValue(value);
            contributors.forEach((user) => {
                createText(
                    `- <a href=${user.userProfile}>${user.username}</a>`
                );
            });
            createText(`- Thanks to all the contributors 💖`);
            break;
        case "experience":
            trueValue(value);
            createText("My Work Experience:");
            config.experience.forEach((item) => {
                createText(`< a > ${item.title}</a > `);
                createText(`${item.description} `);
            });
            break;
        case "skills":
            trueValue(value);
            config.skills.forEach((item) => {
                createText(`< a > ${item.title}</a > `);
                createText(`${item.description} `);
            });
            break;
        case "ipconfig":
            trueValue(value);
            const IP = IpDetails[0];
            createText(`- Ipv6: ${IP.ip} `);
            createText(`- network: ${IP.network} `);
            createText(`- city: ${IP.city} `);
            createText(`- network org: ${IP.org} `);
            createText(`- region: ${IP.region} `);
            createText(`- postal: ${IP.postal} `);
            break;
        case "repos":
            trueValue(value);
            userRepos[0].forEach((repo, index) => {
                createText(
                    `- repo_${index} name: <a href=${repo.html_url}>${repo.name
                    }</a> | language: ${repo.language === null ? "no language" : repo.language
                    } `
                );
                createText(
                    `_ description: ${repo.description === null
                        ? "no description."
                        : repo.description
                    } `
                );
            });
            break;
        case "download":
            trueValue(value);
            downloadFile();
            break;
        case "clear":
        case "cls":
            document
                .querySelectorAll("p")
                .forEach((e) => e.parentNode.removeChild(e));
            document
                .querySelectorAll("section")
                .forEach((e) => e.parentNode.removeChild(e));
            removeNeoFetch();
            break;
        case "contact":
            createText(
                `Hey! Would love to get in touch.< br >
                    My linkedin profile link: <a href="${config.social.filter((obj) => obj.title.toLowerCase() == 'linkedin')[0].link}"> LinkedIn</a>.<br>
                        Drop me a text at <a href="mailto:${config.contact.email}" target="_blank">${config.contact.email}</a>`
            );
            window.location.href = `mailto:${config.contact.email}`;
            //   window.open(`mailto:${config.contact.email}`, "_blank");
            break;
        case "sudo":
            trueValue(value);
            createText("You are not authorized to use this command");
            break;
        case "github":
            trueValue(value);
            createText(`Github Username: ${githubStats.username}`);
            createText(`Github Bio: ${githubStats.bio}`);
            createText(`Number of repositories : ${githubStats.public_repos}`);
            createText(`Number of gists: ${githubStats.public_gists}`);
            createText(`Number of followers: ${githubStats.followers}`);
            createText(`Number of following: ${githubStats.following}`);
            break;
        case "cd":
            trueValue(value);
            createText("There's no directory in this path");
            break;
        case "calc":
            calc(flags.join(""));
            break;
        case "history":
            if (flag === "--clear") {
                clearHistory();
            }
            if (Number(flag)) {
                runSpecificHistoryCmd(Number(flag));
            } else {
                commandHistory();
            }
            break;
        case "exit":
            window.close();
        default:
            if (value.substring(0, 5) === "cheer") {
                trueValue(value);
                const reply =
                    config.cheer.responseArray[
                    Math.floor(
                        Math.random() * config.cheer.responseArray.length
                    )
                    ];
                createText(reply);
            } else {
                falseValue(value);
                createText(`${value} is not a valid command`);
                let commands = suggestFurtherCommand(value);
                createText("Are you looking for this: " + commands);
            }
    }
}

function new_line() {
    const p = document.createElement("p");
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    p.setAttribute("class", "path");
    p.textContent = config.terminal.user + " ";
    span.textContent = config.terminal.host + " ";
    span2.textContent = config.terminal.path + " ";
    p.appendChild(span);
    p.appendChild(span2);
    app.appendChild(p);
    const div = document.createElement("div");
    div.setAttribute("class", "type");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icone");
    const input = document.createElement("input");
    div.appendChild(i);
    div.appendChild(input);
    app.appendChild(div);
    input.focus();
}

function removeInput() {
    const div = document.querySelector(".type");
    app.removeChild(div);
}

function trueValue(value) {
    const div = document.createElement("section");
    div.setAttribute("class", "type2");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icone");
    const msg = document.createElement("h2");
    msg.textContent = `${value}`;
    div.appendChild(i);
    div.appendChild(msg);
    app.appendChild(div);
}

function falseValue(value) {
    const div = document.createElement("section");
    div.setAttribute("class", "type2");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icone");
    const msg = document.createElement("h2");
    msg.setAttribute("class", "error");
    msg.textContent = `${value}`;
    div.appendChild(i);
    div.appendChild(msg);
    app.appendChild(div);
}

function createText(text) {
    const p = document.createElement("p");
    p.innerHTML = text;
    app.appendChild(p);
}

function createCode(code, text) {
    const p = document.createElement("p");
    p.innerHTML = `<span class="code">${code} =></span> ${text}`;
    app.appendChild(p);
}

function downloadFile() {
    let link = document.createElement("a");
    link.href = resumeUrl;
    link.click();
    const p = document.createElement("p");
    p.innerHTML = "<span class='blink'>###############<span />";
    app.appendChild(p);
    setTimeout(() => {
        app.removeChild(p);
    }, 2500);
    document.body.removeChild(link);
}

function calc(flag) {
    try {
        if (flag === "" || flag === " " || flag === undefined) {
            falseValue(flag);
            createText("Please Enter a Valid Expression");
        } else {
            trueValue(flag);
            function parse(str) {
                return Function(`'use strict'; return (${str})`)();
            }
            createText(flag + " = " + parse(flag));
        }
    } catch (e) {
        falseValue(flag);
        createText(flag + " is an Invalid Expression");
    }
}

// all functions exported
export {
    neofetch,
    removeNeoFetch,
    getInputValue,
    new_line,
    removeInput,
    trueValue,
    falseValue,
    createText,
    createCode,
    downloadFile,
    calc,
};
