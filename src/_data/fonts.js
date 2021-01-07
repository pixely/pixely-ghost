const Cache = require("@11ty/eleventy-cache-assets");
const { writeFile } = require('fs');

module.exports = async function () {
    const url = "https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Karla:ital,wght@0,400;0,700;1,400&family=Rubik:ital,wght@0,700;1,400;1,700&display=swap";
    const filePath = "/styles/fonts.css";

    const fontCss = await Cache(url, {
        duration: "1d",
        type: "text",
        fetchOptions: {
            headers: {
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
            },
        },
    });

    writeFile(`./dist${filePath}`, fontCss, function (err) {
        if (err) {
          return console.log(err);
        }
    });

    return { cssPath: filePath };
};