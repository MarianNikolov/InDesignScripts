/* globals alert, app, FitOptions, ChangecaseMode */

(function main() {
	var documents = app.documents,
		selections = app.selection,
		typeOfSelection = selections[0].constructor.name;

	if (documents.length !== 0) {
		if (selections.length !== 0) {
			if (typeOfSelection === "TextFrame") {
				advertisements();
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

function advertisements() {
	var myObjectStyleBlack = document.objectStyles.itemByName("ObqviBlack"),
		myTextStyleBlack = document.paragraphStyles.itemByName("ObqviTextBlack"),
		myObjectStyleWhite = document.objectStyles.itemByName("ObqviWhite"),
		myTextStyleWhite = document.paragraphStyles.itemByName("ObqviTextWhite"),
		myFirstTitleStyle = document.paragraphStyles.itemByName("FirstTitle"),
		mySecondTitleStyle = document.paragraphStyles.itemByName("SecondTitle"),
		blackBoxStyleName = "black",
		whiteBoxStyleName = "white";

	makeFirstsWordsBold();

	addBoxes(blackBoxStyleName, myObjectStyleBlack, myTextStyleBlack);

	addBoxes(whiteBoxStyleName, myObjectStyleWhite, myTextStyleWhite);

	makeFirstTypeHeadings(myFirstTitleStyle);

	makeSecondTypeHeadings(mySecondTitleStyle);
}

function makeFirstsWordsBold() {
	var documents = app.documents,
		selections = app.selection,
		paragraphs = selections[0].paragraphs,
		numberOfParagraphs = paragraphs.length,
		wordsOfCurrentParagraph,
		currentParagraph,
		firstWordOfParagraph,
		i;

	numberOfParagraphs = paragraphs.length;

	//  Make first word of every paragraph "bold"
	for (i = 0; i < numberOfParagraphs; i += 1) {

		currentParagraph = paragraphs[i];
		wordsOfCurrentParagraph = currentParagraph.words;

		if (currentParagraph.contents.length > 4 && wordsOfCurrentParagraph.length >= 1) {
			firstWordOfParagraph = paragraphs[i].words[0];
			firstWordOfParagraph.changecase(ChangecaseMode.UPPERCASE);
			firstWordOfParagraph.fontStyle = "Bold";
		}
	}
}

function addBoxes(boxStyleName, myObjectStyle, myTextStyle) {
	var documents = app.documents,
		selections = app.selection,
		paragraphs = selections[0].paragraphs,
		numberOfParagraphs = paragraphs.length,
		isFindParagraphWhitDashes = true,
		isBoxParagraph = false,
		wordsOfCurrentParagraph,
		currentParagraph,
		currentParagraphContents,
		myTextFrame,
		firstWord,
		firstSymbol,
		secondSymbol,
		i;

	while (isFindParagraphWhitDashes) {

		isFindParagraphWhitDashes = false;
		numberOfParagraphs = paragraphs.length;

		for (i = 0; i < numberOfParagraphs; i += 1) {

			numberOfParagraphs = paragraphs.length;
			currentParagraph = paragraphs[i];
			wordsOfCurrentParagraph = paragraphs[i].words;
			firstWord = wordsOfCurrentParagraph[0];

			if (currentParagraph.contents.length > 5 && wordsOfCurrentParagraph.length > 2 && firstWord.characters.length > 3) {

				firstSymbol = firstWord.characters[0].contents.toString();
				secondSymbol = firstWord.characters[1].contents.toString();

				if (boxStyleName === 'black' || boxStyleName === "white") {

					if (boxStyleName === 'black') {
						if (firstSymbol === "-" && secondSymbol === "-") {
							isBoxParagraph = true;
							// delete first two symbols "-"
							firstWord.characters[0].contents = "";
							firstWord.characters[0].contents = "";
						}
					}
					else if (boxStyleName === "white") {
						if (firstSymbol === "-") {
							isBoxParagraph = true;
							// delete first symbols "-"
							firstWord.characters[0].contents = "";
						}
					}

					if (isBoxParagraph) {

						// get current paragraph text 
						currentParagraphContents = currentParagraph.contents;

						// delete current paragraph text 
						currentParagraph.contents = "";

						// insert new line after current paragraph
						currentParagraph.insertionPoints.item(0).contents = "\r";

						// add new text frame
						myTextFrame = currentParagraph.textFrames.add();
						myTextFrame.geometricBounds = [0, 0, 15, 31];
						currentParagraphContents = currentParagraphContents.replace("\r", "");
						myTextFrame.contents = currentParagraphContents;

						// set object style
						myTextFrame.applyObjectStyle(myObjectStyle);

						// set text style
						myTextFrame.paragraphs[0].applyParagraphStyle(myTextStyle);
						myTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
						currentParagraph.spaceBefore = 0.7;

						i = i - 1;

						isFindParagraphWhitDashes = true;
						isBoxParagraph = false;

						break;
					}
				}
			}
		}
	}
}

function makeFirstTypeHeadings(myFirstTitleStyle) {
	var documents = app.documents,
		selections = app.selection,
		paragraphs = selections[0].paragraphs,
		numberOfParagraphs = paragraphs.length,
		wordsOfCurrentParagraph,
		currentParagraph,
		firstWord,
		firstSymbol,
		secondSymbol,
		i;

	for (i = 0; i < numberOfParagraphs; i += 1) {

		numberOfParagraphs = paragraphs.length;
		currentParagraph = paragraphs[i];
		wordsOfCurrentParagraph = paragraphs[i].words;
		firstWord = wordsOfCurrentParagraph[0];

		if (currentParagraph.contents.length > 2 && wordsOfCurrentParagraph.length >= 1 && firstWord.characters.length >= 1) {

			firstSymbol = firstWord.characters[0].contents.toString();
			secondSymbol = firstWord.characters[1].contents.toString();

			if (firstSymbol === "~" && secondSymbol === "~") {
				firstWord.characters[0].contents = "";
				firstWord.characters[0].contents = "";
				currentParagraph.applyParagraphStyle(myFirstTitleStyle);
				firstWord.characters[0].pointSize = 19;
			}
		}
	}
}

function makeSecondTypeHeadings(mySecondTitleStyle) {
	var documents = app.documents,
		selections = app.selection,
		paragraphs = selections[0].paragraphs,
		numberOfParagraphs = paragraphs.length,
		wordsOfCurrentParagraph,
		currentParagraph,
		firstWord,
		firstSymbol,
		i;

	for (i = 0; i < numberOfParagraphs; i += 1) {

		numberOfParagraphs = paragraphs.length;
		currentParagraph = paragraphs[i];
		wordsOfCurrentParagraph = paragraphs[i].words;
		firstWord = wordsOfCurrentParagraph[0];

		if (currentParagraph.contents.length > 1 && wordsOfCurrentParagraph.length >= 1 && firstWord.characters.length >= 1) {

			firstSymbol = firstWord.characters[0].contents.toString();

			if (firstSymbol === "~") {
				firstWord.characters[0].contents = "";
				currentParagraph.applyParagraphStyle(mySecondTitleStyle);
				currentParagraph.spaceBefore = 0.5;
			}
		}
	}
}





