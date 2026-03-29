function getRandomCoolLink() {
    coolLinksContent = document.querySelector('.cool-links-content');
    allLinks = coolLinksContent.querySelectorAll('li a');
    randIdx = Math.floor((Math.random() * allLinks.length));
    randomLink = allLinks[randIdx].href;

    return randomLink;
}
