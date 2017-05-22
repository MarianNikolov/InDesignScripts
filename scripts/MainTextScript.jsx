/* globals alert, app */

(function mainTextScript() {
	var documents = app.documents,
		selections = app.selection,
		myAuthorStyle = document.paragraphStyles.itemByName("Avtor"),
		myInnerTitleStyle = document.paragraphStyles.itemByName("Vutreshno zaglavie"),
		paragraphs = selections[0].paragraphs,
		typeOfSelection = selections[0].constructor.name,
		numberOfParagraphs,
		numberOfWords,
		currentParagraph,
		wordsOfCurrentParagraph,
		i;

	if (documents.length !== 0) {
		if (selections.length !== 0) {
			if (typeOfSelection === "TextFrame") {

				numberOfParagraphs = paragraphs.length;

				for (i = 0; i < numberOfParagraphs; i += 1) {

					currentParagraph = paragraphs[i],
					wordsOfCurrentParagraph = currentParagraph.words;
					numberOfWords = wordsOfCurrentParagraph.length;

					if (currentParagraph.contents.length > 2 && numberOfWords >= 1) {

						if (i === 0 && (numberOfWords === 1 || numberOfWords === 2 || numberOfWords === 3)) {
							currentParagraph.applyParagraphStyle(myAuthorStyle);
						}
						else if (i === 2 && numberOfWords > 5) {
							currentParagraph.fontStyle = "Bold";
						}
						else if (i > 2 && numberOfWords > 0 && numberOfWords < 4) {
							currentParagraph.applyParagraphStyle(myInnerTitleStyle);
						}
					}

					currentParagraph.alignToBaseline = false;
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
