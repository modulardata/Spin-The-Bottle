import path from 'path';
import {correct, StageTest, wrong} from 'hs-test-web';

const pagePath = path.join(import.meta.url, '../../src/index.html');

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [this.page.execute(() => {
        // test #1
        // HELPERS-->
        // method to check if element with id exists
        this.elementExists = (id, nodeNames) => {
            const element = document.body.querySelector(id);
            if (!element) return true;
            else return (nodeNames && !nodeNames.includes(element.nodeName.toLowerCase()));
        };

        // method to check if element with id has right text
        this.elementHasText = (id, correctText) => {
            const element = document.body.querySelector(id);
            if (!element) return true;

            if (correctText) {
                return (element.innerText !== correctText);
            }

            return !element.innerText || element.innerText.trim().length === 0;
        };

        // CONSTANTS-->
        const theElement = "The element with the selector of";
        // <--CONSTANTS

        // MESSAGES-->
        this.missingIdMsg = (id) => {
            return `${theElement} "${id}" is missing in the body of the HTML document.`;
        };
        this.wrongTagMsg = (id, tag, tagAlt) => {
            if (tagAlt) return `${theElement} "${id}" should be a/an ${tag} or ${tagAlt} tag.`;
            else return `${theElement} "${id}" should be a/an ${tag} tag.`;
        };
        this.wrongTextMsg = (id, text) => {
            return `${theElement} "${id}" should have the text: "${text}".`;
        };
        // <--MESSAGES
        return correct();

    }), this.page.execute(async () => {
        // test #2
        // STAGE1 TAGS

        // check if h1 exists
        const h1 = "h1";
        if (this.elementExists(h1)) return wrong(this.missingIdMsg(h1));

        // check if correct text
        const h1Text = "Spin The Bottle";
        if (this.elementHasText(h1, h1Text)) return wrong(this.wrongTextMsg(h1, h1Text));

        // check #players-text exists
        const playersText = "#players-text";
        if (this.elementExists(playersText)) return wrong(this.missingIdMsg(playersText));

        // check if its p tag
        if (this.elementExists(playersText, ["p"])) return wrong(this.wrongTagMsg(playersText, "p"));

        // check if it has text
        const playersTextValue = "Players";
        if (this.elementHasText(playersText, playersTextValue)) return wrong(this.wrongTextMsg(playersText, playersTextValue));

        // check if #players exists
        const players = "#players";
        if (this.elementExists(players)) return wrong(this.missingIdMsg(players));

        // check if its ul or ol tag
        if (this.elementExists(players, ["ul", "ol"])) return wrong(this.wrongTagMsg(players, "ul", "ol"));

        // check if #players has 6 li
        const playersList = document.body.querySelector(players);
        if (playersList.children.length !== 6) return wrong("There should be 6 players in the list.");

        // check if all players have text
        for (let i = 1; i <= 6; i++) {
            const playerSelector = `#players li:nth-of-type(${i})`;
            if (this.elementHasText(playerSelector)) return wrong(this.wrongTextMsg(playerSelector, "Player " + i));
        }

        // check if #status exists
        const status = "#status";
        if (this.elementExists(status)) return wrong(this.missingIdMsg(status));

        // check if its p tag
        if (this.elementExists(status, ["p"])) return wrong(this.wrongTagMsg(status, "p"));

        // check if it has text
        const statusText = "Spin the bottle!";
        if (this.elementHasText(status, statusText)) return wrong(this.wrongTextMsg(status, statusText));

        // check if #spin exists
        const spin = "#spin";
        if (this.elementExists(spin)) return wrong(this.missingIdMsg(spin));

        // check if its button
        if (this.elementExists(spin, ["button"])) return wrong(this.wrongTagMsg(spin, "button"));

        // check if it has text
        const spinText = "Spin";
        if (this.elementHasText(spin, spinText))
            return wrong(this.wrongTextMsg(spin, spinText));

        await new Promise(resolve => setTimeout(resolve, 3000));

        return correct();

    })
    ]

}

it("Test stage", async () => {
    await new Test().runTests()
}).timeout(30000);