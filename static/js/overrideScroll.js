document.addEventListener('DOMContentLoaded', function () {
  console.log('overrideScroll.js loaded')

  // Function to set the overflow style
  function setOverflowStyle() {
    document.body.style.overflowY = 'scroll'
  }

  // Set the initial overflow style
  setOverflowStyle()

  // Create a MutationObserver to watch for changes to the body's attributes
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'style') {
        setOverflowStyle()
      }
    })
  })

  // Start observing the body element for attribute changes
  observer.observe(document.body, {
    attributes: true, // Watch for attribute changes
    attributeFilter: ['style'], // Only watch for changes to the style attribute
  })
})
