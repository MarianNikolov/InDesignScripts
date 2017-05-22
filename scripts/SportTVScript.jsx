/* globals alert, app */

(function main() {
	var documents = app.documents,
		selections = app.selection,
		myTextStyle = document.paragraphStyles.itemByName('kanal'),
		typeOfSelection = selections[0].constructor.name,
		paragraphs,
		numberOfParagraphs,
		currentParagraph,
		currentParagraphContents,
		wordsOfCurrentParagraph,
		firstWordOfCurrentParagraph,
		i;

	if (documents.length !== 0) {
		if (app.selection.length !== 0) {
			if (typeOfSelection === "TextFrame") {

				paragraphs = app.selection[0].paragraphs;
				numberOfParagraphs = paragraphs.length;

				for (i = 0; i < numberOfParagraphs; i += 1) {

					currentParagraph = paragraphs[i];
					currentParagraphContents = currentParagraph.contents;
					wordsOfCurrentParagraph = currentParagraph.words;
					firstWordOfCurrentParagraph = wordsOfCurrentParagraph[0];

					if (currentParagraphContents.length > 1 && wordsOfCurrentParagraph.length >= 1) {
						if (firstWordOfCurrentParagraph.characters[0].contents === "0" || 
							firstWordOfCurrentParagraph.characters[0].contents === "1" || 
							firstWordOfCurrentParagraph.characters[0].contents === "2") {
								firstWordOfCurrentParagraph.fontStyle = "Bold";
						}
						else {
							currentParagraph.applyParagraphStyle(myTextStyle);
						}
					}
				}
			}
			else {
				alert("Select text frame!");
			}
		}
		else {
			alert("Select object!");
		}
	}
	else {
		alert("Open a document and select an object!");
	}
})();
